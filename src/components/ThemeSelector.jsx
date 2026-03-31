import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

const darkThemes  = THEMES.filter(t => t.dark);
const lightThemes = THEMES.filter(t => !t.dark);

const PaletteIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor"/>
        <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
);

const ThemeRow = ({ t, active, onClick }) => (
    <button
        onClick={() => onClick(t.id)}
        title={t.name}
        style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            width: '100%', padding: '0.5rem 0.75rem',
            background: active ? `rgba(var(--color-accent-rgb), 0.10)` : 'transparent',
            border: active ? '1px solid rgba(var(--color-accent-rgb), 0.3)' : '1px solid transparent',
            borderRadius: 'var(--radius)', cursor: 'pointer',
            transition: 'background 0.2s ease', textAlign: 'left',
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--color-hover-subtle)'; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
        <span style={{
            display: 'flex', flexShrink: 0, width: 28, height: 28,
            borderRadius: '50%', overflow: 'hidden',
            border: '2px solid rgba(128,128,128,0.3)',
            boxShadow: active ? `0 0 0 2px ${t.accent}` : 'none',
        }}>
            <span style={{ width: '50%', background: t.bg }} />
            <span style={{ width: '50%', background: t.accent }} />
        </span>
        <span style={{
            fontSize: '0.875rem', fontWeight: active ? 600 : 400, flex: 1,
            color: active ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
        }}>
            {t.name}
        </span>
        {active && (
            <span style={{ color: 'var(--color-accent-light)', fontSize: '0.75rem' }}>✓</span>
        )}
    </button>
);

const label = {
    fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--color-text-muted)',
    marginBottom: '0.5rem', paddingLeft: '0.75rem', display: 'block',
};

const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Selecionar tema"
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38, borderRadius: 'var(--radius-full)',
                    border: open ? '1px solid rgba(var(--color-accent-rgb),0.5)' : '1px solid var(--color-border)',
                    background: open ? 'rgba(var(--color-accent-rgb),0.1)' : 'transparent',
                    color: open ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
                    cursor: 'pointer', transition: 'all 0.2s ease', marginLeft: '0.5rem',
                }}
            >
                <PaletteIcon />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                            width: 240, background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
                            padding: '1rem', zIndex: 2000,
                            maxHeight: '80vh', overflowY: 'auto',
                        }}
                    >
                        <span style={label}>Escuros</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '0.75rem' }}>
                            {darkThemes.map(t => (
                                <ThemeRow key={t.id} t={t} active={theme === t.id} onClick={(id) => { setTheme(id); setOpen(false); }} />
                            ))}
                        </div>
                        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: '0.75rem' }} />
                        <span style={label}>Claros</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {lightThemes.map(t => (
                                <ThemeRow key={t.id} t={t} active={theme === t.id} onClick={(id) => { setTheme(id); setOpen(false); }} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSelector;
