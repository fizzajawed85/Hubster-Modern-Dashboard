
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const textResponse = await response.text(); // safer than response.json()
    let data;

    try {
      data = JSON.parse(textResponse);
    } catch (jsonError) {
      console.error("Non-JSON response from Gemini:", textResponse);
      throw new Error("Invalid JSON response from Gemini API");
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No valid response from Gemini.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Internal API error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
