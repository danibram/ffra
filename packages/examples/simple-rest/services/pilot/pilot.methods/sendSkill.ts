import { Users } from '../../user'
import { Skills } from '../../skill'
import { PilotSkills } from '../pilot.services'
import { Audits } from '../../audit'

const parseInputSkill = function(questions, inputAnswers, user) {
    let extractedAnswers = {}

    questions.forEach(eQuestion => {
        let answer = null
        let inputAnswer = inputAnswers[eQuestion.id]

        if (inputAnswer && inputAnswer.completed) {
            extractedAnswers[eQuestion.id] = {
                completed: true,
                completedOn: new Date(),
                completedBy: user.id,
                comments: inputAnswer.comments
            }
        }
    })

    return extractedAnswers
}

const mergeQAs = function(questions, oldQA, newQA) {
    let finalQA = {}
    questions.forEach(q => {
        let qa = newQA[q.id] ? newQA[q.id] : oldQA[q.id] ? oldQA[q.id] : null

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

export const sendSkill = async function(ctx, next) {
    let { answers, contentVersion } = ctx.request.body
    let skillId = ctx.params.skillId
    let userId = ctx.params.userId

    let data = await Promise.all([
        Users.findOne({ _id: userId }),
        Skills.findOne({ _id: skillId }),
        PilotSkills.find(
            {
                userId,
                skillId
            },
            1,
            0,
            false,
            { createdAt: -1 }
        )
    ])

    let user = data[0]
    let skill = Skills.output(data[1])
    let lastAnswer = data[2]

    lastAnswer = lastAnswer.data[0]
        ? lastAnswer.data[0].completed
          ? null
          : PilotSkills.output(lastAnswer.data[0])
        : null

    let inputAnswers = parseInputSkill(
        skill.skillMasteringChecklist,
        answers,
        user
    )

    // New Answers
    if (lastAnswer) {
        inputAnswers = mergeQAs(
            skill.skillMasteringChecklist,
            lastAnswer.items,
            inputAnswers
        )
    }

    let completed = checkCompleted(skill.skillMasteringChecklist, inputAnswers)

    let pilotSkillUpdated = {}

    if (lastAnswer) {
        lastAnswer.items = inputAnswers
        lastAnswer.completed = completed
        let _id = lastAnswer.id

        pilotSkillUpdated = await PilotSkills.update({ _id }, lastAnswer)
    } else {
        pilotSkillUpdated = await PilotSkills.create({
            userId: (user as any).id,
            skillId: skill.id,
            completed: checkCompleted(
                skill.skillMasteringChecklist,
                inputAnswers
            ),
            items: inputAnswers,
            requiresSignOff: skill.requiresSignOff,
            contentVersion
        })
    }

    const link = skill.link
    const skillName = skill.name
    const fullName = user.fullName

    await Audits.create({
        action: 'sign-off-required',
        userId: userId,
        params: {
            skillId,
            skillName,
            link,
            fullName,
            completed
        }
    })

    ctx.hook.data = PilotSkills.output(pilotSkillUpdated)
    next()
}
