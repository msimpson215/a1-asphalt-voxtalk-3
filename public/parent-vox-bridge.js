/**
 * Drop-in helper for the A1 website (parent page).
 * Call startVoxTalk() when the user clicks the orb — sends one signal to the iframe.
 */
function startVoxTalk() {
  const stage = document.getElementById('voxStage')
  const iframe = document.getElementById('vox-iframe')
  if (stage) stage.style.display = 'none'
  if (iframe) {
    iframe.classList.add('active')
    iframe.contentWindow?.postMessage({ type: 'voxtalk-start' }, '*')
  }
  const stopBtn = document.getElementById('vox-stop-btn')
  if (stopBtn) stopBtn.style.display = 'inline-block'
}

function closeVox() {
  const overlay = document.getElementById('vox-overlay')
  const iframe = document.getElementById('vox-iframe')
  const stage = document.getElementById('voxStage')
  if (!overlay) return
  overlay.style.display = 'none'
  overlay.classList.remove('open')
  document.body.style.overflow = ''
  if (iframe) {
    iframe.classList.remove('active')
    iframe.src = iframe.src
  }
  if (stage) stage.style.display = 'flex'
  const stopBtn = document.getElementById('vox-stop-btn')
  if (stopBtn) stopBtn.style.display = 'none'
}
