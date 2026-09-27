<template>
  <q-select
    v-model="modelValue"
    :options="opcoesFiltradas"
    :label="label"
    outlined
    dense
    clearable
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    emit-value
    map-options
    :rounded="$q.platform.is.mobile"
    @filter="filtrar"
  >
    <template #prepend>
      <q-icon name="place" color="primary" />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">Nenhuma UF encontrada</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { contem } from '@/utils/texto-util';

withDefaults(defineProps<{ label?: string }>(), { label: 'UF' });

const modelValue = defineModel<string | null>({ default: null });

const UFS: Record<string, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AM: 'Amazonas',
  AP: 'Amapá',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MG: 'Minas Gerais',
  MS: 'Mato Grosso do Sul',
  MT: 'Mato Grosso',
  PA: 'Pará',
  PB: 'Paraíba',
  PE: 'Pernambuco',
  PI: 'Piauí',
  PR: 'Paraná',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RO: 'Rondônia',
  RR: 'Roraima',
  RS: 'Rio Grande do Sul',
  SC: 'Santa Catarina',
  SE: 'Sergipe',
  SP: 'São Paulo',
  TO: 'Tocantins',
};

const opcoes = Object.entries(UFS).map(([sigla, nome]) => ({
  label: `${sigla} - ${nome}`,
  value: sigla,
}));
const opcoesFiltradas = ref(opcoes);

const filtrar = (texto: string, atualizar: (fn: () => void) => void) =>
  atualizar(() => {
    opcoesFiltradas.value = opcoes.filter((opcao) => contem(opcao.label, texto));
  });
</script>
