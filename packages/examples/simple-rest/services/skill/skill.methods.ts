import Skills from './skill.service'
import { SkillAreas } from '../skillArea'
import { Layers } from '../layer'
import { Modules } from '../module'
import { Disciplines } from '../discipline'
import { Contents } from '../content'

import * as semver from 'semver'
import { BadRequest } from '@ffra/errors'

export const details = async function(ctx, next) {
    let _id = ctx.params.id

    let skill = await Skills.findOne({ _id })
    let skillArea = await SkillAreas.findOne({ _id: skill.skillAreaId })

    let data = await Promise.all([
        Layers.findOne({ _id: skillArea.layerId }),
        Modules.findOne({ _id: skillArea.moduleId })
    ])

    let layer = data[0]
    let module = data[1]

    let discipline = await Disciplines.findOne({ _id: module.disciplineId })

    ctx.hook.data = {
        skill: Skills.output(skill),
        skillArea: SkillAreas.output(skillArea),
        layer: SkillAreas.output(layer),
        module: Modules.output(module),
        discipline: Modules.output(discipline)
    }

    next()
}

export const content = async function(ctx, next) {
    let _id = ctx.params.id

    let contents = await Contents.find({ skillId: _id })

    if (contents.length === 0) {
        throw new BadRequest(`Any content found for skill ${_id}`)
    }

    contents = contents
        .filter(c => !c.draft)
        .sort((a, b) => semver.gt(b.version, a.version))

    if (contents.length === 0) {
        throw new BadRequest(`Any 'no draft' content found for skill ${_id}`)
    }

    ctx.hook.data = contents[0]
    next()
}
