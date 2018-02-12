export const userConfig = {
    modules: {
        '1': 0.5,
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 0.7,
        '7': 1,
        '8': 0.5,
        '9': 0.5
    },
    layer: 2
}

export const userProgress = {
    skills: {
        '1': 0,
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 1
    }
}

export interface layerI {
    id: string
    order: number
    name: string
    default?: boolean
    colour?: string

    prelabel?: string
    relativeWeight?: number
}

export const dataLayers: layerI[] = [
    { id: '0', order: 0, name: 'EP', colour: '#ccc', default: true },
    { id: '1', order: 1, name: 'CP', colour: '#ccc', default: true },
    {
        id: '2',
        order: 2,
        name: 'Beginner',
        prelabel: 'Foundation &rsaquo;',
        relativeWeight: 55
    },
    {
        id: '3',
        order: 3,
        name: 'Intermediate',
        prelabel: 'Development &rsaquo; ',
        relativeWeight: 30
    },
    {
        id: '4',
        order: 4,
        name: 'Advanced',
        prelabel: 'Performance &rsaquo; ',
        relativeWeight: 15
    }
]

export const dataModules = [
    {
        id: 1,
        order: 1,
        colour: '#1f77b4',
        icon: 'assets/hg.png',
        name: 'Tow Skills'
    },
    {
        id: 2,
        order: 2,
        colour: '#ff7f0e',
        icon: 'assets/hg.png',
        name: 'Glider Control Skills'
    },
    {
        id: 3,
        order: 3,
        colour: '#2ca02c',
        icon: 'assets/hg.png',
        name: 'Flight Planning and Decision Making'
    },
    {
        id: 4,
        order: 4,
        colour: '#d62728',
        icon: 'assets/hg.png',
        name: 'Site Conditions and Meteorology'
    },
    {
        id: 5,
        order: 5,
        colour: '#9467bd',
        icon: 'assets/hg.png',
        name: 'Equipment Understanding and Maintenance'
    },
    {
        id: 6,
        order: 6,
        colour: '#8c564b',
        icon: 'assets/hg.png',
        name: 'Airlaw'
    },
    {
        id: 7,
        order: 7,
        colour: '#e377c2',
        icon: 'assets/hg.png',
        name: 'XC Flying'
    },
    {
        id: 8,
        order: 8,
        colour: '#7f7f7f',
        icon: 'assets/hg.png',
        name: 'Emergencies and Accident Management'
    },
    {
        id: 9,
        order: 9,
        colour: '#bcbd22',
        icon: 'assets/hg.png',
        name: 'Competition Flying'
    }
]

export const skillAreas = [
    {
        id: 1,
        position: 1,
        name: 'Launching and Groundhandling',
        colour: '#1f77b4'
    },
    { id: 2, position: 2, name: 'Landing', colour: '#2ca02c' },
    { id: 3, position: 3, name: 'Soaring', colour: '#d62728' },
    { id: 4, position: 4, name: 'Gliding', colour: '#9467bd' },
    { id: 5, position: 5, name: 'Thermalling', colour: '#8c564b' },
    { id: 6, position: 6, name: 'Descent techniques', colour: '#e377c2' },
    { id: 7, position: 7, name: 'Active flying', colour: '#7f7f7f' },
    { id: 8, position: 8, name: 'Recovery techniques', colour: '#bcbd22' },
    { id: 9, position: 9, name: 'Free style and Acro', colour: '#17becf' }
]

export const skills = [
    { id: 1, skillAreaId: 1, name: 'Reverse launching' },
    { id: 2, skillAreaId: 1, name: 'Forward launching' },
    { id: 3, skillAreaId: 1, name: 'Contolling the glider in strong winds' },
    { id: 4, skillAreaId: 1, name: 'Wing control' },
    { id: 5, skillAreaId: 1, name: 'Assisting others on launch' },
    { id: 6, skillAreaId: 2, name: 'Strong wind landing' },
    { id: 7, skillAreaId: 2, name: 'Nil wind landing' },
    { id: 8, skillAreaId: 2, name: 'Slope landing' },
    { id: 9, skillAreaId: 2, name: 'Top landing' },
    { id: 10, skillAreaId: 2, name: 'Landing approaches' },
    { id: 11, skillAreaId: 3, name: 'Positioning' },
    { id: 12, skillAreaId: 3, name: 'Effective turns' },
    { id: 13, skillAreaId: 3, name: 'Use of terrain/Understanding lift' },
    { id: 14, skillAreaId: 4, name: 'Gliding' },
    { id: 15, skillAreaId: 5, name: 'Thermalling' },
    { id: 16, skillAreaId: 6, name: 'Big ears' },
    { id: 17, skillAreaId: 6, name: 'Speedbar' },
    { id: 18, skillAreaId: 6, name: 'Big  ears & speedbar' },
    { id: 19, skillAreaId: 6, name: 'Fly away from lift' },
    {
        id: 20,
        skillAreaId: 7,
        name: 'Gentle jab on one brake and observe result'
    },
    {
        id: 21,
        skillAreaId: 7,
        name: 'Gentle equal turns with Weight-shift only'
    },
    {
        id: 22,
        skillAreaId: 7,
        name: 'Gentle Porpousing (no more than 30 degrees from above)'
    },
    { id: 23, skillAreaId: 7, name: 'Balanced 90 degree turns' },
    { id: 24, skillAreaId: 7, name: 'Balanced banked 180' },
    { id: 25, skillAreaId: 8, name: 'Recovery techniques' },
    { id: 26, skillAreaId: 9, name: 'Free style and Acro' }
]
