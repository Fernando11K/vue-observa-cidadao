<template>
  <q-footer v-if="q.screen.lt.md" reveal elevated class="bg-primary text-white">
    <q-toolbar class="orientation-portrait">
      <div class="row justify-around col-12">
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-btn flat round icon="groups" aria-label="Senadores" :to="{ name: 'senadores' }" />
        <q-btn
          flat
          round
          icon="bookmarks"
          aria-label="Meus acompanhamentos"
          :to="{ name: 'acompanhamentos' }"
        />
        <q-btn
          flat
          round
          icon="account_circle"
          aria-label="Minha conta"
          :to="{ name: usuario.logado ? 'acompanhamentos' : 'login' }"
        />
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useUsuarioStore } from '@/stores/usuario-store';

const q = useQuasar();
const usuario = useUsuarioStore();
const emit = defineEmits(['toggle-left-drawer']);

const toggleLeftDrawer = () => emit('toggle-left-drawer');
</script>
