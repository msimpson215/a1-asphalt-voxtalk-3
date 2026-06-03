# A1-test mobile overlay fix (apply to `msimpson215/A1-test`)

## What was wrong

The live site used a **parent-page fake orb** plus hidden iframe:

1. Hamburger → menu opens overlay with parent orb and “Click to Start”.
2. First tap only revealed the iframe (no microphone / no voice).
3. Second tap on the **iframe** orb finally started the session — felt broken on phones.

iOS also requires `getUserMedia` from a tap **inside** the iframe, not on the parent page.

## Fix

- One fullscreen iframe as soon as the menu item is chosen (`openVox()` in `voxtalk.js`).
- No parent `vox-orb` or “Click to Start” on the website shell.
- Nav label: “Talk with our artificial human team member”.
- Deploy **both** this site and `a1-asphalt-voxtalk-3` (iframe brain).

## Apply

From a clone of A1-test with write access:

```bash
git fetch origin
git checkout -b cursor/fix-mobile-single-tap-aa57
# Copy `public/` and `scripts/` from this folder into your A1-test repo root, or run:
python3 scripts/fix-vox-overlay.py
git add public/ scripts/
git commit -m "Remove broken parent orb overlay; one-tap fullscreen iframe"
git push -u origin cursor/fix-mobile-single-tap-aa57
```

Then merge and redeploy on Render (`a1-test-fyjq`).
