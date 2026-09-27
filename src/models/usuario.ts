export interface Usuario {
  id: number;
  nome: string;
  email: string;
  criadoEm: string;
}

/** Resposta de cadastro e login: token JWT + dados do usuário. */
export interface Sessao {
  token: string;
  usuario: Usuario;
}

export interface DadosLogin {
  email: string;
  senha: string;
}

export interface DadosCadastro extends DadosLogin {
  nome: string;
}
