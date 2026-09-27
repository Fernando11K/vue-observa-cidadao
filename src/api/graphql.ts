import { api } from '@/boot/axios';

interface ErroGraphqlResposta {
  message: string;
  extensions?: { code?: string };
}

interface RespostaGraphql<T> {
  data?: T | null;
  errors?: ErroGraphqlResposta[];
}

type Variaveis = Record<string, unknown>;

/** Erro devolvido pela API no array "errors", com o código de negócio em extensions.code. */
class ErroGraphql extends Error {
  constructor(
    message: string,
    readonly codigo?: string,
  ) {
    super(message);
    this.name = 'ErroGraphql';
  }
}

let aoPerderAutenticacao: (() => void) | null = null;

/** Registrado pela store de usuário para encerrar a sessão quando o token deixa de valer. */
const registrarAoPerderAutenticacao = (callback: () => void) => {
  aoPerderAutenticacao = callback;
};

const extrairDados = <T>(resposta: RespostaGraphql<T>): T => {
  const erro = resposta.errors?.[0];
  if (erro) {
    const codigo = erro.extensions?.code;
    if (codigo === 'NAO_AUTENTICADO') aoPerderAutenticacao?.();
    throw new ErroGraphql(erro.message, codigo);
  }
  return resposta.data as T;
};

/** Queries vão por HTTP GET (leitura); o Strawberry aceita queries via GET. */
const consultar = async <T>(query: string, variables: Variaveis = {}): Promise<T> => {
  const { data } = await api.get<RespostaGraphql<T>>('', {
    params: { query, variables: JSON.stringify(variables) },
  });
  return extrairDados(data);
};

/** Mutations vão por HTTP POST (escrita). */
const executar = async <T>(query: string, variables: Variaveis = {}): Promise<T> => {
  const { data } = await api.post<RespostaGraphql<T>>('', { query, variables });
  return extrairDados(data);
};

export { consultar, executar, ErroGraphql, registrarAoPerderAutenticacao };
