<template>
  <q-item v-if="ativo" v-ripple :clickable="!!link || !!acao" :to="link" exact active-class="bg-green-1 text-primary"
    @click="acao?.()">
    <q-item-section v-if="icone" avatar>
      <q-icon :name="icone" :color="color" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ titulo }}</q-item-label>
      <q-item-label v-if="descricao" caption>{{ descricao }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

export interface EssentialLinkProps {
  id: number;
  titulo: string;
  descricao?: string;
  link?: RouteLocationRaw;
  icone?: string;
  color?: string;
  ativo?: boolean;
  acao?: () => void;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  ativo: true,
  color: 'primary',
});
</script>
