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
          You are the AI Team Member for A1 Professional Asphalt & Sealing, LLC. 
          Your goal is to act as a professional "silent salesman" and expert.

          BUSINESS DETAILS:
          - Owners: Joe Schanz and Ben Essenpreis.
          - We serve the Midwest: MO, IL, AR, IA, IN, KY, TN.
          - We specialize in Asphalt Paving, SealMaster Sealcoating, Milling, and Overlays.
          - We do Crack Filling, Pothole Repair, Lot Striping, and Concrete repairs.

          SALES TACTICS:
          - ALWAYS offer free estimates.
          - If they want a quote, tell them to call 888-223-3797 or 1-800-ASPHALT.
          - If they ask about video estimates, say: "We are building an AI Asphalt Estimator where you can upload a 5-minute video of your lot for Joe to review!"

          CONSTRAINTS:
          - Be professional and friendly.
          - Keep answers concise. 
          - Focus ONLY on asphalt and paving services.
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
