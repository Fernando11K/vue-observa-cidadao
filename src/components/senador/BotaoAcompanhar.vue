<template>
  <q-btn
    v-if="acompanhamento"
    unelevated
    no-caps
    :dense="dense"
    color="positive"
    icon="check"
    label="Acompanhando"
    :loading="carregando"
    @click="deixarDeAcompanhar"
  >
    <q-tooltip>Clique para deixar de acompanhar</q-tooltip>
  </q-btn>
  <q-btn
    v-else
    outline
    no-caps
    :dense="dense"
    color="grey-10"
    icon="bookmark_add"
    label="Acompanhar"
    :loading="carregando"
    @click="acompanhar"
  />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { info, success } from '@/boot/mensagem';
import { useAcompanhamentoStore } from '@/stores/acompanhamento-store';
import { useUsuarioStore } from '@/stores/usuario-store';
import { pedirAnotacao } from '@/utils/dialog-util';
import { mostrarErroApi } from '@/utils/erro-util';

const props = withDefaults(
  defineProps<{
    codigoSenador: number;
    nome?: string | null;
    dense?: boolean;
  }>(),
  { nome: null, dense: false },
);

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const usuarioStore = useUsuarioStore();
const acompanhamentoStore = useAcompanhamentoStore();

const carregando = ref(false);
const acompanhamento = computed(() => acompanhamentoStore.doSenador(props.codigoSenador));
const nomeExibido = computed(() => props.nome ?? 'este senador');

const executar = async (acao: () => Promise<void>) => {
  carregando.value = true;
  try {
    await acao();
  } catch (erro) {
    mostrarErroApi(erro);
  } finally {
    carregando.value = false;
  }
};

const acompanhar = async () => {
  if (!usuarioStore.logado) {
    info('Entre na sua conta para acompanhar senadores.');
    await router.push({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }
  const anotacao = await pedirAnotacao($q, `Acompanhar ${nomeExibido.value}`);
  if (anotacao === undefined) return;
  await executar(async () => {
    await acompanhamentoStore.acompanhar(props.codigoSenador, anotacao);
    success(`Você agora acompanha ${nomeExibido.value}.`);
  });
};

const deixarDeAcompanhar = () => {
  const atual = acompanhamento.value;
  if (!atual) return;
  $q.dialog({
    title: 'Deixar de acompanhar',
    message: `Remover ${nomeExibido.value} dos seus acompanhamentos? A anotação será perdida.`,
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Remover', color: 'negative', unelevated: true },
    persistent: true,
  }).onOk(() => {
    void executar(async () => {
      await acompanhamentoStore.remover(atual.id);
      success('Acompanhamento removido.');
    });
  });
};
</script>
