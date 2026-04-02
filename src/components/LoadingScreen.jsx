import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 2000);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Logo */}
                    <motion.div
                        className="loading-logo"
                        initial={{ scale: 0, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <span className="loading-logo__text">WC</span>
                    </motion.div>

                    {/* Name */}
                    <motion.p
                        className="loading-name"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.35 }}
                    >
                        William Coelho
                    </motion.p>

                    {/* Progress bar */}
                    <div className="loading-bar-track">
                        <motion.div
                            className="loading-bar-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.7, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

