# [a tiny universe, built for her]

A cinematic, chapter-based love letter — an envelope that opens into a diary, a garden,
a film archive, a night sky, a locked letter, and a finale. Built as one continuous
scroll, not a normal website.

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). For a production build:

```bash
npm run build
npm run preview
```

## The seven chapters

1. **The Beginning** (`src/sections/TheBeginning.jsx`) — choreographed opening lines + photo trio.
2. **The Diary** (`InteractiveBook.jsx`) — a book that opens, with pages that physically turn. Some pages have a clickable pressed flower that reveals a hidden note.
3. **The Garden** (`FlowerGarden.jsx`) — click any flower to bloom it and reveal a message. One is hidden (`secret: true`) for her to find.
4. **The Memories** (`MemoryFilmStrip.jsx`) — a draggable film strip; click a frame to zoom into that memory. The soundtrack sits underneath.
5. **The Sky** (`Constellation.jsx`) — click stars to light them; once several are open they connect into one shape.
6. **The Letter** (`LockedLetterScene.jsx`) — drag the key into the lock to unlock the main letter.
7. **The Finale** (`FinalScene.jsx`) — converges into one closing scene with a final flower reveal.

A floating flower in the bottom-left corner (`ChapterNav.jsx`) opens a menu to jump to any chapter directly.

## Making it hers

Everything text/photo/data-related lives in **`src/data/content.js`** — you don't need
to touch component code for any of the following:

- `names` — replace `[GIRLFRIEND_NAME]` and `[YOUR_NAME]`
- `envelope` — the two opening lines
- `beginning` — the opening chapter's lines, subtitle, and three photos
- `diaryPages` — add/edit/reorder diary pages; each is `{ date, title, body, pressedFlower, secret }`
- `gardenFlowers` — add flowers anywhere with `{ id, label, message, x, y, size, variant }` (x/y are percentages); add `secret: true` to hide one until found
- `filmFrames` — the memory archive; add `{ src, date, location, memory, caption }`
- `songs` — the soundtrack; `link` opens Spotify/YouTube
- `stars` — the constellation; `{ x, y, label, message }`
- `lockedLetter` — the main love letter text
- `finale` — closing lines and the final flower's message

## Adding real photos

Drop images into `public/images/` matching the paths already referenced in `content.js`
(e.g. `public/images/her-1.jpg`). Until a real photo exists at that path, the site shows
an elegant placeholder frame instead of a broken image.

## Adding music

Drop an mp3 into `public/audio/` and point `musicPlayer.src` at it in `content.js`. The
corner player never autoplays with sound.

## Structure

```
src/
  data/content.js      — all editable text, photos, flowers, stars, memories, songs
  components/          — reusable pieces (EnvelopeIntro, ChapterNav, Photo, Song, LoveLetter…)
  sections/             — one file per chapter, in the order they appear in App.jsx
  App.jsx               — chapter order + the envelope gate
```

To reorder chapters, edit the imports/order in `App.jsx` **and** the `chapters` array in
`content.js` (so the nav menu and the `id`s used for scroll-to-chapter stay in sync).

Built with React, Vite, Tailwind CSS, and Framer Motion. Respects `prefers-reduced-motion`.

## Scope note

This build focuses on making seven chapters feel genuinely interactive and well-crafted
rather than doing a shallow pass at everything in the original brief. Two ideas from the
brief aren't built yet: the **Time Capsule** (future-dated messages) and the **"Our
World" map**. Both would slot in cleanly as new chapters using the same pattern as the
others — ask and they can be added.
