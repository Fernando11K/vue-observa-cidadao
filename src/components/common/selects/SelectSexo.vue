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
      <q-icon name="wc" color="primary" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Sexo' });

const modelValue = defineModel<string | null>({ default: null });

const opcoes = [
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
];
</script>
