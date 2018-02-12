import { Disciplines } from '../discipline'
import { Layers } from '../layer'
import { Modules } from '../module'
import { SkillAreas } from '../skillArea'
import { Skills } from '../skill'

export const composeConfig = async function(ctx, next) {
    let [disciplines, layers, modules, skillAreas, skills] = await Promise.all([
        Disciplines.find(),
        Layers.find(),
        Modules.find(),
        SkillAreas.find(),
        Skills.find()
    ])

    ctx.hook.data = {
        disciplines: Disciplines.output(disciplines.data),
        layers: Layers.output(layers.data),
        modules: Modules.output(modules.data),
        skillAreas: SkillAreas.output(skillAreas.data),
        skills: Skills.output(skills.data),
        timestamp: new Date()
    }

    next()
}
