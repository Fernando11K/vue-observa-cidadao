<template>
  <div class="text-center text-grey-7 q-pa-lg">
    <q-icon :name="icone" size="40px" />
    <div class="q-mt-sm">{{ texto }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ texto: string; icone?: string }>(), { icone: 'inbox' });
</script>
