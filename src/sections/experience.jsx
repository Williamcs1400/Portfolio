import React from 'react';
import { motion } from 'framer-motion';
import '../styles/App.css';

/* level: 1–5 dots filled */
const SKILLS = [
    {
        category: 'Frontend',
        color: '#A78BFA',
        items: [
            { name: 'HTML / CSS', level: 5 },
            { name: 'JavaScript', level: 5 },
            { name: 'TypeScript', level: 5 },
            { name: 'React.js', level: 5 },
            { name: 'SASS', level: 3 },
        ],
    },
    {
        category: 'Backend',
        color: '#22D3EE',
        items: [
            { name: 'Java + Spring Boot', level: 5 },
            { name: 'Node.js', level: 5 },
            { name: 'Python / Flask', level: 4 },
            { name: 'Kotlin', level: 4 },
            { name: 'C++', level: 4 },
            { name: 'C#', level: 3 },
        ],
    },
    {
        category: 'Mobile',
        color: '#F472B6',
        items: [
            { name: 'React Native', level: 5 },
            { name: 'Android Studio (Java/Kotlin)', level: 5 },
            { name: 'Flutter', level: 3 },
            { name: 'Qt', level: 4 },
            { name: '.NET MAUI', level: 3 },
        ],
    },
    {
        category: 'DevOps & Dados',
        color: '#34D399',
        items: [
            { name: 'Docker', level: 4 },
            { name: 'PostgreSQL / MySQL', level: 5 },
            { name: 'Firebase', level: 5 },
            { name: 'Apache Kafka', level: 3 },
            { name: 'Git / GitHub', level: 5 },
        ],
    },
];

const LevelDots = ({ level, color }) => (
    <span className="skill-item__level">
        {Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                className={`skill-item__dot${i < level ? ' skill-item__dot--filled' : ''}`}
                style={i < level ? { background: color, borderColor: color } : {}}
            />
        ))}
    </span>
);

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
};

const Experience = ({ isMobile }) => (
    <section className="experience">
        <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
        >
            <p className="section-label">Tecnologias &amp; Ferramentas</p>
            <h2 className="section-title">Habilidades</h2>
        </motion.div>

        <div className={`experience__grid${isMobile ? ' experience__grid--mobile' : ''}`}>
            {SKILLS.map(({ category, color, items }, i) => (
                <motion.div
                    key={category}
                    className="skill-card"
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div className="skill-card__category">
                        <span
                            className="skill-card__category-dot"
                            style={{ background: color }}
                        />
                        {category}
                    </div>
                    <ul className="skill-card__list">
                        {items.map(({ name, level }) => (
                            <li key={name} className="skill-item">
                                <span className="skill-item__name">{name}</span>
                                <LevelDots level={level} color={color} />
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    </section>
);

export default Experience;