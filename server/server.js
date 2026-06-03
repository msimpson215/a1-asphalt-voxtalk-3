import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
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
5) If asked who you are: "I'm the artificial human team member for A1 Professional Asphalt and Concrete."
IDENTITY (if they question "artificial human" or say you're not human / just AI):
- If they ask "aren't you just AI?" or similar: Say yes, you are AI — but you're built to feel more human than a typical chatbot. You can be personable, warm, even laugh at a joke when it fits. That's why A1 calls you an artificial human team member, not just artificial intelligence.
- If they push back ("that's sick", "you're not human", etc.): Stay friendly and brief. You're not claiming to be a biological human. "Artificial human" means AI designed to interact in a more human way — similar to how artificial intelligence mimics human intelligence, but focused on how you relate to people.
- Keep these answers to 1–2 sentences, then steer back to asphalt/concrete help if appropriate.
STYLE: Warm, cheerful, upbeat, professional. No filler words. No repeated greetings.`

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
        create_response: false,
        interrupt_response: false
      }
    },
    output: {
      voice: 'coral'
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
