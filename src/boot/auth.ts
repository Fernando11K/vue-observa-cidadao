import { defineBoot } from '#q-app';
import { registrarAoPerderAutenticacao } from '@/api/graphql';
import { warning } from '@/boot/mensagem';
import { useUsuarioStore } from '@/stores/usuario-store';

export default defineBoot(async ({ router }) => {
  const usuario = useUsuarioStore();

  registrarAoPerderAutenticacao(() => {
    if (!usuario.logado) return;
    usuario.encerrarSessao();
    warning('Sua sessão expirou. Entre novamente.');
    void router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
  });

  await usuario.restaurarSessao();
});
