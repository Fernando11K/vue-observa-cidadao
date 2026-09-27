export interface SenadorAcompanhado {
  id: number;
  nomeParlamentar: string | null;
  partidoAtual: string | null;
  uf: string | null;
  urlFoto: string | null;
}

export interface Acompanhamento {
  id: number;
  codigoSenador: number;
  anotacao: string | null;
  criadoEm: string;
  atualizadoEm: string;
  senador: SenadorAcompanhado | null;
}
