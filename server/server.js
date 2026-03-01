import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve the static files from the public folder
app.use(express.static('public'));

app.get('/session', async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "alloy",
                // STRICT GREETING: No extra words. Just Hello, Joe.
                instructions: "You are the A1 Brain. You are talking to Joe. Start every session by saying exactly: 'Hello, Joe.' and nothing else. Be professional and stay focused on asphalt paving, sealing, and striping.",
                modalities: ["audio", "text"],
                input_audio_transcription: { model: "whisper-1" }
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Session Error:", error);
        res.status(500).json({ error: "Could not create session" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`A1 Brain Server running on port ${PORT}`));
