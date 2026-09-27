/** Formata uma data ISO (AAAA-MM-DD) como DD/MM/AAAA sem passar por fuso horário. */
const formatarData = (data: string | null | undefined): string => {
  if (!data) return '—';
  const [ano, mes, dia] = data.slice(0, 10).split('-');
  return `${dia}/${mes}/${ano}`;
};

/** Formata um DateTime ISO no horário local do navegador. */
const formatarDataHora = (dataHora: string | null | undefined): string => {
  if (!dataHora) return '—';
  return new Date(dataHora).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

export { formatarData, formatarDataHora };
