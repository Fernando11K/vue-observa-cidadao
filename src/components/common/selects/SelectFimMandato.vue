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
      <q-icon name="event" color="primary" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Fim do mandato' });

const modelValue = defineModel<number | null>({ default: null });

const opcoes = [
  { label: '2027 - vaga em disputa na eleição de 2026', value: 2027 },
  { label: '2031', value: 2031 },
];
</script>
