import Service from '@ffra/service-mongoose'
import Model from './audit.model'

class Audit extends Service {
    types = {
        PUBLISH_MAJOR: 'publish-major',
        PUBLISH_MINOR: 'publish-minor',
        PUBLISH_DRAFT: 'publish-draft',
        UPDATE_COACH: 'coach_content_update',
        FEEDBACK_SENT: 'feedback-sent'
    }

    constructor(model) {
        super('Audit', model)
    }

    publishContent(type, userId, { vOld, vNew, contentId, skillId }) {
        let { PUBLISH_MAJOR, PUBLISH_MINOR, PUBLISH_DRAFT } = this.types

        let action =
            type === 'major'
                ? PUBLISH_MAJOR
                : type === 'minor' ? PUBLISH_MINOR : PUBLISH_DRAFT

        return this.create({
            action,
            userId,
            params: {
                contentId,
                skillId,
                vNew,
                vOld
            }
        })
    }

    publishCoachContent(userId, content) {
        let { UPDATE_COACH } = this.types

        return this.create({
            action: UPDATE_COACH,
            userId,
            params: content
        })
    }

    feedbackCreation(userId, { skillId, skillType, version, feedback }) {
        let { FEEDBACK_SENT } = this.types

        return this.create({
            action: FEEDBACK_SENT,
            userId,
            params: {
                skillId,
                skillType,
                version,
                feedback
            }
        })
    }

    /*
        TODO:
        - Add login
        - Add logouts
        - Add when pilot complete skill
        - Log every change by the admin or user
    */
}

export default new Audit(Model)
