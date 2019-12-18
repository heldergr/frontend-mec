import { Component } from '@angular/core';
import { PedidoMatricula, STATUS } from '../common/model/pedido-matricula.model';
import { EstudanteService } from '../estudante/estudante.service';

@Component({
    selector: 'instituicao-financeira',
    templateUrl: './instituicao-financeira.component.html'
})
export class InstituicaoFinanceiraComponent {
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
            pm => pm.status === STATUS.AGUARDANDO_VAIDACAO_IF ||
                pm.status === STATUS.AGUARDANDO_CONTRATO_FINANCIAMENTO
            )
    }

    aprovar(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.AGUARDANDO_APROVACAO_ALUNO
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.pesquisarPedidosMatricula(),
            error => console.log(error)
        )
    }

    negar(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.NEGADO_IF
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.pesquisarPedidosMatricula(),
            error => console.log(error)
        )
    }

    anexarContrato(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.AGUARDANDO_CONTRATO_MATRICULA
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.pesquisarPedidosMatricula(),
            error => console.log(error)
        )
    }

    haPedidos() {
        return this.pedidosMatricula && this.pedidosMatricula.length > 0
    }
}