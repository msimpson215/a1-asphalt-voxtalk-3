/**
 * A1 website overlay fix — load from a1-test before </body>:
 * <script src="https://a1-asphalt-voxtalk-3.onrender.com/parent-shim.js"></script>
 *
 * Menu opens the voice iframe immediately (no fake parent orb / double tap).
 */
(function () {
  function showVoiceIframe() {
    var overlay = document.getElementById('vox-overlay')
    if (!overlay) return

    overlay.classList.add('open')
    overlay.style.display = 'flex'

    var iframe = document.getElementById('vox-iframe')
    var orb = document.querySelector('#vox-overlay .vox-orb') || document.querySelector('.vox-orb')
    var start = document.getElementById('vox-start')

    if (iframe) {
      iframe.style.display = 'block'
      iframe.style.position = 'fixed'
      iframe.style.inset = '0'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.style.zIndex = '10001'
    }
    if (orb) orb.style.display = 'none'
    if (start) start.style.display = 'none'

    try {
      iframe.contentWindow.postMessage({ type: 'voxtalk-start' }, '*')
    } catch (e) {}
  }

  function closeVoice() {
    var overlay = document.getElementById('vox-overlay')
    if (!overlay) return
    overlay.style.display = 'none'
    overlay.classList.remove('open')
    var iframe = document.getElementById('vox-iframe')
    if (iframe) iframe.style.display = 'none'
    if (typeof window.closeVox === 'function' && window.closeVox !== closeVoice) {
      try { window.closeVox() } catch (e) {}
    }
  }

  window.openVox = showVoiceIframe
  window.closeVox = closeVoice

  function wireClicks() {
    document.querySelectorAll('#vox-overlay .vox-orb, #vox-start, .vox-orb').forEach(function (el) {
      el.onclick = function (e) {
        if (e) e.preventDefault()
        showVoiceIframe()
        return false
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireClicks)
  } else {
    wireClicks()
  }
})()
