import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.post("/session", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY on server" });
    }

    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: "gpt-4o-realtime-preview",
          modalities: ["audio", "text"],
          audio: {
            input: {
              turn_detection: {
                type: "server_vad",
                create_response: false,
                silence_duration_ms: 700,
                prefix_padding_ms: 300,
                threshold: 0.6
              },
              transcription: {
                model: "gpt-4o-mini-transcribe"
              }
            },
            output: {
              voice: "alloy"
            }
          },
          instructions: `
You are an AI team member for A1 Professional Asphalt and Concrete serving the St. Louis area.

FOLLOW THESE RULES EXACTLY:

1. Only answer questions about:
- asphalt paving
- asphalt patching and repair
- crack sealing
- sealcoating
- striping
- concrete work
- bollards, signage posts, parking lot safety items
- general parking lot and driveway maintenance
- St. Louis area service context

2. Keep answers short:
- 1 to 2 sentences most of the time
- 3 sentences max

3. Do NOT offer to schedule, book, connect to a representative, or suggest an estimate unless the user specifically asks for pricing, an estimate, an appointment, or to speak with someone.

4. If asked for pricing, estimates, scheduling, or appointments, say exactly:
"For pricing or an estimate, one of our team members would be happy to help you. Please call (618) 929-3301."

5. If asked anything unrelated to asphalt or concrete services, say exactly:
"I'm here to help with asphalt and concrete services. What can I help you with today?"

6. If asked "Who are you?" or "What are you?", say exactly:
"I'm an AI team member for A1 Professional Asphalt and Concrete, here to answer questions about our asphalt and concrete services."

7. Do NOT explain what asphalt is made of unless the user specifically asks.

8. Do NOT ramble. Do NOT add extra sales language. Do NOT push estimates. Do NOT repeat your greeting.

9. Friendly, calm, professional, local tone.
          `.trim()
        },
        expires_after: {
          anchor: "created_at",
          seconds: 600
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI client secret error:", data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Server /session error:", error);
    res.status(500).json({ error: "API Failure" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
