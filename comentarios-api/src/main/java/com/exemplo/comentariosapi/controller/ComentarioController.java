package com.exemplo.comentariosapi.controller; //Define onde o controller está localizado no projeto.

import com.exemplo.comentariosapi.model.Comentario; //Importa a entidade Comentario.
import com.exemplo.comentariosapi.service.ComentarioService; //Importa o serviço ComentarioService.
import org.springframework.web.bind.annotation.*; //Importa anotações REST do Spring (@RestController, @RequestMapping, @GetMapping, etc).
import java.util.List; //Importa List, já que usamos listas de Comentario.

@CrossOrigin(origins = "http://localhost:4200") //Permite que requisições HTTP feitas pelo Angular consigam acessar essa API.
@RestController //Indica que essa classe é um controller REST
@RequestMapping("/comentarios") //Define a URL base para os endpoints dessa classe.
public class ComentarioController {

    private final ComentarioService service;

    public ComentarioController(ComentarioService service) {
        this.service = service;
    }
    //Injeta a dependência de ComentarioService via construtor.
    @GetMapping("/noticia/{noticiaId}")
    public List<Comentario> listar(@PathVariable Long noticiaId) {
        return service.listarPorNoticia(noticiaId);
    }
    //Captura o {noticiaId} da URL via @PathVariable.
    //
    //Chama o metodo listarPorNoticia do serviço.
    //
    //Retorna uma lista de comentários no formato JSON.
    @PostMapping
    public Comentario criar(@RequestBody Comentario comentario) {
        return service.salvar(comentario);
    }
    //Converte o JSON recebido para um objeto Comentario via @RequestBody.
    //
    //Salva esse comentário no banco chamando o service.salvar.
    //
    //Retorna o comentário salvo (com ID gerado pelo banco) em JSON.
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}   //Pega o {id} da URL via @PathVariable.
    //
    //Chama o service.excluir passando o ID.
    //
    //Não retorna nada (void), pois apenas deleta.