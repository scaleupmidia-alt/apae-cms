import type { CollectionConfig } from 'payload'

/**
 * Biblioteca de Imagens — armazenamento técnico de arquivos enviados ao painel.
 * Fica OCULTA da barra lateral (admin.hidden): a equipe envia fotos dentro dos
 * álbuns da Galeria e dentro da notícia (capa), sem precisar abrir esta tela.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagem',
    plural: 'Biblioteca de Imagens',
  },
  admin: {
    useAsTitle: 'alt',
    hidden: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo (acessibilidade)',
      type: 'text',
      required: true,
      admin: { description: 'Descreva a imagem para leitores de tela e SEO.' },
    },
  ],
  upload: true,
}
