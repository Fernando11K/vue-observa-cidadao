<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h5 text-weight-bold">Senadores em exercício</div>
      <div class="text-body2 text-grey-7">
        Dados do Senado Federal. Abra um senador para ver mandatos e registros no TCU.
      </div>
    </div>

    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-md-4">
        <InputBuscaNome v-model="busca" />
      </div>
      <div class="col-6 col-md-2">
        <SelectUf v-model="uf" @update:model-value="carregar" />
      </div>
      <div class="col-6 col-md-2">
        <SelectSexo v-model="sexo" />
      </div>
      <div class="col-12 col-md-4">
        <SelectPartido v-model="partidos" />
      </div>
    </div>

    <div class="row items-center q-gutter-sm q-mb-sm">
      <q-btn
        flat
        dense
        no-caps
        color="primary"
        :icon="maisFiltros ? 'expand_less' : 'tune'"
        label="Mais filtros"
        @click="maisFiltros = !maisFiltros"
      >
        <q-badge v-if="filtrosExtrasAtivos" color="primary" floating :label="filtrosExtrasAtivos" />
      </q-btn>
      <q-toggle
        v-if="usuarioStore.logado"
        v-model="soAcompanhados"
        dense
        color="primary"
        label="Só os que acompanho"
      />
    </div>

    <q-slide-transition>
      <div v-show="maisFiltros" class="row q-col-gutter-sm q-mb-md">
        <div class="col-12 col-sm-6 col-md-3">
          <SelectFimMandato v-model="fimMandato" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <SelectParticipacao v-model="participacao" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <SelectBloco v-model="bloco" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <SelectCargo v-model="cargos" />
        </div>
      </div>
    </q-slide-transition>

    <div v-if="carregando" class="row q-col-gutter-md">
      <div v-for="n in 8" :key="n" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" size="72px" />
            </q-item-section>
            <q-item-section>
              <q-skeleton type="text" />
              <q-skeleton type="text" width="60%" />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <template v-else>
      <div class="text-caption text-grey-7 q-mb-sm">
        {{ senadoresFiltrados.length }} senador(es) encontrado(s)
      </div>

      <div v-if="senadoresFiltrados.length" class="row q-col-gutter-md">
        <div
          v-for="senador in senadoresFiltrados"
          :key="senador.codigo"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <SenadorCard :senador="senador" />
        </div>
      </div>

      <div v-else class="text-center text-grey-7 q-pa-xl">
        <q-icon name="search_off" size="48px" />
        <div class="q-mt-sm">Nenhum senador encontrado com esses filtros.</div>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { listarSenadores } from '@/api/senadores';
import InputBuscaNome from '@/components/common/InputBuscaNome.vue';
import SelectBloco from '@/components/common/selects/SelectBloco.vue';
import SelectCargo from '@/components/common/selects/SelectCargo.vue';
import SelectFimMandato from '@/components/common/selects/SelectFimMandato.vue';
import SelectParticipacao from '@/components/common/selects/SelectParticipacao.vue';
import SelectPartido from '@/components/common/selects/SelectPartido.vue';
import SelectSexo from '@/components/common/selects/SelectSexo.vue';
import SelectUf from '@/components/common/selects/SelectUf.vue';
import SenadorCard from '@/components/senador/SenadorCard.vue';
import type { Cargo, SenadorResumo } from '@/models/senador';
import { useAcompanhamentoStore } from '@/stores/acompanhamento-store';
import { useUsuarioStore } from '@/stores/usuario-store';
import { mostrarErroApi } from '@/utils/erro-util';
import { contem } from '@/utils/texto-util';

const usuarioStore = useUsuarioStore();
const acompanhamentoStore = useAcompanhamentoStore();

const senadores = ref<SenadorResumo[]>([]);
const carregando = ref(false);
const maisFiltros = ref(false);

const busca = ref<string | null>('');
const uf = ref<string | null>(null);
const partidos = ref<string[] | null>([]);
const sexo = ref<string | null>(null);
const fimMandato = ref<number | null>(null);
const participacao = ref<string | null>(null);
const bloco = ref<string | null>(null);
const cargos = ref<Cargo[] | null>([]);
const soAcompanhados = ref(false);

const filtrosExtrasAtivos = computed(
  () =>
    [fimMandato.value, participacao.value, bloco.value, cargos.value?.length].filter(Boolean)
      .length,
);

const temCargo = (s: SenadorResumo, cargo: Cargo) =>
  cargo === 'mesa' ? s.membroMesa : s.membroLideranca;

const atendeFiltros = (s: SenadorResumo) => {
  const termo = busca.value?.trim() ?? '';
  const selecionados = partidos.value ?? [];
  const cargosSelecionados = cargos.value ?? [];
  return (
    (!termo || contem(`${s.nomeParlamentar ?? ''} ${s.nome ?? ''}`, termo)) &&
    (!selecionados.length || selecionados.includes(s.partido ?? '')) &&
    (!sexo.value || s.sexo === sexo.value) &&
    (!fimMandato.value || s.fimMandato?.startsWith(String(fimMandato.value))) &&
    (!participacao.value || s.participacao?.includes(participacao.value)) &&
    (!bloco.value || s.bloco === bloco.value) &&
    (!cargosSelecionados.length || cargosSelecionados.some((c) => temCargo(s, c))) &&
    (!soAcompanhados.value || !!acompanhamentoStore.doSenador(s.codigo))
  );
};

const senadoresFiltrados = computed(() => senadores.value.filter(atendeFiltros));

const carregar = async () => {
  carregando.value = true;
  try {
    senadores.value = await listarSenadores({ uf: uf.value });
  } catch (erro) {
    mostrarErroApi(erro);
  } finally {
    carregando.value = false;
  }
};

onMounted(carregar);
</script>
