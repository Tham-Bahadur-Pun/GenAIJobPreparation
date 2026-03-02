const mongoose = require("mongoose");

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention behind the question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer to the question is required"]
    }
}, {
    _id: false
})

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention behind the question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer to the question is required"]
    }
}, {
    _id: false
})

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill gap is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity of the skill gap is required"]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day number is required for preparation plan"]
    },
    focus: {
        type: String,
        required: [true, "Focus area for the day is required in preparation plan"]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks for the day are required in preparation plan"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,

    },
    selfDescription: {
        type: String,

    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema]
});

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReport;