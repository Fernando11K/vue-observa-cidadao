<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h4" style="opacity: 0.6">Página não encontrada</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        :to="{ name: 'senadores' }"
        label="Voltar para o início"
        no-caps
      />
    </div>
  </div>
</template>
