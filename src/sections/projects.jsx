import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import '../styles/App.css';
import arara from '../assets/projectsPapers/arara.png';
import javaApi from '../assets/projectsPapers/java-api.jpg';
import androidApps from '../assets/projectsPapers/android.png';
import python from '../assets/projectsPapers/python.png';
import { toast, Toaster } from 'react-hot-toast';
import {
    githubApps,
    githubUrlArara,
    githubUrlBolao,
    githubUrlNews,
    textApps,
    textArara,
    textBolao,
    textNews,
    urlArara,
} from '../util/texts';

const PROJECTS = [
    {
        name: 'Arara — Editor & Juiz Online',
        github: githubUrlArara,
        demo: urlArara,
        desc: textArara,
        image: arara,
        tags: ['Compiladores', 'Linguagem Própria', 'TCC', 'Web'],
    },
    {
        name: 'API Bolão',
        github: githubUrlBolao,
        demo: null,
        desc: textBolao,
        image: javaApi,
        tags: ['Java', 'Spring Boot', 'REST API', 'PDF'],
    },
    {
        name: 'Aplicativos Android',
        github: githubApps,
        demo: null,
        desc: textApps,
        image: androidApps,
        tags: ['Android', 'Java', 'Kotlin'],
    },
    {
        name: 'Agregador de Notícias',
        github: githubUrlNews,
        demo: null,
        desc: textNews,
        image: python,
        tags: ['Python', 'Flask', 'Web Scraping'],
    },
];

const openUrl = (url) => window.open(url, '_blank')?.focus();

const ProjectCard = ({ project, toastStyle }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
        card.style.boxShadow = `
            ${-x * 12}px ${-y * 12}px 40px rgba(var(--color-accent-rgb), 0.18),
            0 20px 60px rgba(0,0,0,0.5)
        `;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
        card.style.boxShadow = '';
    };

    return (
    <motion.div
        ref={cardRef}
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: 'transform 0.12s ease, box-shadow 0.12s ease' }}
    >
        <div className="project-card__image-wrapper">
            <img src={project.image} alt={project.name} className="project-card__image" />
            {/* Hover overlay with tags */}
            <div className="project-card__overlay">
                <div className="project-card__overlay-tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-card__overlay-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
        <div className="project-card__body">
            <h3 className="project-card__title">{project.name}</h3>
            <p className="project-card__desc">{project.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {project.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                ))}
            </div>
            <div className="project-card__actions">
                <motion.button
                    className="project-card__btn project-card__btn--primary"
                    onClick={() => openUrl(project.github)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    ↗ GitHub
                </motion.button>
                <motion.button
                    className="project-card__btn"
                    onClick={() =>
                        project.demo
                            ? openUrl(project.demo)
                            : toast('Demo não disponível', { style: toastStyle })
                    }
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {project.demo ? '▶ Demo' : 'Demo —'}
                </motion.button>
            </div>
        </div>
    </motion.div>
    );
};

const Projects = ({ isMobile }) => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = PROJECTS.length;
    const { currentTheme } = useTheme();

    const toastStyle = {
        background: currentTheme.dark ? '#10101E' : '#FFFFFF',
        color: currentTheme.dark ? '#F1F5F9' : '#111827',
        border: `1px solid ${currentTheme.accent}40`,
    };

    return (
        <section className="projects">
            <Toaster />
            <motion.div
                style={{ textAlign: 'center', marginBottom: '3rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <p className="section-label">Alguns dos meus</p>
                <br/>
                <h2 className="section-title">Projetos</h2>
            </motion.div>

            {/* Desktop: grid; Mobile: carousel */}
                {!isMobile ? (
                <div className="projects__grid">
                    {PROJECTS.map(p => <ProjectCard key={p.name} project={p} toastStyle={toastStyle} />)}
                </div>
            ) : (
                <>
                    <div className="projects__grid projects__grid--mobile">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard project={PROJECTS[activeStep]} toastStyle={toastStyle} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Stepper */}
                    <div className="projects__stepper">
                        <button
                            className="projects__stepper-btn"
                            onClick={() => setActiveStep(s => s - 1)}
                            disabled={activeStep === 0}
                            aria-label="Anterior"
                        >
                            ←
                        </button>
                        {PROJECTS.map((_, i) => (
                            <span
                                key={i}
                                className={`projects__stepper-dot${i === activeStep ? ' projects__stepper-dot--active' : ''}`}
                                onClick={() => setActiveStep(i)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                        <button
                            className="projects__stepper-btn"
                            onClick={() => setActiveStep(s => s + 1)}
                            disabled={activeStep === maxSteps - 1}
                            aria-label="Próximo"
                        >
                            →
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default Projects;

