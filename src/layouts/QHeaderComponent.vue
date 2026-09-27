<template>
  <q-header elevated reveal>
    <q-toolbar>
      <q-btn
        v-if="q.screen.lt.md"
        class="orientation-landscape"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <q-toolbar-title
        class="non-selectable cursor-pointer"
        :class="{ 'text-center': q.screen.lt.md }"
        @click="$router.push({ name: 'senadores' })"
      >
        <img :src="logo" alt="" aria-hidden="true" class="logo q-mr-sm" />
        Observa Cidadão
      </q-toolbar-title>

      <template v-if="q.screen.gt.sm">
        <q-btn
          v-for="item in navegacao"
          :key="item.id"
          flat
          no-caps
          :icon="item.icone"
          :label="item.titulo"
          :to="item.link"
        />

        <q-btn
          v-if="usuario.logado"
          flat
          no-caps
          icon="account_circle"
          :label="usuario.primeiroNome"
        >
          <q-menu anchor="bottom right" self="top right">
            <q-list style="min-width: 220px">
              <q-item>
                <q-item-section>
                  <q-item-label>{{ usuario.usuario?.nome }}</q-item-label>
                  <q-item-label caption>{{ usuario.usuario?.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable @click="sair?.acao?.()">
                <q-item-section avatar>
                  <q-icon name="logout" color="primary" />
                </q-item-section>
                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn v-else flat no-caps icon="login" label="Entrar" :to="{ name: 'login' }" />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { useMenu } from '@/assets/menu';
import logo from '@/assets/logo.svg';
import { useUsuarioStore } from '@/stores/usuario-store';

const q = useQuasar();
const usuario = useUsuarioStore();
const menu = useMenu();
const emit = defineEmits(['toggle-left-drawer']);

const navegacao = computed(() =>
  menu.value.filter((item) => item.id !== 0 && item.ativo !== false && item.link),
);
const sair = computed(() => menu.value.find((item) => item.titulo === 'Sair'));

const toggleLeftDrawer = () => emit('toggle-left-drawer');
</script>

<style scoped>
.logo {
  height: 32px;
  vertical-align: middle;
}
</style>
