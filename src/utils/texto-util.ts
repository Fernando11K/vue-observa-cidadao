export const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const contem = (texto: string, termo: string) =>
  normalizar(texto).includes(normalizar(termo));
