import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({
    providedIn: 'root'
})
export class ComentarioService {

    private apiUrl = 'http://localhost:8080/comentarios';  // URL da sua API no backend

    constructor(private http: HttpClient) {}

    listarPorNoticia(noticiaId: number): Observable<Comentario[]> {
        return this.http.get<Comentario[]>(`${this.apiUrl}/noticia/${noticiaId}`);
    }

    criarComentario(comentario: Comentario): Observable<Comentario> {
        return this.http.post<Comentario>(this.apiUrl, comentario);
    }

    excluirComentario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
