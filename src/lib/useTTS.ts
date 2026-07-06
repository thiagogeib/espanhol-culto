export type SpeechRate = "normal" | "lento";

const ELEVEN_API_KEY = import.meta.env["VITE_ELEVEN_KEY"] ?? "";
const DEFAULT_VOICE_ID = "Qrdut83w0Cr152Yb4Xn3";

const RATE_VALUES: Record<SpeechRate, number> = {
  normal: 1,
  lento: 0.65,
};

let currentAudio: HTMLAudioElement | null = null;

/** Resolve quando a fala termina de tocar (não apenas quando começa). */
export async function speak(
  text: string,
  rate: SpeechRate = "normal",
  voiceId: string = DEFAULT_VOICE_ID,
): Promise<boolean> {
  if (currentAudio) {
    currentAudio.pause();
    URL.revokeObjectURL(currentAudio.src);
    currentAudio = null;
  }

  if (!ELEVEN_API_KEY) {
    return fallbackSpeak(text, rate);
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVEN_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      },
    );

    if (!response.ok) {
      return fallbackSpeak(text, rate);
    }

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.playbackRate = RATE_VALUES[rate];
    currentAudio = audio;

    return await new Promise<boolean>((resolve) => {
      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (currentAudio === audio) currentAudio = null;
        resolve(true);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        if (currentAudio === audio) currentAudio = null;
        resolve(false);
      };
      audio.play().catch(() => {
        URL.revokeObjectURL(url);
        if (currentAudio === audio) currentAudio = null;
        resolve(false);
      });
    });
  } catch {
    return fallbackSpeak(text, rate);
  }
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause();
    URL.revokeObjectURL(currentAudio.src);
    currentAudio = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function fallbackSpeak(text: string, rate: SpeechRate): Promise<boolean> {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) {
      resolve(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = RATE_VALUES[rate];
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice =
      voices.find((voice) => voice.lang === "es-ES") ??
      voices.find((voice) => voice.lang.startsWith("es"));
    if (spanishVoice) utterance.voice = spanishVoice;
    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
    window.speechSynthesis.speak(utterance);
  });
}
