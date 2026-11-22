export const projects = [
  {
    id: 'forest-adventure',
    title: 'Forest Adventure',
    tagline: 'Explore. Collect. Survive.',
    description: 'A four-level Unity WebGL adventure developed from a rolling-ball prototype into a complete third-person experience. I built the player movement, collectible objectives, animal enemy encounters, health and recovery feedback, UI flow, audio, and browser-ready release.',
    engine: 'Unity 6',
    platform: 'WebGL',
    playUrl: 'https://play.unity.com/en/games/067910fc-5e49-4887-b4b1-c9662d538ba3/forest-adventure',
    sourceUrl: 'https://github.com/Nikhilyps/Forest-Adeventure',
    features: [
      'Third-person movement with running and jumping',
      'Four forest levels with collectible-driven objectives',
      'Different animal enemy encounters across each level',
      'Health, damage feedback, regeneration, and retry flow',
      'Menus, pause, level completion, and WebGL publishing',
    ],
    gallery: [
      { src: '/assets/forest-adventure/main-menu.png', label: 'Forest Adventure main menu' },
      { src: '/assets/forest-adventure/level-select.png', label: 'Level select screen' },
      { src: '/assets/forest-adventure/enemy-encounter.png', label: 'Enemy encounter gameplay' },
      { src: '/assets/forest-adventure/level-completion.png', label: 'Level completion screen' },
    ],
    controls: [
      ['WASD', 'Move'],
      ['Left Shift', 'Run'],
      ['Space', 'Jump'],
      ['Esc', 'Pause'],
    ],
  },
]

export const skills = [
  { name: 'Unity', note: 'Building 3D game experiences', mark: 'U' },
  { name: 'C#', note: 'Gameplay systems and scripting', mark: 'C#' },
  { name: 'Blender', note: 'Learning 3D creation', mark: 'B' },
  { name: 'Git', note: 'Version control', mark: 'G' },
  { name: 'GitHub', note: 'Sharing and shipping projects', mark: '⌘' },
]
