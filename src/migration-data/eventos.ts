/**
 * Calendário institucional 2026 da APAE Barueri.
 *
 * Fonte: Planejamento Estratégico 2026–2028, Slides 155 e 156
 * (Calendário Anual + Calendário de Fim de Ano).
 *
 * Convenção de datas:
 * - "AAAA-MM-DD"  → evento com data confirmada
 * - "AAAA-MM-00"  → evento existe no mês mas sem dia confirmado
 *                   (campanhas, eventos do mês inteiro, ou datas a confirmar
 *                   pela Comissão de Eventos da diretoria)
 *
 * Itens do calendário NÃO incluídos aqui (escopo público vs. interno):
 * - Reuniões de Diretoria e Conselho
 * - Implantações operacionais (5S, ISO, Comunicação Visual, Automação Fila,
 *   Prontuário Online, Banco de Dados, Bazar Online, Renovação Termo Fomento)
 * - Posse simbólica, sala de trabalho, mapeamento, políticas internas
 * - Feriados nacionais/civis/religiosos (Páscoa, Tiradentes, Carnaval, etc.)
 * - Festa de colaboradores (evento interno)
 */

export type CategoriaEvento =
  | "celebracao"
  | "captacao"
  | "mobilizacao"
  | "governanca"
  | "marco"
  | "comunidade";

export type Evento = {
  id: string;
  data: string;            // "AAAA-MM-DD" ou "AAAA-MM-00" (mês inteiro)
  titulo: string;
  local: string;
  descricao: string;
  categoria: CategoriaEvento;
  destaque?: boolean;
  recorrente?: string;
  /**
   * Override opcional do display da data para eventos multi-dia, exibido em
   * superfícies que mostram a data como texto curto (ex.: agenda do Hub de
   * Impacto em /noticias). Quando ausente, o consumidor formata a partir de `data`.
   * Exemplo: "8 a 12 Jun 2026".
   */
  dataExibicao?: string;
};

export const CATEGORIAS_INFO: Record<CategoriaEvento, { rotulo: string; cor: string; corClara: string }> = {
  celebracao:   { rotulo: "Celebração",          cor: "#FFCC00", corClara: "rgba(255,204,0,0.15)" },
  captacao:     { rotulo: "Captação",            cor: "#15803d", corClara: "rgba(21,128,61,0.10)" },
  mobilizacao:  { rotulo: "Mobilização",         cor: "#005DAA", corClara: "rgba(0,93,170,0.10)" },
  governanca:   { rotulo: "Governança",          cor: "#7c2d12", corClara: "rgba(124,45,18,0.10)" },
  marco:        { rotulo: "Marco institucional", cor: "#b45309", corClara: "rgba(180,83,9,0.10)" },
  comunidade:   { rotulo: "Comunidade",          cor: "#0e7490", corClara: "rgba(14,116,144,0.10)" },
};

export function isMesInteiro(data: string): boolean {
  return data.endsWith("-00");
}

/* ─── Eventos institucionais 2026 ────────────────────────────────────
   Calendário oficial — somente eventos com data confirmada pela presidência
   em 2026-05-12. Ordenados por data ascendente. */
export const EVENTOS_2026: Evento[] = [
  /* MAIO */
  {
    id: "feira-empreendedorismo-2026",
    data: "2026-05-04",
    titulo: "4ª Feira do Empreendedorismo",
    local: "Sede APAE Barueri · 4 a 7 de maio",
    descricao: "Quatro dias de feira voltada ao empreendedorismo inclusivo, com exposição de produtos, oficinas e protagonismo dos atendidos.",
    categoria: "captacao",
    destaque: true,
    dataExibicao: "4 a 7 Mai 2026",
  },

  /* JUNHO */
  {
    id: "bazar-inverno-2026",
    data: "2026-06-08",
    titulo: "Bazar de Inverno",
    local: "Sede APAE Barueri · Parque Viana · 8 a 12 de junho · 9h às 12h e 13h às 16h",
    descricao: "Cinco dias de Bazar de Inverno na sede da APAE Barueri — peças de qualidade a preços especiais. Sua compra sustenta os atendimentos a Pessoas com Deficiência.",
    categoria: "captacao",
    destaque: true,
    dataExibicao: "8 a 12 Jun 2026",
  },
  {
    id: "aniversario-apae",
    data: "2026-06-18",
    titulo: "30 Anos da APAE Barueri · Comemoração interna",
    local: "Sede APAE Barueri · evento interno",
    descricao: "Aniversário institucional comemorado internamente com equipes, atendidos e famílias — três décadas de atendimento gratuito a Pessoas com Deficiência em Barueri (1996–2026).",
    categoria: "marco",
    destaque: true,
  },
  {
    id: "festa-junina-2026",
    data: "2026-06-23",
    titulo: "Festa Junina",
    local: "Sede APAE Barueri · 23 e 25 de junho · 2 horários por dia",
    descricao: "Tradicional Festa Junina da APAE Barueri em duas datas, com dois horários por dia para acolher famílias, parceiros e a comunidade.",
    categoria: "celebracao",
    dataExibicao: "23 e 25 Jun 2026",
  },

  /* AGOSTO */
  {
    id: "festa-pastel-2026",
    data: "2026-08-15",
    titulo: "Festa do Pastel",
    local: "Sede APAE Barueri",
    descricao: "Tradicional Festa do Pastel — evento beneficente com receita destinada à manutenção dos atendimentos da APAE Barueri.",
    categoria: "captacao",
    destaque: true,
  },

  /* SETEMBRO */
  {
    id: "baile-30-primaveras",
    data: "2026-09-26",
    titulo: "Baile de 30 Primaveras",
    local: "Sede APAE Barueri",
    descricao: "Celebração pública dos 30 anos da APAE Barueri — noite festiva aberta à comunidade, parceiros e apoiadores.",
    categoria: "marco",
    destaque: true,
  },

  /* OUTUBRO */
  {
    id: "semana-especial-criancas-2026",
    data: "2026-10-19",
    titulo: "Semana Especial das Crianças",
    local: "Sede APAE Barueri · 19 a 22 de outubro",
    descricao: "Quatro dias de programação especial dedicada às crianças atendidas, com atividades lúdicas, recreativas e educativas.",
    categoria: "celebracao",
    dataExibicao: "19 a 22 Out 2026",
  },

  /* DEZEMBRO */
  {
    id: "festa-natal",
    data: "2026-12-12",
    titulo: "Festa de Natal para atendidos e famílias",
    local: "Exército Brasileiro · 20 GAC/L · 9h às 13h",
    descricao: "Tradicional festa de Natal em parceria com o Exército Brasileiro de Barueri.",
    categoria: "celebracao",
    destaque: true,
  },
];

/* ─── Eventos recorrentes (sem data fixa) ────────────────────────── */
export const EVENTOS_RECORRENTES: Evento[] = [
  {
    id: "bazar-permanente",
    data: "recorrente",
    titulo: "Bazar Permanente",
    local: "Sede APAE — Parque Viana",
    descricao: "Bazar funcionando o ano inteiro com itens doados. Toda arrecadação volta para a APAE.",
    categoria: "captacao",
    recorrente: "Segunda a quinta-feira",
  },
  {
    id: "encontros-familias",
    data: "recorrente",
    titulo: "Encontros com Famílias",
    local: "Sede APAE",
    descricao: "Reuniões mensais com famílias atendidas — orientação, acolhimento, fortalecimento de vínculos.",
    categoria: "comunidade",
    recorrente: "Mensal",
  },
];
