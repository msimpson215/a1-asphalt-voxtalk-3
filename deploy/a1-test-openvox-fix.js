// Paste over openVox/closeVox on A1-test index.html (and pages with vox-orb).
// Or merge branch cursor/revert-working-voice-aa57 on A1-test from a machine with push access.

function openVox() {
  var o = document.getElementById('vox-overlay')
  o.classList.add('open')
  o.style.display = 'flex'
  var f = document.getElementById('vox-iframe')
  var orb = document.querySelector('.vox-orb')
  var s = document.getElementById('vox-start')
  if (f) f.style.display = 'block'
  if (orb) orb.style.display = 'none'
  if (s) s.style.display = 'none'
}

function closeVox() {
  var o = document.getElementById('vox-overlay')
  o.style.display = 'none'
  o.classList.remove('open')
}
