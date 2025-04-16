package com.exemplo.comentariosapi.service; //Define onde a classe está dentro da estrutura do projeto.

import com.exemplo.comentariosapi.model.Comentario; //Importa a entidade Comentario.
import com.exemplo.comentariosapi.repository.ComentarioRepository; //Importa o repositório ComentarioRepository.
import org.springframework.stereotype.Service; //Importa Service, para marcar a classe como um componente de serviço.
import java.util.List; //Importa List, para listas de Comentario.

@Service // Marca a classe como um "Service", que será gerenciado pelo Spring
public class ComentarioService {

    private final ComentarioRepository repository; //Declara o repositório como um atributo da classe.

    public ComentarioService(ComentarioRepository repository) {
        this.repository = repository;
    }

    public List<Comentario> listarPorNoticia(Long noticiaId) {
        return repository.findByNoticiaId(noticiaId);
    }
    // Lista todos os comentários de uma notícia
    public Comentario salvar(Comentario comentario) {
        return repository.save(comentario);
    }
    // Salva um novo comentário
    public void excluir(Long id) {
        repository.deleteById(id);
    }// Exclui um comentário pelo ID
}