import { acceptHMRUpdate, defineStore } from 'pinia';
import { api } from '@/boot/axios';
import { buscarUsuarioLogado } from '@/api/usuarios';
import type { Sessao, Usuario } from '@/models/usuario';
import { useAcompanhamentoStore } from '@/stores/acompanhamento-store';

const CHAVE_TOKEN = 'observa-cidadao:token';

const aplicarToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem(CHAVE_TOKEN, token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem(CHAVE_TOKEN);
  }
};

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    token: null as string | null,
    usuario: null as Usuario | null,
  }),

  getters: {
    logado: (state) => !!state.token && !!state.usuario,
    primeiroNome: (state) => state.usuario?.nome.split(' ')[0] ?? '',
  },

  actions: {
    iniciarSessao(sessao: Sessao) {
      this.token = sessao.token;
      this.usuario = sessao.usuario;
      aplicarToken(sessao.token);
    },

    /** Recupera a sessão salva no navegador validando o token com a query "eu". */
    async restaurarSessao() {
      const token = localStorage.getItem(CHAVE_TOKEN);
      if (!token) return;
      aplicarToken(token);
      try {
        this.usuario = await buscarUsuarioLogado();
        this.token = token;
      } catch {
        this.encerrarSessao();
      }
    },

    encerrarSessao() {
      this.token = null;
      this.usuario = null;
      aplicarToken(null);
      useAcompanhamentoStore().limpar();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsuarioStore, import.meta.hot));
}
