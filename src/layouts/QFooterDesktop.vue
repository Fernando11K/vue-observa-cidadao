<template>
  <footer v-if="q.screen.gt.sm" class="bg-primary">
    <q-toolbar class="shadow-up-24">
      <q-toolbar-title class="text-center text-subtitle1 text-white">
        <q-badge rounded outline color="positive" align="middle">
          <span class="text-white"> &copy; {{ ano }} </span>
          <a
            style="text-decoration: none"
            class="text-white"
            href="https://br.linkedin.com/in/fernando11000"
            type="text/html"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;- Fernando11000
          </a>
          <span class="text-white"> &nbsp;- Versão {{ versao }} </span>
        </q-badge>
      </q-toolbar-title>
    </q-toolbar>
  </footer>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { version as versao } from '../../package.json';

const q = useQuasar();
const ano = new Date().getFullYear();
</script>
