import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudanteService } from './estudante.service';
import { PedidoMatricula } from '../common/model/pedido-matricula.model';

@Component({
    selector: 'detalhe-pedido',
    templateUrl: './detalhe-pedido.component.html'
})
export class DetalhePedidoComponent implements OnInit {
    pedidoMatricula: PedidoMatricula = new PedidoMatricula(null, null, null, null, null)

    constructor(private route: ActivatedRoute, 
        private estudanteService: EstudanteService) {}

    ngOnInit() {
        this.route.paramMap.subscribe(
            params => {
                const id = params.get('id')
                this.estudanteService.getById(id).subscribe(
                    pm => this.pedidoMatricula = pm,
                    error => console.log(`Erro ao buscar pedido de matricula ${id}`)
                )
            }
        )
      }
}