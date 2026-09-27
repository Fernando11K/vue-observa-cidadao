<template>
  <div
    class="topo imagem relative-position cursor-pointer"
    role="link"
    aria-label="Observa Cidadão - voltar para a lista de senadores"
    @click="$router.push({ name: 'senadores' })"
  >
    <img :src="logo" alt="" aria-hidden="true" class="fundo absolute no-pointer-events" />
    <div class="absolute-bottom q-pa-md">
      <img :src="logo" alt="Logo do Observa Cidadão" class="logo q-mb-sm no-pointer-events" />
      <div class="text-weight-bold">Observa Cidadão</div>
      <div class="text-caption text-grey-8">Transparência no Senado</div>
    </div>
  </div>
  <q-separator />

  <q-list>
    <template v-for="item in menu" :key="item.id">
      <template v-if="item.ativo !== false">
        <EssentialLink v-bind="item" />
        <q-separator />
      </template>
    </template>
  </q-list>
</template>

<script setup lang="ts">
import EssentialLink from '@/components/EssentialLink.vue';
import { useMenu } from '@/assets/menu';
import logo from '@/assets/logo.svg';
const menu = useMenu();
</script>

<style scoped lang="scss">
.topo {
  height: 150px;
  overflow: hidden;
}

.fundo {
  top: 10px;
  right: -60px;
  height: 180px;
  opacity: 0.15;
}

.logo {
  display: block;
  height: 60px;
}

.imagem {
  &:hover {
    opacity: 0.8;
    transition: opacity 0.8s;
  }
}
</style>
