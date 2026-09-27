<template>
  <q-select
    v-model="modelValue"
    :options="opcoes"
    :label="label"
    outlined
    dense
    clearable
    emit-value
    map-options
    :rounded="$q.platform.is.mobile"
  >
    <template #prepend>
      <q-icon name="diversity_3" color="primary" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Bloco parlamentar' });

const modelValue = defineModel<string | null>({ default: null });

const opcoes = [
  'Bloco Parlamentar Aliança',
  'Bloco Parlamentar da Resistência Democrática',
  'Bloco Parlamentar Democracia',
  'Bloco Parlamentar Pelo Brasil',
  'Bloco Parlamentar Vanguarda',
].map((bloco) => ({ label: bloco.replace('Bloco Parlamentar ', ''), value: bloco }));
</script>
