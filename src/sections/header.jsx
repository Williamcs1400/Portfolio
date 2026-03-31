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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNav = (key) => {
        scrollToSection(sectionRefs[key]);
        setOpen(false);
    };

    return (
        <>
            <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
                <button
                    className="header__brand"
                    onClick={() => scrollToSection(sectionRefs.home)}
                >
                    William Coelho
                </button>

                {!isMobile ? (
                    <nav className="header__nav">
                        {navItems.map(({ label, key }) => (
                            <button
                                key={key}
                                className="header__nav-item"
                                onClick={() => handleNav(key)}
                            >
                                {label}
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
                                        className="drawer__nav-item"
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