<template>
  <q-page class="flex flex-center">
    <BoxUsuario titulo="Entrar" subtitulo="Acesse para acompanhar seus senadores">
      <q-form class="column q-gutter-y-sm" @submit="entrar">
        <InputEmail v-model="email" />
        <InputSenha v-model="senha" />
        <q-btn
          type="submit"
          unelevated
          color="primary"
          label="Entrar"
          class="q-mt-md"
          :loading="carregando"
        />
      </q-form>

      <q-separator class="q-my-lg" />

      <div class="text-center">
        <div class="text-caption text-grey-7">Ainda não tem conta?</div>
        <q-btn
          flat
          no-caps
          color="primary"
          icon="person_add"
          label="Cadastre-se"
          :to="{ name: 'cadastro', query: route.query }"
        />
      </div>
    </BoxUsuario>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { autenticar } from '@/api/usuarios';
import { success } from '@/boot/mensagem';
import BoxUsuario from '@/components/usuario/BoxUsuario.vue';
import InputEmail from '@/components/usuario/InputEmail.vue';
import InputSenha from '@/components/usuario/InputSenha.vue';
import { useUsuarioStore } from '@/stores/usuario-store';
import { mostrarErroApi } from '@/utils/erro-util';
import { destinoAposLogin } from '@/utils/rota-util';

const route = useRoute();
const router = useRouter();
const usuarioStore = useUsuarioStore();

const email = ref('');
const senha = ref('');
const carregando = ref(false);

const entrar = async () => {
  carregando.value = true;
  try {
    usuarioStore.iniciarSessao(await autenticar({ email: email.value, senha: senha.value }));
    success(`Olá, ${usuarioStore.primeiroNome}!`);
    await router.push(destinoAposLogin(route));
  } catch (erro) {
    mostrarErroApi(erro);
  } finally {
    carregando.value = false;
  }
};
</script>
