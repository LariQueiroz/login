package com.larissa.cadastro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.larissa.cadastro.entities.Usuario;
import com.larissa.cadastro.repositories.UsuarioRepository;

@Service

public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> listarTodos(){

        return repository.findAll();

    }

    public Usuario cadastrar(Usuario usuario) {
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        return repository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario dados) {

    	Usuario usuario = repository.findById(id).orElse(null);

    	if (usuario == null) {

    	return null;

    	}

    	usuario.setNome(dados.getNome());

    	usuario.setEmail(dados.getEmail());

    	usuario.setSenha(dados.getSenha());

    	usuario.setPerfil(dados.getPerfil());

    	usuario.setEndereco(dados.getEndereco());

    	usuario.setBairro(dados.getBairro());

    	usuario.setComplemento(dados.getComplemento());

    	usuario.setCep(dados.getCep());

    	usuario.setCidade(dados.getCidade());

    	usuario.setEstado(dados.getEstado());
    	
    	usuario.setFoto(dados.getFoto());


    	return repository.save(usuario);

    	}

    	public boolean deletar(Long id) {

    	if (!repository.existsById(id)) {

    	return false;

    	}

    	repository.deleteById(id);

    	return true;

    	}
    	@Autowired
        private BCryptPasswordEncoder passwordEncoder;
    	 public Usuario login(String email, String senha) {
             
             Usuario usuario =  repository.findByEmail(email);
            
             if (usuario == null) {
                 return null;
             }
            
             if (!passwordEncoder.matches(senha, usuario.getSenha())) {
                 return null;
             }
             return usuario;
         }
    	 
}