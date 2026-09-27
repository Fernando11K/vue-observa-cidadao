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
      <q-icon name="how_to_vote" color="primary" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Titular ou suplente' });

const modelValue = defineModel<string | null>({ default: null });

const opcoes = [
  { label: 'Titular', value: 'Titular' },
  { label: 'Suplente em exercício', value: 'Suplente' },
];
</script>
