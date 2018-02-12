import Service from '@ffra/service-mongoose'
import Model from './notifications.model'
import * as config from 'config'

import { Skills } from '../skill'
import { Audits } from '../audit'
import { Users } from '../user/index'

class Notifications extends Service {
    constructor(model) {
        super('Notifications', model)
    }

    deprecateSkill = (skill, userId, vOld, vNew) =>
        this.create({
            userId: userId,
            message: `Version ${vOld} of the skill ${
                skill.name
            } was deprecated by ${vNew}`,
            key: 'SKILL_DEPRECATED',
            params: {
                link: skill.link,
                skillId: skill.id
            }
        })

    publishSkill = (skill, userId, vOld, vNew) =>
        this.create({
            userId: userId,
            message: `New content has been published for skill ${skill.name}`,
            key: 'SKILL_PUBLISHED',
            params: {
                link: skill.link,
                skillId: skill.id
            }
        })

    publishCoachSignOff = (userId, fullName, skillId, skillName, skillLink) =>
        this.create({
            userId: userId,
            message: `Sign off required for ${fullName} / ${skillName}`,
            key: 'SIGN_OFF_REQUIRED',
            params: {
                link: skillLink,
                skillId: skillId
            }
        })

    findUser = async userId => await Users.findOne({ _id: userId })

    generateFromAudit = async (audit, userId) => {
        let user: any = await this.findUser(userId)
        if (!user) return Promise.reject(`Could not find user ${userId}`)

        if (['publish-major'].indexOf(audit.action) > -1) {
            const skill = await Skills.findOne({ _id: audit.params.skillId })
            if (!skill) {
                return Promise.reject(
                    `Could not find skill with id ${audit.params.skillId}`
                )
            }

            return user.roles.indexOf('user') > -1 &&
                audit.params.vOld.indexOf('0.0.0') > -1
                ? this.publishSkill(
                      skill,
                      userId,
                      audit.params.vOld,
                      audit.params.vNew
                  )
                : this.deprecateSkill(
                      skill,
                      userId,
                      audit.params.vOld,
                      audit.params.vNew
                  )
        }
        /*else if (['sign-off-required'].indexOf(audit.action) > -1) {
            let { fullName, skillId, skillName, link } = audit.params;
            console.log('audit.params', audit.params);

            return (user.roles.indexOf('coach') > -1)
                ? this.publishCoachSignOff(userId, fullName, skillId, skillName, link)
                : Promise.resolve()
        }*/

        return Promise.resolve()
    }

    syncNotifications = async userId => {
        let { data: lastNotification } = await this.find(
            {
                userId
            },
            1,
            0,
            false,
            { createdAt: -1 }
        )

        let q = lastNotification[0]
            ? { createdAt: { $gt: lastNotification[0].createdAt } }
            : {}

        let { data: lastAudits } = await Audits.find(q)

        await Promise.all(
            lastAudits
                .filter(a => Object.keys(Audits.types).indexOf(a.action))
                .map(audit => this.generateFromAudit(audit, userId))
        )
    }
}

export default new Notifications(Model)
