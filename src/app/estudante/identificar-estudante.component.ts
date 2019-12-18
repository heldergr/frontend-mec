import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'identificar-estudante',
    templateUrl: './identificar-estudante.component.html'
})
export class IdentificarEstudanteComponent {
    @Output() cpfSelecionado: EventEmitter<string> = new EventEmitter<string>()
    cpf: string

    pesquisarCpf() {
        if (this.isCpfOk()) {
            this.cpfSelecionado.emit(this.cpf)
        }
    }

    isCpfOk(): boolean {
        return this.cpf && this.cpf.length > 0
    }
}