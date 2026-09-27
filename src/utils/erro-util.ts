import { isAxiosError } from 'axios';
import { ErroGraphql } from '@/api/graphql';
import { alerta } from '@/boot/mensagem';

const getMensagemErro = (erro: unknown): string => {
  if (erro instanceof ErroGraphql) return erro.message;
  if (isAxiosError(erro) && !erro.response) {
    return 'Não foi possível conectar à API. Verifique se ela está em execução.';
  }
  return 'Ocorreu um erro. Tente novamente mais tarde!';
};

/** Exibe ao usuário a mensagem de erro devolvida pela API (ou uma mensagem genérica). */
const mostrarErroApi = (erro: unknown) => alerta(getMensagemErro(erro));

export { getMensagemErro, mostrarErroApi };
