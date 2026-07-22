export interface VocabItem {
  es: string;
  pt: string;
  nota?: string;
}

export interface LyricLine {
  es: string;
  pt: string;
}

export interface GrammarExample {
  es: string;
  pt: string;
}

export interface GrammarNote {
  titulo: string;
  explicacao: string;
  exemplos: GrammarExample[];
}

export interface MultipleChoiceContent {
  pergunta: string;
  opcoes: string[];
  respostaIndex: number;
}

export interface MultipleChoiceExercise extends MultipleChoiceContent {
  tipo: "multipla-escolha";
}

export interface FillBlankExercise {
  tipo: "completar";
  frase: string; // usa ___ como lacuna
  bancoPalavras: string[];
  resposta: string;
  traducao: string;
}

export type Exercise = MultipleChoiceExercise | FillBlankExercise;

export interface Song {
  id: string;
  ordem: number;
  titulo: string;
  artista: string;
  icone: string;
  resumo: string;
  vocabulario: VocabItem[];
  linhas: LyricLine[];
  gramatica: GrammarNote[];
  exercicios: Exercise[];
}

export const songs: Song[] = [
  {
    id: "cancion-del-exilio",
    ordem: 1,
    titulo: "Canción del Exilio",
    artista: "Débora e Léia / Ereni",
    icone: "🏛️",
    resumo:
      "A música mais fácil pra começar: a letra em espanhol vem lado a lado com a tradução, então você já reconhece quase tudo. Ótima pra pegar confiança logo de cara.",
    vocabulario: [
      { es: "hijos", pt: "filhos" },
      { es: "cautiverio", pt: "cativeiro" },
      { es: "lejos", pt: "longe" },
      { es: "hogar", pt: "lar" },
      { es: "colgaban", pt: "penduravam", nota: "pretérito imperfeito de colgar" },
      { es: "arpas", pt: "harpas" },
      { es: "sauces", pt: "salgueiros" },
      { es: "tiranos", pt: "tiranos" },
      { es: "pedían", pt: "pediam", nota: "pretérito imperfeito de pedir" },
      { es: "lamento", pt: "lamento" },
      { es: "regresar", pt: "regressar/voltar" },
      { es: "cruzaremos", pt: "atravessaremos", nota: "futuro simples de cruzar" },
      { es: "mar rojo", pt: "mar vermelho" },
      { es: "tierra prometida", pt: "terra prometida" },
      { es: "habitar", pt: "habitar" },
      { es: "añoranza", pt: "saudade", nota: "contém o 'ñ' — som de 'nh'" },
      { es: "extranjeros", pt: "estrangeiros" },
      { es: "valle", pt: "vale" },
      { es: "suspiramos", pt: "suspiramos" },
      { es: "patria celestial", pt: "pátria celestial" },
      { es: "partida", pt: "partida" },
      { es: "dejaremos", pt: "deixaremos", nota: "futuro simples de dejar" },
      { es: "cantaremos", pt: "cantaremos", nota: "futuro simples de cantar" },
    ],
    linhas: [
      { es: "Como los hijos de Israel en Babilonia", pt: "Como os filhos de Israel na Babilônia" },
      { es: "En cautiverio y tan lejos del hogar", pt: "Em cativeiro e tão longe do lar" },
      { es: "Colgaban sus arpas en los sauces", pt: "Penduravam suas harpas no salgueiro" },
      { es: "Y los tiranos les pedían que cantaran", pt: "E os tiranos lhes pediam pra cantar" },
      { es: "El lamento que sale de nuestras arpas", pt: "O lamento que sai de nossas harpas" },
      { es: "Habla de cuánto deseamos regresar", pt: "Fala do quanto desejamos regressar" },
      { es: "¿Cuándo será que cruzaremos el mar Rojo?", pt: "Quando será que o mar vermelho passaremos" },
      { es: "Para habitar en la tierra prometida", pt: "Para na terra prometida habitar" },
      { es: "Nuestro canto son notas de añoranza", pt: "Nosso canto são notas de saudade" },
      { es: "Extranjeros en este valle terrenal", pt: "Forasteiros neste vale terrenal" },
      { es: "Cantamos la canción del exilio", pt: "Nós cantamos a canção do exílio" },
      { es: "Y suspiramos por la patria celestial", pt: "E suspiramos pela pátria celestial" },
      { es: "Cuando llegue el día de la partida", pt: "Quando chegar o dia da partida" },
      { es: "Qué alegría será para nosotros entonces", pt: "Que alegria será pra nós então" },
      { es: "Dejaremos esta tierra para siempre", pt: "Deixaremos esta terra para sempre" },
      { es: "Cantaremos una nueva canción en Sión", pt: "Vamos cantar um novo canto em Sião" },
    ],
    gramatica: [
      {
        titulo: "Pretérito imperfeito: ação repetida no passado",
        explicacao:
          "\"Colgaban\" e \"pedían\" descrevem cenas que se repetiam durante o cativeiro — não um fato único. O imperfeito em espanhol termina em -aba/-ían, muito parecido com o português (\"pendur-avam\", \"ped-iam\").",
        exemplos: [
          { es: "Colgaban sus arpas en los sauces", pt: "Penduravam suas harpas no salgueiro" },
          { es: "Los tiranos les pedían que cantaran", pt: "Os tiranos lhes pediam que cantassem" },
        ],
      },
      {
        titulo: "Futuro simples: -emos para \"nós\"",
        explicacao:
          "Para falar do que \"nós\" faremos, basta acrescentar -emos ao infinitivo: cruzar → cruzaremos, dejar → dejaremos, cantar → cantaremos. É quase idêntico ao português.",
        exemplos: [
          { es: "¿Cuándo será que cruzaremos el mar Rojo?", pt: "Quando atravessaremos o mar Vermelho?" },
          { es: "Cantaremos una nueva canción en Sión", pt: "Cantaremos uma nova canção em Sião" },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "O que significa \"cautiverio\"?",
        opcoes: ["Cativeiro", "Caçador", "Castelo", "Caminho"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Colgaban\" está em qual tempo verbal?",
        opcoes: ["Futuro", "Presente", "Pretérito imperfeito", "Subjuntivo"],
        respostaIndex: 2,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "Como se diz \"saudade\" em espanhol nesta música?",
        opcoes: ["Lejos", "Añoranza", "Partida", "Cautiverio"],
        respostaIndex: 1,
      },
      {
        tipo: "completar",
        frase: "Y los tiranos les pedían que ___",
        bancoPalavras: ["cantaran", "cantamos", "cantar"],
        resposta: "cantaran",
        traducao: "E os tiranos lhes pediam que cantassem",
      },
      {
        tipo: "completar",
        frase: "Nuestro canto son notas de ___",
        bancoPalavras: ["añoranza", "victoria", "cautiverio"],
        resposta: "añoranza",
        traducao: "Nosso canto são notas de saudade",
      },
      {
        tipo: "completar",
        frase: "Cuando llegue el día de la ___",
        bancoPalavras: ["partida", "arpa", "guerra"],
        resposta: "partida",
        traducao: "Quando chegar o dia da partida",
      },
    ],
  },
  {
    id: "suenos",
    ordem: 2,
    titulo: "Sueños",
    artista: "Débora Miranda",
    icone: "😴",
    resumo:
      "Uma história pessoal de fé, contada em primeira pessoa — vai te ajudar a ganhar confiança pra contar suas próprias histórias em espanhol também.",
    vocabulario: [
      { es: "sueños", pt: "sonhos", nota: "o 'ñ' soa como 'nh'" },
      { es: "sobrevinieron", pt: "sobrevieram", nota: "pretérito de sobrevenir" },
      { es: "pensamientos", pt: "pensamentos" },
      { es: "trayéndome", pt: "trazendo-me", nota: "gerúndio de traer" },
      { es: "ilusiones", pt: "ilusões" },
      { es: "fluir", pt: "fluir" },
      { es: "surgen", pt: "surgem" },
      { es: "oprimida", pt: "oprimida", nota: "particípio no feminino, concorda com 'yo' (mulher)" },
      { es: "juzgaba", pt: "julgava", nota: "pretérito imperfeito de juzgar" },
      { es: "vencida", pt: "vencida" },
      { es: "mano", pt: "mão" },
      { es: "operó", pt: "operou", nota: "pretérito de operar" },
      { es: "confundida", pt: "confusa" },
      { es: "perdida", pt: "perdida" },
      { es: "alcanzada", pt: "alcançada", nota: "particípio de alcanzar" },
      { es: "despertó", pt: "despertou", nota: "pretérito de despertar" },
      { es: "victorias", pt: "vitórias" },
      { es: "aleluya", pt: "aleluia" },
    ],
    linhas: [
      { es: "Sueños, nada más que sueños", pt: "Sonhos, nada mais que sonhos" },
      { es: "Sobrevinieron a mí, sofocando mis pensamientos", pt: "Sobrevieram a mim, sufocando meus pensamentos" },
      { es: "Trayéndome ilusiones, que a todo momento", pt: "Trazendo-me ilusões, que a todo momento" },
      { es: "Están a fluir en las ideas que surgen por ahí", pt: "Estão a fluir nas ideias que surgem por aí" },
      { es: "Cuando a mí llegó el amor de Dios", pt: "Quando a mim chegou o amor de Deus" },
      { es: "Yo me encontraba oprimida en una triste situación", pt: "Eu me encontrava oprimida numa triste situação" },
      { es: "Yo me juzgaba vencida y sin solución", pt: "Eu me julgava vencida e sem solução" },
      { es: "Y fue ahí que la mano de Dios operó en mí, en mí", pt: "E foi aí que a mão de Deus operou em mim, em mim" },
      { es: "Estaba tan confundida", pt: "Estava tão confusa" },
      { es: "En mis sueños yo estaba perdida", pt: "Em meus sonhos eu estava perdida" },
      { es: "Fui alcanzada por la mano amiga que me despertó", pt: "Fui alcançada pela mão amiga que me despertou" },
      { es: "Ahora o en cualquier hora", pt: "Agora ou a qualquer hora" },
      { es: "Daré glorias a quién me dio victorias", pt: "Darei glórias a quem me deu vitórias" },
      { es: "¡Gloria a Dios! ¡Aleluya a mi Jesús!", pt: "Glória a Deus! Aleluia a meu Jesus!" },
    ],
    gramatica: [
      {
        titulo: "Pretérito vs. gerúndio",
        explicacao:
          "O pretérito (sobrevinieron, operó, despertó) narra um fato pontual e concluído. O gerúndio (sofocando, trayéndome) descreve uma ação acontecendo ao mesmo tempo que outra — funciona quase igual ao português (\"sufoc-ando\", \"traz-endo\").",
        exemplos: [
          { es: "Sobrevinieron a mí, sofocando mis pensamientos", pt: "Sobrevieram a mim, sufocando meus pensamentos" },
          { es: "La mano amiga que me despertó", pt: "A mão amiga que me despertou" },
        ],
      },
      {
        titulo: "Concordância de gênero nos particípios",
        explicacao:
          "Quando quem fala é mulher, os particípios/adjetivos terminam em -a: oprimida, vencida, confundida, perdida, alcanzada. Se fosse um homem cantando, seriam oprimido, vencido, confundido — como já vimos em \"Poder de la Sangre\" com \"pueblo oprimido\".",
        exemplos: [
          { es: "Yo me encontraba oprimida", pt: "Eu me encontrava oprimida" },
          { es: "Fui alcanzada por la mano amiga", pt: "Fui alcançada pela mão amiga" },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "\"Sofocando\" é um exemplo de qual forma verbal?",
        opcoes: ["Gerúndio", "Infinitivo", "Futuro", "Imperativo"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "Por que \"oprimida\" termina em -a e não em -o?",
        opcoes: [
          "É um erro comum",
          "Porque concorda com quem canta, no feminino",
          "Porque é plural",
          "Porque é uma pergunta",
        ],
        respostaIndex: 1,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "O que significa \"despertó\"?",
        opcoes: ["Despertou", "Desistiu", "Destruiu", "Desejou"],
        respostaIndex: 0,
      },
      {
        tipo: "completar",
        frase: "Yo me juzgaba ___ y sin solución",
        bancoPalavras: ["vencida", "vencido", "venciendo"],
        resposta: "vencida",
        traducao: "Eu me julgava vencida e sem solução",
      },
      {
        tipo: "completar",
        frase: "Fui ___ por la mano amiga que me despertó",
        bancoPalavras: ["alcanzada", "alcanzado", "alcanzar"],
        resposta: "alcanzada",
        traducao: "Fui alcançada pela mão amiga que me despertou",
      },
    ],
  },
  {
    id: "poder-de-la-sangre",
    ordem: 3,
    titulo: "Poder de la Sangre",
    artista: "Cristina Santana",
    icone: "🩸",
    resumo:
      "O refrão se repete bastante, o que torna essa a música mais fácil de gravar de cor — ótima pra ganhar confiança cantando um trecho inteiro sem travar.",
    vocabulario: [
      { es: "sangre", pt: "sangue" },
      { es: "incomparable", pt: "incomparável" },
      { es: "cruz", pt: "cruz" },
      { es: "enfermedades", pt: "enfermidades" },
      { es: "perdona", pt: "perdoa", nota: "presente, 3ª pessoa de perdonar" },
      { es: "resuelve", pt: "resolve", nota: "presente, 3ª pessoa de resolver" },
      { es: "diablo", pt: "diabo" },
      { es: "batallas", pt: "batalhas" },
      { es: "guerras", pt: "guerras", nota: "tem o \"rr\" vibrante" },
      { es: "libera", pt: "liberta" },
      { es: "oprimido", pt: "oprimido" },
      { es: "ángeles", pt: "anjos" },
      { es: "cielo", pt: "céu" },
      { es: "envidioso", pt: "invejoso" },
      {
        es: "celo",
        pt: "zelo/ciúme",
        nota: "falso amigo parcial: aqui \"celo\" tem sentido de inveja/ciúme, não de cuidado como o \"zelo\" em português",
      },
      { es: "ejército", pt: "exército" },
      { es: "poderoso", pt: "poderoso" },
      { es: "clamando", pt: "clamando" },
      { es: "legiones", pt: "legiões" },
      { es: "vencidos", pt: "vencidos" },
      {
        es: "hay",
        pt: "há",
        nota: "verbo haber, forma existencial — não confundir com \"ahí\" (lá/ali). É a mesma pegadinha do português \"há\" x \"aí\"",
      },
    ],
    linhas: [
      { es: "Es incomparable el valor de la sangre de la cruz", pt: "É incomparável o valor do sangue da cruz" },
      { es: "Es incomparable el poder de la sangre de Jesús", pt: "É incomparável o poder do sangue de Jesus" },
      { es: "Ella cura las enfermedades, perdona pecados y salva también", pt: "Ele cura as enfermidades, perdoa pecados e salva também" },
      { es: "Esa sangre tiene poder, resuelve el problema de aquellos que creen", pt: "Esse sangue tem poder, resolve o problema daqueles que creem" },
      { es: "Hay poder en la sangre de Cristo", pt: "Há poder no sangue de Cristo" },
      { es: "Hay poder en su sangre, hay poder", pt: "Há poder no seu sangue, há poder" },
      { es: "Ella pone al diablo por tierra", pt: "Ele põe o diabo por terra" },
      { es: "Ella vence batallas y guerras", pt: "Ele vence batalhas e guerras" },
      { es: "Y mediante el poder de esa sangre", pt: "E mediante o poder desse sangue" },
      { es: "Dios opera y libera tu ser", pt: "Deus opera e liberta o teu ser" },
      { es: "Ella libra al pueblo oprimido", pt: "Ele livra o povo oprimido" },
      { es: "Porque en esa sangre hay mucho poder", pt: "Porque nesse sangue há muito poder" },
      { es: "Hubo una batalla entre ángeles en el cielo", pt: "Houve uma batalha entre anjos no céu" },
      { es: "Satanás envidioso se reveló mostrando su celo", pt: "Satanás invejoso se revelou mostrando seu ciúme" },
      { es: "Y el ejército de Dios poderoso venció clamando la sangre de Jesús", pt: "E o exército do Deus poderoso venceu clamando o sangue de Jesus" },
      { es: "Satanás con sus legiones cayeron vencidos por la sangre de la cruz", pt: "Satanás com suas legiões caíram vencidos pelo sangue da cruz" },
    ],
    gramatica: [
      {
        titulo: "Presente do indicativo, 3ª pessoa — \"ella\" é o sangue",
        explicacao:
          "\"Ella\" aparece o tempo todo porque, em espanhol, \"sangre\" é palavra feminina (la sangre) — então tudo que ela faz usa \"ella\": ella cura, ella vence, ella libra, ella pone. Os verbos -ar/-er na 3ª pessoa terminam em -a/-e: cura, perdona, salva, resuelve, opera, libera.",
        exemplos: [
          { es: "Ella cura las enfermedades", pt: "Ele (o sangue) cura as enfermidades" },
          { es: "Ella vence batallas y guerras", pt: "Ele vence batalhas e guerras" },
        ],
      },
      {
        titulo: "\"Hay\" x \"ahí\" — a mesma pegadinha do português \"há\" x \"aí\"",
        explicacao:
          "\"Hay\" vem do verbo haber e quer dizer \"existe/existem\" (há poder). \"Ahí\" é advérbio de lugar (ali/lá). Soam parecido e é comum confundir na escrita — exatamente como em português confundimos \"há\" com \"aí\".",
        exemplos: [
          { es: "Hay poder en la sangre de Cristo", pt: "Há poder no sangue de Cristo" },
          { es: "Porque en esa sangre hay mucho poder", pt: "Porque nesse sangue há muito poder" },
        ],
      },
      {
        titulo: "Pretérito para narrar a batalha no céu",
        explicacao:
          "A segunda parte da música muda para o pretérito, tempo de fatos pontuais concluídos: hubo (houve, de haber), se reveló (revelou-se), venció (venceu), cayeron (caíram).",
        exemplos: [
          { es: "Hubo una batalla entre ángeles en el cielo", pt: "Houve uma batalha entre anjos no céu" },
          { es: "Satanás con sus legiones cayeron vencidos", pt: "Satanás com suas legiões caíram vencidos" },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "Por que a música usa \"ella\" para falar do sangue?",
        opcoes: [
          "Erro de letra",
          "Porque \"sangre\" é palavra feminina em espanhol",
          "Porque fala de uma mulher",
          "Porque é plural",
        ],
        respostaIndex: 1,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Celo\", nesta música, tem o sentido mais próximo de:",
        opcoes: ["Cuidado", "Ciúme/inveja", "Céu", "Cera"],
        respostaIndex: 1,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Hay poder\" significa:",
        opcoes: ["Ali poder", "Há poder", "Ei, poder!", "Ele poder"],
        respostaIndex: 1,
      },
      {
        tipo: "completar",
        frase: "Ella ___ al diablo por tierra",
        bancoPalavras: ["pone", "poner", "puse"],
        resposta: "pone",
        traducao: "Ele põe o diabo por terra",
      },
      {
        tipo: "completar",
        frase: "Hubo una batalla entre ángeles en el ___",
        bancoPalavras: ["cielo", "suelo", "hielo"],
        resposta: "cielo",
        traducao: "Houve uma batalha entre anjos no céu",
      },
      {
        tipo: "completar",
        frase: "Satanás con sus legiones ___ vencidos",
        bancoPalavras: ["cayeron", "cayó", "caer"],
        resposta: "cayeron",
        traducao: "Satanás com suas legiões caíram vencidos",
      },
    ],
  },
  {
    id: "marcas",
    ordem: 4,
    titulo: "Marcas",
    artista: "Débora y Ereni",
    icone: "💔",
    resumo:
      "O módulo mais desafiador do curso — mas também o mais emocionante de cantar depois que você pega o jeito. Vale a pena chegar até aqui.",
    vocabulario: [
      { es: "mentira", pt: "mentira" },
      { es: "falsedad", pt: "falsidade" },
      { es: "incomprensión", pt: "incompreensão" },
      { es: "engaño", pt: "engano" },
      { es: "traición", pt: "traição" },
      { es: "puñaladas", pt: "punhaladas", nota: "tem o 'ñ' — som de 'nh'" },
      { es: "gemir", pt: "gemer" },
      { es: "bálsamo", pt: "bálsamo" },
      { es: "sanador", pt: "curador" },
      { es: "derramado", pt: "derramado" },
      { es: "corazón", pt: "coração" },
      { es: "cicatriza", pt: "cicatriza" },
      { es: "heridas", pt: "feridas", nota: "\"h\" é sempre muda em espanhol" },
      { es: "decepciones", pt: "decepções" },
      { es: "desamor", pt: "desamor/falta de amor" },
      { es: "llorar", pt: "chorar", nota: "\"ll\" soa como \"lh\"/\"i\" (yeísmo)" },
      { es: "olvidar", pt: "esquecer", nota: "não é cognato — precisa decorar" },
      { es: "nunca / jamás", pt: "nunca / jamais", nota: "usados juntos para reforçar a negação" },
      { es: "herirnos", pt: "nos ferir", nota: "pronome recíproco grudado no infinitivo" },
      { es: "abandonarnos", pt: "nos abandonar" },
    ],
    linhas: [
      { es: "La mentira, la falsedad y la incomprensión", pt: "A mentira, a falsidade e a incompreensão" },
      { es: "El engaño y la traición, la traición", pt: "O engano e a traição, a traição" },
      { es: "Son puñaladas que nos hacen gemir", pt: "São punhaladas que nos fazem gemer" },
      { es: "Y hasta pensamos que vamos a morir, morir", pt: "E até pensamos que vamos morrer, morrer" },
      { es: "Pero en ese instante la sangre de Jesús", pt: "Mas nesse instante o sangue de Jesus" },
      { es: "El bálsamo bendito y sanador", pt: "O bálsamo bendito e curador" },
      { es: "Derramado en nuestro corazón", pt: "Derramado em nosso coração" },
      { es: "Cicatriza las heridas con amor", pt: "Cicatriza as feridas com amor" },
      { es: "Todas estas decepciones y desamor", pt: "Todas essas decepções e desamor" },
      { es: "Nos dejan muchas marcas de dolor, marcas de dolor", pt: "Nos deixam muitas marcas de dor, marcas de dor" },
      { es: "Tan profundas que nos hacen llorar", pt: "Tão profundas que nos fazem chorar" },
      { es: "Y es difícil poderlas olvidar, olvidar", pt: "E é difícil poder esquecê-las, esquecer" },
      {
        es: "Nunca, nunca podemos olvidarnos",
        pt: "Nunca, nunca podemos nos esquecer",
      },
      {
        es: "Que a nuestro lado Alguien hay que nos ama tanto",
        pt: "Que ao nosso lado Alguém há que nos ama tanto",
      },
      {
        es: "Y nos comprende tan bien, y aunque muchos puedan herirnos",
        pt: "E nos compreende tão bem, e ainda que muitos possam nos ferir",
      },
      {
        es: "Odiarnos o despreciarnos, Cristo jamás ha de abandonarnos",
        pt: "Nos odiar ou nos desprezar, Cristo jamais há de nos abandonar",
      },
      { es: "Pero en ese instante, las heridas con amor", pt: "Mas nesse instante, as feridas com amor" },
    ],
    gramatica: [
      {
        titulo: "Pronome recíproco grudado no infinitivo",
        explicacao:
          "Em vez de \"nos herir\", o espanhol gruda o pronome no final do infinitivo: herirnos, odiarnos, despreciarnos, abandonarnos, olvidarnos. É diferente da ordem mais comum em português, então vale treinar essas formas separadamente.",
        exemplos: [
          { es: "Nunca, nunca podemos olvidarnos", pt: "Nunca, nunca podemos nos esquecer" },
          { es: "Aunque muchos puedan herirnos", pt: "Ainda que muitos possam nos ferir" },
        ],
      },
      {
        titulo: "\"Nunca... jamás\": reforço, não erro",
        explicacao:
          "Usar duas palavras negativas juntas (nunca... jamás) reforça a negação — não é um erro de duplo negativo como em inglês. Em português, o efeito é parecido: \"nunca, jamais vou esquecer\".",
        exemplos: [
          { es: "Cristo jamás ha de abandonarnos", pt: "Cristo jamais há de nos abandonar" },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "\"Herirnos\" é formado por:",
        opcoes: [
          "Herir + prefixo",
          "Infinitivo herir + pronome nos grudado",
          "Um substantivo",
          "Uma forma de futuro",
        ],
        respostaIndex: 1,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Llorar\" se pronuncia com o som de \"ll\" parecido a:",
        opcoes: ["rr", "lh/i", "nh", "j"],
        respostaIndex: 1,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Olvidar\" significa:",
        opcoes: ["Ouvir", "Esquecer", "Olhar", "Ajudar"],
        respostaIndex: 1,
      },
      {
        tipo: "completar",
        frase: "Cicatriza las ___ con amor",
        bancoPalavras: ["heridas", "erida", "heridos"],
        resposta: "heridas",
        traducao: "Cicatriza as feridas com amor",
      },
      {
        tipo: "completar",
        frase: "Cristo jamás ha de ___",
        bancoPalavras: ["abandonarnos", "abandonar", "abandonando"],
        resposta: "abandonarnos",
        traducao: "Cristo jamais há de nos abandonar",
      },
    ],
  },
  {
    id: "iglesia-de-tablas",
    ordem: 5,
    titulo: "Pequeña Iglesia de Tablas Viejas",
    artista: "Débora",
    icone: "⛪",
    resumo:
      "Um testemunho de conversão contado em primeira pessoa — ótimo pra praticar o pretérito narrando uma história real, do jeito que você mesma contaria a sua.",
    vocabulario: [
      { es: "iglesia", pt: "igreja" },
      { es: "tablas", pt: "tábuas" },
      { es: "carretera", pt: "estrada" },
      { es: "barrio", pt: "bairro" },
      { es: "vivía", pt: "morava", nota: "pretérito imperfeito de vivir" },
      { es: "pueblo", pt: "povo" },
      { es: "clamó", pt: "clamou", nota: "pretérito de clamar" },
      { es: "cuadra", pt: "quarteirão/quadra" },
      { es: "bajé", pt: "desci", nota: "pretérito de bajar" },
      { es: "ventana", pt: "janela" },
      { es: "vistazo", pt: "olhada" },
      { es: "extraviado", pt: "desviado/perdido" },
      { es: "invitado", pt: "convidado" },
      { es: "mundano", pt: "mundano" },
      { es: "desconcertado", pt: "desconcertado" },
      { es: "banco", pt: "banco (assento)" },
      { es: "perdón", pt: "perdão" },
      { es: "llamado", pt: "chamado/apelo" },
      { es: "predicación", pt: "pregação" },
      { es: "rodillas", pt: "joelhos" },
      { es: "suelo", pt: "chão" },
      { es: "rezó", pt: "orou", nota: "pretérito de rezar" },
      { es: "bendijo", pt: "abençoou", nota: "pretérito irregular de bendecir" },
      { es: "kilómetros", pt: "quilômetros" },
      { es: "anhelo", pt: "saudade/anseio" },
      { es: "congregación", pt: "congregação" },
      { es: "arpa", pt: "harpa" },
      { es: "himnos", pt: "hinos" },
      { es: "alabar", pt: "louvar" },
    ],
        linhas: [
      { es: "Pequeña iglesia de tablas viejas", pt: "Igrejinha de tábuas velhas" },
      { es: "En la carretera de un barrio pobre", pt: "Na beira da estrada de um bairro pobre" },
      { es: "Donde yo vivía", pt: "Onde eu morava" },
      { es: "Había una casa y un pueblo fuerte", pt: "Havia uma casa e um povo forte" },
      { es: "Que clamó a Dios", pt: "Que à Deus clamava" },
      { es: "Ella era tan diferente de los demás", pt: "Das demais era ela tão diferente" },
      { es: "Sé que nunca olvidaré", pt: "Sei que jamais me esquecerei" },
      { es: "De esas personas", pt: "Daquela gente" },
      { es: "Desde esa cuadra, ella era la única pequeña iglesia", pt: "Daquela quadra era ela a única igrejinha" },
      { es: "Cuando me bajé de la carretera, llegué a la ventana", pt: "Ao sair da estrada cheguei na janela" },
      { es: "Para echarle un vistazo", pt: "Prá dar uma olhadinha" },
      { es: "Quería que Dios volviera porque estaba extraviado", pt: "Queria à Deus voltar pois eu estava desviado" },
      { es: "Cuando de repente para entrar fui invitado", pt: "Quando de repente prá entrar fui convidado" },
      { es: "Soy tan mundano, tan desconcertado", pt: "Eu tão mundano, tão desconcertado" },
      { es: "En ese simple banco", pt: "Naquele simples banco" },
      { es: "Casi estaba de luto pidiendo perdón", pt: "Eu estava quase em pranto pedindo perdão" },
      { es: "En aquel lugar santo oí el llamado después de la predicación", pt: "Naquele lugar Santo ouvi o apelo após a pregação" },
      { es: "No pude resistirme. Me caí de rodillas en el suelo", pt: "Não resisti, caí de joelhos ali no chão" },
      { es: "El pastor rezó por mí", pt: "O pastor por mim orou" },
      { es: "Regresé con Jesús", pt: "Eu voltei prá Jesus" },
      { es: "Dios me bendijo (encore)", pt: "Deus me abençoou (bis)" },
      { es: "Camino en la luz hoy", pt: "Ando hoje na luz" },
      { es: "Han pasado muchos años", pt: "Passaram-se muitos anos" },
      { es: "Vivo en la gran ciudad", pt: "Vivo na grande cidade" },
      { es: "Pero los muchos kilómetros", pt: "Mas os muitos kilômetros" },
      { es: "No borres este anhelo", pt: "Não apagam esta saudade" },
      { es: "¿Con qué frecuencia el poder divino", pt: "Quantas vezes o poder divino" },
      { es: "Lo sentí en esa congregación", pt: "Eu sentia naquela congregação" },
      { es: "Mientras canto mis jóvenes himnos", pt: "Ao cantar os meus jovens hinos" },
      { es: "Los del arpa cristiana y el cantante cristiano", pt: "Os da harpa cristã e do cantor cristão" },
      { es: "Gloria, gloria, aleluya (2x)", pt: "Glória, glória, aleluia (2x)" },
      { es: "Deseo a Dios alabar", pt: "Desejo à Deus louvar" },
      { es: "Todavía en mi tierra (3x)", pt: "Ainda na minha terra (3x)" },
      { es: "Nuevos himnos cantan", pt: "Novos hinos cantar" },
      { es: "En la pequeña iglesia de viejas tablas", pt: "Na igrejinha de tábuas velhas" },
    ],
    gramatica: [
      {
        titulo: "Pretérito regular (-é/-ó) para narrar uma conversão",
        explicacao:
          "Verbos -ar regulares no pretérito terminam em -é (eu) e -ó (ele/ela): bajé (de bajar), clamó (de clamar), rezó (de rezar). É o tempo certo pra contar fatos pontuais e concluídos de uma história, como um testemunho.",
        exemplos: [
          { es: "Bajé del autobús cerca de la iglesia.", pt: "Desci do ônibus perto da igreja." },
          { es: "El pastor rezó por toda la familia.", pt: "O pastor orou por toda a família." },
        ],
      },
      {
        titulo: "Pretérito irregular: bendijo (de bendecir)",
        explicacao:
          "Nem todo pretérito segue o padrão regular. \"Bendijo\" vem de \"bendecir\" e não de um verbo -ar comum — precisa ser decorado como exceção, junto com outros irregulares como \"dijo\" (decir) e \"trajo\" (traer).",
        exemplos: [
          { es: "El pastor bendijo a toda la familia.", pt: "O pastor abençoou toda a família." },
        ],
      },
      {
        titulo: "Imperfeito (-ía) para descrever o cenário de fundo",
        explicacao:
          "Assim como em \"Canción del Exilio\", o imperfeito (vivía) descreve uma situação contínua no passado — o pano de fundo da história — enquanto o pretérito narra os fatos pontuais que aconteceram nesse cenário.",
        exemplos: [
          { es: "Yo vivía cerca de un barrio pobre.", pt: "Eu morava perto de um bairro pobre." },
          { es: "Ella vivía lejos de la ciudad.", pt: "Ela morava longe da cidade." },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "O que significa \"bajé\"?",
        opcoes: ["Desci", "Subi", "Corri", "Cheguei"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Bendijo\" é o pretérito irregular de qual verbo?",
        opcoes: ["Bendecir", "Bendejar", "Bendir", "Bendicir"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "Como se diz \"joelhos\" em espanhol?",
        opcoes: ["Rodillas", "Ventanas", "Cuadras", "Bancos"],
        respostaIndex: 0,
      },
      {
        tipo: "completar",
        frase: "El pastor ___ por toda la familia",
        bancoPalavras: ["bendijo", "bendice", "bendecir"],
        resposta: "bendijo",
        traducao: "O pastor abençoou toda a família",
      },
      {
        tipo: "completar",
        frase: "Yo ___ cerca de un barrio pobre",
        bancoPalavras: ["vivía", "viví", "vivir"],
        resposta: "vivía",
        traducao: "Eu morava perto de um bairro pobre",
      },
    ],
  },
  {
    id: "llorando-o-sonriendo",
    ordem: 6,
    titulo: "Llorando o Sonriendo",
    artista: "Léia Miranda",
    icone: "🌦️",
    resumo:
      "Uma música sobre altos e baixos emocionais na fé — ótima pra praticar o gerúndio (ando/-endo) e o pretérito na primeira pessoa.",
    vocabulario: [
      { es: "llorando", pt: "chorando" },
      { es: "sonriendo", pt: "sorrindo" },
      { es: "bajando", pt: "descendo" },
      { es: "subiendo", pt: "subindo" },
      { es: "llevando", pt: "levando" },
      { es: "cruz", pt: "cruz" },
      { es: "infinito", pt: "infinito" },
      { es: "sentimiento", pt: "sentimento" },
      { es: "consuelo", pt: "consolo" },
      { es: "comprensión", pt: "compreensão" },
      { es: "inagotable", pt: "inesgotável" },
      { es: "compasión", pt: "compaixão" },
      { es: "extender", pt: "estender" },
      { es: "medito", pt: "medito", nota: "presente de meditar" },
      { es: "corazón", pt: "coração" },
      { es: "resplandor", pt: "resplendor" },
      { es: "gritar", pt: "gritar" },
      { es: "perdón", pt: "perdão" },
      { es: "entristecí", pt: "entristeci", nota: "pretérito, eu, de entristecer" },
      { es: "ayudarme", pt: "ajudar-me" },
      { es: "vencer", pt: "vencer" },
      { es: "pecado", pt: "pecado" },
      { es: "muerte", pt: "morte" },
    ],
        linhas: [
      { es: "Chorando ou lamentando", pt: "Llorando O Soriendo" },
      { es: "um dia eu estou chorando", pt: "Un día estoy llorando" },
      { es: "Outra já estou sorrindo", pt: "Otro ya estoy sonriendo" },
      { es: "Descendo ou está subindo", pt: "Bajando o esta subiendo" },
      { es: "É assim que eu carrego", pt: "Así yo voy llevando" },
      { es: "A vida e a cruz, mas não deixo meu Jesus", pt: "La vida y la cruz, pero no dejo a mi Jesús" },
      { es: "amor tão infinito", pt: "Amor tan infinito" },
      { es: "que sentimento lindo", pt: "Que sentimiento tan bonito" },
      { es: "Você mostra para mim assim Jesus tanto consolo", pt: "Tu muestras por mim así Jesús tanto consuelo" },
      { es: "E compreensão e compaixão sem fim quando você estende suas mãos Jesus", pt: "Y comprensión y na gotable compasion al extender tus manos Jesús" },
      { es: "quando eu medito então", pt: "Cuando medito entonces" },
      { es: "Eu não sei como te amar", pt: "Que no te se amar" },
      { es: "meu coração chora ao pensar", pt: "Llora mi corazón de pensar" },
      { es: "Eu gostaria de ver você agora", pt: "Quisiera verte ahora" },
      { es: "Em esplendor e luz", pt: "Em resplendor y luz" },
      { es: "poder gritar", pt: "Para poder gritar" },
      { es: "Jesus agora eu quero pedir perdão", pt: "Jesús ahora quiero pedir perdón" },
      { es: "Bem dentro do meu coração", pt: "Pues dentro de my corazón" },
      { es: "te deixei triste", pt: "Yo te entristeci" },
      { es: "Jesus, tanto consolo e compreensão e infinita compaixão eu creio em vós, meu Jesus", pt: "Jesús, tanto consuelo y comprensión y na gotable compasion creo en ti, my Jesús" },
      { es: "Agora eu quero me desculpar", pt: "Ahora quiero pedir perdón" },
      { es: "Bem dentro do meu coração", pt: "Pues dentro de my corazón" },
      { es: "eu te entristeci", pt: "Yo ti entristeci" },
      { es: "Jesus vem me ajudar a ser", pt: "Jesús ven a ayudarme a ser" },
      { es: "Muito forte para vencer o pecado e a morte", pt: "Bien fuerte para vencer el pecado y la muerte" },
      { es: "e só vivo para você", pt: "Y solo vivir para ti" },
      { es: "Jesus", pt: "Jesús" },
    ],
    gramatica: [
      {
        titulo: "Gerúndio (-ando/-iendo) para descrever estados",
        explicacao:
          "Llorando, sonriendo, bajando, subiendo, llevando — todos no gerúndio, descrevendo o que está acontecendo agora. A formação é igual ao português: -ar vira -ando, -er/-ir vira -iendo.",
        exemplos: [
          { es: "Estoy llorando por la noticia.", pt: "Estou chorando pela notícia." },
          { es: "Ella está sonriendo todo el tiempo.", pt: "Ela está sorrindo o tempo todo." },
        ],
      },
      {
        titulo: "Pretérito na primeira pessoa (-í)",
        explicacao:
          "Verbos -er/-ir regulares no pretérito, na pessoa \"eu\", terminam em -í: entristecí (de entristecer), viví (de vivir). É um fato pontual e concluído, diferente do imperfeito.",
        exemplos: [
          { es: "Yo entristecí a mi madre sin querer.", pt: "Eu entristeci minha mãe sem querer." },
          { es: "Viví muchos años en esa ciudad.", pt: "Vivi muitos anos naquela cidade." },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "O que significa \"llorando\"?",
        opcoes: ["Chorando", "Sorrindo", "Cantando", "Dançando"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Entristecí\" está em qual pessoa e tempo?",
        opcoes: ["Eu, pretérito", "Tu, presente", "Ele, futuro", "Nós, imperfeito"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "Como se diz \"perdão\" em espanhol?",
        opcoes: ["Perdón", "Perdido", "Pecado", "Pensar"],
        respostaIndex: 0,
      },
      {
        tipo: "completar",
        frase: "Yo ___ a mi madre sin querer",
        bancoPalavras: ["entristecí", "entristezco", "entristecer"],
        resposta: "entristecí",
        traducao: "Eu entristeci minha mãe sem querer",
      },
      {
        tipo: "completar",
        frase: "Ven a ___ con esto",
        bancoPalavras: ["ayudarme", "ayudándome", "ayudo"],
        resposta: "ayudarme",
        traducao: "Vem me ajudar com isso",
      },
    ],
  },
  {
    id: "vuelvo-al-primer-amor",
    ordem: 7,
    titulo: "Vuelvo al Primer Amor",
    artista: "Débora y Ereni",
    icone: "🕯️",
    resumo:
      "Baseada na mensagem às igrejas de Apocalipse — ótima pra praticar o imperativo (comandos informais) e o futuro simples de advertência.",
    vocabulario: [
      { es: "oídos", pt: "ouvidos" },
      { es: "espíritu", pt: "espírito" },
      { es: "iglesias", pt: "igrejas" },
      { es: "ángel", pt: "anjo" },
      { es: "visión", pt: "visão" },
      { es: "obras", pt: "obras" },
      { es: "corazón", pt: "coração" },
      { es: "sufrido", pt: "sofrido", nota: "particípio de sufrir" },
      { es: "paciencia", pt: "paciência" },
      { es: "valor", pt: "valor/coragem" },
      { es: "dejado", pt: "deixado", nota: "particípio de dejar" },
      { es: "recuerda", pt: "lembra", nota: "imperativo de recordar" },
      { es: "caído", pt: "caído", nota: "particípio de caer, com acento pra quebrar o ditongo" },
      { es: "llorarás", pt: "chorarás", nota: "futuro de llorar" },
      { es: "dolor", pt: "dor" },
      { es: "arrepiéntete", pt: "arrepende-te", nota: "imperativo de arrepentirse, com pronome grudado" },
      { es: "candelero", pt: "candelabro/castiçal" },
      { es: "quitaré", pt: "tirarei", nota: "futuro de quitar" },
      { es: "lugar", pt: "lugar" },
      { es: "vencedor", pt: "vencedor" },
      { es: "árbol", pt: "árvore" },
      { es: "fruto", pt: "fruto" },
    ],
        linhas: [
      { es: "Volver al primer amor", pt: "Volta Ao Primeiro Amor" },
      { es: "Quien tiene oídos, oiga", pt: "Quem tem ouvidos ouça" },
      { es: "Lo que el Espíritu dice a las iglesias", pt: "O que o espírito diz às igrejas" },
      { es: "Escribe al ángel de la iglesia", pt: "Ao anjo da igreja escreve" },
      { es: "A Juan habló Cristo en visión", pt: "Disse o senhor a João" },
      { es: "Conozco yo tus obras", pt: "Conheço as tuas obras" },
      { es: "Conozco tu corazón", pt: "Conheço o teu coração" },
      { es: "Has sufrido con paciencia", pt: "Sofreste com paciência" },
      { es: "Trabajando con valor", pt: "Trabalhaste com valor" },
      { es: "Pero en tu contra tengo que has dejado", pt: "Tenho porém contra ti que deixaste" },
      { es: "A tu primer amor", pt: "O teu primeiro amor" },
      { es: "Recuerda de dónde has caído", pt: "Lembra-te pois onde caíste" },
      { es: "O llorarás de dolor", pt: "Antes que chores de dor" },
      { es: "Arrepiéntete ahora mismo", pt: "Te arrepende enquanto é tempo" },
      { es: "Vuelve al primer amor", pt: "Volta ao primeiro amor" },
      { es: "Recuerda por tanto de dónde has caído", pt: "Lembra-te pois onde caíste" },
      { es: "Antes de llorar de dolor", pt: "Antes que chores de dor" },
      { es: "Arrepentirse mientras aún hay tiempo", pt: "Te arrepende enquanto é tempo" },
      { es: "De vuelta al primer amor", pt: "Volta ao primeiro amor" },
      { es: "Así que recuerda dónde te caíste", pt: "Lembra-te pois donde caíste" },
      { es: "Y Arrepiéntete", pt: "E arrepende-te" },
      { es: "Y practica las primeras obras", pt: "E pratique as primeiras obras" },
      { es: "Pues si no", pt: "Quando não" },
      { es: "Vendré pronto a ti", pt: "Brevemente a ti virei" },
      { es: "Y quitaré tu candelero", pt: "E tirarei do seu lugar" },
      { es: "De su lugar", pt: "O teu castiçal" },
      { es: "Si no te arrepientes", pt: "Se não te arrependeres" },
      { es: "A ti pronto Yo vendré", pt: "Brevemente a ti virei" },
      { es: "Tu candelero de su lugar", pt: "Do lugar o teu castiçal" },
      { es: "Yo el Señor lo quitaré", pt: "Eu o senhor tirarei" },
      { es: "Escucha lo que dice el Espíritu", pt: "Ouve o que diz o espírito" },
      { es: "Hablando a mi iglesia querida", pt: "À minha igreja querida" },
      { es: "Al vencedor le daré a comer", pt: "Ao que vencer lhe darei a comer" },
      { es: "Del fruto del árbol de la vida", pt: "Do fruto da árvore da vida" },
    ],
    gramatica: [
      {
        titulo: "Imperativo afirmativo (tú): recuerda, arrepiéntete",
        explicacao:
          "\"Recuerda\" é o imperativo informal de recordar. \"Arrepiéntete\" também é imperativo, mas de um verbo reflexivo (arrepentirse) — por isso o pronome \"te\" gruda no final, igual vimos com \"herirnos\" em \"Marcas\".",
        exemplos: [
          { es: "Recuerda tu primer amor.", pt: "Lembra do teu primeiro amor." },
          { es: "Arrepiéntete de tus errores.", pt: "Arrepende-te dos teus erros." },
        ],
      },
      {
        titulo: "Futuro simples como advertência",
        explicacao:
          "\"Llorarás\" (chorarás) e \"quitaré\" (tirarei) usam o futuro simples não só pra falar do amanhã, mas como aviso do que vai acontecer se algo não mudar — um uso comum em textos proféticos.",
        exemplos: [
          { es: "Si no cambias, llorarás de dolor.", pt: "Se não mudares, chorarás de dor." },
          { es: "Yo quitaré lo que ya no sirve.", pt: "Eu tirarei o que já não serve." },
        ],
      },
      {
        titulo: "Acento que quebra o ditongo: caído",
        explicacao:
          "Em \"caer\", o particípio seria \"caido\" só de juntar as letras — mas como \"a\" e \"i\" formariam um ditongo, o acento em \"caído\" força a pronúncia em duas sílabas separadas (ca-í-do).",
        exemplos: [
          { es: "Has caído en el mismo error.", pt: "Caíste no mesmo erro." },
        ],
      },
    ],
    exercicios: [
      {
        tipo: "multipla-escolha",
        pergunta: "\"Arrepiéntete\" é uma forma de:",
        opcoes: ["Imperativo", "Futuro", "Gerúndio", "Pretérito"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "O que significa \"candelero\"?",
        opcoes: ["Candelabro/castiçal", "Vela pequena", "Chama", "Lâmpada"],
        respostaIndex: 0,
      },
      {
        tipo: "multipla-escolha",
        pergunta: "\"Caído\" leva acento porque:",
        opcoes: ["Quebra o ditongo entre a-í", "É uma regra aleatória", "Marca plural", "Marca gênero"],
        respostaIndex: 0,
      },
      {
        tipo: "completar",
        frase: "Si no cambias, ___ de dolor",
        bancoPalavras: ["llorarás", "lloras", "llorar"],
        resposta: "llorarás",
        traducao: "Se não mudares, chorarás de dor",
      },
      {
        tipo: "completar",
        frase: "___ tu primer amor",
        bancoPalavras: ["Recuerda", "Recordando", "Recordado"],
        resposta: "Recuerda",
        traducao: "Lembra do teu primeiro amor",
      },
    ],
  },
];

export function getSongById(id: string): Song | undefined {
  return songs.find((song) => song.id === id);
}

export const TOTAL_SECTIONS_PER_SONG = 5;
