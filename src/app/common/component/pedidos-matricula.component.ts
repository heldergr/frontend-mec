import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PedidoMatricula, STATUS } from '../model/pedido-matricula.model';

const DOMINIOS = {
    ESTUDANTE: 0,
    MEC: 1,
    FACULDADE: 2,
    INSTITUICAO_FINANCEIRA: 3
}

@Component({
    selector: 'pedidos-matricula',
    templateUrl: './pedidos-matricula.component.html'
})
export class PedidosMatriculaComponent {
    @Input() dominio: number;
    @Input() pedidosMatricula: PedidoMatricula[]
    @Input() exibirAluno: boolean = true
    @Input() exibirFaculdade: boolean = true
    @Input() exibirInstituicaoFinanceira: boolean = true

    @Output() cancelar: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() aprovarFaculdade: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() aprovarIf: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() negarIf: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() confirmar: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() anexarContratoFinanciamento: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() anexarContratoMatricula: EventEmitter<PedidoMatricula> = new EventEmitter()
    @Output() downloadIdentidade: EventEmitter<PedidoMatricula> = new EventEmitter()

    anexarFinanciamentoPedido(pedidoMatricula: PedidoMatricula) {
        this.anexarContratoFinanciamento.emit(pedidoMatricula)
    }

    anexarMatriculaPedido(pedidoMatricula: PedidoMatricula) {
        this.anexarContratoMatricula.emit(pedidoMatricula)
    }

    downloadIdentidadePedido(pedidoMatricula: PedidoMatricula) {
        this.downloadIdentidade.emit(pedidoMatricula)
    }

    cancelarPedido(pedidoMatricula: PedidoMatricula) {
        this.cancelar.emit(pedidoMatricula)
    }

    confirmarPedido(pedidoMatricula: PedidoMatricula) {
        this.confirmar.emit(pedidoMatricula)
    }

    aprovarFaculdadePedido(pedidoMatricula: PedidoMatricula) {
        this.aprovarFaculdade.emit(pedidoMatricula)
    }

    aprovarIfPedido(pedidoMatricula: PedidoMatricula) {
        this.aprovarIf.emit(pedidoMatricula)
    }

    negarIfPedido(pedidoMatricula: PedidoMatricula) {
        this.negarIf.emit(pedidoMatricula)
    }

    exibirCancelar(pedidoMatricula: PedidoMatricula): boolean {
        const status = pedidoMatricula.status
        const podeCancelar = STATUS.AGUARDANDO_VAIDACAO_IF === status || 
            STATUS.AGUARDANDO_APROVACAO_ALUNO === status || STATUS.AGUARDANDO_VALIDACAO_FACULDADE === status
        return podeCancelar && this.dominio == DOMINIOS.ESTUDANTE
    }

    exibirConfirmar(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.AGUARDANDO_APROVACAO_ALUNO === pedidoMatricula.status && this.dominio == DOMINIOS.ESTUDANTE
    }

    exibirAprovarFaculdade(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.AGUARDANDO_VALIDACAO_FACULDADE === pedidoMatricula.status && this.dominio == DOMINIOS.FACULDADE
    }

    exibirAprovarIf(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.AGUARDANDO_VAIDACAO_IF === pedidoMatricula.status && this.dominio == DOMINIOS.INSTITUICAO_FINANCEIRA
    }

    exibirNegarIf(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.AGUARDANDO_VAIDACAO_IF === pedidoMatricula.status && this.dominio == DOMINIOS.INSTITUICAO_FINANCEIRA
    }

    exibirAnexarContratoFinanciamento(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.AGUARDANDO_CONTRATO_FINANCIAMENTO === pedidoMatricula.status && this.dominio == DOMINIOS.INSTITUICAO_FINANCEIRA
    }

    exibirAnexarContratoMatricula(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.AGUARDANDO_CONTRATO_MATRICULA === pedidoMatricula.status && this.dominio == DOMINIOS.FACULDADE
    }

    exibirDownloadIdentidade(pedidoMatricula: PedidoMatricula): boolean {
        return STATUS.SUCESSO === pedidoMatricula.status && this.dominio == DOMINIOS.ESTUDANTE
    }
}