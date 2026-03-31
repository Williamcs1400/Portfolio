import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const BackToTop = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 450);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);
    return React.createElement(AnimatePresence, null,
        visible && React.createElement(motion.button, {
            className: 'back-to-top',
            onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.25 },
            'aria-label': 'Voltar ao topo'
        }, '↑')
    );
};
export default BackToTop;