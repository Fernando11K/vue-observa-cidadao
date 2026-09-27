<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h5 text-weight-bold">Meus acompanhamentos</div>
      <div class="text-body2 text-grey-7">Senadores que você acompanha, com suas anotações.</div>
    </div>

    <div v-if="carregando" class="column items-center q-pa-xl">
      <q-spinner-dots color="primary" size="48px" />
    </div>

    <ListaVazia
      v-else-if="!acompanhamentoStore.lista.length"
      icone="bookmarks"
      texto="Você ainda não acompanha nenhum senador."
    />

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="acompanhamento in acompanhamentoStore.lista"
        :key="acompanhamento.id"
        class="col-12 col-md-6"
      >
        <q-card flat bordered class="full-height column">
          <q-card-section class="row items-center no-wrap q-gutter-md">
            <FotoSenador
              :url="acompanhamento.senador?.urlFoto"
              :nome="acompanhamento.senador?.nomeParlamentar"
            />
            <div class="col">
              <div class="text-subtitle1 text-weight-bold">
                {{
                  acompanhamento.senador?.nomeParlamentar ??
                  `Senador ${acompanhamento.codigoSenador}`
                }}
              </div>
              <div class="text-caption text-grey-7">
                {{ acompanhamento.senador?.partidoAtual ?? '—' }} /
                {{ acompanhamento.senador?.uf ?? '—' }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="col q-pt-none">
            <div v-if="acompanhamento.anotacao" class="anotacao text-body2">
              {{ acompanhamento.anotacao }}
            </div>
            <div v-else class="text-body2 text-grey-6 text-italic">Sem anotação.</div>
            <div class="text-caption text-grey-6 q-mt-sm">
              Acompanhando desde {{ formatarDataHora(acompanhamento.criadoEm) }}
              <template v-if="acompanhamento.atualizadoEm !== acompanhamento.criadoEm">
                · editado em {{ formatarDataHora(acompanhamento.atualizadoEm) }}
              </template>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              no-caps
              color="primary"
              icon="visibility"
              label="Ver senador"
              :to="{ name: 'senador', params: { codigo: acompanhamento.codigoSenador } }"
            />
            <q-btn
              flat
              no-caps
              color="primary"
              icon="edit_note"
              label="Editar anotação"
              @click="editar(acompanhamento)"
            />
            <q-btn
              flat
              no-caps
              color="negative"
              icon="delete"
              label="Remover"
              @click="remover(acompanhamento)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { success } from '@/boot/mensagem';
import ListaVazia from '@/components/common/ListaVazia.vue';
import FotoSenador from '@/components/senador/FotoSenador.vue';
import type { Acompanhamento } from '@/models/acompanhamento';
import { useAcompanhamentoStore } from '@/stores/acompanhamento-store';
import { pedirAnotacao } from '@/utils/dialog-util';
import { formatarDataHora } from '@/utils/data-util';
import { mostrarErroApi } from '@/utils/erro-util';

const $q = useQuasar();
const acompanhamentoStore = useAcompanhamentoStore();
const carregando = ref(false);

const nomeDe = (a: Acompanhamento) => a.senador?.nomeParlamentar ?? `o senador ${a.codigoSenador}`;

const editar = async (acompanhamento: Acompanhamento) => {
  const anotacao = await pedirAnotacao(
    $q,
    `Anotação sobre ${nomeDe(acompanhamento)}`,
    acompanhamento.anotacao,
  );
  if (anotacao === undefined) return;
  try {
    await acompanhamentoStore.atualizar(acompanhamento.id, anotacao);
    success('Anotação atualizada.');
  } catch (erro) {
    mostrarErroApi(erro);
  }
};

const remover = (acompanhamento: Acompanhamento) => {
  $q.dialog({
    title: 'Deixar de acompanhar',
    message: `Remover ${nomeDe(acompanhamento)} dos seus acompanhamentos? A anotação será perdida.`,
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Remover', color: 'negative', unelevated: true },
    persistent: true,
  }).onOk(() => {
    acompanhamentoStore
      .remover(acompanhamento.id)
      .then(() => success('Acompanhamento removido.'))
      .catch(mostrarErroApi);
  });
};

onMounted(async () => {
  carregando.value = true;
  try {
    await acompanhamentoStore.carregar(true);
  } catch (erro) {
    mostrarErroApi(erro);
  } finally {
    carregando.value = false;
  }
});
</script>

<style scoped>
.anotacao {
  white-space: pre-line;
}
</style>
