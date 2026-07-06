import type { MultipleChoiceContent } from "./songs";

export interface SoundRule {
  som: string;
  titulo: string;
  explicacao: string;
  exemplos: { palavra: string; musica: string }[];
}

export type FundamentalsQuestion = MultipleChoiceContent;

export const TOTAL_SECTIONS_FUNDAMENTALS = 2;

export const soundRules: SoundRule[] = [
  {
    som: "Vogais puras",
    titulo: "As vogais nunca ditongam",
    explicacao:
      "Em português, muitas vezes a vogal final \"abre\" em dois sons (ex: \"poder\" soa quase \"po-dêr\"). Em espanhol, cada vogal tem um som só, sempre puro e curto: a, e, i, o, u.",
    exemplos: [
      { palavra: "poder", musica: "Poder de la Sangre" },
      { palavra: "sangre", musica: "Poder de la Sangre" },
    ],
  },
  {
    som: "Ñ",
    titulo: "\"Ñ\" soa como o \"nh\" do português",
    explicacao:
      "O til sobre o \"n\" transforma o som em \"nh\", igual a \"ninho\". É uma letra própria do alfabeto espanhol.",
    exemplos: [
      { palavra: "sueños", musica: "Sueños" },
      { palavra: "puñaladas", musica: "Marcas" },
    ],
  },
  {
    som: "LL",
    titulo: "\"LL\" soa como \"lh\" (ou \"i\", dependendo da região)",
    explicacao:
      "Na maior parte da América Latina, \"ll\" soa parecido com o \"i\" de \"ioiô\" ou o \"lh\" de \"malha\" (yeísmo). Nunca se pronuncia como dois L separados.",
    exemplos: [
      { palavra: "aquellos", musica: "Poder de la Sangre" },
      { palavra: "llorar", musica: "Marcas" },
    ],
  },
  {
    som: "RR",
    titulo: "\"RR\" é um R vibrante forte",
    explicacao:
      "Diferente do \"r\" brando do português, o \"rr\" espanhol vibra na ponta da língua, como um motorzinho. É o som mais marcante do sotaque hispano-americano.",
    exemplos: [{ palavra: "guerras", musica: "Poder de la Sangre" }],
  },
  {
    som: "J",
    titulo: "\"J\" é um som gutural, vindo da garganta",
    explicacao:
      "O \"j\" espanhol (e o \"g\" antes de e/i) soa mais forte e gutural do que o \"j\" suave do português — parecido com o \"r\" gutural carioca.",
    exemplos: [{ palavra: "Jesús", musica: "Poder de la Sangre" }],
  },
  {
    som: "H",
    titulo: "\"H\" é sempre muda",
    explicacao:
      "A letra \"h\" nunca é pronunciada em espanhol, em nenhuma posição. \"Hijos\" começa com o som da vogal \"i\", não com \"h\".",
    exemplos: [
      { palavra: "hijos", musica: "Canción del Exilio" },
      { palavra: "heridas", musica: "Marcas" },
    ],
  },
  {
    som: "C / Z",
    titulo: "\"C\" (antes de e/i) e \"Z\" soam como \"S\"",
    explicacao:
      "No espanhol latino-americano (seseo), \"c\" antes de e/i e o \"z\" soam como o \"s\" do português — diferente da Espanha, onde soam como \"th\" em inglês.",
    exemplos: [
      { palavra: "corazón", musica: "Sueños" },
      { palavra: "cielo", musica: "Poder de la Sangre" },
    ],
  },
  {
    som: "Acentuação",
    titulo: "O til marca a sílaba tônica",
    explicacao:
      "Quando uma palavra tem acento gráfico (´), a força da voz vai ali, mesmo que a regra geral do espanhol apontasse outra sílaba.",
    exemplos: [
      { palavra: "también", musica: "Poder de la Sangre" },
      { palavra: "canción", musica: "Canción del Exilio" },
    ],
  },
];

export const fundamentalsQuiz: FundamentalsQuestion[] = [
  {
    pergunta: "Como soa o \"ñ\" em \"sueños\"?",
    opcoes: ["Como \"n\" comum", "Como \"nh\"", "Como \"m\"", "É mudo"],
    respostaIndex: 1,
  },
  {
    pergunta: "A letra \"h\" em \"hijos\" e \"heridas\" é pronunciada como:",
    opcoes: ["\"r\" forte", "\"j\" espanhol", "Ela é sempre muda", "\"nh\""],
    respostaIndex: 2,
  },
  {
    pergunta: "Em \"guerras\", o \"rr\" deve soar:",
    opcoes: [
      "Igual ao \"r\" brando do português",
      "Vibrante e forte",
      "Como \"nh\"",
      "Mudo",
    ],
    respostaIndex: 1,
  },
  {
    pergunta: "\"Jesús\" tem o \"j\" pronunciado de forma:",
    opcoes: ["Suave, como em português", "Gutural, vinda da garganta", "Como \"nh\"", "Muda"],
    respostaIndex: 1,
  },
];

export interface CurriculumEntry {
  moduleId: string;
  ordem: number;
  tipo: "fundamentos" | "musica";
  titulo: string;
  icone: string;
}

export const curriculumOrder: CurriculumEntry[] = [
  {
    moduleId: "fundamentos",
    ordem: 0,
    tipo: "fundamentos",
    titulo: "Fundamentos de pronúncia",
    icone: "🗣️",
  },
  { moduleId: "cancion-del-exilio", ordem: 1, tipo: "musica", titulo: "Canción del Exilio", icone: "🏛️" },
  { moduleId: "suenos", ordem: 2, tipo: "musica", titulo: "Sueños", icone: "😴" },
  { moduleId: "poder-de-la-sangre", ordem: 3, tipo: "musica", titulo: "Poder de la Sangre", icone: "🩸" },
  { moduleId: "marcas", ordem: 4, tipo: "musica", titulo: "Marcas", icone: "💔" },
];
