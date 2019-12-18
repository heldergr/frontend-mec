import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudanteComponent } from './estudante/estudante.component';
import { MecComponent } from './mec/mec.component';
import { FaculdadeComponent } from './faculdade/faculdade.component';
import { InstituicaoFinanceiraComponent } from './instituicao-financeira/instituicao-financeira.component';
import { EnvioDocumentacaoComponent } from './estudante/envio-documentacao.component';
import { DetalhePedidoComponent } from './estudante/detalhe-pedido.component';

const routes: Routes = [
  {
    path: 'estudante', component: EstudanteComponent
  },
  {
    path: 'mec', component: MecComponent
  },
  {
    path: 'faculdade', component: FaculdadeComponent
  },
  {
    path: 'instituicao-financeira', component: InstituicaoFinanceiraComponent
  },
  {
    path: 'envio-documentacao', component: EnvioDocumentacaoComponent
  },
  {
    path: 'detalhe-pedido/:id', component: DetalhePedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
