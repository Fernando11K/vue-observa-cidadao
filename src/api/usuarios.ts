import { consultar, executar } from '@/api/graphql';
import type { DadosCadastro, DadosLogin, Sessao, Usuario } from '@/models/usuario';

const CAMPOS_USUARIO = 'id nome email criadoEm';

const CADASTRAR = `
  mutation Cadastrar($nome: String!, $email: String!, $senha: String!) {
    cadastrarUsuario(nome: $nome, email: $email, senha: $senha) {
      token usuario { ${CAMPOS_USUARIO} }
    }
  }
`;

const LOGIN = `
  mutation Login($email: String!, $senha: String!) {
    login(email: $email, senha: $senha) {
      token usuario { ${CAMPOS_USUARIO} }
    }
  }
`;

const EU = `query Eu { eu { ${CAMPOS_USUARIO} } }`;

const cadastrar = async (dados: DadosCadastro) =>
  (await executar<{ cadastrarUsuario: Sessao }>(CADASTRAR, { ...dados })).cadastrarUsuario;

const autenticar = async (dados: DadosLogin) =>
  (await executar<{ login: Sessao }>(LOGIN, { ...dados })).login;

const buscarUsuarioLogado = async () => (await consultar<{ eu: Usuario }>(EU)).eu;

export { cadastrar, autenticar, buscarUsuarioLogado };
