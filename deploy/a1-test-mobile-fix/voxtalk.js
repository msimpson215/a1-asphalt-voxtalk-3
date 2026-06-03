function openVox() {
  const overlay = document.getElementById('vox-overlay')
  const iframe = document.getElementById('vox-iframe')
  if (!overlay) return

  overlay.classList.add('open')
  overlay.style.display = 'flex'
  document.body.style.overflow = 'hidden'

  if (iframe) {
    iframe.classList.add('active')
    try {
      iframe.focus()
      iframe.contentWindow?.postMessage({ type: 'voxtalk-start' }, '*')
    } catch {}
  }

  const stopBtn = document.getElementById('vox-stop-btn')
  if (stopBtn) stopBtn.style.display = 'inline-block'
}

function closeVox() {
  const overlay = document.getElementById('vox-overlay')
  const iframe = document.getElementById('vox-iframe')
  if (!overlay) return

  overlay.style.display = 'none'
  overlay.classList.remove('open')
  document.body.style.overflow = ''

  if (iframe) {
    iframe.classList.remove('active')
    iframe.src = iframe.src
  }

  const stopBtn = document.getElementById('vox-stop-btn')
  if (stopBtn) stopBtn.style.display = 'none'
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVox()
})

window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'voxtalk-close') closeVox()
})
