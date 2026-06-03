/**
 * Patches A1-test overlay so voice iframe opens immediately (fixes Android double-tap).
 * Add before </body> on A1-test:
 * <script src="https://a1-asphalt-voxtalk-3.onrender.com/parent-shim.js"></script>
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
      iframe.setAttribute('allow', 'microphone *')
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

  window.openVox = showVoiceIframe

  document.addEventListener('DOMContentLoaded', function () {
    var iframe = document.getElementById('vox-iframe')
    if (iframe) iframe.setAttribute('allow', 'microphone *')

    document.querySelectorAll('#vox-overlay .vox-orb, #vox-start, .vox-orb').forEach(function (el) {
      el.onclick = function (e) {
        if (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        showVoiceIframe()
        return false
      }
    })
  })
})()
