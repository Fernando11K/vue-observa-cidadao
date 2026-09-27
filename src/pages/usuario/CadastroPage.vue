<template>
  <q-page class="flex flex-center">
    <BoxUsuario titulo="Criar conta" subtitulo="Você já entra logado após o cadastro">
      <q-form class="column q-gutter-y-sm" @submit="cadastrarUsuario">
        <q-input
          v-model.trim="nome"
          outlined
          dense
          label="Nome"
          autocomplete="name"
          maxlength="120"
          lazy-rules
          :rules="[(val: string) => !!val || 'Informe o nome']"
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <InputEmail v-model="email" />
        <InputSenha v-model="senha" nova-senha />
        <InputSenha
          v-model="confirmacao"
          label="Confirme a senha"
          :regras-extras="[(val: string) => val === senha || 'As senhas não conferem']"
        />
        <q-btn
          type="submit"
          unelevated
          color="primary"
          label="Cadastrar"
          class="q-mt-md"
          :loading="carregando"
        />
      </q-form>

      <q-separator class="q-my-lg" />

      <div class="text-center">
        <div class="text-caption text-grey-7">Já tem conta?</div>
        <q-btn
          flat
          no-caps
          color="primary"
          icon="login"
          label="Entrar"
          :to="{ name: 'login', query: route.query }"
        />
      </div>
    </BoxUsuario>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cadastrar } from '@/api/usuarios';
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

const nome = ref('');
const email = ref('');
const senha = ref('');
const confirmacao = ref('');
const carregando = ref(false);

const cadastrarUsuario = async () => {
  carregando.value = true;
  try {
    usuarioStore.iniciarSessao(
      await cadastrar({ nome: nome.value, email: email.value, senha: senha.value }),
    );
    success(`Bem-vindo(a), ${usuarioStore.primeiroNome}!`);
    await router.push(destinoAposLogin(route));
  } catch (erro) {
    mostrarErroApi(erro);
  } finally {
    carregando.value = false;
  }
};
</script>
