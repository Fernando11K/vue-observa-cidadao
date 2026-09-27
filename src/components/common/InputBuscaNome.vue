<template>
  <q-input
    v-model="modelValue"
    :label="label"
    outlined
    dense
    clearable
    debounce="200"
    :rounded="$q.platform.is.mobile"
  >
    <template #prepend>
      <q-icon name="search" color="primary" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Buscar por nome' });

const modelValue = defineModel<string | null>({ default: '' });
</script>
