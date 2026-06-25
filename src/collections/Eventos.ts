import type { CollectionConfig } from 'payload'

/**
 * Agenda (Eventos) — calendário institucional exibido na página Agenda do site.
 * Espelha o tipo `Evento` de src/data/eventos.ts, unificando eventos com data
 * e eventos recorrentes numa coleção só (distinguidos por `tipoData`).
 */
export const Eventos: CollectionConfig = {
  slug: 'eventos',
  labels: {
    singular: 'Evento',
    plural: 'Agenda',
  },
  admin: {
    useAsTitle: 'titulo',
    group: 'Conteúdo do site',
    defaultColumns: ['titulo', 'categoria', 'data', 'destaque'],
    description: 'Eventos da agenda. Inclui eventos com data marcada e eventos recorrentes (sem data fixa).',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título do evento',
      type: 'text',
      required: true,
    },
    {
      name: 'tipoData',
      label: 'Tipo de data',
      type: 'select',
      required: true,
      defaultValue: 'dia',
      options: [
        { label: 'Data exata', value: 'dia' },
        { label: 'Mês inteiro (dia a confirmar)', value: 'mes' },
        { label: 'Recorrente (sem data fixa)', value: 'recorrente' },
      ],
    },
    {
      name: 'data',
      label: 'Data do evento',
      type: 'date',
      admin: {
        description: 'Para "mês inteiro", escolha qualquer dia do mês (o dia será ignorado).',
        condition: (data) => data?.tipoData !== 'recorrente',
      },
    },
    {
      name: 'recorrencia',
      label: 'Quando se repete',
      type: 'text',
      admin: {
        description: 'Ex.: "Segunda a quinta-feira", "Mensal".',
        condition: (data) => data?.tipoData === 'recorrente',
      },
    },
    {
      name: 'dataExibicao',
      label: 'Texto da data (opcional)',
      type: 'text',
      admin: {
        description: 'Sobrescreve a data exibida. Ex.: "8 a 12 Jun 2026" para eventos de vários dias.',
      },
    },
    {
      name: 'categoria',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categorias-eventos',
      required: true,
      admin: { description: 'Define a cor do evento na agenda.' },
    },
    {
      name: 'local',
      label: 'Local e detalhes',
      type: 'text',
      required: true,
      admin: { description: 'Ex.: "Sede APAE Barueri · 9h às 12h".' },
    },
    {
      name: 'descricao',
      label: 'Descrição',
      type: 'textarea',
      required: true,
    },
    {
      name: 'destaque',
      label: 'Destacar este evento?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Eventos em destaque aparecem com mais ênfase na agenda.',
      },
    },
    {
      name: 'slug',
      label: 'Identificador',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Sem espaços nem acentos. Ex.: bazar-inverno-2026.',
      },
    },
  ],
}
