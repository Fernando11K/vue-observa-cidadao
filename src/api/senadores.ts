import { consultar } from '@/api/graphql';
import type { FiltroSenadores, Senador, SenadorResumo } from '@/models/senador';

const LISTAR_SENADORES = `
  query ListarSenadores($uf: String, $partido: String) {
    senadores(uf: $uf, partido: $partido) {
      codigo nomeParlamentar nome partido uf sexo urlFoto
      participacao fimMandato bloco membroMesa membroLideranca
    }
  }
`;

const BUSCAR_SENADOR = `
  query BuscarSenador($codigo: Int!) {
    senador(codigo: $codigo) {
      id nome nomeParlamentar dataNascimento partidoAtual email idade uf urlFoto
      mandatos {
        id uf participacao
        legislaturas { numero dataInicio dataFim }
        exercicios { dataInicio dataFim causaAfastamento }
        partidos { sigla nome dataFiliacao dataDesfiliacao }
      }
      solicitacoesTcu {
        tipo numero dataAprovacao assunto autor processoTcu linkProposicao
      }
      contasIrregularesTcu {
        nome uf municipio processo acordao dataTransitoEmJulgado
        linkDeliberacoes linkAcompanhamento
      }
    }
  }
`;

const listarSenadores = async (filtro: FiltroSenadores = {}) =>
  (await consultar<{ senadores: SenadorResumo[] }>(LISTAR_SENADORES, { ...filtro })).senadores;

const buscarSenador = async (codigo: number) =>
  (await consultar<{ senador: Senador | null }>(BUSCAR_SENADOR, { codigo })).senador;

export { listarSenadores, buscarSenador };
