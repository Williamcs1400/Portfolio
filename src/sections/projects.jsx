import React, { useState } from 'react';
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

const ProjectCard = ({ project, toastStyle }) => (
    <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
        <div className="project-card__image-wrapper">
            <img src={project.image} alt={project.name} className="project-card__image" />
        </div>
        <div className="project-card__body">
            <h3 className="project-card__title">{project.name}</h3>
            <p className="project-card__desc">{project.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {project.tags.map(tag => (
                    <span
                        key={tag}
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(34, 211, 238, 0.08)',
                            border: '1px solid rgba(34, 211, 238, 0.2)',
                            color: 'var(--color-accent-2-light)',
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="project-card__actions">
                <button
                    className="project-card__btn project-card__btn--primary"
                    onClick={() => openUrl(project.github)}
                >
                    ↗ GitHub
                </button>
                <button
                    className="project-card__btn"
                    onClick={() =>
                        project.demo
                            ? openUrl(project.demo)
                            : toast('Demo não disponível', { style: toastStyle })
                    }
                >
                    {project.demo ? '▶ Demo' : 'Demo —'}
                </button>
            </div>
        </div>
    </motion.div>
);

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

