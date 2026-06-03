#!/usr/bin/env python3
"""Normalize VoxTalk overlay: one fullscreen iframe, no parent fake orb."""

import re
from pathlib import Path

PUBLIC = Path(__file__).resolve().parents[1] / "public"

STANDARD = """<script src="voxtalk.js"></script>
<div id="vox-overlay" onclick="if(event.target===this)closeVox()">
  <button id="vox-close-btn" type="button" onclick="closeVox()" aria-label="Close">&#10005;</button>
  <iframe id="vox-iframe" src="https://a1-asphalt-voxtalk-3.onrender.com/" title="A1 Artificial Human Team Member" allow="microphone *"></iframe>
  <button id="vox-stop-btn" type="button" onclick="closeVox()">Stop Conversation</button>
  <div class="vox-hint">Tap outside to return to the website</div>
</div>"""

OLD_ORB = re.compile(
    r"<div id=\"vox-overlay\"[^>]*>.*?"
    r"<div class=\"vox-orb\"[^>]*>.*?</div>\s*"
    r"<div id=\"vox-start\"[^>]*>.*?</div>\s*"
    r"<iframe id=\"vox-iframe\"[^>]*style=\"display:none;\"[^>]*></iframe>\s*"
    r"<div class=\"vox-hint\">[^<]*</div>\s*"
    r"</div>",
    re.DOTALL,
)

INLINE_POPUP = re.compile(
    r'<div id="vox-overlay" style="display:none;position:fixed;bottom:90px[^"]*"[^>]*>.*?</div>\s*'
    r'<script>document\.addEventListener\("keydown"[^<]*</script>',
    re.DOTALL,
)

DUPLICATE_OVERLAY = re.compile(
    r"(<script src=\"voxtalk\.js\"></script>\s*"
    r"<div id=\"vox-overlay\"[\s\S]*?</div>)\s*"
    r"(?:<script[^>]*></script>\s*)?"
    r"<div id=\"vox-overlay\"[\s\S]*?</div>",
    re.MULTILINE,
)

VOXTALK_SCRIPT = '<script src="voxtalk.js"></script>'


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text

    text = OLD_ORB.sub("", text)
    text = INLINE_POPUP.sub("", text)

    while DUPLICATE_OVERLAY.search(text):
        text = DUPLICATE_OVERLAY.sub(r"\1", text, count=1)

    if 'id="vox-overlay"' not in text:
        if "</body>" in text:
            text = text.replace("</body>", f"{STANDARD}\n</body>", 1)
        changed = text != orig
        if changed:
            path.write_text(text, encoding="utf-8")
        return changed

    if VOXTALK_SCRIPT not in text:
        text = text.replace(
            '<div id="vox-overlay"',
            f"{VOXTALK_SCRIPT}\n<div id=\"vox-overlay\"",
            1,
        )

    # Ensure iframe is fullscreen-capable (no display:none)
    text = re.sub(
        r'(<iframe id="vox-iframe"[^>]*)\s*style="display:none;"',
        r"\1",
        text,
    )
    text = re.sub(
        r'allow="microphone"',
        'allow="microphone *"',
        text,
    )

    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for path in sorted(PUBLIC.glob("*.html")):
        if fix_file(path):
            changed.append(path.name)
    print(f"Updated {len(changed)} files:", ", ".join(changed) or "(none)")


if __name__ == "__main__":
    main()
