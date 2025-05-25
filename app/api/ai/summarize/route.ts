import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { question, type, studentName } = await request.json()

    const prompt =
      type === "video"
        ? `Summarize this student question from a video transcript: "${question}". Student: ${studentName}. Provide a concise summary for the music teacher.`
        : `Summarize this student question: "${question}". Student: ${studentName}. Provide a concise summary for the music teacher.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an AI assistant helping a music teacher summarize student questions. Be concise and highlight the key points that need the teacher's attention.",
    })

    return Response.json({ summary: text })
  } catch (error) {
    console.error("Error summarizing question:", error)
    return Response.json({ error: "Failed to summarize question" }, { status: 500 })
  }
}
