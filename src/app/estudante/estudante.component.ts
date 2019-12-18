import { Component, OnInit } from '@angular/core';
import { EstudanteService } from './estudante.service';
import { PedidoMatricula, STATUS } from '../common/model/pedido-matricula.model';

const fluxo = new Map()
fluxo.set('viewInfo', false)

@Component({
    selector: 'estudante',
    templateUrl: './estudante.component.html'
})
export class EstudanteComponent implements OnInit {
    cpf: string
    pedidosMatricula: PedidoMatricula[]
    viewInfo: boolean = fluxo.get('viewInfo')

    constructor(private estudanteService: EstudanteService) {}

    ngOnInit() {
        this.viewInfo = fluxo.get('viewInfo')
        this.cpf = this.estudanteService.getUsuarioCorrente()
        this.carregarPedidosMatricula()
    }

    setCpf(newCpf: string): void {
        this.cpf = newCpf
        this.estudanteService.setUsuarioCorrente(this.cpf)
        this.carregarPedidosMatricula()
    }

    carregarPedidosMatricula() {
        this.estudanteService.getPedidosMatricula(this.cpf).subscribe(
            pedidos => this.pedidosMatricula = pedidos,
            error => this.pedidosMatricula = []
        )
    }

    temUsuario(): boolean {
        return this.cpf && this.cpf.length > 0
    }

    cancelarPedido(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.CANCELADO
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.carregarPedidosMatricula(),
            error => console.log(error)
        )
    }

    confirmarPedido(pedidoMatricula: PedidoMatricula) {
        pedidoMatricula.status = STATUS.AGUARDANDO_CONTRATO_FINANCIAMENTO
        this.estudanteService.atualizarPedido(pedidoMatricula).subscribe(
            pm => this.carregarPedidosMatricula(),
            error => console.log(error)
        )
    }

    checkInfo() {
        this.viewInfo = true
        fluxo.set('viewInfo', true)
    }
}