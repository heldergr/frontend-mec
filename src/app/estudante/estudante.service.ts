import { Estudante, Endereco } from "./estudante.model"
import { Observable, from } from 'rxjs'
import { OpcaoMatricula } from '../common/model/opcao.matricula.model'
import { Injectable } from '@angular/core'
import { InstituicaoFinanceira } from '../common/model/instituicao-financeira.model'
import { PedidoMatricula } from '../common/model/pedido-matricula.model'

const ITEM_PEDIDOS_MATRICULA = 'pedidosMatricula'

const strPms = localStorage.getItem(ITEM_PEDIDOS_MATRICULA)
const pedidosMatricula = strPms != null ? JSON.parse(strPms) : []

const endereco = new Endereco('Rua A', '10', 'Apto 22', '30888666', 'Floresta', 'BH')
const estudante = new Estudante('1', 'Ze dendagua', 'MG0001111', '11111111111', endereco)

const opcoesMatriculaFixo: OpcaoMatricula[] = [
    new OpcaoMatricula('Pontifícia Univesidade Católica de Minas Gerais', 'Nutrição', '1200,00'),
    new OpcaoMatricula('UNIPAC - Ipatinga', 'Medicina', '12000,00'),
    new OpcaoMatricula('Universo', 'Direito', '2000,00')
]

const persistirPedidos = (pedidosMatricula) => localStorage.setItem(ITEM_PEDIDOS_MATRICULA, JSON.stringify(pedidosMatricula))

const store = new Map()
store.set('opcoesMatricula', opcoesMatriculaFixo)
store.set(ITEM_PEDIDOS_MATRICULA, pedidosMatricula)

const getTodosPedidos = () =>  {
    // const allItems = store.get(ITEM_PEDIDOS_MATRICULA) 
    const strPms = localStorage.getItem(ITEM_PEDIDOS_MATRICULA)
    const allItems = strPms != null ? JSON.parse(strPms) : []
    return allItems
}

@Injectable({
    providedIn: 'root'
})
export class EstudanteService {
    getPedidosMatricula(cpf: string): Observable<PedidoMatricula[]> {
        const pedidosAluno = getTodosPedidos().filter(pm => pm.cpf === cpf)
        return from([pedidosAluno])
    }

    getOpcoesMatricula(cpf: string): Observable<OpcaoMatricula[]> {
        return from([store.get('opcoesMatricula')])
    }

    getUsuarioCorrente() {
        return store.get('usuarioCorrente')
    }

    setUsuarioCorrente(cpf: string) {
        store.set('usuarioCorrente', cpf)
    }

    enviarPedido(pedidoMatricula: PedidoMatricula) {
        const old = store.get(ITEM_PEDIDOS_MATRICULA)
        const nil = [...old, pedidoMatricula]
        store.set(ITEM_PEDIDOS_MATRICULA, nil)
        persistirPedidos(nil)
    }

    atualizarPedido(pedidoMatricula: PedidoMatricula): Observable<PedidoMatricula> {
        // const old = store.get(ITEM_PEDIDOS_MATRICULA)
        const old = getTodosPedidos()
        const nil = old.map(pm => {
            if (pm.id === pedidoMatricula.id) {
                return pedidoMatricula
            } else {
                return pm
            }
        })
        store.set(ITEM_PEDIDOS_MATRICULA, nil)
        persistirPedidos(nil)
        return from([pedidoMatricula])
    }

    removerPedido(pedidoMatricula: PedidoMatricula): Observable<string> {
        const old = store.get('pedidosMatricula') || []
        const nil = old.filter(pm => pm.id !== pedidoMatricula.id)
        store.set('pedidosMatricula', nil)
        return from(['ok'])
    }

    getById(id: string): Observable<PedidoMatricula> {
        const pedidosMatricula = store.get('pedidosMatricula') || []
        const pedidoMatricula = pedidosMatricula.filter(pm => pm.id === id)
        return from([pedidoMatricula])
    }
}
