/**
 * Fonte ÚNICA de notícias / artigos do site APAE Barueri.
 *
 * Todos os componentes que mostram notícias importam deste arquivo:
 *   - src/components/NewsSection.tsx        → bloco "Acontece na APAE" (home)
 *   - src/views/Noticias.tsx                → /noticias (Hub de Impacto)
 *   - src/views/NoticiaDetalhe.tsx          → /noticias/[id] (artigo)
 *
 * Ordem do array é a ordem de exibição (mais recente primeiro). Não criar
 * cópias paralelas em outros arquivos — quando precisar de outra view,
 * importar `NOTICIAS` daqui e filtrar/ordenar conforme necessário.
 */

/* ─── Estrutura de blocos editoriais ────────────────────────────────
   Padronização de copy: lead, h2, p, quote, list.
   Em qualquer texto, hiperlinks inline em markdown style: [texto](url). */
export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  // Galeria inline no corpo do artigo: grade de até 6 prévias + link para o
  // álbum completo em /galeria?album=<albumId>. Para a galeria no rodapé do
  // artigo, usar os campos galleryAlbumId/galleryPreview do tipo Noticia.
  | { type: "gallery"; albumId: string; preview: string[]; total: number; alt?: string };

export type Noticia = {
  id: string;
  title: string;           // título da página (H1)
  seoTitle?: string;       // título p/ <title>/og:title/twitter; usa `title` se ausente
  category: string;
  date: string;            // formato curto para listagens (ex: "Mai 2026")
  publishedTime?: string;  // ISO 8601 (ex: "2026-06-22T00:00:00-03:00") p/ article:published_time
  image: string;           // capa (hero + card)
  imageAlt?: string;       // texto alternativo da capa; usa `title` se ausente
  imageCaption?: string;   // legenda visível abaixo da capa (ex: imagem ilustrativa)
  ogImage?: string;        // imagem 1200x630 JPG p/ preview de link (WhatsApp/redes); usa `image` se ausente
  excerpt: string;         // resumo para cards
  metaDescription?: string;// meta description SEO/OG; usa `excerpt` se ausente
  readTime?: string;       // ex: "4 min de leitura"
  body: ArticleBlock[];
  galleryAlbumId?: string;
  galleryPreview?: string[];
  galleryTotal?: number;
  galleryHeading?: string;
};

// Previews das galerias (primeiras 6 fotos) — referenciados pelos artigos
const feiraEmpPreview = [
  "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0039.jpg",
  "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0047.jpg",
  "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0049.jpg",
  "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0051.jpg",
  "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0055.jpg",
  "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0056.jpg",
];
const noiteItalianaPreview = Array.from({ length: 6 }, (_, i) =>
  `/assets/GALERIA/noite-italiana-2024/${i + 1}.png`
);
const recursosNoiteItalianaPreview = Array.from({ length: 6 }, (_, i) =>
  `/assets/GALERIA/recursos-noite-italiana-2026/${i + 1}.jpg`
);

export const NOTICIAS: Noticia[] = [
  {
    id: "apae-barueri-ix-congresso-estadual-apaes",
    category: "Institucional",
    title: "APAE Barueri participa do IX Congresso Estadual das APAEs",
    excerpt: "Fagner Gouveia representou a APAE Barueri no congresso estadual, fortalecendo a troca de experiências e a atuação em rede.",
    metaDescription: "APAE Barueri participou do IX Congresso Estadual das APAEs, em Olímpia, ampliando conexões e referências para fortalecer seus atendimentos.",
    date: "25 Jun 2026",
    publishedTime: "2026-06-25T00:00:00-03:00",
    image: "/assets/ix-congresso-estadual-apaes-apae-barueri-capa.jpg",
    imageAlt: "Palco do IX Congresso Estadual das APAEs, em Olímpia, com o painel do evento ao fundo e participantes na plenária",
    ogImage: "/assets/ix-congresso-estadual-apaes-apae-barueri-og.jpg",
    readTime: "5 min de leitura",
    body: [
      { type: "lead", text: "Presença em Olímpia marcou a primeira participação da instituição em um congresso estadual da Rede APAE, ampliando conexões, referências e oportunidades de aprendizado." },

      { type: "p", text: "A [APAE Barueri](/quem-somos) participou do IX Congresso Estadual das APAEs, realizado em Olímpia, no interior de São Paulo." },
      { type: "p", text: "A instituição foi representada por seu presidente, Fagner Gouveia Bezerra, levando pela primeira vez o trabalho desenvolvido em Barueri para um espaço estadual de troca, conhecimento e articulação da Rede APAE." },
      { type: "p", text: "A participação representou um novo passo na ampliação da presença institucional da APAE Barueri e na construção de conexões capazes de contribuir para o aprimoramento dos serviços oferecidos às pessoas com deficiência e às suas famílias." },

      { type: "h2", text: "Conectar direitos para promover inclusão" },
      { type: "p", text: "O congresso foi estruturado como um espaço de debate, aprendizado e compartilhamento de experiências entre dirigentes, profissionais, pesquisadores, familiares, representantes do poder público e integrantes da sociedade civil." },
      { type: "p", text: "Com discussões relacionadas a áreas fundamentais para a atuação das APAEs, o encontro permitiu ampliar referências sobre atendimento, gestão, políticas públicas, inclusão e defesa de direitos." },
      { type: "p", text: "A programação proporcionou contato com experiências desenvolvidas por diferentes unidades da Rede APAE, fortalecendo o intercâmbio de conhecimentos e a identificação de práticas que podem inspirar avanços em outras cidades." },

      { type: "h2", text: "Barueri presente na Rede APAE paulista" },
      { type: "p", text: "A participação no congresso marcou a primeira vez em que o trabalho da APAE Barueri foi levado a um encontro estadual dessa dimensão." },
      { type: "p", text: "Esse movimento amplia a presença de Barueri na Rede APAE paulista e cria oportunidades para que a instituição compartilhe sua trajetória, conheça projetos desenvolvidos por outras unidades e estabeleça novas relações de cooperação." },
      { type: "p", text: "Ao participar desses espaços, a APAE Barueri não apenas apresenta o que vem realizando, mas também identifica referências que podem ser adaptadas às necessidades das pessoas atendidas e de suas famílias." },
      { type: "p", text: "A troca entre instituições contribui para reduzir o isolamento de boas iniciativas e permite que soluções bem-sucedidas em uma cidade possam inspirar avanços em outras localidades." },

      { type: "h2", text: "Conhecimento que retorna para os atendimentos" },
      { type: "p", text: "A participação em congressos e encontros técnicos ganha valor quando o conhecimento adquirido retorna para a rotina institucional." },
      { type: "p", text: "Durante o evento, os participantes tiveram contato com discussões relacionadas à inclusão, ao atendimento especializado, à gestão, às políticas públicas, aos direitos e ao fortalecimento das organizações do terceiro setor." },
      { type: "p", text: "Para a APAE Barueri, esse aprendizado poderá apoiar reflexões e futuras melhorias relacionadas a:" },
      { type: "list", items: [
        "qualidade dos serviços;",
        "relacionamento com as famílias;",
        "organização institucional;",
        "formação profissional;",
        "defesa de direitos;",
        "desenvolvimento de projetos;",
        "construção de parcerias;",
        "inovação nos atendimentos.",
      ] },
      { type: "p", text: "O objetivo é transformar as experiências compartilhadas no congresso em referências que contribuam para decisões, projetos e práticas aplicáveis à realidade de Barueri." },

      { type: "h2", text: "Uma construção realizada em parceria" },
      { type: "p", text: "A participação e o trabalho levado ao congresso contaram com a colaboração da diretora social da APAE Barueri, Lisiane Oliveira Monello, e de Ricardo Monello." },
      { type: "p", text: "A iniciativa também esteve conectada à atuação da FEAPAES-SP, do Grupo Audisa e da presidente da Federação, Cristiany de Castro, fortalecendo a aproximação entre gestão institucional, conhecimento técnico e articulação da Rede APAE." },
      { type: "p", text: "A construção conjunta demonstra a importância de reunir diferentes competências para ampliar a visibilidade do trabalho realizado e abrir novos caminhos para a instituição." },

      { type: "h2", text: "Registros da participação da APAE Barueri" },
      { type: "p", text: "Confira alguns dos registros da participação da APAE Barueri no IX Congresso Estadual das APAEs, realizado em Olímpia." },
      { type: "gallery", albumId: "ix-congresso-estadual-apaes-2026", total: 6, alt: "Registro da participação da APAE Barueri no IX Congresso Estadual das APAEs", preview: [
        "/assets/GALERIA/ix-congresso-estadual-apaes-2026/1.jpg",
        "/assets/GALERIA/ix-congresso-estadual-apaes-2026/2.jpg",
        "/assets/GALERIA/ix-congresso-estadual-apaes-2026/3.jpg",
        "/assets/GALERIA/ix-congresso-estadual-apaes-2026/4.jpg",
        "/assets/GALERIA/ix-congresso-estadual-apaes-2026/5.jpg",
        "/assets/GALERIA/ix-congresso-estadual-apaes-2026/6.jpg",
      ] },

      { type: "h2", text: "Networking com propósito" },
      { type: "p", text: "O networking promovido durante o congresso não se limita à troca de contatos." },
      { type: "p", text: "Ele possibilita conhecer profissionais, gestores, instituições e parceiros que enfrentam desafios semelhantes e trabalham em torno do mesmo propósito: ampliar oportunidades, qualidade de vida, autonomia e inclusão para as pessoas com deficiência." },
      { type: "p", text: "Essas conexões podem gerar:" },
      { type: "list", items: [
        "intercâmbio de experiências;",
        "apoio técnico;",
        "desenvolvimento de projetos conjuntos;",
        "acesso a novas referências;",
        "fortalecimento da governança;",
        "oportunidades de parceria;",
        "maior integração com a Rede APAE.",
      ] },
      { type: "p", text: "Para a APAE Barueri, ampliar essa rede significa aumentar a capacidade de aprender, colaborar e construir soluções com impacto direto nos atendimentos." },

      { type: "h2", text: "Um novo passo na trajetória institucional" },
      { type: "p", text: "A presença no IX Congresso Estadual das APAEs está alinhada ao objetivo da APAE Barueri de fortalecer sua atuação técnica, profissionalizar a gestão e ampliar sua rede de parceiros." },
      { type: "p", text: "Levar o trabalho da instituição para um encontro estadual representa reconhecimento da trajetória construída e, ao mesmo tempo, responsabilidade com os próximos passos." },
      { type: "p", text: "A APAE Barueri segue investindo em conhecimento, articulação e troca de experiências para que as melhores referências encontradas na Rede APAE possam contribuir com a realidade das pessoas atendidas e das famílias do município." },

      { type: "quote", text: "Participar, compartilhar e aprender também são formas de construir uma instituição cada ano melhor." },
    ],
  },

  {
    id: "primeira-feira-das-nacoes-apae-barueri",
    category: "Eventos e Inclusão",
    title: "1ª Feira das Nações da APAE Barueri celebra diversidade, convivência e participação",
    seoTitle: "1ª Feira das Nações da APAE Barueri celebra diversidade e inclusão",
    excerpt: "Após o sucesso da primeira edição, a Feira das Nações passa a integrar o calendário de atividades da APAE Barueri.",
    metaDescription: "A 1ª Feira das Nações da APAE Barueri promoveu diversidade, convivência e participação e passa a integrar o calendário da instituição.",
    date: "25 Jun 2026",
    publishedTime: "2026-06-25T00:00:00-03:00",
    image: "/assets/feira-das-nacoes-apae-barueri-capa-v2.jpg",
    imageAlt: "Painel da 1ª Feira das Nações da APAE Barueri com bandeiras de vários países, balões e o mascote Apaezito",
    ogImage: "/assets/feira-das-nacoes-apae-barueri-og-v2.jpg",
    readTime: "5 min de leitura",
    body: [
      { type: "lead", text: "Sucesso da primeira edição garantiu a continuidade do evento, que passa a integrar o calendário de atividades da instituição." },

      { type: "p", text: "A [APAE Barueri](/quem-somos) realizou a primeira edição da Feira das Nações, uma iniciativa criada para promover convivência, participação e contato com diferentes referências culturais dentro da comunidade APAEana." },
      { type: "p", text: "O evento reuniu pessoas atendidas, famílias, profissionais e demais participantes em uma atividade marcada pela interação, pelo envolvimento e pela valorização da diversidade." },
      { type: "p", text: "Mais do que uma ação pontual, a Feira das Nações proporcionou um espaço de encontro, descoberta e troca entre as pessoas que fazem parte da rotina da instituição." },
      { type: "p", text: "O resultado positivo da primeira edição levou a APAE Barueri a confirmar a continuidade da iniciativa." },

      { type: "quote", text: "A Feira das Nações foi um sucesso e, a partir de agora, passa a integrar o nosso calendário de atividades. No próximo ano, teremos a segunda Feira das Nações." },

      { type: "h2", text: "Uma primeira edição que já se tornou tradição" },
      { type: "p", text: "A realização da primeira Feira das Nações representou a criação de uma nova experiência no calendário da APAE Barueri." },
      { type: "p", text: "O envolvimento observado durante a atividade demonstrou o potencial do evento para aproximar pessoas, estimular a participação e oferecer novas oportunidades de convivência." },
      { type: "p", text: "Ao confirmar uma segunda edição para o próximo ano, a instituição transforma o sucesso da primeira experiência em compromisso de continuidade." },
      { type: "p", text: "A Feira das Nações passa, assim, a fazer parte das ações que poderão ser aperfeiçoadas e ampliadas a cada nova edição." },

      { type: "h2", text: "Diversidade cultural como oportunidade de aprendizagem" },
      { type: "p", text: "Conhecer diferentes culturas contribui para ampliar o repertório, despertar a curiosidade e desenvolver uma compreensão mais aberta sobre o mundo." },
      { type: "p", text: "Dentro da proposta da Feira das Nações, a diversidade cultural torna-se uma oportunidade de aprendizagem, expressão e convivência." },
      { type: "p", text: "Cada referência apresentada durante a atividade contribui para demonstrar que existem diferentes modos de viver, celebrar, criar, comunicar e compartilhar histórias." },
      { type: "p", text: "Esse contato ajuda a fortalecer valores como:" },
      { type: "list", items: [
        "respeito;",
        "curiosidade;",
        "cooperação;",
        "acolhimento;",
        "valorização das diferenças;",
        "participação coletiva.",
      ] },
      { type: "p", text: "A atividade também reforça que aprender pode acontecer de maneira leve, participativa e conectada às experiências do cotidiano." },

      { type: "h2", text: "Um evento construído com participação" },
      { type: "p", text: "O sucesso de uma atividade institucional depende do envolvimento das pessoas que ajudam a transformá-la em realidade." },
      { type: "p", text: "A Feira das Nações foi marcada pela participação e pela colaboração, reunindo diferentes integrantes da comunidade APAEana em torno de uma proposta comum." },
      { type: "p", text: "A construção coletiva fortalece o sentimento de pertencimento e permite que pessoas atendidas, famílias e profissionais não sejam apenas espectadores, mas participantes ativos das experiências promovidas pela instituição." },
      { type: "p", text: "Esse envolvimento também contribui para criar vínculos, compartilhar responsabilidades e valorizar as habilidades de cada pessoa." },

      { type: "h2", text: "Registros da 1ª Feira das Nações" },
      { type: "p", text: "Confira alguns dos momentos registrados durante a primeira edição da Feira das Nações da APAE Barueri." },
      { type: "gallery", albumId: "feira-das-nacoes-2026", total: 33, alt: "Registro da 1ª Feira das Nações da APAE Barueri", preview: [
        "/assets/GALERIA/feira-das-nacoes-2026/33.jpg",
        "/assets/GALERIA/feira-das-nacoes-2026/1.jpg",
        "/assets/GALERIA/feira-das-nacoes-2026/2.jpg",
        "/assets/GALERIA/feira-das-nacoes-2026/3.jpg",
        "/assets/GALERIA/feira-das-nacoes-2026/4.jpg",
        "/assets/GALERIA/feira-das-nacoes-2026/5.jpg",
      ] },

      { type: "h2", text: "Convivência que fortalece vínculos" },
      { type: "p", text: "Eventos como a Feira das Nações ampliam as possibilidades de convivência para além das atividades habituais." },
      { type: "p", text: "Eles criam momentos em que as pessoas podem conversar, observar, experimentar, colaborar e compartilhar experiências em um ambiente diferente." },
      { type: "p", text: "Para as pessoas atendidas, essas vivências podem contribuir para o desenvolvimento da comunicação, da autonomia, da interação social e da participação em grupo." },
      { type: "p", text: "Para as famílias, representam novas oportunidades de presença, aproximação e construção de memórias junto à instituição." },
      { type: "p", text: "Para os profissionais, são momentos que permitem observar interesses, habilidades e formas de participação que podem aparecer de maneira diferente em atividades coletivas." },

      { type: "h2", text: "Cultura, inclusão e pertencimento" },
      { type: "p", text: "A diversidade é um elemento essencial de uma sociedade inclusiva." },
      { type: "p", text: "Celebrar diferentes culturas também significa reconhecer que cada pessoa carrega experiências, histórias, características e formas próprias de compreender o mundo." },
      { type: "p", text: "A Feira das Nações reforça essa mensagem ao criar um ambiente no qual a diversidade pode ser conhecida e valorizada por meio da participação." },
      { type: "p", text: "Na APAE Barueri, inclusão significa não apenas oferecer atendimento, mas também criar oportunidades para que as pessoas com deficiência ocupem espaços, façam escolhas, compartilhem experiências e participem ativamente da vida institucional e comunitária." },

      { type: "h2", text: "Um novo encontro já começa a ser preparado" },
      { type: "p", text: "O sucesso da primeira edição marcou o início de uma nova atividade permanente na APAE Barueri." },
      { type: "p", text: "A confirmação da segunda Feira das Nações representa a continuidade de uma iniciativa que poderá crescer, incorporar novas experiências e envolver ainda mais pessoas nos próximos anos." },
      { type: "p", text: "A APAE Barueri agradece às pessoas atendidas, famílias, profissionais e a todos que colaboraram para a realização da primeira edição." },
      { type: "p", text: "Cada participação ajudou a transformar a Feira das Nações em um momento especial de convivência, diversidade e inclusão." },

      { type: "quote", text: "A primeira edição foi um sucesso. Agora, a Feira das Nações passa a fazer parte da história e do calendário da APAE Barueri." },
    ],
  },

  {
    id: "atendidos-apae-barueri-experiencia-drift",
    category: "Inclusão e Experiências",
    title: "Atendidos da APAE Barueri vivenciam experiência especial no universo do drift",
    seoTitle: "Atendidos da APAE Barueri participam de experiência de drift",
    excerpt: "Ação com o piloto Zaydon Morioka aproximou pessoas atendidas pela APAE Barueri do automobilismo e proporcionou um momento especial de descoberta e inclusão.",
    metaDescription: "Atendidos da APAE Barueri conheceram de perto o universo do drift em uma experiência de inclusão, convivência, emoção e descoberta.",
    date: "22 Jun 2026",
    publishedTime: "2026-06-22T00:00:00-03:00",
    image: "/assets/drift-apae-barueri.jpg",
    imageAlt: "Carro preparado para drift durante evento automobilístico com público ao redor",
    imageCaption: "Imagem ilustrativa do universo do drift.",
    ogImage: "/assets/drift-apae-barueri-og.jpg",
    readTime: "4 min de leitura",
    body: [
      { type: "lead", text: "Ação realizada em junho aproximou pessoas atendidas do automobilismo em um momento marcado por emoção, convivência, descoberta e inclusão." },

      { type: "p", text: "O som dos motores, os carros preparados e a atmosfera do automobilismo transformaram o dia em uma experiência diferente para pessoas atendidas pela [APAE Barueri](/quem-somos)." },
      { type: "p", text: "Durante uma ação especial realizada em junho de 2026, os participantes tiveram a oportunidade de conhecer de perto o universo do drift, modalidade automobilística que combina técnica, precisão e controle do veículo." },
      { type: "p", text: "A iniciativa contou com a participação do piloto Zaydon Morioka e proporcionou um momento de descoberta, interação e contato com um ambiente que, para muitos participantes, ainda era novo." },
      { type: "p", text: "Mais do que acompanhar uma experiência automobilística, a atividade representou a oportunidade de ocupar novos espaços, vivenciar outras experiências e construir memórias fora da rotina habitual de atendimentos." },

      { type: "h2", text: "Uma experiência fora da rotina" },
      { type: "p", text: "A programação permitiu que as pessoas atendidas conhecessem os carros, observassem aspectos do ambiente automobilístico e acompanhassem de perto a dinâmica do drift." },
      { type: "p", text: "Os motores, os veículos e toda a atmosfera da ação despertaram curiosidade e tornaram a atividade um momento de grande envolvimento." },
      { type: "p", text: "Experiências como essa ampliam o repertório dos participantes e favorecem o contato com diferentes ambientes, práticas esportivas, profissões e formas de expressão." },
      { type: "p", text: "Cada reação, sorriso e demonstração de entusiasmo ajudou a transformar a ação em uma lembrança especial para todos os envolvidos." },

      { type: "h2", text: "Inclusão também significa acesso a novas experiências" },
      { type: "p", text: "Promover inclusão não se limita à presença da pessoa com deficiência em um determinado espaço." },
      { type: "p", text: "Inclusão também significa garantir oportunidades reais de participação, convivência, descoberta e pertencimento." },
      { type: "p", text: "Ao aproximar as pessoas atendidas do universo do automobilismo, a atividade possibilitou o acesso a uma experiência que normalmente não faz parte de sua rotina." },
      { type: "p", text: "Esse contato contribui para ampliar referências, despertar novos interesses e mostrar que os espaços de esporte, cultura, lazer e entretenimento também devem estar preparados para receber pessoas com deficiência." },
      { type: "p", text: "A presença dos participantes da APAE Barueri reforçou uma mensagem importante: novas experiências devem ser acessíveis a todos." },

      { type: "h2", text: "Encontro com o piloto Zaydon Morioka" },
      { type: "p", text: "A participação do piloto Zaydon Morioka foi um dos elementos centrais da ação." },
      { type: "p", text: "Além de sua atuação no drift, o encontro proporcionou proximidade, troca e uma nova referência para as pessoas atendidas." },
      { type: "p", text: "O contato com um piloto e com o ambiente do automobilismo ajudou a tornar a experiência mais humana e acolhedora, aproximando um universo que muitas vezes é conhecido apenas pela televisão ou pelas redes sociais." },
      { type: "p", text: "A disposição em receber os participantes e compartilhar esse momento demonstrou como o esporte pode ser utilizado para criar vínculos e promover experiências positivas." },

      { type: "h2", text: "Esporte, convivência e desenvolvimento" },
      { type: "p", text: "Atividades realizadas fora do ambiente habitual da instituição podem contribuir de diferentes maneiras para o desenvolvimento e para a qualidade de vida das pessoas atendidas." },
      { type: "p", text: "Elas podem estimular:" },
      { type: "list", items: [
        "curiosidade;",
        "interação social;",
        "comunicação;",
        "percepção do ambiente;",
        "expressão de emoções;",
        "autonomia;",
        "construção de novas referências;",
        "sentimento de pertencimento.",
      ] },
      { type: "p", text: "Esses momentos também fortalecem a convivência entre participantes, profissionais e parceiros, criando oportunidades de aprendizado que vão além das atividades terapêuticas." },
      { type: "p", text: "O valor da experiência está não apenas na ação em si, mas também nas emoções, conversas e lembranças que permanecem depois dela." },

      { type: "h2", text: "Parcerias que abrem novos caminhos" },
      { type: "p", text: "A realização de ações como essa depende da aproximação entre a instituição e pessoas dispostas a compartilhar tempo, conhecimento, estrutura e oportunidades." },
      { type: "p", text: "Quando parceiros abrem seus espaços e atividades para a participação das pessoas atendidas, contribuem para ampliar as possibilidades de inclusão e convivência na comunidade." },
      { type: "p", text: "Essas parcerias ajudam a transformar experiências que poderiam parecer distantes em momentos possíveis, acessíveis e significativos." },
      { type: "p", text: "A APAE Barueri acredita que a inclusão é construída quando diferentes setores da sociedade compreendem seu papel e criam oportunidades concretas de participação." },

      { type: "h2", text: "Uma lembrança marcada pela emoção" },
      { type: "p", text: "A experiência no universo do drift deixou registros de entusiasmo, descoberta e alegria." },
      { type: "p", text: "Para os participantes, foi uma oportunidade de sair da rotina, conhecer uma modalidade esportiva diferente e vivenciar de perto a atmosfera do automobilismo." },
      { type: "p", text: "Para a instituição, a ação reforçou a importância de criar experiências que promovam desenvolvimento, convivência e acesso a novos espaços." },
      { type: "p", text: "A APAE Barueri agradece ao piloto Zaydon Morioka, aos organizadores, parceiros, profissionais e a todas as pessoas que contribuíram para tornar esse momento possível." },

      { type: "quote", text: "Quando novas portas são abertas, a inclusão deixa de ser apenas uma ideia e passa a ser uma experiência vivida." },
    ],
  },

  {
    id: "apae-barueri-celebra-30-anos",
    category: "Institucional",
    title: "APAE Barueri celebra 30 anos ao lado de atendidos e famílias",
    excerpt: "A APAE Barueri celebrou três décadas de história com atendidos, famílias e profissionais em dois momentos realizados na sede da instituição.",
    metaDescription: "APAE Barueri celebrou 30 anos em 18 de junho de 2026, com bolo, atendidos e famílias reunidos nos períodos da manhã e da tarde.",
    date: "19 Jun 2026",
    publishedTime: "2026-06-19T00:00:00-03:00",
    image: "/assets/30-anos-apae-capa.png",
    imageAlt: "Comemoração dos 30 anos da APAE Barueri com pessoas atendidas, famílias e equipe da instituição",
    ogImage: "/assets/30-anos-apae-og.jpg",
    readTime: "5 min de leitura",
    body: [
      { type: "lead", text: "Comemoração realizada em 18 de junho reuniu a comunidade APAEana nos períodos da manhã e da tarde para celebrar três décadas de cuidado, inclusão e transformação." },

      { type: "p", text: "O dia 18 de junho de 2026 marcou um momento especial na história da [APAE Barueri](/quem-somos). Exatamente na data em que completou 30 anos, a instituição reuniu pessoas atendidas, famílias e profissionais para celebrar uma trajetória construída coletivamente desde 1996." },
      { type: "p", text: "A comemoração aconteceu na sede da APAE Barueri e foi realizada em dois momentos, contemplando os públicos dos períodos da manhã e da tarde." },
      { type: "p", text: "Em cada período, o aniversário foi celebrado com bolo e com a participação das famílias e das pessoas atendidas, em um ambiente de acolhimento, alegria e reconhecimento por tudo o que foi construído ao longo dessas três décadas." },

      { type: "h2", text: "Uma celebração feita com quem participa dessa história" },
      { type: "p", text: "Mais do que marcar uma data no calendário, a comemoração buscou dividir esse momento com as pessoas que fazem parte da vida diária da instituição." },
      { type: "p", text: "Famílias, pessoas atendidas e profissionais estiveram juntos para celebrar não apenas os anos de existência da APAE Barueri, mas também os vínculos, os aprendizados e as histórias que se formaram ao longo dessa caminhada." },
      { type: "p", text: "A realização da celebração nos períodos da manhã e da tarde permitiu que diferentes grupos participassem desse momento, reforçando que o aniversário pertence a toda a comunidade APAEana." },
      { type: "p", text: "O corte do bolo simbolizou a chegada aos 30 anos, mas também representou a união de muitas pessoas em torno de um propósito comum: promover cuidado, desenvolvimento, qualidade de vida, inclusão social e respeito às pessoas com deficiência." },

      { type: "h2", text: "Uma história iniciada em 1996" },
      { type: "p", text: "A história da APAE Barueri começou em 1996, a partir da mobilização de famílias e profissionais que identificaram a necessidade de criar, no município, um espaço de acolhimento e atendimento especializado às pessoas com deficiência." },
      { type: "p", text: "Desde os primeiros atendimentos, a instituição passou por diferentes etapas de crescimento e ampliação." },
      { type: "p", text: "Em 1997, o trabalho ganhou mais espaço e novos atendimentos terapêuticos foram incorporados. No ano seguinte, uma nova estrutura foi projetada para ampliar o trabalho realizado por uma equipe multidisciplinar em parceria com as famílias." },
      { type: "p", text: "Outro marco importante ocorreu em 2012, quando a APAE Barueri passou a desenvolver suas atividades na sede localizada no Parque Viana, preparada para receber pessoas atendidas e familiares em diferentes serviços, ambientes e atividades." },
      { type: "p", text: "Ao chegar a 2026, a instituição completa três décadas mantendo viva a essência que motivou sua criação: construir oportunidades para as pessoas com deficiência e caminhar ao lado de suas famílias." },

      { type: "h2", text: "Três décadas construídas por muitas mãos" },
      { type: "p", text: "A trajetória da APAE Barueri não foi construída por uma única pessoa ou por uma única gestão." },
      { type: "p", text: "Ela é resultado da participação de famílias, pessoas atendidas, profissionais, voluntários, diretorias, parceiros, apoiadores, representantes do poder público e integrantes da comunidade que, em diferentes momentos, contribuíram para a continuidade da instituição." },
      { type: "p", text: "Cada atendimento realizado, cada família acolhida, cada profissional que compartilhou seu conhecimento, cada voluntário que ofereceu seu tempo e cada parceiro que apoiou um projeto ajudaram a formar essa história." },
      { type: "p", text: "Celebrar os 30 anos é, portanto, reconhecer todas essas contribuições e preservar a memória de quem participou da construção da APAE Barueri desde seus primeiros passos." },

      { type: "h2", text: "A família como parte central da trajetória" },
      { type: "p", text: "Desde sua origem, a relação com as famílias ocupa um lugar essencial no trabalho da APAE Barueri." },
      { type: "p", text: "O atendimento não se limita às atividades desenvolvidas com a pessoa com deficiência. Ele também envolve acolhimento, orientação, fortalecimento de vínculos, escuta e participação familiar." },
      { type: "p", text: "Por isso, comemorar o aniversário junto às famílias e às pessoas atendidas tornou o momento ainda mais significativo." },
      { type: "p", text: "A celebração realizada no dia 18 mostrou, de maneira simples e verdadeira, que a história institucional também é formada pelas experiências vividas diariamente dentro da APAE: os encontros, as conquistas, os desafios superados e os vínculos construídos ao longo do tempo." },

      { type: "h2", text: "30 Primaveras: memória, presente e futuro" },
      { type: "p", text: "A identidade “30 Primaveras — 1996–2026” representa o amadurecimento de uma instituição que preserva sua história enquanto se prepara para novos desafios." },
      { type: "p", text: "Chegar aos 30 anos é reconhecer tudo o que já foi realizado, mas também renovar o compromisso com o futuro." },
      { type: "p", text: "A APAE Barueri inicia esse novo capítulo buscando aprimorar seus serviços, fortalecer sua atuação técnica, ampliar o relacionamento com as famílias, desenvolver novos projetos, investir em inovação e consolidar parcerias que contribuam para a continuidade dos atendimentos." },
      { type: "p", text: "O objetivo é avançar sem perder a essência: acolher com respeito, atuar com responsabilidade e construir oportunidades para as pessoas com deficiência." },

      { type: "h2", text: "Registros da celebração de 30 anos" },
      { type: "p", text: "Confira alguns dos momentos das comemorações dos 30 anos da APAE Barueri, celebrados com bolo, famílias e pessoas atendidas." },
      { type: "gallery", albumId: "aniversario-30-anos-2026", total: 30, alt: "Registro da celebração de 30 anos da APAE Barueri", preview: [
        "/assets/GALERIA/aniversario-30-anos-2026/1.jpg",
        "/assets/GALERIA/aniversario-30-anos-2026/2.jpg",
        "/assets/GALERIA/aniversario-30-anos-2026/3.jpg",
        "/assets/GALERIA/aniversario-30-anos-2026/4.jpg",
        "/assets/GALERIA/aniversario-30-anos-2026/5.jpg",
        "/assets/GALERIA/aniversario-30-anos-2026/6.jpg",
      ] },

      { type: "h2", text: "Um aniversário que pertence a todos" },
      { type: "p", text: "A APAE Barueri agradece às famílias e às pessoas atendidas que participaram das comemorações nos períodos da manhã e da tarde, assim como aos profissionais e a todas as pessoas envolvidas na organização desse momento." },
      { type: "p", text: "O aniversário de 30 anos pertence a cada pessoa que passou pela instituição, deixou sua contribuição e ajudou a transformar a APAE Barueri no que ela representa atualmente." },
      { type: "p", text: "São três décadas de histórias, vínculos, aprendizados e compromisso com a inclusão." },

      { type: "quote", text: "30 anos da APAE Barueri. Uma história construída por muitas mãos e que continua sendo escrita todos os dias." },
    ],
  },

  {
    id: "recursos-noite-italiana-ziclague-fisioterapia-aquatica",
    category: "Impacto e Resultados",
    title: "Solidariedade que se transforma em cuidado: recursos da Noite Italiana fortalecem atendimentos da APAE Barueri",
    excerpt: "A arrecadação da Noite Italiana possibilitou a compra do medicamento Ziclague® e de novos materiais para os atendimentos de Fisioterapia Aquática da Etapa Semear.",
    date: "Jun 2026",
    image: "/assets/recursos-noite-italiana-capa.jpg",
    ogImage: "/assets/recursos-noite-italiana-og.jpg",
    readTime: "4 min de leitura",
    body: [
      { type: "lead", text: "A mobilização de recursos só se completa quando a contribuição da comunidade se transforma em benefícios concretos para as pessoas atendidas. Foi com esse propósito que a [APAE Barueri](/quem-somos) realizou a entrega simbólica dos recursos adquiridos com a arrecadação da [Noite Italiana Beneficente](/noticias/noite-italiana), evento que reuniu famílias, parceiros, apoiadores e representantes da comunidade em uma grande corrente de solidariedade." },
      { type: "p", text: "Ao todo, a iniciativa arrecadou R$ 22.750, valor integralmente revertido para o fortalecimento dos atendimentos oferecidos pela instituição." },

      { type: "h2", text: "R$ 11 mil destinados à aquisição do Ziclague®" },
      { type: "p", text: "Dos recursos arrecadados, R$ 11 mil foram destinados à compra do medicamento Ziclague®, que será utilizado como recurso complementar nos atendimentos terapêuticos, sempre de acordo com a avaliação, indicação e acompanhamento da equipe técnica da APAE Barueri." },
      { type: "p", text: "O Ziclague® é um medicamento fitoterápico de uso tópico, produzido a partir do óleo essencial da planta Alpinia zerumbet. É indicado como tratamento coadjuvante em quadros de espasticidade muscular, condição caracterizada pelo aumento involuntário do tônus muscular." },
      { type: "p", text: "No contexto terapêutico, sua utilização pode auxiliar na redução do tônus muscular e favorecer o posicionamento, a mobilidade e a realização dos exercícios conduzidos pelos profissionais." },
      { type: "p", text: "A aquisição foi planejada para contribuir com a continuidade dos atendimentos ao longo de aproximadamente um ano, reduzindo o impacto do custo elevado do medicamento para as famílias e ampliando o acesso das crianças que possuem indicação técnica para sua utilização." },

      { type: "h2", text: "Projeto construído a partir das necessidades dos atendidos" },
      { type: "p", text: "A proposta nasceu da identificação de uma necessidade real dos atendimentos e foi construída de forma conjunta por profissionais e lideranças da instituição." },
      { type: "p", text: "O projeto contou com a participação de Sabrina, Kelly e Oscar, além do acompanhamento da Coordenação Técnica, representada por Eneida e Patrícia." },
      { type: "p", text: "A articulação entre equipe técnica, gestão e mobilização de recursos permitiu transformar uma demanda terapêutica em um projeto estruturado, apresentado à comunidade e efetivamente viabilizado por meio da Noite Italiana." },
      { type: "p", text: "Mais do que adquirir um medicamento, a iniciativa busca oferecer melhores condições para o desenvolvimento das crianças atendidas, respeitando suas necessidades individuais e fortalecendo os planos terapêuticos realizados pela instituição." },

      { type: "h2", text: "Novos materiais para a Fisioterapia Aquática" },
      { type: "p", text: "O saldo restante da arrecadação também foi aplicado na aquisição de materiais e equipamentos para a Fisioterapia Aquática da Etapa Semear." },
      { type: "p", text: "A Fisioterapia Aquática atende crianças de diferentes etapas da APAE Barueri que apresentam demandas motoras e são encaminhadas após avaliação da equipe técnica." },
      { type: "p", text: "No ambiente aquático, os profissionais podem trabalhar aspectos como mobilidade, equilíbrio, fortalecimento muscular, posicionamento corporal, amplitude dos movimentos e participação nas atividades funcionais." },
      { type: "p", text: "Os novos materiais ampliarão as possibilidades de exercícios e intervenções realizadas durante as sessões, proporcionando mais recursos para o desenvolvimento dos membros inferiores e para a execução de atividades adaptadas às necessidades de cada criança." },

      { type: "h2", text: "Prestação de contas que aproxima a comunidade" },
      { type: "p", text: "A aplicação dos recursos demonstra, de maneira concreta, como a participação da comunidade contribui para a continuidade e o aprimoramento dos serviços da APAE Barueri." },
      { type: "p", text: "Cada ingresso adquirido, cada parceria, cada doação e cada pessoa presente na Noite Italiana ajudaram a transformar o evento em medicamentos, equipamentos e novas possibilidades de atendimento." },
      { type: "p", text: "A iniciativa também reforça a importância da [transparência](/transparencia) na mobilização de recursos. Apresentar o resultado da arrecadação e mostrar onde os valores foram aplicados fortalece a confiança entre a instituição, as famílias, os parceiros e toda a sociedade." },
      { type: "p", text: "A Noite Italiana tornou-se um marco de união, participação e compromisso com a causa da pessoa com deficiência." },

      { type: "h2", text: "Um resultado construído por muitas mãos" },
      { type: "p", text: "A APAE Barueri agradece às famílias, aos voluntários, aos profissionais, aos parceiros, à diretoria e a todas as pessoas que contribuíram para a realização do evento." },
      { type: "p", text: "O resultado alcançado mostra que, quando pessoas comprometidas se unem em torno de um mesmo propósito, a solidariedade deixa de ser apenas uma intenção e se transforma em cuidado, desenvolvimento e qualidade de vida. A todos que fizeram parte dessa história, o nosso muito obrigado." },

      { type: "quote", text: "Cada contribuição se transformou em atendimento. Cada gesto se transformou em oportunidade." },
    ],
    galleryAlbumId: "recursos-noite-italiana-2026",
    galleryPreview: recursosNoiteItalianaPreview,
    galleryTotal: 112,
    galleryHeading: "Momentos da entrega",
  },

  {
    id: "feira-empreendedorismo-ia",
    category: "Inovação",
    title: "4ª Feira do Empreendedorismo da APAE Barueri destaca inovação, criatividade e inteligência artificial",
    excerpt: "Iniciativa valoriza o protagonismo dos atendidos e aproxima tecnologia, aprendizagem e inclusão em uma experiência prática dentro da instituição.",
    date: "Mai 2026",
    image: "/assets/GALERIA/feira-empreendedorismo-2026/IMG-20260512-WA0039.jpg",
    readTime: "4 min de leitura",
    body: [
      { type: "lead", text: "A Feira do Empreendedorismo da [APAE Barueri](/quem-somos) se consolida, a cada edição, como um espaço de aprendizagem prática, criatividade e desenvolvimento. Mais do que uma exposição, a iniciativa coloca os [atendidos](/atuacao#saude) no centro da experiência: são eles que apresentam suas ideias, mostram seus produtos e participam diretamente das atividades." },

      { type: "h2", text: "Protagonismo, autoria e autonomia" },
      { type: "p", text: "O ambiente da Feira é pensado para valorizar autoria, autonomia e protagonismo. A pessoa atendida não é coadjuvante: ela apresenta seu trabalho, conduz sua narrativa e ocupa o espaço com voz própria." },
      { type: "p", text: "Nesta edição, ganha destaque a aproximação com a inteligência artificial e com novas formas de criação. A proposta não é substituir o trabalho dos atendidos por tecnologia, mas oferecer ferramentas de apoio, inspiração e experimentação — recursos que ajudam a organizar ideias, planejar produtos, ampliar repertório visual e estimular a comunicação." },

      { type: "h2", text: "Inteligência artificial como aliada, não substituta" },
      { type: "p", text: "A inteligência artificial, dentro da APAE Barueri, é tratada com responsabilidade. Ela aparece como aliada de educadores, terapeutas e atendidos, sempre acompanhada do olhar técnico das equipes que conduzem o trabalho diário da instituição." },
      { type: "p", text: "A tecnologia é meio, e não fim. O que está em primeiro lugar continua sendo a singularidade de cada pessoa, seus interesses, suas potencialidades e seu ritmo." },

      { type: "h2", text: "Empreender vai muito além de vender" },
      { type: "p", text: "Empreender, nesse contexto, significa propor, criar, organizar, comunicar e participar. Significa fortalecer habilidades sociais, comunicacionais e funcionais que se desdobram em mais autonomia para a vida fora da instituição." },
      { type: "p", text: "A Feira é um ensaio coletivo dessa autonomia, em um ambiente acolhedor, seguro e alinhado com o compromisso histórico da APAE Barueri com a defesa de direitos e a inclusão real." },

      { type: "h2", text: "Inclusão produtiva em contexto contemporâneo" },
      { type: "p", text: "A escolha por aproximar a Feira da pauta de inovação dialoga com a visão institucional de uma APAE Barueri técnica, profissionalizada e atenta às transformações do mundo do trabalho. A [inclusão produtiva](/atuacao#insercao-produtiva) exige que pessoas com deficiência tenham acesso a contextos contemporâneos." },
      { type: "p", text: "Isso passa por entender, experimentar e se apropriar, no tempo de cada um, das ferramentas digitais que cada vez mais fazem parte do cotidiano." },

      { type: "h2", text: "Referência regional para a causa PCD" },
      { type: "p", text: "Iniciativas como essa também reforçam o papel da APAE Barueri como referência regional. Ao mostrar que tecnologia e inclusão caminham juntas, a instituição abre espaço para conversas mais amplas com escolas, empresas, universidades e poder público — todos potencialmente envolvidos na construção de oportunidades reais para Pessoas com Deficiência e suas famílias." },
      { type: "p", text: "Para quem visita, a Feira é um convite a olhar de outro jeito. Para quem participa, é uma oportunidade de descobrir competências, experimentar novas formas de expressão e ampliar a participação social." },

      { type: "quote", text: "Para a APAE Barueri, é a expressão concreta de um princípio que orienta seu trabalho há quase três décadas: cuidar com excelência técnica, sem perder de vista a humanidade que sustenta cada gesto, cada projeto e cada conquista." },
    ],
    galleryAlbumId: "feira-empreendedorismo-2026",
    galleryPreview: feiraEmpPreview,
    galleryTotal: 10,
    galleryHeading: "Momentos da Feira",
  },

  {
    id: "caminhada-inclusiva",
    category: "Eventos",
    title: "Caminhada Inclusiva reúne mais de 1.500 pessoas em Barueri e fortalece a mobilização pela inclusão",
    excerpt: "Evento organizado pela SDPD, com apoio da APAE Barueri, reforçou o compromisso do município com acolhimento, respeito, qualidade de vida e valorização das pessoas com deficiência.",
    date: "Abr 2026",
    image: "/assets/prefeito_apaezito.png",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "Barueri viveu mais um importante momento de mobilização em defesa da inclusão com a realização da Caminhada Inclusiva, que reuniu mais de 1.500 pessoas em uma demonstração de participação, conscientização e compromisso coletivo com a causa da pessoa com deficiência." },
      { type: "p", text: "Organizada pela Secretaria dos Direitos da Pessoa com Deficiência (SDPD), a iniciativa contou mais uma vez com o apoio da [APAE Barueri](/quem-somos), parceira da ação há anos e instituição historicamente comprometida com o fortalecimento de políticas, eventos e movimentos que promovam dignidade, respeito e visibilidade para as pessoas com deficiência e suas famílias." },

      { type: "h2", text: "Um ato público de acolhimento e respeito" },
      { type: "p", text: "Mais do que uma atividade simbólica, a Caminhada Inclusiva se consolidou como um importante ato público em favor de uma cidade mais acessível, humana e comprometida com a qualidade de vida de todos." },
      { type: "p", text: "Durante o evento, o prefeito destacou a relevância da caminhada como expressão concreta do modelo de cidade que Barueri busca construir." },
      { type: "quote", text: "É um dia muito importante e nós fazemos questão de juntos fazermos esta caminhada inclusiva, porque é dessa forma que nós fazemos a nossa cidade cada dia. A cidade que acolhe, que respeita, que cuida de cada pessoa que aqui mora.", cite: "Prefeito de Barueri" },
      { type: "p", text: "A fala reforça o sentido maior da mobilização: a inclusão não deve ser vista apenas como pauta institucional, mas como valor permanente da vida pública e do convívio social." },

      { type: "h2", text: "Crescimento da participação reforça a força da causa" },
      { type: "p", text: "Outro ponto destacado durante a caminhada foi o aumento da participação em relação ao ano anterior, mostrando o fortalecimento da mobilização em torno da inclusão no município." },
      { type: "quote", text: "Quero agradecer também a todas as famílias que aqui estão pra nós fazermos este ato muito importante na nossa cidade. Eu estou notando que este ano está muito maior do que o ano passado. E se Deus quiser, o ano que vem vai estar maior ainda.", cite: "Prefeito de Barueri" },
      { type: "p", text: "A presença de mais de 1.500 pessoas confirma esse crescimento e evidencia o engajamento cada vez maior das famílias, instituições, profissionais e da população em geral com a construção de uma sociedade mais inclusiva." },

      { type: "h2", text: "Inclusão como compromisso contínuo" },
      { type: "p", text: "Ao final da caminhada, o prefeito voltou a ressaltar a importância de seguir trabalhando para que Barueri avance cada vez mais na promoção de bem-estar, acolhimento e qualidade de vida." },
      { type: "quote", text: "Terminou agora a caminhada inclusiva… Foi linda, maravilhosa, e é importante cada dia mais nós trabalharmos muito pra que a nossa cidade seja uma cidade com uma boa qualidade de vida.", cite: "Prefeito de Barueri" },
      { type: "p", text: "A mensagem reforça que iniciativas como essa têm papel fundamental não apenas na sensibilização da sociedade, mas também no fortalecimento de uma cultura de cuidado, pertencimento e valorização das diferenças." },

      { type: "h2", text: "APAE Barueri ao lado da inclusão" },
      { type: "p", text: "Para a APAE Barueri, apoiar a Caminhada Inclusiva é reafirmar um compromisso que vai além do [atendimento diário](/atuacao). É também participar ativamente da construção de uma cidade mais justa, acessível e acolhedora." },
      { type: "p", text: "Ao caminhar ao lado dessa iniciativa há anos, a instituição reforça seu papel como referência na defesa da inclusão, no apoio às famílias e na promoção de ações que ampliem a visibilidade e a importância da causa da pessoa com deficiência no município." },

      { type: "h2", text: "Um passo coletivo por uma cidade melhor" },
      { type: "p", text: "A Caminhada Inclusiva foi, acima de tudo, uma demonstração clara de que a inclusão se constrói com participação, compromisso e presença." },
      { type: "p", text: "Com forte adesão popular, apoio institucional e uma mensagem pública de respeito e cuidado, o evento reforçou que Barueri segue avançando na construção de uma cidade que reconhece o valor de cada pessoa e entende que qualidade de vida também passa por inclusão, acessibilidade e acolhimento." },
    ],
  },

  {
    id: "noite-italiana",
    category: "Eventos",
    title: "Noite Italiana Beneficente: sabor e solidariedade em Barueri",
    excerpt: "Evento gastronômico arrecada fundos para ampliação dos atendimentos técnicos da APAE Barueri, reunindo a comunidade em uma noite de cultura e amor.",
    date: "11 Abr 2026",
    image: "/assets/noite-italiana-capa.jpg",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "No último sábado, 11 de abril, a [APAE Barueri](/quem-somos) realizou mais uma edição da sua aguardada Noite Italiana. O evento reuniu cerca de 400 pessoas na sede da instituição, em uma noite cuidadosamente preparada para acolher famílias, apoiadores, parceiros e toda a comunidade em torno de uma causa nobre." },

      { type: "h2", text: "Solidariedade e cultura em uma só noite" },
      { type: "p", text: "Mais do que um jantar temático, a Noite Italiana foi uma demonstração concreta da força da mobilização social em benefício da inclusão, do cuidado e da continuidade do trabalho desenvolvido pela APAE de Barueri." },
      { type: "p", text: "Com ambiente festivo, decoração inspirada na cultura italiana, música ao vivo e apresentações culturais, a iniciativa transformou a sede da instituição em um espaço de encontro, emoção e pertencimento." },

      { type: "h2", text: "Programação gastronômica e cultural" },
      { type: "p", text: "A programação da noite foi organizada para proporcionar uma experiência completa aos participantes. Entre os destaques anunciados estavam a apresentação da cantora Priscila Maney e, na sequência, a participação da Banda Cosa Nostra, com repertório italiano e apresentação de danças típicas." },
      { type: "p", text: "O cardápio também foi um dos pontos altos da noite, com pratos tradicionais da culinária italiana, incluindo antepasto de berinjela, nhoque, lasanha e espaguete, além de bebidas servidas ao público." },

      { type: "h2", text: "Arrecadação destinada à terapia" },
      { type: "p", text: "Neste ano, a arrecadação foi direcionada para a compra do Óleo Terapêutico Ziclague®, utilizado nas terapias oferecidas pela APAE de Barueri. Esse objetivo deu ainda mais significado à participação do público, que não apenas prestigiou a celebração, mas também contribuiu diretamente para a manutenção e o fortalecimento dos atendimentos oferecidos pela entidade." },

      { type: "h2", text: "Reconhecimento da comunidade" },
      { type: "p", text: "O expressivo comparecimento do público demonstra o reconhecimento da comunidade ao trabalho sério e transformador desenvolvido pela APAE de Barueri. Reunir cerca de 400 pessoas em um evento desse porte representa confiança, engajamento e apoio real à causa." },
      { type: "p", text: "A APAE de Barueri agradece a todos que estiveram presentes, aos colaboradores envolvidos na organização, aos parceiros que contribuíram para a realização do evento e a cada pessoa que escolheu participar dessa noite tão especial." },

      { type: "quote", text: "A Noite Italiana foi, acima de tudo, um sucesso de público, organização e propósito — uma noite memorável, feita de afeto, cultura e solidariedade." },
    ],
    galleryAlbumId: "noite-italiana-2026",
    galleryPreview: noiteItalianaPreview,
    galleryTotal: 41,
    galleryHeading: "Momentos da noite",
  },

  {
    id: "conscientizacao-autismo",
    category: "Institucional",
    title: "Conscientização sobre o autismo precisa ir além da data e se transformar em cultura de respeito e acolhimento",
    excerpt: "Ao abordar o autismo em sua comunicação institucional, a APAE Barueri reforça a importância da informação, do respeito às singularidades e da construção de uma sociedade mais inclusiva.",
    date: "Abr 2026",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "A conscientização sobre o autismo é um tema que precisa ser tratado de forma responsável, contínua e profundamente humana. Quando a [APAE Barueri](/quem-somos) traz essa pauta para sua comunicação, ela ajuda a lembrar que inclusão não se resume a discursos pontuais, datas comemorativas ou mensagens bonitas." },
      { type: "p", text: "Inclusão exige compreensão, respeito, acolhimento e disposição real para enxergar as pessoas para além de rótulos, estigmas e simplificações." },

      { type: "h2", text: "Por que a pauta ainda exige cuidado" },
      { type: "p", text: "Esse posicionamento é importante porque o debate sobre o autismo ainda é atravessado por desinformação. Muitas famílias convivem diariamente com barreiras sociais, falta de preparo em ambientes coletivos, julgamentos indevidos e visões reducionistas sobre o que significa estar no espectro." },
      { type: "p", text: "Em diversos contextos, ainda se espera que a pessoa autista se adapte sozinha a estruturas pouco inclusivas, quando o movimento necessário deveria ser o contrário: a sociedade precisa estar mais preparada para acolher a diversidade de perfis, formas de comunicação, sensibilidades e necessidades." },

      { type: "h2", text: "APAE Barueri como agente de educação social" },
      { type: "p", text: "Ao comunicar essa pauta, a APAE Barueri fortalece uma função que vai além do atendimento técnico. Ela atua também como agente de educação social. Isso significa contribuir para que mais pessoas entendam que acolher não é infantilizar, ter pena ou tratar de forma genérica, mas reconhecer singularidades, respeitar limites, valorizar potencialidades e construir relações mais conscientes." },

      { type: "h2", text: "Validar a vivência das famílias" },
      { type: "p", text: "Há ainda uma dimensão muito relevante nesse tipo de conteúdo: ele valida a vivência das famílias. Quando uma instituição se posiciona publicamente sobre o tema, ela transmite uma mensagem importante para quem vive o autismo no dia a dia: vocês não estão sozinhos, suas demandas importam, suas experiências merecem respeito." },

      { type: "quote", text: "Conscientizar, portanto, não é apenas informar. É criar condições para que mais pessoas se relacionem com o tema de maneira mais respeitosa, mais preparada e mais humana." },
    ],
  },

  {
    id: "voluntariado-bazar",
    category: "Voluntariado",
    title: "O voluntariado no Bazar Permanente mostra que a transformação social também se constrói com presença e participação",
    excerpt: "Ao convidar voluntários para o Bazar Permanente, a APAE Barueri reforça a importância da participação comunitária como parte da sustentação de seus projetos e serviços.",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "O voluntariado é uma das formas mais concretas de transformar solidariedade em ação. Na [APAE Barueri](/quem-somos), isso aparece com clareza na mobilização em torno do Bazar Permanente, uma frente importante de relacionamento com a comunidade e de apoio à sustentabilidade institucional." },
      { type: "p", text: "Ao divulgar o convite para voluntários em suas redes, a instituição mostra que participar de sua missão não depende apenas de recursos financeiros: também passa pela disponibilidade de tempo, pelo compromisso com a causa e pelo desejo de contribuir de forma ativa." },

      { type: "h2", text: "Mais do que um espaço de produtos: uma engrenagem de mobilização" },
      { type: "p", text: "O bazar permanente não deve ser visto apenas como um espaço de circulação de produtos. Ele funciona, na prática, como uma engrenagem de mobilização. Ajuda a gerar recursos, amplia a conexão entre a APAE e a comunidade local, fortalece a cultura de apoio recorrente e cria oportunidades para que novas pessoas conheçam de perto a instituição." },
      { type: "p", text: "Nesse contexto, o voluntário deixa de ser uma figura periférica e passa a ocupar um papel estratégico." },

      { type: "h2", text: "Pertencer faz parte da experiência" },
      { type: "p", text: "Existe também um aspecto humano muito importante nesse processo. Quando alguém escolhe servir como voluntário, essa pessoa passa a integrar uma rede de cuidado e pertencimento. Ela deixa de ser apenas espectadora da causa e passa a fazer parte da construção diária de algo maior." },

      { type: "h2", text: "Convite aberto à participação real" },
      { type: "p", text: "Ao chamar novos voluntários, a APAE Barueri comunica algo importante: existe espaço para [participação real](/ajude). Em vez de tratar o apoio da comunidade de forma distante, a instituição convida as pessoas a se aproximarem, a contribuírem e a se reconhecerem como parte da missão." },
    ],
  },

  {
    id: "experiencias-educativas",
    category: "Programas",
    title: "Experiências educativas com parceiros ampliam o cuidado e fortalecem a autonomia das famílias atendidas",
    excerpt: "Ações em parceria, como atividades educativas e de orientação, ajudam a ampliar o cuidado para além do ambiente terapêutico e fortalecem a rede de apoio da APAE Barueri.",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "Uma instituição comprometida com o desenvolvimento integral não se limita a oferecer atendimentos técnicos. Ela também busca ampliar repertórios, orientar famílias, criar experiências significativas e conectar seu público a conhecimentos que fortaleçam o dia a dia." },
      { type: "p", text: "É dentro dessa lógica que ações educativas em parceria ganham tanto valor no trabalho da [APAE Barueri](/quem-somos)." },

      { type: "h2", text: "Impacto além da informação" },
      { type: "p", text: "Quando famílias e atendidos participam de experiências como palestras, rodas de conversa, orientações ou encontros com profissionais e instituições parceiras, o impacto vai além da informação recebida. Essas ações contribuem para fortalecer segurança, confiança, autonomia e participação social." },
      { type: "p", text: "Elas ajudam a tirar o cuidado de um espaço exclusivamente clínico e o levam para uma dimensão mais ampla da vida." },

      { type: "h2", text: "Redução da sobrecarga das famílias" },
      { type: "p", text: "Esse tipo de iniciativa também tem um papel importante na redução da sobrecarga das famílias. Muitas vezes, mães, pais e cuidadores enfrentam desafios complexos com pouca rede de apoio e muito desgaste acumulado." },
      { type: "p", text: "Ao promover momentos de aprendizagem e acolhimento, a APAE Barueri não apenas oferece conhecimento, mas reafirma para essas famílias que elas são vistas, consideradas e acompanhadas em sua trajetória." },

      { type: "h2", text: "Articulação de redes" },
      { type: "p", text: "Parcerias educativas e ações de orientação também mostram a capacidade da APAE Barueri de articular redes. Organizações fortes não atuam isoladamente: elas criam conexões que agregam valor real às pessoas atendidas." },
    ],
  },

  {
    id: "eventos-campanhas-solidarias",
    category: "Campanhas",
    title: "Eventos e campanhas solidárias ajudam a manter viva a relação entre a APAE Barueri e a comunidade",
    excerpt: "Ações como bazares, campanhas e eventos beneficentes fortalecem a mobilização social, ampliam a participação comunitária e ajudam a sustentar o trabalho institucional.",
    date: "Fev 2026",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "Nenhuma instituição social fortalece sua missão sozinha. A continuidade do trabalho da [APAE Barueri](/quem-somos) depende também da capacidade de mobilizar pessoas, criar oportunidades de engajamento e manter uma relação ativa com a comunidade." },
      { type: "p", text: "É por isso que [campanhas solidárias, bazares, ações especiais e eventos beneficentes](/agenda) aparecem com tanta frequência em sua comunicação. Essas iniciativas não são apenas complementos da vida institucional: elas fazem parte da lógica de sustentação, visibilidade e fortalecimento da causa." },

      { type: "h2", text: "Pontos de contato com a missão" },
      { type: "p", text: "Quando a APAE promove ou divulga ações desse tipo, ela cria pontos de contato entre a população e sua missão. Isso é importante porque muitas vezes o apoio social se enfraquece quando a instituição só aparece em momentos de necessidade ou em discursos muito genéricos." },

      { type: "h2", text: "Dimensão pedagógica das ações" },
      { type: "p", text: "Há também uma dimensão pedagógica nessas iniciativas. Ao participar de um evento beneficente, de uma ação solidária ou de um bazar, o público não apenas colabora financeiramente. Ele entra em contato com a causa, com a existência da instituição e com a importância do seu trabalho." },
      { type: "p", text: "Em termos institucionais, isso ajuda a construir consciência pública e fortalecer o valor social percebido da APAE Barueri." },

      { type: "h2", text: "Vínculos de longo prazo" },
      { type: "p", text: "A mobilização recorrente fortalece vínculos de longo prazo. Uma pessoa que participa hoje de uma campanha pode se tornar, amanhã, voluntária, apoiadora, doadora ou parceira." },
      { type: "p", text: "Cada ação tem potencial de gerar desdobramentos que vão muito além do resultado imediato." },
    ],
  },

  {
    id: "comunicacao-institucional",
    category: "Institucional",
    title: "Comunicação institucional forte ajuda a ampliar confiança, pertencimento e impacto social",
    excerpt: "A presença pública da APAE Barueri reforça uma identidade baseada em inclusão, acolhimento e construção de oportunidades para pessoas com deficiência e suas famílias.",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    readTime: "3 min de leitura",
    body: [
      { type: "lead", text: "Comunicar bem não é apenas divulgar atividades. Para uma instituição como a [APAE Barueri](/quem-somos), comunicação também é construção de vínculo, percepção pública e confiança." },
      { type: "p", text: "O perfil institucional da organização reforça uma mensagem consistente de inclusão, acolhimento e construção de oportunidades para pessoas com deficiência, além de destacar impacto em mais de 2 mil vidas." },

      { type: "h2", text: "Identidade clara organiza a percepção" },
      { type: "p", text: "Uma identidade institucional clara é importante porque ajuda a organizar a forma como a sociedade enxerga o trabalho da instituição. Quando a APAE Barueri comunica com consistência seus valores e sua missão, ela facilita o entendimento do público sobre aquilo que faz, por que faz e por que esse trabalho importa." },

      { type: "h2", text: "Função estratégica de valorização do impacto" },
      { type: "p", text: "Esse tipo de comunicação também cumpre uma função estratégica na valorização do impacto. Muitas organizações fazem um trabalho relevante, mas não conseguem traduzir isso em narrativa pública." },
      { type: "p", text: "Quando a APAE Barueri mostra suas ações, convida a comunidade para [eventos](/agenda) e reforça seu propósito, ela torna seu trabalho mais visível e mais compreensível." },

      { type: "h2", text: "Efeito interno: orgulho e coerência" },
      { type: "p", text: "Além disso, uma comunicação forte tem efeito interno. Ela fortalece orgulho institucional, senso de pertencimento e coerência entre aquilo que a instituição vive e aquilo que ela expressa publicamente." },
      { type: "p", text: "Ao olhar para a presença pública da APAE Barueri, fica evidente que sua comunicação procura acolher, envolver, aproximar e mostrar que inclusão é uma construção diária." },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────── */

// Indexação por id, útil para busca rápida no detalhe
export const NOTICIAS_INDEX: Record<string, Noticia> = Object.fromEntries(
  NOTICIAS.map((n) => [n.id, n])
);

// Cor da pílula de categoria (padrão visual reutilizado em todos os cards)
export function categoriaColor(category: string): string {
  switch (category) {
    case "Eventos":
    case "Inovação":
    case "Programas":
      return "bg-primary text-primary-foreground";
    case "Institucional":
    case "Campanhas":
      return "bg-accent text-accent-foreground";
    case "Voluntariado":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-primary text-primary-foreground";
  }
}
