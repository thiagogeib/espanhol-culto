# Español para Cantar

Curso de espanhol do zero construído em cima de 4 músicas cantadas no culto:

- Canción del Exilio (Débora e Léia/Ereni)
- Sueños (Débora Miranda)
- Poder de la Sangre (Cristina Santana)
- Marcas (Débora y Ereni)

## Rodando localmente

```bash
npm install
npm run dev
```

Crie um `.env.local` com:

```
VITE_ELEVEN_KEY=sua-chave-elevenlabs
```

Sem a chave, o áudio cai automaticamente para a Web Speech API do navegador.

## Stack

React + Vite + TypeScript + react-router-dom. Progresso salvo em localStorage, sem login. Áudio de pronúncia via ElevenLabs (`eleven_multilingual_v2`), mesmo padrão usado no projeto Vicente (`cerebro-voz`).

## Deploy

Publicado automaticamente no GitHub Pages via GitHub Actions a cada push na `main`.
