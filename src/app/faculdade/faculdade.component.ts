import { Component } from '@angular/core';
import { PedidoMatricula, STATUS } from '../common/model/pedido-matricula.model';
import { EstudanteService } from '../estudante/estudante.service';

@Component({
    selector: 'faculdade',
    templateUrl: './faculdade.component.html'
})
export class FaculdadeComponent {
    cpf: string

    pedidosMatricula: PedidoMatricula[] = []

    constructor(private estudanteService: EstudanteService) {}

    pesquisarPedidosMatricula() {
        this.estudanteService.getPedidosMatricula(this.cpf).subscribe(
            pms => this.filtrarPedidos(pms),
            error => this.pedidosMatricula = []
        )
    }

    filtrarPedidos(pms: PedidoMatricula[]) {
        this.pedidosMatricula = pms.filter(
            pm => 
                pm.status === STATUS.AGUARDANDO_VALIDACAO_FACULDADE ||
                    pm.status === STATUS.AGUARDANDO_CONTRATO_MATRICULA)
    }

    aprovar(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.AGUARDANDO_VAIDACAO_IF
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.pesquisarPedidosMatricula(),
            error => console.log(error)
        )
    }

    anexarMatricula(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.SUCESSO
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.pesquisarPedidosMatricula(),
            error => console.log(error)
        )
    }

    haPedidos() {
        return this.pedidosMatricula && this.pedidosMatricula.length > 0
    }
}