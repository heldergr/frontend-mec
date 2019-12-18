import { Component, OnInit } from '@angular/core';
import { OpcaoMatricula } from '../common/model/opcao.matricula.model';
import { EstudanteService } from './estudante.service';
import { Router } from '@angular/router';
import { InstituicaoFinanceiraService } from '../instituicao-financeira/instituicao-financeira.service';
import { PedidoMatricula, STATUS } from '../common/model/pedido-matricula.model';
import { InstituicaoFinanceira } from '../common/model/instituicao-financeira.model';

@Component({
    selector: 'envio-documentacao',
    templateUrl: './envio-documentacao.component.html'
})
export class EnvioDocumentacaoComponent implements OnInit {
    cpf: string = ''
    renda: string = ''
    nota: string = ''

    opcoesMatricula: OpcaoMatricula[] = []
    instituicoesFinanceiras: InstituicaoFinanceira[]

    opcaoMatriculaSelecionada = null;
    instituicaoFinanceiraSelecionada: null;

    constructor(private estudanteService: EstudanteService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.cpf = this.estudanteService.getUsuarioCorrente()
        this.estudanteService.getOpcoesMatricula(this.cpf).subscribe(
            opcoes => this.opcoesMatricula = opcoes,
            error => this.opcoesMatricula = []
        )

        this.instituicaoFinanceiraService.findlAll().subscribe(
            ifs => this.instituicoesFinanceiras = ifs,
            error => this.instituicoesFinanceiras = []
        )
    }

    checkOpcaoMatricula(opcaoMatricula: OpcaoMatricula) {
        this.opcaoMatriculaSelecionada = opcaoMatricula
    }

    selecionarInstituicaoFinanceira(instituicaoFinanceira) {
        this.instituicaoFinanceiraSelecionada = instituicaoFinanceira
    }

    temOpcoesMatricula(): boolean {
        return this.opcoesMatricula && this.opcoesMatricula.length > 0
    }

    isEnvioOk(): boolean {
        return this.opcaoMatriculaSelecionada !== null
    }

    enviarPedido() {
        console.log(`IF selecionada ${this.instituicaoFinanceiraSelecionada}`)
        const novoPedido = new PedidoMatricula(this.generateId(), this.cpf, this.opcaoMatriculaSelecionada, 
            STATUS.AGUARDANDO_VALIDACAO_FACULDADE, this.instituicaoFinanceiraSelecionada)
        this.estudanteService.enviarPedido(novoPedido)
        this.router.navigate(['/estudante'])
    }

    generateId() {
        return new Date().getMilliseconds().toString()
    }
}