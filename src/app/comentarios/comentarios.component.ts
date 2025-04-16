import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
// Importa os módulos e decoradores necessários do Angular

import { Comentario } from '../models/comentario.model';
// Importa o modelo Comentario

import { ComentarioService } from '../services/comentario.service';
// Importa o serviço responsável pela comunicação com o backend

@Component({
  selector: 'app-comentarios',
  // Define o seletor HTML que representa esse componente

  templateUrl: './comentarios.component.html',
  // Indica o arquivo HTML que será usado como template

  styleUrls: ['./comentarios.component.css']
  // Arquivo de estilos específico do componente
})
export class ComentariosComponent implements OnInit {
  // Classe principal do componente Angular

  @Input() noticiaId!: number;
  // Recebe o ID da notícia do componente pai

  comentarios: Comentario[] = [];
  // Armazena os comentários carregados do backend

  novoComentario: Comentario = { noticiaId: 0, autor: '', texto: '' };
  // Objeto usado para criar um novo comentário via formulário

  constructor(private comentarioService: ComentarioService) {}
  // Injeta o serviço no construtor para poder usá-lo nos métodos abaixo

  ngOnInit(): void {}
  // Método do ciclo de vida chamado após a inicialização (nesse caso, não faz nada)

  ngOnChanges(changes: SimpleChanges): void {
    // Detecta mudanças nas propriedades @Input (no caso, noticiaId)

    if (changes['noticiaId'] && this.noticiaId) {
      // Se houve mudança e a notícia foi definida...

      this.novoComentario.noticiaId = this.noticiaId;
      // Atualiza o objeto do novo comentário com a notícia correta

      this.listarComentarios();
      // Carrega os comentários da nova notícia
    }
  }

  listarComentarios() {
    // Busca os comentários da notícia no backend

    this.comentarioService.listarPorNoticia(this.noticiaId)
      .subscribe((data: Comentario[]) => {
        this.comentarios = data;
      });
  }

  adicionarComentario() {
    // Adiciona um novo comentário

    this.novoComentario.noticiaId = this.noticiaId;
    // Garante que o ID da notícia está correto

    this.comentarioService.criarComentario(this.novoComentario)
      .subscribe(() => {
        this.listarComentarios();
        // Atualiza os comentários após o envio

        this.novoComentario = { noticiaId: this.noticiaId, autor: '', texto: '' };
        // Limpa os campos do formulário
      });
  }

  excluirComentario(id: number) {
    // Exclui o comentário com o ID passado

    this.comentarioService.excluirComentario(id)
      .subscribe(() => {
        this.listarComentarios();
        // Atualiza a lista após a exclusão
      });
  }
}

