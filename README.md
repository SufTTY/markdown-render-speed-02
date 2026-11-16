# markdown-render-speed-02

A drop-in replacement for [marked](https://github.com/markedjs/marked) v18.1.3 tuned for the make.fun bounty **markdown-render-speed-02**: `parse(markdown)` returns byte-exact the same HTML as marked's defaults (GFM on), faster.

## Approach

`parse.js` vendors marked 18.1.3 (see `vendor/marked/` for its MIT LICENSE and NOTICE) with profile-guided, cheap-gated fast paths that fall back to the original behavior whenever their pre-check fails:

- **Plain-segment inline fast path** — an inline segment containing none of ``\ < [ ! * _ ~ ` & @ ``, no `mailto:`/`xmpp:`/`http`/`https`/`ftp`/`www.` and no two-space line break is emitted as a single plain text token without running the tokenizer cascade.
- **Conditional mask replaces** — the two whole-string `String.replace` passes in the Lexer's mask method now run only when their patterns could possibly match: the punctuation-outside-code replace only when the string contains a backtick or backslash, the block-skip replace only when it contains a backtick, tilde, `[` or `<`.
- **Skipped mask-state bookkeeping** — the mask-state push/pop around inline tokenization is skipped entirely when masking is a no-op (consumers compute the state on demand).
- **Combined list-continuation regex** — the six per-line `test()` calls in `list()` are fused into one memoized case-insensitive regex per (indent level, pedantic) with every alternative kept exactly, including the next-bullet's required trailing group and the heading's `#{1,6}(?:\s|$)`.

## Validation

Byte-exact against marked 18.1.3 on the practice set (720/720) and three freshly seed-generated sets (720/720 each): zero mismatches everywhere. Interleaved benchmark over the practice set: median speedup ≈ **1.07×** over pristine marked.

## Badges

[![make.fun · markdown-render-speed-02](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/SufTTY/markdown-render-speed-02/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![reward](https://make.fun/badge/markdown-render-speed-02/SufTTY/markdown-render-speed-02/reward.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
