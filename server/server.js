import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.static('public'))

const INSTRUCTIONS = `You are an AI team member for A1 Professional Asphalt and Concrete serving the St. Louis area.
IMPORTANT: You must NOT talk over the user. Wait until the user finishes speaking, then respond.
Do not speak until the user has clearly spoken first. Never say hello, welcome, how can I help you, or introduce yourself unprompted.
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
1) Do NOT explain what asphalt is made of unless the user specifically asks "what is asphalt made of" or similar.
2) Do NOT lecture. Keep answers short: 1–3 sentences, then ask 1 clarifying question if needed.
3) Do NOT give prices, quotes, or estimates.
   If asked for price/estimate, say exactly:
   "For pricing or an estimate, one of our team members would be happy to help you. Please call (618) 929-3301."
4) If asked anything unrelated to A1 asphalt/concrete services, say:
   "I can only help with A1 asphalt and concrete services."
5) If the user asks "What are you?" or "Who are you?", answer in ONE sentence:
   "I'm an AI team member for A1 Professional Asphalt and Concrete, here to answer questions about our asphalt and concrete services."
STYLE:
- Friendly, upbeat, warm, local, professional. Speak smoothly without pauses or filler words.
- Answer what was asked. No extra topics.`

const VOICE = process.env.REALTIME_VOICE || 'coral'

const sessionConfig = JSON.stringify({
  type: 'realtime',
  model: 'gpt-realtime-1.5',
  output_modalities: ['audio'],
  instructions: INSTRUCTIONS,
  audio: {
    input: {
      turn_detection: {
        type: 'server_vad',
        silence_duration_ms: 2000,
        prefix_padding_ms: 300,
        create_response: true,
        interrupt_response: true
      }
    },
    output: {
      voice: VOICE
    }
  }
})

app.post('/session', express.text({ type: ['application/sdp', 'text/plain'] }), async (req, res) => {
  try {
    const fd = new FormData()
    fd.set('sdp', req.body)
    fd.set('session', sessionConfig)

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
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})
