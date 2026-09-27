import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  acompanharSenador,
  atualizarAcompanhamento,
  listarAcompanhamentos,
  removerAcompanhamento,
} from '@/api/acompanhamentos';
import type { Acompanhamento } from '@/models/acompanhamento';

export const useAcompanhamentoStore = defineStore('acompanhamento', {
  state: () => ({
    lista: [] as Acompanhamento[],
    carregado: false,
  }),

  getters: {
    doSenador: (state) => (codigoSenador: number) =>
      state.lista.find((a) => a.codigoSenador === codigoSenador) ?? null,
  },

  actions: {
    async carregar(forcar = false) {
      if (this.carregado && !forcar) return;
      this.lista = await listarAcompanhamentos();
      this.carregado = true;
    },

    async acompanhar(codigoSenador: number, anotacao: string | null) {
      const novo = await acompanharSenador(codigoSenador, anotacao);
      this.lista.unshift(novo);
      return novo;
    },

    async atualizar(id: number, anotacao: string | null) {
      const atualizado = await atualizarAcompanhamento(id, anotacao);
      const indice = this.lista.findIndex((a) => a.id === id);
      if (indice >= 0) this.lista[indice] = atualizado;
      return atualizado;
    },

    async remover(id: number) {
      await removerAcompanhamento(id);
      this.lista = this.lista.filter((a) => a.id !== id);
    },

    limpar() {
      this.lista = [];
      this.carregado = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAcompanhamentoStore, import.meta.hot));
}
