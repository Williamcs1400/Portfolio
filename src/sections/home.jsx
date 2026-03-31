import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import me from '../assets/me.jpg';
import github from '../assets/icons/github.png';
import linkedin from '../assets/icons/linkedin.png';
import cv from '../assets/WilliamCoelho_CV.pdf';
import { githubUrl, linkedinUrl } from '../util/texts';
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
            if (!del && text === word) {
                setTimeout(() => setDel(true), 2200);
                return;
            }
            if (del && text === '') {
                setDel(false);
                setIdx(i => (i + 1) % words.length);
                return;
            }
            setText(del
                ? word.slice(0, text.length - 1)
                : word.slice(0, text.length + 1));
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
        const dur = 1600;
        let start;
        const go = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(go);
            else setV(target);
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

const ORBIT_TECHS = [
    { label: 'React',      abbr: 'Re' },
    { label: 'Java',       abbr: 'Jv' },
    { label: 'Node.js',    abbr: 'Nd' },
    { label: 'Spring',     abbr: 'Sp' },
    { label: 'Docker',     abbr: 'Dk' },
    { label: 'TypeScript', abbr: 'TS' },
    { label: 'Kotlin',     abbr: 'Kt' },
    { label: 'Python',     abbr: 'Py' },
];

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
            {/* ── Dot grid bg ── */}
            <div className="home__dot-grid" aria-hidden="true" />

            <div className={`home__inner${isMobile ? ' home__inner--mobile' : ''}`}>

                {/* ── Content ── */}
                <div className="home__content">

                    {/* Available badge */}
                    <motion.div
                        className="available-badge"
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    >
                        <span className="available-badge__dot" />
                        Disponível para oportunidades
                    </motion.div>

                    <motion.p className="home__greeting"
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                        👋 Olá, eu sou
                    </motion.p>

                    <motion.h1 className="home__name"
                        variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                        William Coelho
                    </motion.h1>

                    {/* Typewriter role */}
                    <motion.p className="home__role"
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                        <span>{role}</span>
                        <span className="typewriter-cursor" aria-hidden="true" />
                    </motion.p>

                    <motion.p className="home__bio"
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                        Formado em Ciência da Computação pela UnB. Apaixonado por criar
                        experiências digitais de alta qualidade com React, Node.js, Java
                        Spring Boot e desenvolvimento mobile.
                    </motion.p>

                    <motion.div className="home__actions"
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                        <motion.button
                            className="btn btn--primary"
                            onClick={openCV}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        >
                            Currículo
                        </motion.button>
                        <motion.button
                            className="btn btn--outline"
                            onClick={() => scrollToSection(sectionRefs.contact)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        >
                            Fale Comigo
                        </motion.button>
                    </motion.div>

                    <motion.div className="home__socials"
                        variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                        {[
                            { icon: github, url: githubUrl, label: 'GitHub' },
                            { icon: linkedin, url: linkedinUrl, label: 'LinkedIn' },
                        ].map(({ icon, url, label }) => (
                            <motion.button
                                key={label}
                                className="home__social-link"
                                onClick={() => openUrl(url)}
                                aria-label={label}
                                whileHover={{ y: -5, scale: 1.15 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            >
                                <img src={icon} alt={label} />
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Stats */}
                    <motion.div className="home__stats"
                        variants={fadeUp} initial="hidden" animate="visible" custom={7}>
                        {STATS.map(s => (
                            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                        ))}
                    </motion.div>
                </div>

                {/* ── Profile image + orbit ── */}
                <motion.div className="home__image-wrapper"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="orbit-container">
                        {/* Centered photo ring */}
                        <div className={`home__image-ring${isMobile ? ' home__image-ring--mobile' : ''}`}>
                            <div className="home__image-inner">
                                <img src={me} alt="William Coelho" />
                            </div>
                        </div>

                        {/* Orbiting tech badges */}
                        {!isMobile && ORBIT_TECHS.map((tech, i) => {
                            const delay = -((i / ORBIT_TECHS.length) * 22);
                            return (
                                <div
                                    key={tech.label}
                                    className="orbit-ring"
                                    style={{ animationDelay: `${delay}s` }}
                                >
                                    <div
                                        className="orbit-badge-wrapper"
                                        style={{ animationDelay: `${delay}s` }}
                                    >
                                        <div className="orbit-badge" data-label={tech.label}>
                                            {tech.abbr}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
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
