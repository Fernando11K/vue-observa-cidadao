import { Notify, type QNotifyCreateOptions } from 'quasar';

type PosicaoNotify = NonNullable<QNotifyCreateOptions['position']>;

const notificar = (mensagem: string, tipo: string, tempo: number, posicao: PosicaoNotify) => {
  Notify.create({ message: mensagem, type: tipo, position: posicao, timeout: tempo });
};

const success = (mensagem: string, tempo = 2000, posicao: PosicaoNotify = 'top') =>
  notificar(mensagem, 'positive', tempo, posicao);
const info = (mensagem: string, tempo = 2000, posicao: PosicaoNotify = 'top') =>
  notificar(mensagem, 'info', tempo, posicao);
const warning = (mensagem: string, tempo = 2500, posicao: PosicaoNotify = 'top') =>
  notificar(mensagem, 'warning', tempo, posicao);
const alerta = (mensagem: string, tempo = 3000, posicao: PosicaoNotify = 'top') =>
  notificar(mensagem, 'negative', tempo, posicao);

export { success, info, warning, alerta };
