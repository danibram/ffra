import { Users } from '../../user'
import { Assessments } from '../../assessment'
import { PilotAssessments, PilotScores } from '../pilot.services'

const parseInputAssessment = function(questions, inputAnswers) {
    let extractedAnswers = {}

    questions.forEach(eQuestion => {
        let answer = null
        let inputAnswer = inputAnswers[eQuestion.id]

        if (inputAnswer && inputAnswer.answerId) {
            eQuestion.answers.forEach(eAnswer => {
                if (eAnswer.id === inputAnswer.answerId) {
                    answer = eAnswer
                }
            })
        }

        if (answer) {
            extractedAnswers[eQuestion.id] = {
                question: eQuestion,
                answer: Object.assign({}, answer, inputAnswer)
            }
        }
    })

    return extractedAnswers
}

const mergeQAs = function(questions, oldQA, newQA) {
    let finalQA = {}
    questions.forEach(q => {
        let qa =
            newQA[q.id] && newQA[q.id].answer
                ? newQA[q.id]
                : oldQA[q.id] && oldQA[q.id].answer ? oldQA[q.id] : null

        if (qa) {
            finalQA[q.id] = qa
        }
    })
    return finalQA
}

const checkCompleted = function(questions, answers) {
    let completed = true
    let total = questions.length
    let answered = Object.keys(answers).length
    let result = Math.round(answered / total * 10) / 10

    if (result === NaN) {
        throw 'Complete can not be calculated.'
    }

    return result
}

const composeMatrix = function(scores) {
    let matrix = {}
    scores.forEach(s => {
        if (!matrix[s.layerId]) {
            matrix[s.layerId] = {}
        }

        if (!matrix[s.layerId][s.moduleId]) {
            matrix[s.layerId][s.moduleId] = s.score
        } else {
            matrix[s.layerId][s.moduleId] =
                matrix[s.layerId][s.moduleId] + s.score
        }
    })

    return matrix
}

const extractScores = function(QAs) {
    let scores = []
    Object.keys(QAs).map(k => {
        scores = scores.concat(QAs[k].answer.scoring)
    })

    return scores
}

export const sendAssessment = async function(ctx, next) {
    let answers = ctx.request.body.answers
    let assessmentId = ctx.params.assessmentId
    let userId = ctx.params.userId

    let [user, assessment, lastAnswer] = await Promise.all([
        Users.findOne({ _id: userId }),
        Assessments.findOne({ _id: assessmentId }),
        PilotAssessments.find(
            {
                userId,
                assessmentId
            },
            1,
            0,
            false,
            { createdAt: -1 }
        )
    ])

    assessment = Assessments.output(assessment)

    lastAnswer = lastAnswer.data[0]
        ? lastAnswer.data[0].completed
          ? null
          : PilotAssessments.output(lastAnswer.data[0])
        : null

    let inputAnswers = parseInputAssessment(assessment.questions, answers)

    // New Answers
    if (lastAnswer) {
        inputAnswers = mergeQAs(
            assessment.questions,
            lastAnswer.items,
            inputAnswers
        )
    }

    let completed = checkCompleted(assessment.questions, inputAnswers)

    let pilotAssessmentUpdated: any = {}

    if (lastAnswer) {
        lastAnswer.items = inputAnswers
        lastAnswer.completed = completed
        let _id = lastAnswer.id

        pilotAssessmentUpdated = await PilotAssessments.update(
            { _id },
            lastAnswer
        )
    } else {
        pilotAssessmentUpdated = await PilotAssessments.create({
            userId: (user as any).id,
            assessmentId: assessment.id,
            completed: checkCompleted(assessment.questions, inputAnswers),
            items: inputAnswers
        })
    }

    let response = {
        pilotAnswers: PilotAssessments.output(pilotAssessmentUpdated),
        pilotScores: null
    }

    // If assessement complete create pilotScore and send it
    if ((pilotAssessmentUpdated as any).completed === 1) {
        let pilotScore = await PilotScores.create({
            userId: user.id,
            data: composeMatrix(extractScores(pilotAssessmentUpdated.items))
        })

        response.pilotScores = PilotScores.output(pilotScore)
    }

    ctx.hook.data = response
    next()
}
