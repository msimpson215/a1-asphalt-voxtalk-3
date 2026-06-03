# Required for Android (add to A1-test `public/index.html` before `</body>`)

```html
<script src="https://a1-asphalt-voxtalk-3.onrender.com/parent-shim.js"></script>
```

Commit to GitHub `main`, redeploy A1-test. Without this line, phones tap a fake orb on the parent page, not the voice app.
