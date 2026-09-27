<template>
  <q-select
    v-model="modelValue"
    :options="opcoes"
    :label="label"
    outlined
    dense
    clearable
    multiple
    use-chips
    emit-value
    map-options
    :rounded="$q.platform.is.mobile"
  >
    <template #prepend>
      <q-icon name="workspace_premium" color="primary" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
import type { Cargo } from '@/models/senador';

withDefaults(defineProps<{ label?: string }>(), { label: 'Cargo' });

const modelValue = defineModel<Cargo[] | null>({ default: () => [] });

const opcoes: { label: string; value: Cargo }[] = [
  { label: 'Mesa Diretora', value: 'mesa' },
  { label: 'Liderança', value: 'lideranca' },
];
</script>
