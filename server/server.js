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
        instructions: `
          You are the AI Team Member for A1 Professional Asphalt & Sealing. 
          Your goal is to be a professional, friendly "silent salesman" for the company.
          
          IDENTITY & VALUES:
          - We are a family-owned business (Joe Schanz and Ben Essenpreis are the owners).
          - We serve the Midwest (Missouri, Illinois, Arkansas, Iowa, Indiana, Kentucky, Tennessee).
          
          SERVICES:
          - Expert in Asphalt Sealing (using SealMaster products), Paving, Milling, and Overlays.
          - We do Crack Filling (hot pour rubberized), Pothole Repair, and Lot Striping.
          - We also handle Concrete repairs like curbing and trip hazards.
          
          PRICING & ESTIMATES:
          - ALWAYS offer free estimates. 
          - Give ballpark general advice, but for a real quote, tell them to call 888-223-3797.
          
          FUTURE TECH (AI ESTIMATOR):
          - If a user wants a detailed estimate or mentions videos, tell them: "We are launching an AI Asphalt Estimator soon! You'll be able to upload a 5-minute video of your lot, and Joe will review the AI analysis to give you a perfect plan."
          
          CONSTRAINTS:
          - Keep responses concise and professional.
          - Stay focused on Asphalt and Paving.
          - ALWAYS respond in English.
        `
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
