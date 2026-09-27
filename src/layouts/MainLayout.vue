<template>
  <q-layout view="hHh LpR lFf">
    <QHeaderComponent @toggle-left-drawer="toggleLeftDrawer" />
    <q-drawer v-if="$q.screen.lt.md" v-model="leftDrawerOpen" overlay bordered>
      <QDrawerConteudo />
    </q-drawer>
    <q-page-container>
      <div class="conteudo">
        <router-view />
      </div>
    </q-page-container>
    <QFooterDesktop />
    <QFooterMobile @toggle-left-drawer="toggleLeftDrawer" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import QHeaderComponent from '@/layouts/QHeaderComponent.vue';
import QDrawerConteudo from '@/layouts/QDrawerConteudo.vue';
import QFooterMobile from '@/layouts/QFooterMobile.vue';
import QFooterDesktop from '@/layouts/QFooterDesktop.vue';
import { useAcompanhamentoStore } from '@/stores/acompanhamento-store';
import { useUsuarioStore } from '@/stores/usuario-store';

const usuarioStore = useUsuarioStore();
const acompanhamentoStore = useAcompanhamentoStore();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

watch(
  () => usuarioStore.logado,
  (logado) => {
    if (logado) acompanhamentoStore.carregar().catch(() => undefined);
  },
  { immediate: true },
);
</script>

<style scoped>
.conteudo {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
