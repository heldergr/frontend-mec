import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudanteComponent } from './estudante/estudante.component';
import { MecComponent } from './mec/mec.component';
import { FaculdadeComponent } from './faculdade/faculdade.component';
import { InstituicaoFinanceiraComponent } from './instituicao-financeira/instituicao-financeira.component';
import { CommonModule } from '@angular/common';
import { InstituicaoFinanceiraService } from './instituicao-financeira/instituicao-financeira.service';
import { EnvioDocumentacaoComponent } from './estudante/envio-documentacao.component';
import { IdentificarEstudanteComponent } from './estudante/identificar-estudante.component';
import { EstudanteService } from './estudante/estudante.service';
import { PedidosMatriculaComponent } from './common/component/pedidos-matricula.component';
import { DetalhePedidoComponent } from './estudante/detalhe-pedido.component';
import { StatusPipe } from './common/status.pipe';

@NgModule({
  declarations: [
    AppComponent, EstudanteComponent, MecComponent, FaculdadeComponent, InstituicaoFinanceiraComponent,
    EnvioDocumentacaoComponent, IdentificarEstudanteComponent, PedidosMatriculaComponent, DetalhePedidoComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    InstituicaoFinanceiraService, EstudanteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
