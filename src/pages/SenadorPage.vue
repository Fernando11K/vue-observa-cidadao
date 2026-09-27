<template>
  <q-page padding>
    <q-btn flat dense no-caps icon="arrow_back" label="Voltar" class="q-mb-md" @click="voltar" />

    <div v-if="carregando" class="column items-center q-pa-xl">
      <q-spinner-dots color="primary" size="48px" />
      <div class="text-grey-7 q-mt-sm">Consultando Senado Federal e TCU...</div>
    </div>

    <div v-else-if="!senador" class="text-center text-grey-7 q-pa-xl">
      <q-icon name="person_off" size="48px" />
      <div class="q-mt-sm">Senador não encontrado.</div>
    </div>

    <template v-else>
      <q-card flat bordered class="q-mb-md">
        <q-card-section class="row items-center q-col-gutter-md">
          <div class="col-auto">
            <FotoSenador :url="senador.urlFoto" :nome="senador.nomeParlamentar" tamanho="120px" />
          </div>
          <div class="col">
            <div class="text-h5 text-weight-bold">{{ senador.nomeParlamentar }}</div>
            <div class="text-body2 text-grey-7">{{ senador.nome }}</div>
            <div class="q-mt-sm q-gutter-xs">
              <q-badge v-if="senador.partidoAtual" color="primary" :label="senador.partidoAtual" />
              <q-badge v-if="senador.uf" outline color="primary" :label="senador.uf" />
            </div>
            <div class="text-body2 q-mt-sm">
              <div v-if="senador.idade">
                <q-icon name="cake" class="q-mr-xs" />{{ senador.idade }} anos (nascido em
                {{ formatarData(senador.dataNascimento) }})
              </div>
              <div v-if="senador.email">
                <q-icon name="mail" class="q-mr-xs" />
                <a :href="`mailto:${senador.email}`">{{ senador.email }}</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-auto">
            <BotaoAcompanhar :codigo-senador="senador.id" :nome="senador.nomeParlamentar" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-tabs v-model="aba" align="left" active-color="primary" indicator-color="primary" no-caps>
          <q-tab
            name="mandatos"
            icon="how_to_vote"
            :label="`Mandatos (${contar(senador.mandatos)})`"
          />
          <q-tab
            name="solicitacoes"
            icon="gavel"
            :label="`Solicitações ao TCU (${contar(senador.solicitacoesTcu)})`"
          />
          <q-tab
            name="contas"
            icon="report"
            :label="`Contas irregulares (${contar(senador.contasIrregularesTcu)})`"
          />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="aba" animated>
          <q-tab-panel name="mandatos">
            <FonteIndisponivel v-if="senador.mandatos === null" fonte="Senado Federal" />
            <ListaVazia v-else-if="!senador.mandatos.length" texto="Nenhum mandato encontrado." />
            <q-list v-else separator>
              <q-item v-for="(mandato, i) in senador.mandatos" :key="mandato.id ?? i">
                <q-item-section>
                  <q-item-label class="text-weight-bold">
                    {{ mandato.participacao ?? 'Mandato' }} — {{ mandato.uf }}
                  </q-item-label>
                  <q-item-label caption>
                    <span v-for="leg in mandato.legislaturas" :key="leg.numero ?? undefined">
                      {{ leg.numero }}ª legislatura ({{ formatarData(leg.dataInicio) }} a
                      {{ formatarData(leg.dataFim) }})&nbsp;
                    </span>
                  </q-item-label>
                  <q-item-label v-if="mandato.exercicios.length" caption>
                    Exercícios: {{ mandato.exercicios.map(descreverExercicio).join(' · ') }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="solicitacoes">
            <FonteIndisponivel v-if="senador.solicitacoesTcu === null" fonte="TCU" />
            <ListaVazia
              v-else-if="!senador.solicitacoesTcu.length"
              texto="Nenhuma solicitação ao TCU de autoria deste senador."
            />
            <q-list v-else separator>
              <q-item v-for="(s, i) in senador.solicitacoesTcu" :key="i">
                <q-item-section>
                  <q-item-label class="text-weight-bold">
                    {{ s.tipo }} nº {{ s.numero }} — aprovada em {{ formatarData(s.dataAprovacao) }}
                  </q-item-label>
                  <q-item-label>{{ s.assunto }}</q-item-label>
                  <q-item-label caption>Processo TCU: {{ s.processoTcu ?? '—' }}</q-item-label>
                </q-item-section>
                <q-item-section v-if="s.linkProposicao" side>
                  <q-btn flat round icon="open_in_new" :href="s.linkProposicao" target="_blank">
                    <q-tooltip>Ver proposição</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="contas">
            <q-banner dense class="bg-amber-1 text-grey-9 q-mb-md" rounded>
              <template #avatar>
                <q-icon name="info" color="warning" />
              </template>
              A busca é feita pelo nome completo, sem CPF. Registros podem ser de homônimos.
            </q-banner>
            <FonteIndisponivel v-if="senador.contasIrregularesTcu === null" fonte="TCU" />
            <ListaVazia
              v-else-if="!senador.contasIrregularesTcu.length"
              texto="Nenhum registro com este nome na lista de contas irregulares do TCU."
            />
            <q-list v-else separator>
              <q-item v-for="(c, i) in senador.contasIrregularesTcu" :key="i">
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >Processo {{ c.processo ?? '—' }}</q-item-label
                  >
                  <q-item-label>
                    {{ c.nome }} — {{ c.municipio ?? '—' }}/{{ c.uf ?? '—' }}
                  </q-item-label>
                  <q-item-label caption>
                    Acórdão {{ c.acordao ?? '—' }} · trânsito em julgado em
                    {{ formatarData(c.dataTransitoEmJulgado) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="row no-wrap">
                    <q-btn
                      v-if="c.linkDeliberacoes"
                      flat
                      round
                      icon="description"
                      :href="c.linkDeliberacoes"
                      target="_blank"
                    >
                      <q-tooltip>Deliberações</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="c.linkAcompanhamento"
                      flat
                      round
                      icon="open_in_new"
                      :href="c.linkAcompanhamento"
                      target="_blank"
                    >
                      <q-tooltip>Acompanhamento do processo</q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { buscarSenador } from '@/api/senadores';
import FonteIndisponivel from '@/components/common/FonteIndisponivel.vue';
import ListaVazia from '@/components/common/ListaVazia.vue';
import BotaoAcompanhar from '@/components/senador/BotaoAcompanhar.vue';
import FotoSenador from '@/components/senador/FotoSenador.vue';
import type { Exercicio, Senador } from '@/models/senador';
import { formatarData } from '@/utils/data-util';
import { mostrarErroApi } from '@/utils/erro-util';

const props = defineProps<{ codigo: number }>();
const router = useRouter();

const senador = ref<Senador | null>(null);
const carregando = ref(false);
const aba = ref('mandatos');

const contar = (lista: unknown[] | null) => (lista === null ? '?' : lista.length);

const descreverExercicio = (exercicio: Exercicio) => {
  const periodo = exercicio.dataFim
    ? `${formatarData(exercicio.dataInicio)} a ${formatarData(exercicio.dataFim)}`
    : `desde ${formatarData(exercicio.dataInicio)}`;
  return exercicio.causaAfastamento ? `${periodo} (${exercicio.causaAfastamento})` : periodo;
};

const voltar = () =>
  window.history.length > 1 ? router.back() : router.push({ name: 'senadores' });

const carregar = async () => {
  carregando.value = true;
  try {
    senador.value = await buscarSenador(props.codigo);
  } catch (erro) {
    senador.value = null;
    mostrarErroApi(erro);
  } finally {
    carregando.value = false;
  }
};

watch(() => props.codigo, carregar, { immediate: true });
</script>
