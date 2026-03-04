const { GoogleGenAI } = require("@google/genai")

const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

// function safeParseObjectString(str) {
//     if (typeof str !== "string") return str

//     // Remove leading/trailing whitespace
//     let cleaned = str.trim()

//     // Remove wrapping quotes if they exist
//     if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
//         cleaned = cleaned.slice(1, -1)
//     }

//     // Remove trailing comma
//     cleaned = cleaned.replace(/,\s*$/, "")

//     // Ensure it starts with property name
//     if (!cleaned.startsWith('"')) {
//         cleaned = `"${cleaned}`
//     }

//     try {
//         return JSON.parse(`{${cleaned}}`)
//     } catch (err) {
//         console.error("FAILED TO PARSE:", cleaned)
//         throw err
//     }
// }

// function normalizeArray(arr) {
//     return arr.map(item => safeParseObjectString(item))
// }

// function normalizeReport(report) {
//     return {
//         ...report,
//         technicalQuestions: normalizeArray(report.technicalQuestions),
//         behavioralQuestions: normalizeArray(report.behavioralQuestions),
//         skillGaps: normalizeArray(report.skillGaps),
//         preparationPlan: normalizeArray(report.preparationPlan)
//     }
// }

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

    const prompt = `
You are an expert Technical Recruiter and Career Coach.

Analyze the given candidate data and return ONLY valid JSON.
    Resume: ${resume}
    Self-description: ${selfDescription}
    Job description: ${jobDescription}

IMPORTANT:
- Each item inside technicalQuestions MUST be a  object with question, intention, and answer properties.
- Each item inside behavioralQuestions MUST be a  object with question, intention, and answer properties.
- Each item inside skillGaps MUST be a object with skill and severity properties.
- Each item inside preparationPlan MUST be a  object with day, focus, and tasks properties.
- DO NOT return flattened key-value arrays.
- DO NOT return string pairs.

If the format is incorrect, the response is invalid.

Return strictly this structure:

{
  matchScore: number,
  technicalQuestions: [
    {
      question: string,
      intention: string,
      answer: string
    }
  ],
  behavioralQuestions: [
    {
      question: string,
      intention: string,
      answer: string
    }
  ],
  skillGaps: [
    {
      skill: string,
      severity: "low" | "medium" | "high"
    }
  ],
  preparationPlan: [
    {
      day: number,
      focus: string,
      tasks: string[]
    }
  ]
}

Return ONLY valid JSON.
No markdown.
No explanation.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    })
    return JSON.parse(response.text)
}

module.exports = {
    generateInterviewReport
}