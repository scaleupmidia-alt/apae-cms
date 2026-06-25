import type { CollectionConfig } from 'payload'

/**
 * Categorias de Notícias — gerenciáveis pela própria equipe (em vez de uma
 * lista fixa em código). Cada notícia aponta para uma categoria daqui.
 */
export const CategoriasNoticias: CollectionConfig = {
  slug: 'categorias-noticias',
  labels: {
    singular: 'Categoria de Notícia',
    plural: 'Categorias de Notícias',
  },
  admin: {
    useAsTitle: 'nome',
    group: 'Categorias',
    defaultColumns: ['nome'],
    description: 'Categorias que aparecem ao classificar uma notícia. Evite criar muitas parecidas.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'nome',
      label: 'Nome da categoria',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Ex.: Institucional, Eventos, Voluntariado.' },
    },
  ],
}
