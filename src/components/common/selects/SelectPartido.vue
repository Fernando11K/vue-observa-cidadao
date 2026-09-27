<template>
  <q-select
    v-model="modelValue"
    :options="opcoesFiltradas"
    :label="label"
    outlined
    dense
    clearable
    multiple
    use-chips
    use-input
    input-debounce="0"
    emit-value
    map-options
    :rounded="$q.platform.is.mobile"
    @filter="filtrar"
  >
    <template #prepend>
      <q-icon name="flag" color="primary" />
    </template>
    <template #selected-item="{ opt, index, removeAtIndex }">
      <q-chip
        dense
        removable
        color="primary"
        text-color="white"
        :label="opt.value"
        @remove="removeAtIndex(index)"
      />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">Nenhum partido encontrado</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { contem } from '@/utils/texto-util';

withDefaults(defineProps<{ label?: string }>(), { label: 'Partido' });

const modelValue = defineModel<string[] | null>({ default: () => [] });

const PARTIDOS: Record<string, string> = {
  AGIR: 'Agir',
  AVANTE: 'Avante',
  CIDADANIA: 'Cidadania',
  DC: 'Democracia Cristã',
  DEMOCRATA: 'Democrata',
  MDB: 'Movimento Democrático Brasileiro',
  MISSÃO: 'Partido Missão',
  MOBILIZA: 'Mobilização Nacional',
  NOVO: 'Partido Novo',
  PCB: 'Partido Comunista Brasileiro',
  PCdoB: 'Partido Comunista do Brasil',
  PCO: 'Partido da Causa Operária',
  PDT: 'Partido Democrático Trabalhista',
  PL: 'Partido Liberal',
  PODE: 'Podemos',
  PP: 'Progressistas',
  PRD: 'Partido Renovação Democrática',
  PRTB: 'Partido Renovador Trabalhista Brasileiro',
  PSB: 'Partido Socialista Brasileiro',
  PSD: 'Partido Social Democrático',
  PSDB: 'Partido da Social Democracia Brasileira',
  PSOL: 'Partido Socialismo e Liberdade',
  PSTU: 'Partido Socialista dos Trabalhadores Unificado',
  PT: 'Partido dos Trabalhadores',
  PV: 'Partido Verde',
  REDE: 'Rede Sustentabilidade',
  REPUBLICANOS: 'Republicanos',
  SOLIDARIEDADE: 'Solidariedade',
  UNIÃO: 'União Brasil',
  UP: 'Unidade Popular',
  'S/Partido': 'Sem partido',
};

const opcoes = Object.entries(PARTIDOS).map(([sigla, nome]) => ({
  label: `${sigla} - ${nome}`,
  value: sigla,
}));
const opcoesFiltradas = ref(opcoes);

const filtrar = (texto: string, atualizar: (fn: () => void) => void) =>
  atualizar(() => {
    opcoesFiltradas.value = opcoes.filter((opcao) => contem(opcao.label, texto));
  });
</script>
