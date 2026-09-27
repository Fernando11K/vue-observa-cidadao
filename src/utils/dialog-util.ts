import type { QVueGlobals } from 'quasar';

const TAMANHO_MAXIMO_ANOTACAO = 1000;

/**
 * Abre um diálogo para escrever a anotação de um acompanhamento.
 * Resolve com o texto (null quando vazio) ou undefined se o usuário cancelar.
 */
const pedirAnotacao = (
  $q: QVueGlobals,
  titulo: string,
  valorAtual: string | null = null,
): Promise<string | null | undefined> =>
  new Promise((resolve) => {
    $q.dialog({
      title: titulo,
      message: 'Anotação opcional: por que você acompanha este senador?',
      prompt: {
        model: valorAtual ?? '',
        type: 'textarea',
        counter: true,
        maxlength: TAMANHO_MAXIMO_ANOTACAO,
        outlined: true,
      },
      cancel: { label: 'Cancelar', flat: true },
      ok: { label: 'Salvar', color: 'primary', unelevated: true },
      persistent: true,
    })
      .onOk((texto: string) => resolve(texto.trim() || null))
      .onCancel(() => resolve(undefined));
  });

export { pedirAnotacao };
