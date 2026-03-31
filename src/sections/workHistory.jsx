import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/App.css';

const JOBS = [
    {
        company: 'Cover Tecnologia',
        subtitle: 'Prestando serviço para Allianz Seguros',
        role: 'Desenvolvedor FullStack',
        period: '2025 – 2026',
        current: false,
        tags: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JPA', 'JUnit', 'Jenkins', 'Jira'],
        bullets: [
            'Desenvolvimento em Java Spring Boot para criação de APIs, serviços, persistência e consultas em banco de dados com JPA, incluindo elaboração de queries complexas e otimizadas com SQL nativo.',
            'Integração com sistemas em COBOL e escrita de testes unitários com JUnit e Mockito.',
            'Desenvolvimento em Angular na criação e melhoria de páginas modernas.',
            'Utilização do PostgreSQL, Jenkins, Red Hat JBoss, GitHub, Sonar e Jira.',
        ],
    },
    {
        company: 'E-sec Segurança Digital',
        subtitle: null,
        role: 'Desenvolvedor Mobile/FullStack e Gestão',
        period: '2021 – 2025',
        current: false,
        tags: ['Java', 'Spring Boot', 'React', 'Angular', 'Qt5 (C++)', 'Docker', 'AWS', 'React Native', 'Flutter'],
        bullets: [
            'Desenvolvimento em Java Spring Boot de APIs e serviços relacionados à assinatura digital, criação de bibliotecas e microsserviços, além de Java Swing.',
            'Desenvolvimento em ReactJS, Angular, HTML, CSS e JS de páginas modernas, fluidas e com comunicação com o backend.',
            'Desenvolvimento Mobile com QT5 (C++) para Windows, MacOS, Linux, Android e iOS, além de publicação de aplicativo em suas lojas online.',
            'Uso do Flutter, React Native e Android Studio para criação de POCs.',
            'Criação de métricas de monitoramento dos serviços com Prometheus/Victoria Metrics e exibição com o Grafana.',
            'Utilização do PostgreSQL, MySQL, Firebase, AWS, Keycloak, OpenSSL, BitBucket, Docker, NodeJS, GitHub Copilot, Python, Terraform, WordPress e gateway de pagamento (Stripe).',
            'Coordenação de equipe, direcionamento técnico, apoio aos desenvolvedores e atuação como Scrum Master quando necessário.',
        ],
    },
    {
        company: 'Tribunal de Justiça do Distrito Federal',
        subtitle: null,
        role: 'Estagiário',
        period: '2020 – 2021',
        current: false,
        tags: ['Suporte Técnico', 'TI'],
        bullets: [
            'Suporte técnico ao usuário interno.',
        ],
    },
    {
        company: 'Banco do Brasil',
        subtitle: null,
        role: 'Jovem Aprendiz',
        period: '2015 – 2017',
        current: false,
        tags: ['Administrativo'],
        bullets: [
            'Auxiliar de escritório.',
        ],
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: i * 0.13, ease: [0.4, 0, 0.2, 1] },
    }),
};

const JobCard = ({ job, index }) => {
    const [expanded, setExpanded] = useState(index === 0);

    return (
        <motion.div
            className={`wh-card${job.current ? ' wh-card--current' : ''}`}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
        >
            {/* Timeline dot */}
            <div className="wh-timeline__dot">
                <div className="wh-timeline__dot-inner" />
            </div>

            {/* Period badge */}
            <div className="wh-card__period">
                {job.current && <span className="wh-card__current-badge">Atual</span>}
                {job.period}
            </div>

            {/* Header (always visible) */}
            <button
                className="wh-card__header"
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
            >
                <div className="wh-card__header-left">
                    <h3 className="wh-card__company">{job.company}</h3>
                    {job.subtitle && (
                        <span className="wh-card__subtitle">{job.subtitle}</span>
                    )}
                    <p className="wh-card__role">{job.role}</p>
                </div>
                <span className={`wh-card__chevron${expanded ? ' wh-card__chevron--open' : ''}`}>
                    ›
                </span>
            </button>

            {/* Tags */}
            <div className="wh-card__tags">
                {job.tags.map(tag => (
                    <span key={tag} className="wh-card__tag">{tag}</span>
                ))}
            </div>

            {/* Expandable bullets */}
            <motion.div
                className="wh-card__bullets-wrapper"
                initial={false}
                animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
            >
                <ul className="wh-card__bullets">
                    {job.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

const WorkHistory = ({ isMobile }) => (
    <section className="work-history">
        <motion.div
            className="wh-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
        >
            <p className="section-label">Onde já trabalhei</p>
            <h2 className="section-title">Trajetória Profissional</h2>
        </motion.div>

        <div className={`wh-timeline${isMobile ? ' wh-timeline--mobile' : ''}`}>
            <div className="wh-timeline__line" />
            {JOBS.map((job, i) => (
                <JobCard key={job.company} job={job} index={i} />
            ))}
        </div>
    </section>
);

export default WorkHistory;



