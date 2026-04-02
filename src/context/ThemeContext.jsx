import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEMES = [
    // ── Escuros ──────────────────────────────────────────────────
    { id: 'ciano-preto',     name: 'Ciano & Preto',     accent: '#22D3EE', bg: '#050A0F', dark: true  },
    { id: 'verde-preto',     name: 'Verde & Preto',     accent: '#22C55E', bg: '#05090A', dark: true  },
    { id: 'roxo-preto',      name: 'Roxo & Preto',      accent: '#A78BFA', bg: '#07070F', dark: true  },
    { id: 'vermelho-preto',  name: 'Vermelho & Preto',  accent: '#EF4444', bg: '#09050A', dark: true  },
    { id: 'laranja-preto',   name: 'Laranja & Preto',   accent: '#F97316', bg: '#09080A', dark: true  },
    { id: 'rosa-preto',      name: 'Rosa & Preto',      accent: '#EC4899', bg: '#09050A', dark: true  },
    { id: 'dourado-preto',   name: 'Dourado & Preto',   accent: '#EAB308', bg: '#0A090A', dark: true  },
    // ── Claros ───────────────────────────────────────────────────
    { id: 'verde-branco',    name: 'Verde & Branco',    accent: '#16A34A', bg: '#F9FAFB', dark: false },
    { id: 'vermelho-branco', name: 'Vermelho & Branco', accent: '#DC2626', bg: '#F9FAFB', dark: false },
    { id: 'laranja-branco',  name: 'Laranja & Branco',  accent: '#EA580C', bg: '#F9FAFB', dark: false },
    { id: 'azul-branco',     name: 'Azul & Branco',     accent: '#2563EB', bg: '#F9FAFB', dark: false },
    { id: 'roxo-branco',     name: 'Roxo & Branco',     accent: '#7C3AED', bg: '#F9FAFB', dark: false },
];

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(
        () => localStorage.getItem('portfolio-theme') || 'ciano-preto'
    );

    const setTheme = (id) => {
        setThemeState(id);
        localStorage.setItem('portfolio-theme', id);
        document.documentElement.setAttribute('data-theme', id);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const currentTheme = THEMES.find(t => t.id === theme) ?? THEMES[0];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
    return ctx;
};
