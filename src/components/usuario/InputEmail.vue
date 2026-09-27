<template>
  <q-input
    v-model.trim="modelValue"
    outlined
    dense
    type="email"
    label="E-mail"
    autocomplete="username"
    lazy-rules
    :rules="regras"
  >
    <template #prepend>
      <q-icon name="mail" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ required: true });

const regras = [
  (val: string) => !!val || 'Informe o e-mail',
  (val: string) => /^\S+@\S+\.\S+$/.test(val) || 'E-mail inválido',
];
</script>
