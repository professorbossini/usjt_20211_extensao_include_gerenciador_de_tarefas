import { Component, OnInit } from '@angular/core';
import { Tarefa } from './model/tarefa';
import { TarefaService } from './tarefa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tarefas: Tarefa[] = [];
  dados: any;

  opcoes = [
    {rotulo: "Pendente", valor: false},
    {rotulo: "Concluída", valor: true}
  ]

  constructor(private tarefaService: TarefaService){

  }

  ngOnInit(){
    this.tarefaService.getColecaoAtualizada().subscribe(tarefas => {
      this.tarefas = tarefas;
      this.atualizarGrafico();
    })
    this.tarefaService.list();
  }

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
