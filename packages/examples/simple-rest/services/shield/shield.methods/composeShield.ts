import { userConfig, dataLayers, dataModules } from './data'

const composeModule = ({ id, order, icon, name, color }, userCfg) => {
    let size = userCfg.modules[id] ? userCfg.modules[id] : null

    if (!size) {
        throw new Error('User cfg and module not sync')
    }

    return {
        id,
        position: order,
        icon,
        size,
        name,
        colour: color
    }
}

const composeArea = ({ prelabel }, modules) =>
    modules.map(({ position, size, colour, name }) => {
        return {
            position,
            size,
            colour,
            completed: 0,
            name: `${prelabel} ${name}`,
            data: ``
        }
    })

/**
 * calcWeights : Function
 * Input ouput weights, depends on user layer level
 *   |    input        | output          | cases | userlayer |
 *   | [50, 30, 11, 9] | [9, 50, 30, 11] |   1   |     3     |
 *   | [50, 30, 11, 9] | [50, 30, 11, 9] |   0   |     2     |
 *   | [50, 30, 11, 9] | [9, 11, 30, 50] |   3   |     5     |
 *   | [50, 30, 11, 9] | [9, 11, 50, 30] |   2   |     4     |
 */
const calcWeights = (layers, configLayerUser) => {
    let defaultLayers = 0
    let defaultWeights = layers.map(l => {
        if (!l.default) {
            return l.relativeWeight
        } else {
            defaultLayers++
        }
    })

    let remainSpace = layers.length - defaultLayers
    let diff = configLayerUser - defaultLayers

    return defaultWeights
        .slice(defaultWeights.length - diff, defaultWeights.length)
        .reverse()
        .concat(defaultWeights.slice(0, defaultWeights.length - diff))
        .map(v => v / 100 * remainSpace)
}

export const composeShieldData = function(userConfig, dataLayers, dataModules) {
    let composedModules = dataModules
        .sort((a, b) => a.order - b.order)
        .map(m => composeModule(m, userConfig))

    let weights = calcWeights(dataLayers, userConfig.layer)

    return {
        layers: dataLayers
            .sort((a, b) => a.order - b.order)
            .map((layer, index) => {
                const defaultArea = {
                    position: 1,
                    completed: 1,
                    size: 1,
                    data: null,
                    visible: true
                }

                let areas = layer.default
                    ? Object.assign(defaultArea, {
                          name: layer.name,
                          colour: layer.colour
                      })
                    : composeArea(layer, composedModules)

                let weight = layer.default ? 1 : weights[index]

                return {
                    layer: layer.name,
                    position: index,
                    weight,
                    areas
                }
            }),
        labels: composedModules
    }
}

export const composeShield = async function(ctx, next) {
    ctx.hook.data = composeShieldData(userConfig, dataLayers, dataModules)

    next()
}
