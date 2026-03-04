const { PDFParse } = require('pdf-parse')
const { generateInterviewReport } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    const { selfDescription, jobDescription } = req.body
    const uint8Array = new Uint8Array(resumeFile.buffer)

    const resumeContent = await new PDFParse(uint8Array).getText()

    try {
        const report = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...report,
        })

        res.status(201).json({ message: "Interview report generated successfully", data: interviewReport })
    } catch (error) {
        console.error("Error generating interview report:", error)
        res.status(500).json({ error: "Failed to generate interview report" })
    }
}

module.exports = {
    generateInterviewReportController
}