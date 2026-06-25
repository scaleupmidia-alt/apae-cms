import type { CollectionConfig } from 'payload'

/**
 * Categorias da Agenda — gerenciáveis pela equipe. Cada categoria tem uma cor
 * (usada para colorir o evento na agenda do site), espelhando o CATEGORIAS_INFO
 * de src/data/eventos.ts.
 */
export const CategoriasEventos: CollectionConfig = {
  slug: 'categorias-eventos',
  labels: {
    singular: 'Categoria da Agenda',
    plural: 'Categorias da Agenda',
  },
  admin: {
    useAsTitle: 'nome',
    group: 'Categorias',
    defaultColumns: ['nome', 'cor'],
    description: 'Categorias dos eventos. A cor define como o evento aparece destacado na agenda.',
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
      admin: { description: 'Ex.: Celebração, Captação, Mobilização.' },
    },
    {
      name: 'cor',
      label: 'Cor (hexadecimal)',
      type: 'text',
      admin: { description: 'Ex.: #FFCC00 (amarelo), #005DAA (azul).' },
    },
  ],
}
