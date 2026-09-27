<template>
  <q-input
    v-model="modelValue"
    outlined
    dense
    :type="oculta ? 'password' : 'text'"
    :label="label"
    :autocomplete="novaSenha ? 'new-password' : 'current-password'"
    :hint="novaSenha ? `Mínimo de ${TAMANHO_MINIMO_SENHA} caracteres` : undefined"
    lazy-rules
    :rules="regras"
  >
    <template #prepend>
      <q-icon name="lock" />
    </template>
    <template #append>
      <q-icon
        :name="oculta ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        role="button"
        tabindex="0"
        :aria-label="oculta ? 'Exibir senha' : 'Ocultar senha'"
        @click="oculta = !oculta"
        @keydown.enter.prevent="oculta = !oculta"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Regra = (val: string) => boolean | string;

const TAMANHO_MINIMO_SENHA = 8;

const props = withDefaults(
  defineProps<{
    label?: string;
    /** Aplica as regras de cadastro (tamanho mínimo) em vez de só exigir o campo. */
    novaSenha?: boolean;
    regrasExtras?: Regra[];
  }>(),
  { label: 'Senha', novaSenha: false, regrasExtras: () => [] },
);
const modelValue = defineModel<string>({ required: true });

const oculta = ref(true);

const regras: Regra[] = [
  (val: string) => !!val || 'Informe a senha',
  ...props.regrasExtras,
  ...(props.novaSenha
    ? [
        (val: string) =>
          val.length >= TAMANHO_MINIMO_SENHA ||
          `A senha deve ter pelo menos ${TAMANHO_MINIMO_SENHA} caracteres`,
      ]
    : []),
];
</script>
