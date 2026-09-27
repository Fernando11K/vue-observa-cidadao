export interface SenadorResumo {
  codigo: number;
  nomeParlamentar: string | null;
  nome: string | null;
  partido: string | null;
  uf: string | null;
  sexo: string | null;
  urlFoto: string | null;
  participacao: string | null;
  fimMandato: string | null;
  bloco: string | null;
  membroMesa: boolean;
  membroLideranca: boolean;
}

export type Cargo = 'mesa' | 'lideranca';

export interface Legislatura {
  numero: number | null;
  dataInicio: string | null;
  dataFim: string | null;
}

export interface Exercicio {
  dataInicio: string | null;
  dataFim: string | null;
  causaAfastamento: string | null;
}

export interface Partido {
  sigla: string;
  nome: string;
  dataFiliacao: string | null;
  dataDesfiliacao: string | null;
}

export interface Mandato {
  id: number | null;
  uf: string | null;
  participacao: string | null;
  legislaturas: Legislatura[];
  exercicios: Exercicio[];
  partidos: Partido[];
}

export interface SolicitacaoTcu {
  tipo: string | null;
  numero: number | null;
  dataAprovacao: string | null;
  assunto: string | null;
  autor: string | null;
  processoTcu: string | null;
  linkProposicao: string | null;
}

export interface ContaIrregularTcu {
  nome: string;
  uf: string | null;
  municipio: string | null;
  processo: string | null;
  acordao: string | null;
  dataTransitoEmJulgado: string | null;
  linkDeliberacoes: string | null;
  linkAcompanhamento: string | null;
}

export interface Senador {
  id: number;
  nome: string | null;
  nomeParlamentar: string | null;
  dataNascimento: string | null;
  partidoAtual: string | null;
  email: string | null;
  idade: number | null;
  uf: string | null;
  urlFoto: string | null;
  mandatos: Mandato[] | null;
  solicitacoesTcu: SolicitacaoTcu[] | null;
  contasIrregularesTcu: ContaIrregularTcu[] | null;
}

export interface FiltroSenadores {
  uf?: string | null;
  partido?: string | null;
}
