import type { CollectionConfig } from 'payload'

/**
 * Colecao "Noticias" do spike — espelha o tipo `Noticia` real do site
 * (apae-bright-future/src/data/noticias.ts) para validar que o painel
 * cobre todos os campos que hoje sao editados no codigo.
 *
 * Objetivo do spike: provar que um usuario comum consegue criar/editar/
 * publicar uma noticia pelo painel, em portugues, sem tocar em codigo.
 */
export const Noticias: CollectionConfig = {
  slug: 'noticias',
  labels: {
    singular: 'Notícia',
    plural: 'Notícias',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo do site',
    defaultColumns: ['title', 'category', 'date', '_status'],
    description: 'Artigos e notícias do site. Salve como rascunho e publique quando estiver pronto.',
  },
  // Controle de acesso: qualquer um le (o site consome); só usuario logado edita.
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  // Rascunho x Publicado (fluxo editorial).
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: 'Título (H1)',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      admin: {
        description: 'Parte final da URL, ex.: primeira-feira-das-nacoes-apae-barueri',
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categorias-noticias',
      required: true,
      admin: {
        description: 'Escolha uma categoria da lista (ou crie uma nova).',
        allowCreate: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          label: 'Data (exibição)',
          type: 'text',
          required: true,
          admin: { description: 'Texto curto, ex.: "Jun 2026"', width: '50%' },
        },
        {
          name: 'publishedTime',
          label: 'Data/hora ISO (SEO)',
          type: 'date',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'excerpt',
      label: 'Resumo (cards)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      label: 'Imagem de capa',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageAlt',
      label: 'Texto alternativo da capa',
      type: 'text',
      admin: { description: 'Descreve a capa para leitores de tela. Usa o título se vazio.' },
    },
    {
      name: 'imageCaption',
      label: 'Legenda da capa (opcional)',
      type: 'text',
      admin: { description: 'Ex.: "Imagem ilustrativa".' },
    },
    {
      name: 'ogImage',
      label: 'Imagem social (1200×630)',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Preview ao compartilhar no WhatsApp/redes. Usa a capa se vazio.' },
    },
    {
      name: 'body',
      label: 'Corpo do artigo',
      type: 'richText',
    },
    // ─── Galeria de rodapé do artigo (vínculo com um álbum) ───
    {
      name: 'galleryAlbum',
      label: 'Álbum de fotos (rodapé do artigo)',
      type: 'relationship',
      relationTo: 'galeria',
      admin: { description: 'Opcional. Vincula um álbum da Galeria ao final do artigo.' },
    },
    {
      name: 'galleryHeading',
      label: 'Título da galeria no artigo',
      type: 'text',
      admin: { description: 'Ex.: "Veja as fotos do evento".' },
    },
    // ─── Campos de SEO/extra (sidebar) ───
    {
      name: 'seoTitle',
      label: 'Título SEO',
      type: 'text',
      admin: { position: 'sidebar', description: 'Usa o título se vazio' },
    },
    {
      name: 'metaDescription',
      label: 'Meta description',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Usa o resumo se vazio' },
    },
    {
      name: 'readTime',
      label: 'Tempo de leitura',
      type: 'text',
      admin: { position: 'sidebar', description: 'Ex.: "4 min de leitura"' },
    },
  ],
}
