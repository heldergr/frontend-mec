import { OpcaoMatricula } from './opcao.matricula.model'
import { InstituicaoFinanceira } from './instituicao-financeira.model'

export class PedidoMatricula {
    constructor(public id: string, public cpf: string, public opcaoMatricula: OpcaoMatricula, public status: number,
        private instituicaoFinanceira: InstituicaoFinanceira) {}

    isAguardandoConfirmacao() {
        return this.status === STATUS.AGUARDANDO_APROVACAO_ALUNO
    }
}

export const STATUS = {
    AGUARDANDO_VAIDACAO_IF: 0,
    AGUARDANDO_APROVACAO_ALUNO: 1,
    NEGADO_IF: 2,
    SUCESSO: 3,
    CANCELADO: 4,
    AGUARDANDO_VALIDACAO_FACULDADE: 5,
    AGUARDANDO_CONTRATO_FINANCIAMENTO: 6,
    AGUARDANDO_CONTRATO_MATRICULA: 7
}