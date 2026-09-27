<template>
  <q-card flat bordered class="box-usuario q-ma-md">
    <q-card-section class="text-center q-pb-none">
      <q-avatar size="64px" color="primary" text-color="white" icon="account_balance" />
      <div class="text-h5 text-weight-bold text-primary q-mt-md">{{ titulo }}</div>
      <div v-if="subtitulo" class="text-body2 text-grey-7 q-mt-xs">{{ subtitulo }}</div>
    </q-card-section>

    <q-card-section>
      <slot />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  titulo: string;
  subtitulo?: string;
}>();
</script>

<style scoped>
.box-usuario {
  width: 100%;
  max-width: 420px;
}
</style>
