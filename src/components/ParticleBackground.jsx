import React, { useEffect, useRef } from 'react';

/**
 * Interactive canvas particle network.
 * Particles gently drift and connect with lines.
 * Mouse cursor repels nearby particles.
 * Reads the current theme accent color via CSS variable.
 */
const ParticleBackground = ({ disabled = false }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (disabled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let mouseX = -9999;
        let mouseY = -9999;
        let accentRgb = '124, 58, 237';

        // Periodically read the current theme accent colour
        const readAccent = () => {
            const v = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-accent-rgb').trim();
            if (v) accentRgb = v;
        };
        readAccent();
        const accentInterval = setInterval(readAccent, 600);

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
        const onLeave = () => { mouseX = -9999; mouseY = -9999; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseleave', onLeave);

        const COUNT  = window.innerWidth < 768 ? 35 : 75;
        const MAX_D  = 140; // max connection distance
        const MOUSE_R = 130; // mouse repulsion radius

        const make = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: Math.random() * 1.8 + 0.5,
            alpha: Math.random() * 0.45 + 0.1,
        });
        const particles = Array.from({ length: COUNT }, make);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Mouse repulsion
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < MOUSE_R && d > 0) {
                    const force = ((MOUSE_R - d) / MOUSE_R) * 0.55;
                    p.vx += (dx / d) * force;
                    p.vy += (dy / d) * force;
                }

                p.vx *= 0.976;
                p.vy *= 0.976;
                p.x  += p.vx;
                p.y  += p.vy;

                // Wrap edges
                if (p.x < -20)               p.x = canvas.width  + 20;
                if (p.x > canvas.width  + 20) p.x = -20;
                if (p.y < -20)               p.y = canvas.height + 20;
                if (p.y > canvas.height + 20) p.y = -20;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${accentRgb}, ${p.alpha})`;
                ctx.fill();
            });

            // Draw connecting lines
            for (let i = 0; i < COUNT; i++) {
                for (let j = i + 1; j < COUNT; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_D) {
                        const opacity = (1 - dist / MAX_D) * 0.1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${accentRgb}, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            clearInterval(accentInterval);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseleave', onLeave);
        };
    }, [disabled]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default ParticleBackground;

