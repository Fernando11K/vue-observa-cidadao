<template>
  <q-card flat bordered class="senador-card full-height">
    <q-card-section
      class="row items-center no-wrap cursor-pointer"
      role="link"
      tabindex="0"
      @click="abrir"
      @keydown.enter="abrir"
    >
      <FotoSenador
        :url="senador.urlFoto"
        :nome="senador.nomeParlamentar"
        tamanho="72px"
        class="q-mr-md"
      />
      <div class="col texto">
        <div class="text-subtitle1 text-weight-bold ellipsis-2-lines">
          {{ senador.nomeParlamentar }}
        </div>
        <div class="text-caption text-grey-7 ellipsis">{{ senador.nome }}</div>
        <div class="q-mt-xs q-gutter-xs">
          <q-badge v-if="senador.partido" color="primary" :label="senador.partido" />
          <q-badge v-if="senador.uf" outline color="primary" :label="senador.uf" />
          <q-badge
            v-if="senador.sexo"
            outline
            :color="feminino ? 'pink' : 'blue'"
            :label="senador.sexo"
          >
            <q-icon :name="feminino ? 'female' : 'male'" class="q-ml-xs" />
          </q-badge>
          <q-badge v-if="suplente" outline color="orange-9" :label="senador.participacao ?? ''" />
          <q-badge v-if="senador.membroMesa" outline color="purple" label="Mesa Diretora" />
          <q-badge v-if="senador.membroLideranca" outline color="teal" label="Liderança" />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none text-caption text-grey-8">
      <div v-if="anoFimMandato" class="row items-center no-wrap">
        <q-icon name="event" class="q-mr-xs" />
        Mandato até {{ anoFimMandato }}
        <q-badge
          v-if="emDisputa"
          color="orange-9"
          class="q-ml-sm"
          :label="`Em disputa em ${anoFimMandato - 1}`"
        />
      </div>
      <div v-if="senador.bloco" class="row items-center no-wrap">
        <q-icon name="diversity_3" class="q-mr-xs" />
        <span class="ellipsis">{{ senador.bloco.replace('Bloco Parlamentar ', 'Bloco ') }}</span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="between">
      <q-btn flat dense no-caps color="primary" icon="visibility" label="Detalhes" @click="abrir" />
      <BotaoAcompanhar :codigo-senador="senador.codigo" :nome="senador.nomeParlamentar" dense />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BotaoAcompanhar from '@/components/senador/BotaoAcompanhar.vue';
import FotoSenador from '@/components/senador/FotoSenador.vue';
import type { SenadorResumo } from '@/models/senador';

const props = defineProps<{ senador: SenadorResumo }>();
const router = useRouter();

const feminino = computed(() => props.senador.sexo === 'Feminino');
const suplente = computed(() => props.senador.participacao?.includes('Suplente'));
const anoFimMandato = computed(() =>
  props.senador.fimMandato ? Number(props.senador.fimMandato.slice(0, 4)) : null,
);
const emDisputa = computed(
  () => anoFimMandato.value !== null && anoFimMandato.value - 1 === new Date().getFullYear(),
);

const abrir = () => router.push({ name: 'senador', params: { codigo: props.senador.codigo } });
</script>

<style scoped>
.senador-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.texto {
  min-width: 0;
}
.senador-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}
</style>
