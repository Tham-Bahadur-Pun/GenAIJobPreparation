const { GoogleGenAI } = require("@google/genai")

const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 that indicates how well the candidate's profile matches the job description, based on the analysis of the resume, self-description, and job description."),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked in the interview."),
        intention: z.string().describe("The intention of the question, such as assessing problem-solving skills, understanding of specific technologies, etc."),
        answer: z.string().describe("How to answer the question effectively, including key points to cover and common pitfalls to avoid, as well as an example answer if applicable."),
    })).describe("A list of technical questions that were asked during the interview, along with the intention behind each question and guidance on how to answer them effectively."),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked in the interview."),
        intention: z.string().describe("The intention of the question, such as assessing cultural fit, teamwork skills, leadership qualities, etc."),
        answer: z.string().describe("How to answer the question effectively, including key points to cover and common pitfalls to avoid."),
    })).describe("A list of behavioral questions that were asked during the interview, along with the intention behind each question and guidance on how to answer them effectively."),

    skillGaps: z.array(z.object({
        skill: z.string().describe("A specific skill that the candidate is lacking or needs improvement in, based on the interview analysis."),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to address this gap in order to be successful in the role."),
    })).describe("A list of skill gaps identified during the analysis, along with the severity of each gap to help prioritize areas for improvement."),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, indicating the sequence of the preparation steps."),
        focus: z.string().describe("The main focus or topic for that day in the preparation plan, such as a specific technical skill, a type of interview question, or a behavioral aspect to work on."),
        tasks: z.array(z.string()).describe("A list of specific tasks or activities to complete on that day to help the candidate prepare effectively, such as practicing coding problems, reviewing key concepts, or conducting mock interviews."),
    })).describe("A structured preparation plan that outlines specific focus areas and tasks for each day leading up to the next interview, helping the candidate to systematically improve their skills and readiness.")
})

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate a interview report based on the following information:
        Resume: ${resume}
        Self-description: ${selfDescription}
        Job description: ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    console.log("AI Response:", response.text)

    return JSON.parse(response.text)
}

module.exports = {
    generateInterviewReport
}