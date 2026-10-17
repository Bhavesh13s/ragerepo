# Cobra Sigma — rage-bait satire site (fictional, no real person)
**Run:** open `index.html` in a browser. No build, no network needed (Google Fonts optional; fallbacks used offline).
**Safety:** Esc x3 (or footer "Exit rage mode") disables all effects; Mute button on both pages; master gain 0.3; jumpscare is one zoom + sound (fade if reduced-motion); all payment/quiz bits are labelled fake.
## Gate (`js/gate.js`)
1 Dodging Start (`startTrick`) – move within 120px, or click "Give up" · 2 Hold 8s (`hold`) – release/leave/switch tab to fail; 3rd fail makes it 1s · 3 Cookies (`cookies`) – "Manage preferences" = 4 banners · 4 Captcha (`captcha`) – fails twice · 5 Loading (`loading`) 99→12 · 6 Queue + session timer (`queue`) · 7 Jumpscare (`jumpscare`) – idle 6s or 8s into loading, once per session (clear sessionStorage `scared` to retest) · 8 Quiz (`quiz`) → profile.html
## Profile (`js/profile.js`)
Bio typer, Follow/Connect, Like/Dislike, stars, scroll friction + taunts, attention meter, quote popup (15s, 5s lock), "Are you still here?" (20s), notifications, subscribe banner (5 clicks), cursor trail, right-click toast, back-button trap, poll, comment engine (`BANK`, 60+ comments, 5 categories), 47-question exit survey (`#exit`).
Edit all text in `TXT` / `BANK`.
