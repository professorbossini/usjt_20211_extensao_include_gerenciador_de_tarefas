import { Component } from '@angular/core';
import { Tarefa } from './model/tarefa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tarefas: Tarefa[] = [];
  dados: any;

  opcoes = [
    {rotulo: "Pendente", valor: false},
    {rotulo: "Concluída", valor: true}
  ]

  atualizarGrafico(){
    const concluidas = this.tarefas.filter(t => t.finalizada).length;
    const pendentes = this.tarefas.length - concluidas;
    this.dados = {
      labels: ["Concluídas", "Pendentes"],
      datasets: [
        {
          data: [concluidas, pendentes],
          backgroundColor: [
            '#2196F3',
            '#F44336'
          ]
        }
      ]
    }
  }

  adicionar (tarefaForm){
    const t: Tarefa = {
      descricao: tarefaForm.value.tarefa,
      finalizada: false
    }
    this.tarefas.push(t);
    tarefaForm.resetForm();
    //console.log(tarefaForm);
  }
}
