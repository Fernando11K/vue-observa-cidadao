<template>
  <q-banner dense rounded class="bg-red-1 text-grey-9">
    <template #avatar>
      <q-icon name="cloud_off" color="negative" />
    </template>
    Não foi possível consultar {{ fonte }} agora. Tente novamente em alguns minutos.
  </q-banner>
</template>

<script setup lang="ts">
defineProps<{ fonte: string }>();
</script>
