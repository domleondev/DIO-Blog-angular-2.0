// Importações necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importa as perguntas do quiz de um arquivo JSON local
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz', // Nome da tag HTML que representa esse componente
  standalone: true, // Permite usar o componente sem precisar declarar em um módulo
  imports: [CommonModule, RouterModule], // Módulos necessários para diretivas e rotas
  templateUrl: './buzzfeed.component.html', // Caminho do HTML do componente
  styleUrls: ['./buzzfeed.component.css','./buzzfeed-responsive.component.css'] // CSS responsivo e padrão
})
export class BuzzfeedComponent implements OnInit {

  // Título do quiz
  title: string = "";

  // Array com todas as perguntas
  questions: any;

  // Objeto que representa a pergunta atual
  questionSelected: any;

  // Respostas escolhidas pelo usuário
  answers: string[] = [];

  // Resultado final do quiz (ex.: "Você é o tipo A")
  answerSelected: string = "";

  // Índice da pergunta atual
  questionIndex: number = 0;

  // Quantidade total de perguntas
  questionMaxIndex: number = 0;

  // Indica se o quiz foi finalizado
  finished: boolean = false;

  // Redundância (não utilizada): objeto do JSON
  quizz_questions: any;

  // Construtor vazio
  constructor() { }

  // Função que roda assim que o componente é iniciado
  ngOnInit(): void {
    if (quizz_questions) { // Verifica se o JSON foi importado corretamente
      this.finished = false; // Marca como não finalizado
      this.title = quizz_questions.title; // Define o título do quiz
      this.questions = quizz_questions.questions; // Salva todas as perguntas

      // Verifica se há perguntas e seleciona a primeira
      if (this.questions.length > 0) {
        this.questionSelected = this.questions[0];
      }

      // Define os valores iniciais de índice
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  // Quando o usuário escolhe uma opção, salva a resposta e vai para a próxima pergunta
  playerChoose(alias: string): void {
    this.answers.push(alias); // Adiciona o alias da opção escolhida ao array de respostas
    this.nextStep(); // Vai para a próxima pergunta ou finaliza o quiz
  }

  // Avança para a próxima pergunta ou finaliza o quiz
  nextStep(): void {
    this.questionIndex++; // Incrementa o índice da pergunta

    if (this.questionIndex < this.questionMaxIndex) {
      // Se ainda houver perguntas, seleciona a próxima
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      // Se não houver mais perguntas, calcula o resultado final
      this.checkResult();
    }
  }

  // Calcula o resultado final com base nas respostas escolhidas
  checkResult(): void {
    // Conta quantas vezes cada tipo de resposta (alias) foi escolhido
    const result = this.answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Conta quantas vezes os tipos "A" e "B" foram escolhidos
    const countA = result["A"] || 0;
    const countB = result["B"] || 0;

    // Define o resultado com base em quem teve mais respostas
    this.answerSelected = countA > countB
      ? quizz_questions.results["A"]
      : quizz_questions.results["B"];

    // Marca o quiz como finalizado para mostrar o resultado na tela
    this.finished = true;
  }

  // Reinicia o quiz para começar novamente
  restart(): void {
    this.answers = []; // Limpa as respostas
    this.answerSelected = ""; // Limpa o resultado
    this.questionIndex = 0; // Reseta o índice
    this.questionSelected = this.questions[0]; // Seleciona a primeira pergunta novamente
    this.finished = false; // Marca como não finalizado
  }

}

