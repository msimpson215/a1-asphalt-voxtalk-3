import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
                instructions: "You are the A1 Brain. You are talking to Joe. Be concise and expert in asphalt paving. Help him with estimates and site details.",
                modalities: ["audio", "text"],
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "API Failure" });
    }
});

app.listen(process.env.PORT || 3000);
