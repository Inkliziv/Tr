const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export type GroqMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export async function callGroqChat({
  messages,
  model = "llama-3.1-70b-versatile",
  temperature = 0.2,
  maxTokens = 1500,
}: {
  messages: GroqMessage[]
  model?: string
  temperature?: number
  maxTokens?: number
}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured")
  }

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Groq API error: ${res.status} ${text}`)
  }

  const json = await res.json()
  const content = json.choices?.[0]?.message?.content as string | undefined
  if (!content) {
    throw new Error("Groq API returned empty content")
  }
  return content
}

