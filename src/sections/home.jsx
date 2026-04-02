import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import imagemPrincipal from '../assets/fotos/ImagemPrincipal.png';
import logoIA from '../assets/fotos/LogoIA.png';
import github from '../assets/icons/github.png';
import linkedin from '../assets/icons/linkedin.png';
import cv from '../assets/WilliamCoelho_CV.pdf';
import { githubUrl, linkedinUrl } from '../util/texts';
import ParticleBackground from '../components/ParticleBackground';
import '../styles/App.css';

/* ── Typewriter hook ── */
const ROLES = [
    'Full Stack Developer',
    'Mobile Developer',
    'Java & Spring Expert',
    'React Specialist',
    'Engenheiro de Software',
];

function useTypeWriter(words) {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState('');
    const [del, setDel] = useState(false);
    useEffect(() => {
        const word = words[idx];
        const id = setTimeout(() => {
            if (!del && text === word) { setTimeout(() => setDel(true), 2200); return; }
            if (del && text === '') { setDel(false); setIdx(i => (i + 1) % words.length); return; }
            setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
        }, del ? 38 : 75);
        return () => clearTimeout(id);
    }, [text, del, idx, words]);
    return text;
}

/* ── Animated counter hook ── */
function useCounter(target, inView) {
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const dur = 1600; let start;
        const go = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(go); else setV(target);
        };
        requestAnimationFrame(go);
    }, [inView, target]);
    return v;
}

const StatItem = ({ value, suffix, label }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const count = useCounter(value, inView);
    return (
        <div ref={ref} className="home__stat">
            <span className="home__stat-value">{count}{suffix}</span>
            <span className="home__stat-label">{label}</span>
        </div>
    );
};

const STATS = [
    { value: 5,  suffix: '+', label: 'Anos de exp.' },
    { value: 20, suffix: '+', label: 'Tecnologias'  },
    { value: 15, suffix: '+', label: 'Projetos'      },
];

/* ── Hero Figure: transparent image + floating elements ── */
const HeroFigure = ({ isMobile }) => (
    <motion.div
        className={`hero-figure-wrapper${isMobile ? ' hero-figure-wrapper--mobile' : ''}`}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
        {/* Pulsing radar rings behind figure */}
        {!isMobile && (
            <>
                <div className="hero-pulse-ring hero-pulse-ring--1" />
                <div className="hero-pulse-ring hero-pulse-ring--2" />
                <div className="hero-pulse-ring hero-pulse-ring--3" />
            </>
        )}

        {/* Ground glow */}
        <div className="hero-figure__glow" />

        {/* The transparent figure */}
        <img
            src={imagemPrincipal}
            alt="William Coelho"
            className={`hero-figure__img${isMobile ? ' hero-figure__img--mobile' : ''}`}
        />

        {/* Floating skill cards — desktop only */}
        {!isMobile && (
            <>
                {/* Card 1 — top left */}
                <motion.div className="hero-float-card hero-float-card--1"
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
                    <span className="hero-float-card__icon">⚡</span>
                    <div>
                        <p className="hero-float-card__title">Full Stack Dev</p>
                        <p className="hero-float-card__sub">React · Spring Boot</p>
                    </div>
                </motion.div>

                {/* Card 2 — bottom left */}
                <motion.div className="hero-float-card hero-float-card--2"
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.45, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
                    <span className="hero-float-card__icon">📱</span>
                    <div>
                        <p className="hero-float-card__title">Mobile Dev</p>
                        <p className="hero-float-card__sub">React Native · Kotlin</p>
                    </div>
                </motion.div>

                {/* Card 3 — top right */}
                <motion.div className="hero-float-card hero-float-card--3"
                    initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
                    <span className="hero-float-card__icon">🚀</span>
                    <div>
                        <p className="hero-float-card__title">5+ Anos Exp.</p>
                        <p className="hero-float-card__sub">Brasília · Brasil</p>
                    </div>
                </motion.div>

                {/* Card 4 — bottom right (AI Tools with logo) */}
                <motion.div className="hero-float-card hero-float-card--4"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
                    <img src={logoIA} alt="AI" className="hero-float-card__logo" />
                    <div>
                        <p className="hero-float-card__title">AI Tools</p>
                        <p className="hero-float-card__sub">GitHub Copilot · e mais</p>
                    </div>
                </motion.div>

                {/* Round pill badge — upper right */}
                <motion.div className="hero-float-pill"
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.4, type: 'spring', stiffness: 320 }}>
                    <span className="hero-float-pill__num">20+</span>
                    <span className="hero-float-pill__label">Techs</span>
                </motion.div>
            </>
        )}
    </motion.div>
);

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
    }),
};

const Home = ({ isMobile, scrollToSection, sectionRefs }) => {
    const openUrl = (url) => window.open(url, '_blank')?.focus();
    const openCV  = () => window.open(cv);
    const role    = useTypeWriter(ROLES);

    return (
        <section className="home">
            {/* ── Aurora animated background ── */}
            <div className="home__aurora" aria-hidden="true">
                <div className="home__aurora-blob home__aurora-blob--1" />
                <div className="home__aurora-blob home__aurora-blob--2" />
                <div className="home__aurora-blob home__aurora-blob--3" />
            </div>

            {/* ── Interactive particle network ── */}
            <ParticleBackground disabled={isMobile} />

            {/* ── Dot grid bg ── */}
            <div className="home__dot-grid" aria-hidden="true" />

            <div className={`home__inner${isMobile ? ' home__inner--mobile' : ''}`}>

                {/* ── Left: Text Content ── */}
                <div className="home__content">
                    {/*<motion.div className="available-badge"*/}
                    {/*    variants={fadeUp} initial="hidden" animate="visible" custom={0}>*/}
                    {/*    <span className="available-badge__dot" />*/}
                    {/*    Disponível para oportunidades*/}
                    {/*</motion.div>*/}

                    <motion.p className="home__greeting"
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                        👋 Olá, eu sou
                    </motion.p>

                    <motion.h1 className="home__name glitch-name"
                        variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        data-text="William Coelho">
                        William Coelho
                    </motion.h1>

                    <motion.p className="home__role"
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                        <span>{role}</span>
                        <span className="typewriter-cursor" aria-hidden="true" />
                    </motion.p>

                    <motion.p className="home__bio"
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                        Formado em Ciência da Computação pela UnB. Apaixonado por criar
                        experiências digitais de alta qualidade com Java
                        Spring Boot, React, Angular e desenvolvimento mobile.
                    </motion.p>

                    <motion.div className="home__actions"
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                        <motion.button className="btn btn--primary btn--magnetic" onClick={openCV}
                            whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                            ↓ Currículo
                        </motion.button>
                        <motion.button className="btn btn--outline btn--magnetic"
                            onClick={() => scrollToSection(sectionRefs.contact)}
                            whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                            Fale Comigo →
                        </motion.button>
                    </motion.div>

                    <motion.div className="home__socials"
                        variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                        {[
                            { icon: github,   url: githubUrl,   label: 'GitHub'   },
                            { icon: linkedin, url: linkedinUrl, label: 'LinkedIn' },
                        ].map(({ icon, url, label }) => (
                            <motion.button key={label} className="home__social-link"
                                onClick={() => openUrl(url)} aria-label={label}
                                whileHover={{ y: -5, scale: 1.15 }} whileTap={{ scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                                <img src={icon} alt={label} />
                            </motion.button>
                        ))}
                    </motion.div>

                    <motion.div className="home__stats"
                        variants={fadeUp} initial="hidden" animate="visible" custom={7}>
                        {STATS.map(s => (
                            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                        ))}
                    </motion.div>
                </div>

                {/* ── Right: Hero Figure ── */}
                <HeroFigure isMobile={isMobile} />
            </div>

            {!isMobile && (
                <div className="home__scroll-hint">
                    <span>scroll</span>
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                        <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8" cy="7" r="2" fill="currentColor">
                            <animate attributeName="cy" values="7;14;7" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                </div>
            )}
        </section>
    );
};

export default Home;
