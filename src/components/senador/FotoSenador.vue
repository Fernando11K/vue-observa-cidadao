<template>
  <q-avatar :size="tamanho" color="grey-3" text-color="grey-7">
    <img
      v-if="url && !falhou"
      :src="url"
      :alt="`Foto de ${nome ?? 'senador'}`"
      @error="falhou = true"
    />
    <q-icon v-else name="person" />
  </q-avatar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    url: string | null | undefined;
    nome?: string | null | undefined;
    tamanho?: string;
  }>(),
  { nome: null, tamanho: '64px' },
);

const falhou = ref(false);
</script>
