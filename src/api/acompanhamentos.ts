import { consultar, executar } from '@/api/graphql';
import type { Acompanhamento } from '@/models/acompanhamento';

const CAMPOS_ACOMPANHAMENTO = `
  id codigoSenador anotacao criadoEm atualizadoEm
  senador { id nomeParlamentar partidoAtual uf urlFoto }
`;

const LISTAR = `query ListarAcompanhamentos { acompanhamentos { ${CAMPOS_ACOMPANHAMENTO} } }`;

const ACOMPANHAR = `
  mutation Acompanhar($codigoSenador: Int!, $anotacao: String) {
    acompanharSenador(codigoSenador: $codigoSenador, anotacao: $anotacao) {
      ${CAMPOS_ACOMPANHAMENTO}
    }
  }
`;

const ATUALIZAR = `
  mutation Atualizar($id: Int!, $anotacao: String) {
    atualizarAcompanhamento(id: $id, anotacao: $anotacao) { ${CAMPOS_ACOMPANHAMENTO} }
  }
`;

const REMOVER = `mutation Remover($id: Int!) { removerAcompanhamento(id: $id) }`;

const listarAcompanhamentos = async () =>
  (await consultar<{ acompanhamentos: Acompanhamento[] }>(LISTAR)).acompanhamentos;

const acompanharSenador = async (codigoSenador: number, anotacao: string | null) =>
  (
    await executar<{ acompanharSenador: Acompanhamento }>(ACOMPANHAR, {
      codigoSenador,
      anotacao,
    })
  ).acompanharSenador;

const atualizarAcompanhamento = async (id: number, anotacao: string | null) =>
  (await executar<{ atualizarAcompanhamento: Acompanhamento }>(ATUALIZAR, { id, anotacao }))
    .atualizarAcompanhamento;

const removerAcompanhamento = async (id: number) =>
  (await executar<{ removerAcompanhamento: boolean }>(REMOVER, { id })).removerAcompanhamento;

export { listarAcompanhamentos, acompanharSenador, atualizarAcompanhamento, removerAcompanhamento };
