const { Router } = require('express');

const interviewRouter = Router();

const authMiddleware = require('../middlewares/auth.middleware');

const interViewController = require('../controllers/interview.controller');

const upload = require('../middlewares/file.middleware')

/**
 * @route POST api/interview/generate-report
 * @desc Generate an interview report based on the user's resume, self-description, and job description
 * @access Private
 */
interviewRouter.post('/generate-report', authMiddleware.authUser, upload.single("resume"), interViewController.generateInterviewReportController)

module.exports = interviewRouter