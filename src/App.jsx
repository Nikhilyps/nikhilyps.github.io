import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { projects, skills } from './data/projects'
const HeroSculpture = lazy(() => import('./HeroSculpture'))

function Button({ href, children, subtle = false, target, rel }) {
  return <a className={`button ${subtle ? 'button-subtle' : ''}`} href={href} target={target} rel={rel}>{children}</a>
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [['SpinStrike', '#spinstrike'], ['Forest Adventure', '#forest-adventure'], ['About', '#about'], ['Skills', '#skills'], ['Contact', '#contact']]
  const close = () => setOpen(false)
  return <header className="site-header">
    <a href="#top" className="wordmark" aria-label="Nikhil home"><i />NIKHIL<span>DEV</span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><span /><span /></button>
    <nav className={open ? 'nav-open' : ''} aria-label="Primary navigation">
      {links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
      <a className="nav-github" href="https://github.com/Nikhilyps" target="_blank" rel="noreferrer" onClick={close}>GitHub</a>
    </nav>
  </header>
}

function Atmosphere({ layers = {} }) {
  return <div className="atmosphere" aria-hidden="true">
    <motion.div className="atmosphere-grid" style={{ y: layers.grid }} /><motion.div className="orb orb-one" style={{ y: layers.orb }} /><motion.div className="orb orb-two" style={{ y: layers.orbNear }} />
    <motion.div className="plane plane-one" style={{ y: layers.plane }} /><motion.div className="plane plane-two" style={{ y: layers.orb }} /><div className="signal signal-one" /><div className="signal signal-two" />
  </div>
}

function RevealHeading({ lines, className = '' }) {
  const reduceMotion = useReducedMotion()
  return <h2 className={['reveal-heading', className].filter(Boolean).join(' ')} aria-label={lines.join(' ')}>
    {lines.map((line, index) => <span className="reveal-line" key={line}>
      <motion.span
        className={index === lines.length - 1 ? 'reveal-accent' : ''}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: reduceMotion ? 0 : .62, delay: reduceMotion ? 0 : index * .11, ease: [0.22, 1, 0.36, 1] }}
      >{line}</motion.span>
    </span>)}
  </h2>
}

function ForestScene({ compact = false }) {
  return <div className={`forest-scene ${compact ? 'forest-compact' : ''}`} aria-hidden="true">
    <div className="forest-glow" /><div className="mist mist-one" /><div className="mist mist-two" />
    <div className="tree tree-one" /><div className="tree tree-two" /><div className="tree tree-three" /><div className="tree tree-four" />
    <div className="fireflies"><i /><i /><i /><i /><i /><i /></div><div className="ground" />
  </div>
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useSpring(useTransform(scrollY, [0, 650], [0, 70]), { stiffness: 90, damping: 25 })
  const gridY = useSpring(useTransform(scrollY, [0, 650], [0, -28]), { stiffness: 85, damping: 25 })
  const orbY = useSpring(useTransform(scrollY, [0, 650], [0, -54]), { stiffness: 85, damping: 25 })
  const orbNearY = useSpring(useTransform(scrollY, [0, 650], [0, -82]), { stiffness: 85, damping: 25 })
  const planeY = useSpring(useTransform(scrollY, [0, 650], [0, -36]), { stiffness: 85, damping: 25 })
  return <section className="hero" id="top">
    <motion.div style={{ y: reduceMotion ? 0 : y }} className="hero-art"><Atmosphere layers={{ grid: reduceMotion ? 0 : gridY, orb: reduceMotion ? 0 : orbY, orbNear: reduceMotion ? 0 : orbNearY, plane: reduceMotion ? 0 : planeY }} /></motion.div>
    <div className="hero-vignette" />
    <Suspense fallback={null}><HeroSculpture /></Suspense>
    <div className="hero-content shell">
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>INDEPENDENT GAME DEVELOPER <span>•</span> INDIA</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8 }}>Building Worlds,<br /><em>One Game</em> at a Time.</motion.h1>
      <motion.p className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>I'm Nikhil, a solo game developer exploring interactive worlds and bringing game ideas to life with Unity.</motion.p>
      <motion.div className="button-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }}><Button href="#work">Explore My Work</Button><Button href="#about" subtle>About Me</Button></motion.div>
    </div>
    <a href="#work" className="scroll-cue"><span />SCROLL TO EXPLORE</a>
  </section>
}

function GameVisual({ galleryClass, label }) {
  return <div className={`game-visual ${galleryClass || ''}`} role="img" aria-label={label || 'Stylized forest scene'}><ForestScene compact /><div className="visual-label">{label}</div></div>
}

function ScreenshotGallery({ screenshots }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const reduceMotion = useReducedMotion()
  const activeShot = activeIndex === null ? null : screenshots[activeIndex]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight' && activeIndex !== null) setActiveIndex((activeIndex + 1) % screenshots.length)
      if (event.key === 'ArrowLeft' && activeIndex !== null) setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, screenshots.length])

  return <>
    <div className="gallery">
      {screenshots.map((shot, index) => <motion.button className="screenshot" type="button" key={shot.src} onClick={() => setActiveIndex(index)} aria-label={`Open ${shot.label}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : index * .09, ease: [0.22, 1, 0.36, 1] }}>
        <img src={shot.src} alt={shot.label} loading="lazy" /><span>{shot.label}</span>
      </motion.button>)}
    </div>
    {activeShot && <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeShot.label} onClick={() => setActiveIndex(null)}>
      <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close screenshot viewer">Close</button>
      <button className="lightbox-nav lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length) }} aria-label="Previous screenshot">Previous</button>
      <figure onClick={(event) => event.stopPropagation()}><img src={activeShot.src} alt={activeShot.label} /><figcaption>{activeShot.label} <span>{activeIndex + 1} / {screenshots.length}</span></figcaption></figure>
      <button className="lightbox-nav lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % screenshots.length) }} aria-label="Next screenshot">Next</button>
    </div>}
  </>
}

function FeaturedProject({ game, index }) {
  const imageFrame = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imageFrame, offset: ['start end', 'end start'] })
  const imageScale = useSpring(useTransform(scrollYProgress, [0, .52, 1], [.94, 1.015, 1.055]), { stiffness: 120, damping: 28 })
  return <article id={game.id} className={`featured-project featured-project-${game.accent}`}>
    <div className="project-order"><span>0{index + 1}</span><p>{index === 0 ? 'FIRST FEATURED PROJECT' : 'SECOND FEATURED PROJECT'}</p></div>
    <div className="featured-game">
      <motion.div ref={imageFrame} className={`game-hero-visual ${game.id === 'spinstrike' ? 'portrait-hero' : ''}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduceMotion ? 0 : .65 }}><motion.img style={{ scale: reduceMotion ? 1 : imageScale }} src={game.heroImage} alt={game.heroAlt} /><span className="game-hero-caption">{game.title} / in-game capture</span><span className="visual-grain" /></motion.div>
      <div className="game-details">
        <div><p className="eyebrow">FEATURED GAME / {game.engine}</p><h3>{game.title}</h3><p className="game-tagline">{game.tagline}</p><p className="game-description">{game.description}</p></div>
        <div className="game-meta"><div><span>ENGINE</span><strong>{game.engine}</strong></div><div><span>PLATFORM</span><strong>{game.platform}</strong></div></div>
        <motion.ul className="feature-list" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .075 } } }}>{game.features.map((item, index) => <motion.li key={item} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 12 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .38, ease: 'easeOut' } } }}><b>0{index + 1}</b>{item}</motion.li>)}</motion.ul>
        <div className="button-row"><Button href={game.playUrl} target="_blank" rel="noreferrer">Play Live Game</Button><Button href={game.sourceUrl} target="_blank" rel="noreferrer" subtle>{game.sourceLabel}</Button></div>
        <p className="source-note">{game.sourceNote}</p>
      </div>
    </div>
    <div className="controls-panel"><div><p className="eyebrow">CONTROLS</p><h3>Built to move.</h3></div><ul>{game.controls.map(([key, action]) => <li key={key}><kbd>{key}</kbd><span>{action}</span></li>)}</ul></div>
    <div className="gallery-intro"><p className="eyebrow">GAMEPLAY GALLERY</p><span>Select an image to view it full screen.</span></div>
    <ScreenshotGallery screenshots={game.gallery} />
  </article>
}

function FeaturedGame() {
  return <section id="work" className="featured section shell">
    <div className="section-heading"><p className="eyebrow">SELECTED WORK</p><RevealHeading lines={['Two worlds.', 'Their own rules.']} /></div>
    {projects.map((game, index) => <FeaturedProject game={game} index={index} key={game.id} />)}
  </section>
}

function Projects() {
  return <section className="projects-section"><div className="shell"><div className="section-heading project-heading"><p className="eyebrow">PROJECT ARCHIVE</p><RevealHeading lines={['Stories in', 'the making.']} /><p>Two playable Unity projects, ordered from newest to first release.</p></div><div className="project-cards">{projects.map((project, index) => <div className="project-card" key={project.id}><div className={`project-card-art ${project.id === 'spinstrike' ? 'portrait-card-art' : ''}`}><img src={project.gallery[1].src} alt="" /></div><div><p className="eyebrow">0{index + 1} / AVAILABLE NOW</p><h3>{project.title}</h3><p>{project.description}</p></div><a href={`#${project.id}`} aria-label={`View ${project.title}`}>View</a></div>)}</div></div></section>
}

function About() { return <section className="about section shell" id="about"><div className="about-mark">N<span>✦</span></div><div><p className="eyebrow">ABOUT THE DEVELOPER</p><RevealHeading lines={['Making games is my', 'way of exploring.']} /><p className="about-copy">I’m Nikhil, a solo game developer learning, building, and experimenting with Unity. I enjoy exploring ideas across genres and shaping them into thoughtful, playable experiences.</p><a className="text-link" href="https://github.com/Nikhilyps" target="_blank" rel="noreferrer">Follow the journey on GitHub</a></div></section> }

function Skills() { const reduceMotion = useReducedMotion(); return <section id="skills" className="skills-section"><div className="shell"><p className="eyebrow">TOOLS OF THE TRADE</p><RevealHeading lines={['Growing the', 'toolkit.']} /><div className="skills-grid">{skills.map((skill, i) => <motion.div className="skill" key={skill.name} initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} whileHover={reduceMotion ? {} : { y: -7 }} transition={{ duration: reduceMotion ? 0 : .44, delay: reduceMotion ? 0 : i * .075, ease: [0.22, 1, 0.36, 1] }}><span className="skill-mark">{skill.mark}</span><div><h3>{skill.name}</h3><p>{skill.note}</p></div></motion.div>)}</div></div></section> }

function Contact() { return <section id="contact" className="contact"><Atmosphere /><div className="shell contact-content"><p className="eyebrow">GET IN TOUCH</p><RevealHeading lines={['Let’s make', 'something playable.']} /><p>Follow along as I keep learning and building new worlds.</p><Button href="https://github.com/Nikhilyps" target="_blank" rel="noreferrer">Visit My GitHub</Button></div></section> }

function App() { return <><Nav /><main><Hero /><FeaturedGame /><Projects /><About /><Skills /><Contact /></main><footer className="footer shell"><a href="#top" className="wordmark"><i />NIKHIL<span>DEV</span></a><p>© {new Date().getFullYear()} Nikhil. Built one world at a time.</p><a href="#top">Back to top</a></footer></> }
export default App
