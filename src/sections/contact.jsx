import React from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import email from '../assets/icons/email.png';
import whatsapp from '../assets/icons/whatsapp.png';
import github from '../assets/icons/github.png';
import linkedin from '../assets/icons/linkedin.png';
import { emailAdress, githubUrl, linkedinUrl, wppUrl } from '../util/texts';
import '../styles/App.css';

const LINKS = [
    {
        icon: email,
        label: 'Email',
        value: emailAdress,
        action: 'copy',
    },
    {
        icon: whatsapp,
        label: 'WhatsApp',
        value: 'Me chame no WhatsApp',
        url: wppUrl,
    },
    {
        icon: linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/william-coelho-b27521239',
        url: linkedinUrl,
    },
    {
        icon: github,
        label: 'GitHub',
        value: 'github.com/Williamcs1400',
        url: githubUrl,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
};

const Contact = ({ scrollToSection, sectionRefs }) => {
    const { currentTheme } = useTheme();

    const toastStyle = {
        background: currentTheme.dark ? '#10101E' : '#FFFFFF',
        color: currentTheme.dark ? '#F1F5F9' : '#111827',
        border: `1px solid ${currentTheme.accent}40`,
    };

    const handleLinkClick = (link) => {
        if (link.action === 'copy') {
            navigator.clipboard.writeText(emailAdress).then(() => {
                toast('E-mail copiado! 📋', { style: toastStyle });
            });
        } else {
            window.open(link.url, '_blank')?.focus();
        }
    };

    const footerLinks = [
        { label: 'Início', key: 'home' },
        { label: 'Sobre', key: 'about' },
        { label: 'Experiência', key: 'experience' },
        { label: 'Projetos', key: 'projects' },
    ];

    return (
        <section className="contact">
            <Toaster />

            <motion.div
                style={{ textAlign: 'center', marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <p className="section-label">Vamos conversar?</p>
                <h2 className="section-title">Entre em Contato</h2>
                <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
                    Aberto a oportunidades, freelas ou apenas uma boa conversa sobre tecnologia.
                </p>
            </motion.div>

            <div className="contact__links">
                {LINKS.map((link, i) => (
                    <motion.button
                        key={link.label}
                        className="contact__link-card"
                        variants={fadeUp}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        onClick={() => handleLinkClick(link)}
                    >
                        <div className="contact__link-icon">
                            <img src={link.icon} alt={link.label} />
                        </div>
                        <div>
                            <p className="contact__link-label">{link.label}</p>
                            <p className="contact__link-value">{link.value}</p>
                        </div>
                        <span className="contact__link-arrow">→</span>
                    </motion.button>
                ))}
            </div>

            <footer className="contact__footer">
                <nav className="contact__footer-nav">
                    {footerLinks.map(({ label, key }) => (
                        <button
                            key={key}
                            className="contact__footer-link"
                            onClick={() => scrollToSection(sectionRefs[key])}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
                <p className="contact__copyright">
                    © {new Date().getFullYear()} William Coelho da Silva — Todos os direitos reservados
                </p>
            </footer>
        </section>
    );
};

export default Contact;