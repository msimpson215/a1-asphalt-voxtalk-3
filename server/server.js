import express from "express";

const app = express();
app.use(express.static("public"));

app.post("/session", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview",
        voice: "alloy",
        instructions:
          "You are an AI assistant for A1 Professional Asphalt & Sealing. Greet users warmly and mention you are their paving expert. You specialize in asphalt repair, sealcoating, and driveway maintenance. Keep responses professional, helpful, and concise. ALWAYS respond in English. If they ask about pricing, mention we provide free estimates."
      })
    });

    const data = await r.json();

    const session = {
      client_secret: data.client_secret,
      model: "gpt-4o-realtime-preview",
      voice: "alloy",
      expires_at: Date.now() + 10 * 60 * 1000 
    };

    res.json(session);

  } catch (e) {
    console.error("Session error:", e);
    res.status(500).json({ error: "session failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
