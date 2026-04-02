import { React, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSelector from '../components/ThemeSelector';
import '../styles/App.css';

const navItems = [
    { label: 'Sobre', key: 'about' },
    { label: 'Trajetória', key: 'workHistory' },
    { label: 'Habilidades', key: 'experience' },
    { label: 'Projetos', key: 'projects' },
    { label: 'Contato', key: 'contact' },
];

const Header = ({ scrollToSection, sectionRefs, isMobile }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Highlight nav item of the visible section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const key = entry.target.dataset.section;
                        if (key) setActiveSection(key);
                    }
                });
            },
            { threshold: 0.3 }
        );
        Object.entries(sectionRefs).forEach(([key, ref]) => {
            if (ref.current) {
                ref.current.dataset.section = key;
                observer.observe(ref.current);
            }
        });
        return () => observer.disconnect();
    }, [sectionRefs]);

    const handleNav = (key) => {
        scrollToSection(sectionRefs[key]);
        setOpen(false);
    };

    return (
        <>
            <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
                {/* Brand with WC logo */}
                <button
                    className="header__brand"
                    onClick={() => scrollToSection(sectionRefs.home)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                >
                    <span className="header__brand-logo" aria-hidden="true">WC</span>
                    William Coelho
                </button>

                {!isMobile ? (
                    <nav className="header__nav">
                        {navItems.map(({ label, key }) => (
                            <button
                                key={key}
                                className={`header__nav-item${activeSection === key ? ' header__nav-item--active' : ''}`}
                                onClick={() => handleNav(key)}
                            >
                                {label}
                                {activeSection === key && (
                                    <motion.span
                                        className="header__nav-dot"
                                        layoutId="nav-dot"
                                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                    />
                                )}
                            </button>
                        ))}
                        <ThemeSelector />
                    </nav>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ThemeSelector />
                        <button
                            className="header__hamburger"
                            onClick={() => setOpen(true)}
                            aria-label="Abrir menu"
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                )}
            </header>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="drawer-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            className="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <button
                                className="drawer__close"
                                onClick={() => setOpen(false)}
                                aria-label="Fechar menu"
                            >
                                ✕
                            </button>
                            <nav className="drawer__nav">
                                {navItems.map(({ label, key }) => (
                                    <button
                                        key={key}
                                        className={`drawer__nav-item${activeSection === key ? ' drawer__nav-item--active' : ''}`}
                                        onClick={() => handleNav(key)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;

