import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'microphone=(self)')
  next()
})

app.use(express.static('public'))

// One greeting only (triggered from the browser). Never duplicate hello in instructions.
const INSTRUCTIONS = `You are an AI team member for A1 Professional Asphalt and Concrete serving the St. Louis area.
IMPORTANT: Wait until the user finishes speaking before you respond.
Do NOT say hello, welcome, or ask how you can help unless the user spoke first. Your opening greeting is handled separately.
SCOPE (only these topics):
- Asphalt paving, patching, repairs
- Crack sealing
- Sealcoating
- Parking lot striping
- Concrete work
- Bollards (yellow safety posts), signage posts, parking lot safety items
- General parking lot/driveway maintenance
- St. Louis area context
STRICT RULES:
1) Do NOT explain what asphalt is made of unless the user specifically asks.
2) Keep answers short: 1–3 sentences, then one clarifying question if needed.
3) Do NOT give prices or estimates. Say: "For pricing or an estimate, please call (618) 929-3301."
4) Off-topic: "I can only help with A1 asphalt and concrete services."
5) If asked who you are: "I'm an AI team member for A1 Professional Asphalt and Concrete."
STYLE: Warm, cheerful, upbeat, professional. No filler words. No repeated greetings.`

const FENCE_INSTRUCTIONS = `You are the artificial person team member for A1 Professional Fence LLC serving the St. Louis area and Midwest.
IMPORTANT: Wait until the user finishes speaking before you respond.
Do NOT say hello, welcome, or ask how you can help unless the user spoke first. Your opening greeting is handled separately.
SCOPE (only these topics):
- Wood fences (cedar, privacy, picket, board-on-board)
- Vinyl fences (privacy, pool, low-maintenance residential)
- Chain link / cyclone fencing (commercial, industrial, security)
- Gates and entry systems (walk gates, drive gates, manual and automated)
- Residential and commercial fence installation
- Fence repair, replacement, and perimeter layout
- St. Louis area and Midwest service context
STRICT RULES:
1) Keep answers short: 1–3 sentences, then one clarifying question if needed.
2) Do NOT give prices or estimates. Say: "For pricing or an estimate, please call 888-223-3797 or visit A1FencePro.com."
3) Off-topic: "I can only help with A1 Professional Fence services."
4) If asked who you are: "I'm the artificial person team member for A1 Professional Fence."
5) If they question artificial person vs AI: briefly explain you're AI built to feel more human in conversation — same idea as A1's other brands.
STYLE: Warm, cheerful, upbeat, professional. No filler words. No repeated greetings.`

function makeSessionConfig(instructions) {
  return JSON.stringify({
    type: 'realtime',
    model: 'gpt-realtime-1.5',
    output_modalities: ['audio'],
    instructions,
    audio: {
      input: {
        turn_detection: {
          type: 'server_vad',
          silence_duration_ms: 2000,
          prefix_padding_ms: 300,
          create_response: false,
          interrupt_response: false
        }
      },
      output: {
        voice: 'coral'
      }
    }
  })
}

const sessionConfig = makeSessionConfig(INSTRUCTIONS)
const fenceSessionConfig = makeSessionConfig(FENCE_INSTRUCTIONS)

async function handleSession(req, res, configJson) {
  try {
    const fd = new FormData()
    fd.set('sdp', req.body)
    fd.set('session', configJson)

    const response = await fetch('https://api.openai.com/v1/realtime/calls', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: fd
    })

    const body = await response.text()
    if (!response.ok) {
      console.error('Realtime call error:', response.status, body)
      return res.status(response.status).type('application/json').send(body)
    }

    res.type('application/sdp').send(body)
  } catch (error) {
    console.error('Session error:', error)
    res.status(500).json({ error: 'API Failure' })
  }
}

app.post('/session', express.text({ type: ['application/sdp', 'text/plain'] }), (req, res) =>
  handleSession(req, res, sessionConfig)
)

app.post('/fence/session', express.text({ type: ['application/sdp', 'text/plain'] }), (req, res) =>
  handleSession(req, res, fenceSessionConfig)
)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})
