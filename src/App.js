import './styles/App.css';
import './styles/index.css';
import './styles/themes.css';
import { React, useEffect, useState, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';
import Home from './sections/home';
import Header from './sections/header';
import About from './sections/about';
import Experience from "./sections/experience";
import WorkHistory from "./sections/workHistory";
import Projects from "./sections/projects";
import Contact from "./sections/contact";

function AppContent() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [scrollProgress, setScrollProgress] = useState(0);

    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        workHistory: useRef(null),
        experience: useRef(null),
        projects: useRef(null),
        contact: useRef(null),
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            if (total > 0) setScrollProgress((window.scrollY / total) * 100);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function scrollToSection(ref) {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <LoadingScreen />
            <CursorGlow />
            <BackToTop />
            <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
            <Header scrollToSection={scrollToSection} sectionRefs={sectionRefs} isMobile={isMobile} />
            <main>
                <div ref={sectionRefs.home}>
                    <Home isMobile={isMobile} scrollToSection={scrollToSection} sectionRefs={sectionRefs} />
                </div>
                <div ref={sectionRefs.about}>
                    <About isMobile={isMobile} />
                </div>
                <div ref={sectionRefs.workHistory}>
                    <WorkHistory isMobile={isMobile} />
                </div>
                <div ref={sectionRefs.experience}>
                    <Experience isMobile={isMobile} />
                </div>
                <div ref={sectionRefs.projects}>
                    <Projects isMobile={isMobile} />
                </div>
                <div ref={sectionRefs.contact}>
                    <Contact isMobile={isMobile} scrollToSection={scrollToSection} sectionRefs={sectionRefs} />
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
