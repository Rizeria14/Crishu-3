// ─────────────────────────────────────────────────────────────
// EVERYTHING YOU WANT TO CHANGE LIVES IN THIS FILE.
// Replace [GIRLFRIEND_NAME], [YOUR_NAME], photo paths, and the
// placeholder writing below with your own. See README.md.
// ─────────────────────────────────────────────────────────────

export const names = {
  her: "Crishu",
  you: "Atha",
};

// ── Opening envelope ────────────────────────────────────────
export const envelope = {
  line1: "Something I made for you.",
  line2: "Open it.",
};

// ── Chapter navigation (order = scroll order) ───────────────
export const chapters = [
  { id: "beginning", label: "The Beginning" },
  { id: "book", label: "The Diary" },
  { id: "garden", label: "The Garden" },
  { id: "memories", label: "The Memories" },
  { id: "constellation", label: "The Sky" },
  { id: "letter", label: "The Letter" },
  { id: "finale", label: "The Finale" },
];

// ── Chapter 1 — The Beginning ────────────────────────────────
export const beginning = {
  lines: ["Before you,", "I didn't know a person could feel like home."],
  subtitle: "This is the story of how that changed.",
  photos: [
    { src: "/public/images/her-1.jpeg", alt: "her, laughing at something off camera", rotate: -3 },
    { src: "/public/images/her-2.jpeg", alt: "her, quiet morning light", rotate: 4 },
    { src: "/public/images/her-3.jpeg", alt: "her, mid-sentence, mid-smile", rotate: -1 },
  ],
};

// ── Chapter 2 — The Diary (interactive book) ─────────────────
// Each page turns like a real diary page. `pressedFlower` adds a
// clickable pressed-flower doodle that reveals `secret` on click.
export const diaryPages = [
  {
    date: "page one",
    title: "the day I realized",
    body: `I didn't fall in love with you all at once. It happened in pieces — small, quiet moments I didn't recognize as anything important until I looked back and realized they added up to everything.

It was the way you listened, actually listened, like what I was saying mattered.`,
    pressedFlower: true,
    secret: "this is still my favorite thing about you.",
  },
  {
    date: "page two",
    title: "the ordinary days",
    body: `It was how you made ordinary days feel like something worth remembering. A game. A movie. A late-night phone call. Doing nothing at all, except being near you.

I fell in love with your softness and your strength, and the way you never made me choose which one you'd show me.`,
    pressedFlower: false,
  },
  {
    date: "page three",
    title: "who you are when no one's watching",
    body: `I fell in love with how safe I feel telling you the truth. I fell in love with the person you are when no one's watching — because that's who you really are, and she's the best person I know.

I could write a hundred more pages and still not get to the bottom of it.`,
    pressedFlower: true,
    secret: "you have no idea how much you mean to me.",
  },
  {
    date: "page four",
    title: "still true",
    body: `So I'll just say this: I love you. I love you in the quiet moments and the loud ones, on your best days and your hardest ones.

I choose you, still, and I'll keep choosing you.`,
    pressedFlower: false,
  },
];

// ── Chapter 3 — The Garden ────────────────────────────────────
// Positions are percentages of the garden's width/height, so the
// layout stays intentional at any screen size. Add as many flowers
// as you'd like — a few marked `secret: true` are tucked away for
// her to discover rather than being obvious from the first glance.
export const gardenFlowers = [
  { id: "laugh", label: "your laugh", message: "It's the sound my whole day rearranges itself around.", x: 18, y: 30, size: 64, variant: 1 },
  { id: "eyes", label: "your eyes", message: "They give away everything you're feeling before you say a word.", x: 40, y: 55, size: 78, variant: 2 },
  { id: "kindness", label: "your kindness", message: "You are gentle with people who don't always deserve it — and still gentle with me.", x: 65, y: 25, size: 58, variant: 1 },
  { id: "chaos", label: "your chaos", message: "You make disorganized look like a personality I'd choose every time.", x: 80, y: 60, size: 66, variant: 2 },
  { id: "ordinary", label: "ordinary days with you", message: "You make ordinary days feel like something worth writing down.", x: 30, y: 78, size: 60, variant: 1 },
  { id: "voice", label: "your voice", message: "I could listen to you talk about absolutely nothing and still feel like I'm listening to my favorite sound in the world.", x: 55, y: 82, size: 70, variant: 2 },
  { id: "love", label: "the way you love", message: "You don't treat love like something temporary. Being loved by you feels like being handed something rare.", x: 88, y: 20, size: 54, variant: 1 },
  {
    id: "secret-1",
    label: "?",
    message: "you found one of my secrets ♡ — there's a reason I keep choosing you, and it's every single thing on this page.",
    x: 8,
    y: 55,
    size: 30,
    variant: 2,
    secret: true,
  },
];

// ── Chapter 4 — Memories (film-strip archive) ─────────────────
export const filmFrames = [
  {
    id: "f1",
    src: "/public/images/memory-1.jpeg",
    date: "",
    location: "",
    memory: "",
    caption: "<3",
  },
  {
    id: "f2",
    src: "/public/images/memory-2.jpeg",
    date: "",
    location: "",
    memory: "",
    caption: "<3",
  },
  {
    id: "f3",
    src: "/public/images/memory-3.jpeg",
    date: "",
    location: "",
    memory: "",
    caption: "<3",
  },
  {
    id: "f4",
    src: "/public/images/memory-4.jpeg",
    date: "",
    location: "",
    memory: "",
    caption: "<3",
  },
  {
    id: "f5",
    src: "/public/images/memory-5.jpeg",
    date: "",
    location: "",
    memory: "",
    caption: "<3",
  },
];

// the soundtrack to the archive above
export const songs = [
  {
    title: "Alfaaz",
    artist: "Hamza Malik",
    art: "/images/song-1.jpg",
    note: "This was playing the first time I thought, quietly, 'I could love her for a long time.'",
    link: "https://open.spotify.com/track/0tW2gwaRzFQQrgr2UCO56G?si=b787345dcb094e4f",
  },
  {
    title: "Aarzu",
    artist: "Asim Azhar",
    art: "/images/song-2.jpg",
    note: "It says everything I mean when I say I love all of you — not just the easy parts.",
    link: "https://open.spotify.com/track/1GnZH0wek1fkGCQnUsK6D0?si=c6c40f22254b48fb",
  },
  {
    title: "Rang Lageya",
    artist: "Mohit Chauhan",
    art: "/images/song-3.jpg",
    note: "It sounds like the way you look when the light hits you just right, which is honestly always.",
    link: "https://open.spotify.com/track/7mSzDKajY2wUtstQSLdzMK?si=9412aa93924e4d82",
  },
];

// ── Chapter 5 — The Sky (constellation) ───────────────────────
// Positions are percentages. Once every star is opened they link
// together to form one final shape.
export const stars = [
  { id: "s1", x: 20, y: 25, label: "your patience", message: "You explain things twice without ever making me feel slow for asking." },
  { id: "s2", x: 38, y: 15, label: "your honesty", message: "I never have to wonder where I stand with you." },
  { id: "s3", x: 55, y: 30, label: "your warmth", message: "You make cold rooms and hard days feel survivable." },
  { id: "s4", x: 70, y: 18, label: "your steadiness", message: "You don't disappear when things get difficult. You stay." },
  { id: "s5", x: 82, y: 35, label: "your softness", message: "You're strong in the ways that matter and soft in the ways I need." },
  { id: "s6", x: 50, y: 50, label: "us", message: "All of it — every quality, every quiet moment — points back to this: I choose you." },
];

// ── Chapter 6 — The Locked Letter ─────────────────────────────
export const lockedLetter = {
  intro: "There is one thing I never managed to say properly.",
  title: "If I Could Tell You Everything",
  body: `My love,

If I could tell you everything I feel, I don't think there would be enough pages, or enough nights, or enough words in any language to hold all of it. But I'm going to try anyway, because you deserve to have it written down somewhere — proof, in case you ever need reminding.

I love the way you make hard days feel survivable just by being on the other end of the phone. I love that you say what you mean, even when it's inconvenient, because I never have to wonder where I stand with you.

I love the life we're quietly building — one late night, one inside joke, one ordinary Tuesday at a time. None of it is loud. Most of it would look unremarkable to anyone else. But to me, it's the best thing I've ever been part of.

I don't know how to explain what you mean to me in a way that does it justice. So I'll just tell you the truth, as plainly as I know how.

I love you.`,
  closing: ["I love you.", "more than these words could ever explain."],
};

// ── Chapter 7 — The Finale ────────────────────────────────────
export const finale = {
  lines: ["After everything I've seen,", "I'd still choose you.", "Every time."],
  buttonLabel: "one last thing...",
  finalFlowerMessage:
    "If you ever forget how loved you are, come back here. I'll remind you. Always yours.",
  credit: {
    line: "made with an unreasonable amount of love.",
    chapterNote: "Chapter One.",
  },
};

// discreet background music, never autoplayed with sound
export const musicPlayer = {
  title: "Alfaaz",
  artist: "Hamza Malik",
  src: "/audio/our-song.mp3",
};
