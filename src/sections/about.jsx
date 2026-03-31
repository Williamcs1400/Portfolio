import React, { useState, useRef } from 'react';
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
    const mobileXP    = new Date().getFullYear() - 2020;

    /* ── 3-D tilt effect ── */
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const tiltRef = useRef(null);

    const handleMouseMove = (e) => {
        if (isMobile || !tiltRef.current) return;
        const rect = tiltRef.current.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width  - 0.5;
        const cy = (e.clientY - rect.top)  / rect.height - 0.5;
        setTilt({ x: cy * 14, y: -cx * 14 });
    };
    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <section className="about">
            <div className={`about__inner${isMobile ? ' about__inner--mobile' : ''}`}>

                {/* ---- Image with 3-D tilt ---- */}
                <div
                    ref={tiltRef}
                    className="about__tilt-wrapper"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease' : 'transform 0.08s ease',
                    }}
                >
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
                        <div className="about__image-glare" />
                    </motion.div>
                </div>

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
                        {[
                            {
                                icon: education, title: 'Educação',
                                value: <>Ciência da Computação<br />Universidade de Brasília, 2023</>,
                            },
                            {
                                icon: experience, title: 'Experiência',
                                value: <>+{fullstackXP} anos Full Stack<br />+{mobileXP} anos Mobile</>,
                            },
                        ].map((card) => (
                            <motion.div
                                key={card.title}
                                className="about__stat-card"
                                whileHover={{ scale: 1.03, y: -4, boxShadow: 'var(--shadow-glow)' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <img src={card.icon} alt="" className="about__stat-icon" />
                                <p className="about__stat-title">{card.title}</p>
                                <p className="about__stat-value">{card.value}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Tech stack — staggered badges */}
                    <motion.div
                        variants={fadeUp}
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <p className="about__tech-heading">Stack principal</p>
                        <div className="about__tech-list">
                            {coreTech.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    className="about__tech-badge"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;