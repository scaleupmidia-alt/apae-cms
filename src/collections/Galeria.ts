import type { CollectionConfig } from 'payload'

/**
 * Galeria — álbuns de fotos exibidos na página Galeria do site.
 * Espelha o álbum real do site (src/views/Galeria.tsx): { title, slug, cover, photos[] }.
 *
 * No painel, cada álbum é um documento; as fotos são uma lista ordenável
 * (arraste para reordenar), cada uma com sua legenda. As imagens são enviadas
 * aqui dentro — a "Biblioteca de Imagens" técnica fica oculta.
 */
export const Galeria: CollectionConfig = {
  slug: 'galeria',
  labels: {
    singular: 'Álbum de fotos',
    plural: 'Galeria',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo do site',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Álbuns de fotos da página Galeria. A capa (ou a 1ª foto) aparece no cartão do álbum.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      label: 'Título do álbum',
      type: 'text',
      required: true,
      admin: { description: 'Ex.: 30 Anos da APAE Barueri 2026.' },
    },
    {
      name: 'slug',
      label: 'Identificador (URL)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Usado no link da galeria. Sem espaços nem acentos. Ex.: aniversario-30-anos-2026.',
      },
    },
    {
      name: 'cover',
      label: 'Capa do álbum',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Imagem do cartão do álbum. Se vazia, usa a primeira foto.',
      },
    },
    {
      name: 'photos',
      label: 'Fotos',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Foto',
        plural: 'Fotos',
      },
      admin: {
        description: 'Arraste para reordenar. A ordem aqui é a ordem que aparece no site.',
      },
      fields: [
        {
          name: 'image',
          label: 'Arquivo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Legenda (opcional)',
          type: 'text',
          admin: { description: 'Descrição da foto (acessibilidade e legenda).' },
        },
      ],
    },
  ],
}
