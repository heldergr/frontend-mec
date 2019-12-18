import { from, Observable } from 'rxjs'
import { OpcaoMatricula } from '../common/model/opcao.matricula.model'
import { Injectable } from '@angular/core'
import { InstituicaoFinanceira } from '../common/model/instituicao-financeira.model'

const opcoesAluno1: OpcaoMatricula[] = [
    new OpcaoMatricula('Mackenzie', 'Coach Quantico', 'R$1958,00'),
    new OpcaoMatricula('Unipac', 'Fisioterapia', 'R$1348,00'),
    new OpcaoMatricula('Uni - Morada Nova', 'Agronomia', 'R$1879,00')
]

const opcoesAluno2: OpcaoMatricula[] = [
    new OpcaoMatricula('PUC MG', 'Coach Quantico', 'R$2958,00'),
    new OpcaoMatricula('PUC RJ', 'Fisioterapia', 'R$2348,00'),
    new OpcaoMatricula('PUC - Morada Nova', 'Agronomia', 'R$2879,00')
]
const opcoesPorCpf = new Map<string, OpcaoMatricula[]>()
opcoesPorCpf.set('11111111111', opcoesAluno1)
opcoesPorCpf.set('22222222222', opcoesAluno2)

const instituicoesFinanceiras = [
    new InstituicaoFinanceira('1', 'BB'),
    new InstituicaoFinanceira('2', 'Caixa'),
    new InstituicaoFinanceira('3', 'Satãder')
]

@Injectable({
    providedIn: 'root'
})
export class InstituicaoFinanceiraService {

    findOpcoesAluno(cpf: string): Observable<OpcaoMatricula[]> {
        const opcoes: OpcaoMatricula[] = <OpcaoMatricula[]> opcoesPorCpf.get(cpf) || []
        return from([opcoes])
    }

    findlAll(): Observable<InstituicaoFinanceira[]> {
        return from([instituicoesFinanceiras])
    }
}