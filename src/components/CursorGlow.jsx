import React, { useEffect, useRef } from 'react';
const CursorGlow = () => {
    const ref = useRef(null);
    useEffect(() => {
        const move = (e) => {
            if (!ref.current) return;
            ref.current.style.left = e.clientX + 'px';
            ref.current.style.top  = e.clientY + 'px';
            ref.current.style.opacity = '1';
        };
        const hide = () => { if (ref.current) ref.current.style.opacity = '0'; };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseleave', hide);
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseleave', hide);
        };
    }, []);
    return React.createElement('div', { ref, className: 'cursor-glow', 'aria-hidden': 'true' });
};
export default CursorGlow;