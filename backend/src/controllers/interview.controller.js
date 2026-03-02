const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    const { selfDescription, jobDescription } = req.body

    const resumeContent = await (new pdfParse.PDFParse(resumeFile.buffer)).getText()

    try {
        const report = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: resumeContent,
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