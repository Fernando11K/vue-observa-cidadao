import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { EssentialLinkProps } from '@/components/EssentialLink.vue';
import { info } from '@/boot/mensagem';
import { useUsuarioStore } from '@/stores/usuario-store';

export const useMenu = () => {
  const usuario = useUsuarioStore();
  const router = useRouter();

  const sair = async () => {
    usuario.encerrarSessao();
    info('Você saiu da sua conta.');
    await router.push({ name: 'senadores' });
  };

  return computed<EssentialLinkProps[]>(() => [
    {
      id: 0,
      titulo: usuario.usuario?.nome ?? 'Entrar',
      descricao: usuario.usuario?.email ?? 'Realizar login',
      icone: 'account_circle',
      ...(usuario.logado ? {} : { link: { name: 'login' } }),
    },
    {
      id: 1,
      titulo: 'Senadores',
      icone: 'groups',
      link: { name: 'senadores' },
    },
    {
      id: 2,
      titulo: 'Meus acompanhamentos',
      icone: 'bookmarks',
      link: { name: 'acompanhamentos' },
      ativo: usuario.logado,
    },
    {
      id: 3,
      titulo: 'Criar conta',
      icone: 'person_add',
      link: { name: 'cadastro' },
      ativo: !usuario.logado,
    },
    {
      id: 4,
      titulo: 'Sair',
      icone: 'logout',
      ativo: usuario.logado,
      acao: () => void sair(),
    },
  ]);
};
