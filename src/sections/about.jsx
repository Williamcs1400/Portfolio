import React from 'react';
import { motion } from 'framer-motion';
import meabout from '../assets/me-about.jpg';
import education from '../assets/icons/education.png';
import experience from '../assets/icons/experience.png';
import { aboutText } from '../util/texts';
import '../styles/App.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
};

const coreTech = [
    'React', 'TypeScript', 'Node.js', 'Java', 'Spring Boot',
    'React Native', 'Kotlin', 'Python', 'Docker', 'PostgreSQL',
];

const About = ({ isMobile }) => {
    const fullstackXP = new Date().getFullYear() - 2021;
    const mobileXP = new Date().getFullYear() - 2020;

    return (
        <section className="about">
            <div className={`about__inner${isMobile ? ' about__inner--mobile' : ''}`}>

                {/* ---- Image ---- */}
                <motion.div
                    className="about__image-wrapper"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                    <img
                        src={meabout}
                        alt="William Coelho"
                        className={`about__image${isMobile ? ' about__image--mobile' : ''}`}
                    />
                </motion.div>

                {/* ---- Content ---- */}
                <div className="about__content">
                    <motion.div
                        className="about__header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <p className="section-label">Mais um pouco</p>
                        <h2 className="section-title">Sobre Mim</h2>
                    </motion.div>

                    <motion.p
                        className="about__text"
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {aboutText}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="about__stats"
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <div className="about__stat-card">
                            <img src={education} alt="" className="about__stat-icon" />
                            <p className="about__stat-title">Educação</p>
                            <p className="about__stat-value">
                                Ciência da Computação<br />
                                Universidade de Brasília, 2023
                            </p>
                        </div>
                        <div className="about__stat-card">
                            <img src={experience} alt="" className="about__stat-icon" />
                            <p className="about__stat-title">Experiência</p>
                            <p className="about__stat-value">
                                +{fullstackXP} anos Full Stack<br />
                                +{mobileXP} anos Mobile
                            </p>
                        </div>
                    </motion.div>

                    {/* Tech stack */}
                    <motion.div
                        variants={fadeUp}
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <p className="about__tech-heading">Stack principal</p>
                        <div className="about__tech-list">
                            {coreTech.map(tech => (
                                <span key={tech} className="about__tech-badge">{tech}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;