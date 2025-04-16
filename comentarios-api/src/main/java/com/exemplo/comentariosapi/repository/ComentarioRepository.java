package com.exemplo.comentariosapi.repository; //Define onde o repositório está dentro da estrutura do projeto.

import com.exemplo.comentariosapi.model.Comentario; //Importa a entidade Comentario, pois o repositório vai trabalhar com ela.
import org.springframework.data.jpa.repository.JpaRepository; //Importa JpaRepository, que é a interface base do Spring Data JPA.
import java.util.List; //Importa List, já que vamos usar listas como tipo de retorno.

public interface ComentarioRepository extends JpaRepository<Comentario, Long> { // Interface que herda operações básicas de CRUD
    List<Comentario> findByNoticiaId(Long noticiaId); // Metodo customizado para buscar comentários por ID da notícia
}
