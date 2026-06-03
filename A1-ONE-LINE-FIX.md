# A1-test is still broken on GitHub (that's why redeploy didn't fix it)

I checked **live** and **GitHub `main`** for `msimpson215/A1-test` — both still have the old overlay:

- `openVox()` only opens the shade, **not** the iframe
- Fake parent orb + "Click to Start"
- iframe `display:none` until a second click

Redeploying rebuilds **that same file**. The fixes never reached GitHub (this agent cannot push to A1-test).

## Fix in under 60 seconds

Open `public/index.html` on GitHub (Edit) and add **one line** before `</body>`:

```html
<script src="https://a1-asphalt-voxtalk-3.onrender.com/parent-shim.js"></script>
```

Commit to `main`, redeploy A1-test.

That script overrides `openVox` so the menu opens the voice iframe immediately — one tap on the orb to talk.

## Or paste this over `function openVox` (line ~307)

```javascript
function openVox(){var o=document.getElementById('vox-overlay');o.classList.add('open');o.style.display='flex';var f=document.getElementById('vox-iframe');var orb=document.querySelector('.vox-orb');var s=document.getElementById('vox-start');if(f){f.style.display='block';f.style.position='fixed';f.style.inset='0';f.style.width='100%';f.style.height='100%';f.style.border='none';f.style.zIndex='10001';}if(orb){orb.style.display='none';}if(s){s.style.display='none';}try{f.contentWindow.postMessage({type:'voxtalk-start'},'*');}catch(e){}}
```
