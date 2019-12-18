import { PipeTransform, Pipe } from '@angular/core';
import { STATUS } from './model/pedido-matricula.model';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    transform(status: number): string {

        switch (status) {
            case STATUS.AGUARDANDO_APROVACAO_ALUNO:
                return 'Aguardando confirmação'
            case STATUS.AGUARDANDO_VAIDACAO_IF:
                return 'Aguardando validação'
            case STATUS.AGUARDANDO_VALIDACAO_FACULDADE:
                return 'Aguardando validação (FAC)'
            case STATUS.NEGADO_IF:
                return 'Negado'
            case STATUS.SUCESSO:
                return 'Sucesso'
            case STATUS.CANCELADO:
                return 'Cancelado'
            case STATUS.AGUARDANDO_CONTRATO_FINANCIAMENTO:
                return 'Aguardando contrato financiamento'
            case STATUS.AGUARDANDO_CONTRATO_MATRICULA:
                return 'Aguardando contrato matrícula'
            default:
                return ``
        }
    }
}