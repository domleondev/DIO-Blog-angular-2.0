package com.exemplo.comentariosapi.model;
// Define o pacote onde está essa classe
import jakarta.persistence.*; // Importa anotações JPA como @Entity, @Id, etc.
import lombok.Data; // Gera automaticamente os getters, setters, toString, equals e hashCode

@Entity // Diz ao JPA que essa classe representa uma tabela no banco de dados
@Data // Lombok: gera automaticamente os métodos úteis
public class Comentario {

    @Id //Indica que esse atributo é a chave primária da tabela.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Define a estratégia de geração automática do valor da chave primária.

    private Long id;// Define o campo 'id' como chave primária e com auto incremento

    private Long noticiaId;
    // ID da notícia à qual o comentário pertence
    private String autor;
    // Nome de quem escreveu o comentário
    private String texto;
    // Texto do comentário
}