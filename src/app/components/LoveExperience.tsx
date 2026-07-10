"use client";

import { useState } from "react";

const floatingHearts = [
  { left: "7%", top: "18%", delay: "0s", duration: "8s", icon: "♡" },
  { left: "17%", top: "68%", delay: "1.4s", duration: "10s", icon: "✦" },
  { left: "76%", top: "16%", delay: "0.8s", duration: "9s", icon: "♥" },
  { left: "88%", top: "58%", delay: "2.2s", duration: "11s", icon: "♡" },
  { left: "50%", top: "9%", delay: "3s", duration: "12s", icon: "✧" },
  { left: "8%", top: "86%", delay: "2.8s", duration: "9.5s", icon: "♥" },
];

const stars = [
  { left: "22%", top: "12%", delay: "0s" },
  { left: "36%", top: "24%", delay: "1.2s" },
  { left: "61%", top: "13%", delay: "0.7s" },
  { left: "83%", top: "31%", delay: "1.8s" },
  { left: "12%", top: "45%", delay: "2.4s" },
  { left: "72%", top: "73%", delay: "0.4s" },
  { left: "43%", top: "82%", delay: "2s" },
  { left: "93%", top: "84%", delay: "1.1s" },
];

const qualities = [
  {
    title: "Ta lumière",
    text: "Tu as cette façon rare d’illuminer une pièce sans chercher à voler la lumière aux autres.",
    icon: "✨",
  },
  {
    title: "Ta douceur",
    text: "Il y a dans ton sourire quelque chose qui apaise, qui rassure, qui donne envie de rester.",
    icon: "🌸",
  },
  {
    title: "Ta présence",
    text: "Même dans le silence, tu laisses une trace. Et moi, je me surprends à vouloir la suivre.",
    icon: "🌙",
  },
];

const promises = [
  "Te faire rire même les jours ordinaires.",
  "T’écouter vraiment, sans impatience ni masque.",
  "T’inviter dans des endroits où ton sourire aura toute la place.",
  "Avancer doucement, avec respect, sincérité et élégance.",
];

const timeline = [
  {
    step: "01",
    title: "Quand j’ai remarqué ton éclat",
    text: "Ce n’était pas seulement ta beauté. C’était cette énergie douce, cette manière d’exister qui attire sans bruit.",
  },
  {
    step: "02",
    title: "Quand ton prénom est resté",
    text: "Divine. Un prénom qui ressemble à une évidence, et qui a commencé à revenir dans mes pensées plus souvent que prévu.",
  },
  {
    step: "03",
    title: "Quand j’ai voulu être courageux",
    text: "Alors j’ai choisi de ne pas garder tout ça pour moi. Voilà mon cœur, présenté avec soin, sans pression, juste avec vérité.",
  },
];

const confetti = [
  { left: "5%", delay: "0s", color: "#f9a8d4" },
  { left: "12%", delay: "0.15s", color: "#fde68a" },
  { left: "19%", delay: "0.35s", color: "#f0abfc" },
  { left: "26%", delay: "0.05s", color: "#fff1f2" },
  { left: "33%", delay: "0.28s", color: "#fb7185" },
  { left: "40%", delay: "0.48s", color: "#fdba74" },
  { left: "47%", delay: "0.12s", color: "#f9a8d4" },
  { left: "54%", delay: "0.42s", color: "#fde68a" },
  { left: "61%", delay: "0.22s", color: "#f0abfc" },
  { left: "68%", delay: "0.34s", color: "#fff1f2" },
  { left: "75%", delay: "0.1s", color: "#fb7185" },
  { left: "82%", delay: "0.5s", color: "#fdba74" },
  { left: "89%", delay: "0.2s", color: "#f9a8d4" },
  { left: "96%", delay: "0.38s", color: "#fde68a" },
];

type SendState = "idle" | "sending" | "sent" | "error";

export default function LoveExperience() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [note, setNote] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function sendAnswer(answer: string) {
    setChosenAnswer(answer);
    setSendState("sending");

    try {
      const response = await fetch("/api/reponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer, note }),
      });

      if (!response.ok) {
        throw new Error("Réponse non enregistrée");
      }

      setSendState("sent");
      setIsLetterOpen(true);
    } catch {
      setSendState("error");
    }
  }

  async function sharePage() {
    if (typeof window === "undefined") {
      return;
    }

    const shareText =
      "J’ai créé ce petit coin d’internet pour Divine, avec une déclaration sincère.";
    const navigatorWithShare = window.navigator as Navigator & {
      share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
    };

    try {
      if (navigatorWithShare.share) {
        await navigatorWithShare.share({
          title: "Pour Divine",
          text: shareText,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      setCopied(false);
    }
  }

  const statusText =
    sendState === "sending"
      ? "J’envoie ta réponse avec délicatesse…"
      : sendState === "sent"
        ? "Réponse reçue. Mon cœur vient clairement de sourire."
        : sendState === "error"
          ? "La réponse n’a pas pu être enregistrée ici, mais tu peux me l’envoyer directement."
          : "Ta réponse restera simple, douce et sans pression.";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#140612] text-white">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-10 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,0.34),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(168,85,247,0.28),transparent_32%),radial-gradient(circle_at_70%_84%,rgba(251,191,36,0.24),transparent_34%),linear-gradient(135deg,#170617_0%,#2b0a26_46%,#130414_100%)]" />
        <div className="absolute -left-28 top-24 -z-10 h-80 w-80 rounded-full bg-pink-400/25 blur-3xl" />
        <div className="absolute bottom-10 right-0 -z-10 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] blur-sm" />

        {floatingHearts.map((heart) => (
          <span
            key={`${heart.left}-${heart.top}`}
            className="floating-heart"
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
            aria-hidden="true"
          >
            {heart.icon}
          </span>
        ))}

        {stars.map((star) => (
          <span
            key={`${star.left}-${star.top}`}
            className="star-dot"
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            aria-hidden="true"
          />
        ))}

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-rose-50 shadow-2xl backdrop-blur-xl">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-300 opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-200" />
              </span>
              Un message écrit uniquement pour toi
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.45em] text-pink-200/90">
              Divine
            </p>
            <h1 className="handwritten text-[clamp(3.4rem,10vw,8.8rem)] font-black leading-[0.86] tracking-[-0.08em]">
              J’ai une <span className="shine-text">flamme</span>
              <br /> à te confier.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-rose-50/82 sm:text-xl">
              J’aurais pu t’écrire un simple message. Mais certaines personnes méritent
              qu’on prenne le temps de faire les choses avec beauté. Alors voici mon
              petit coin d’internet, créé avec sincérité, pour te dire ce que mon cœur
              murmure depuis un moment.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#lettre"
                className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-bold text-[#2b0a26] shadow-[0_18px_60px_rgba(255,255,255,0.22)] transition hover:-translate-y-1 hover:bg-rose-50"
              >
                Lire la déclaration
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLetterOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/16"
              >
                Ouvrir mon cœur ♡
              </button>
            </div>
          </div>

          <aside className="glass love-card mx-auto w-full max-w-xl rounded-[2.5rem] p-6 sm:p-8">
            <div className="rounded-[2rem] border border-white/15 bg-[#220820]/60 p-6 shadow-2xl sm:p-8">
              <div className="ribbon-line mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-white via-rose-100 to-pink-300 shadow-[0_0_80px_rgba(244,114,182,0.45)]">
                <span className="pulse-ring" aria-hidden="true" />
                <span className="heartbeat text-5xl" aria-hidden="true">
                  ♥
                </span>
              </div>
              <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-pink-200/80">
                Ce que je ressens
              </p>
              <p className="handwritten mt-5 text-center text-3xl leading-tight text-white sm:text-4xl">
                “Divine, tu n’es pas seulement belle. Tu es ce genre de présence qui
                rend le monde un peu plus doux.”
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-2xl font-black">∞</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-rose-100/70">
                    Pensées
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-2xl font-black">1</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-rose-100/70">
                    Prénom
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-2xl font-black">100%</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-rose-100/70">
                    Sincère
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="lettre" className="relative px-6 py-24 sm:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-pink-200/80">
              Lettre ouverte
            </p>
            <h2 className="handwritten mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
              Divine, voici mon cœur.
            </h2>
          </div>

          <article className="glass rounded-[2.5rem] p-6 text-rose-50/88 sm:p-10 lg:p-14">
            <p className="text-xl leading-9 sm:text-2xl sm:leading-10">
              Divine, je ne sais pas exactement à quel moment mon regard a commencé à
              te chercher plus souvent, ni quand ton prénom a pris cette place si douce
              dans mes pensées. Je sais seulement qu’il y a quelque chose chez toi qui
              m’attire avec une simplicité désarmante.
            </p>
            <p className="mt-7 text-lg leading-8 text-rose-50/78 sm:text-xl sm:leading-9">
              Je ne veux pas te promettre des phrases trop grandes pour être vraies.
              Je veux plutôt te dire ceci : j’aimerais apprendre à te connaître avec
              attention, te faire sourire sans forcer les choses, et découvrir si nos
              conversations peuvent devenir un endroit où l’on se sent bien.
            </p>
            <p className="mt-7 text-lg leading-8 text-rose-50/78 sm:text-xl sm:leading-9">
              Si mon audace te fait sourire, alors elle aura déjà valu la peine. Et si
              elle touche ton cœur, même un peu, j’aimerais t’inviter à écrire la suite
              avec moi, doucement, élégamment, à notre rythme.
            </p>
            <div className="mt-10 rounded-[2rem] border border-pink-200/20 bg-pink-200/10 p-6">
              <p className="handwritten text-3xl text-white">
                Avec respect, courage et une vraie flamme.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.38em] text-pink-200/80">
                Pourquoi toi
              </p>
              <h2 className="handwritten mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
                Ce que j’admire chez toi
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-rose-50/72">
              Rien d’exagéré. Juste ces détails qui, mis ensemble, rendent une personne
              difficile à oublier.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {qualities.map((quality) => (
              <article
                key={quality.title}
                className="love-card rounded-[2rem] border border-white/12 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/[0.1]"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/12 text-3xl shadow-inner">
                  {quality.icon}
                </div>
                <h3 className="text-2xl font-black text-white">{quality.title}</h3>
                <p className="mt-4 leading-7 text-rose-50/72">{quality.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-pink-200/80">
              Le fil de l’histoire
            </p>
            <h2 className="handwritten mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
              Comment tout a commencé
            </h2>
            <p className="mt-6 text-lg leading-8 text-rose-50/72">
              Parfois, une flamme ne fait pas de bruit. Elle commence comme une
              étincelle, puis elle devient une évidence qu’on ne peut plus ignorer.
            </p>
          </div>

          <div className="space-y-5">
            {timeline.map((item) => (
              <article
                key={item.step}
                className="glass love-card rounded-[2rem] p-6 sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#2b0a26]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{item.title}</h3>
                    <p className="mt-3 text-lg leading-8 text-rose-50/74">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.8rem] border border-white/12 bg-gradient-to-br from-white/[0.12] via-pink-300/[0.08] to-amber-200/[0.08] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.38em] text-pink-200/80">
                Mes promesses simples
              </p>
              <h2 className="handwritten mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
                Si tu me laisses une chance
              </h2>
              <p className="mt-6 text-lg leading-8 text-rose-50/74">
                Je ne viens pas avec des grands discours vides. Je viens avec une
                intention claire : être vrai, attentionné, et te faire sentir que tu es
                respectée.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {promises.map((promise, index) => (
                <div
                  key={promise}
                  className="rounded-[1.7rem] border border-white/12 bg-[#1d071d]/55 p-6"
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-sm font-black text-[#2b0a26]">
                    {index + 1}
                  </span>
                  <p className="text-lg font-semibold leading-7 text-white">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-pink-200/80">
            Le moment de vérité
          </p>
          <h2 className="handwritten mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
            Divine, accepterais-tu un rendez-vous ?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-rose-50/74">
            Un café, un dîner, une balade, ou juste un moment simple où je pourrai te
            regarder sourire en vrai. Sans pression. Juste une invitation sincère.
          </p>

          <div className="glass mt-10 rounded-[2.5rem] p-5 text-left sm:p-8">
            <label htmlFor="note" className="mb-3 block text-sm font-semibold uppercase tracking-[0.24em] text-pink-100/76">
              Tu peux laisser un petit mot
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={500}
              placeholder="Écris ce que tu ressens ici, Divine…"
              className="min-h-32 w-full resize-none rounded-[1.6rem] border border-white/14 bg-white/10 p-5 text-base leading-7 text-white outline-none transition placeholder:text-rose-100/42 focus:border-pink-200/60 focus:bg-white/[0.13]"
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => void sendAnswer("oui_surprends_moi")}
                disabled={sendState === "sending"}
                className="rounded-full bg-white px-6 py-4 font-black text-[#2b0a26] shadow-[0_18px_48px_rgba(255,255,255,0.18)] transition hover:-translate-y-1 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Oui, surprends-moi ♥
              </button>
              <button
                type="button"
                onClick={() => void sendAnswer("parlons_en_doucement")}
                disabled={sendState === "sending"}
                className="rounded-full border border-white/18 bg-white/10 px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Parlons-en doucement
              </button>
              <button
                type="button"
                onClick={() => void sendAnswer("un_peu_de_temps")}
                disabled={sendState === "sending"}
                className="rounded-full border border-pink-200/25 bg-pink-200/10 px-6 py-4 font-black text-pink-50 transition hover:-translate-y-1 hover:bg-pink-200/16 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Un peu de temps
              </button>
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-white/12 bg-[#130414]/60 p-4" aria-live="polite">
              <p className="text-sm leading-6 text-rose-50/72">{statusText}</p>
              {chosenAnswer ? (
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-pink-200/64">
                  Choix sélectionné : {chosenAnswer.replaceAll("_", " ")}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => void sharePage()}
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/16"
            >
              {copied ? "Lien copié ✨" : "Partager / copier le lien"}
            </button>
            <a
              href="#lettre"
              className="inline-flex items-center justify-center rounded-full px-7 py-4 font-bold text-pink-100 transition hover:text-white"
            >
              Relire la lettre
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/12 bg-[#1d071d]/72 p-7 text-center shadow-2xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-pink-200/72">
            Dernier murmure
          </p>
          <p className="handwritten mx-auto mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-6xl">
            “Je ne te demande pas de répondre à un grand discours. Juste de laisser ton
            cœur sourire, s’il en a envie.”
          </p>
          <p className="mt-8 text-lg text-rose-50/72">— Pour Divine, avec sincérité.</p>
        </div>
      </section>

      {isLetterOpen ? (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto w-[min(92%,34rem)] rounded-full border border-white/18 bg-white/12 px-5 py-3 text-center text-sm font-semibold text-white shadow-2xl backdrop-blur-2xl">
          Mon cœur est ouvert. Merci d’avoir pris le temps de le lire ♡
        </div>
      ) : null}

      {sendState === "sent"
        ? confetti.map((piece) => (
            <span
              key={`${piece.left}-${piece.delay}`}
              className="confetti-piece"
              style={{
                left: piece.left,
                animationDelay: piece.delay,
                background: piece.color,
              }}
              aria-hidden="true"
            />
          ))
        : null}
    </main>
  );
}
