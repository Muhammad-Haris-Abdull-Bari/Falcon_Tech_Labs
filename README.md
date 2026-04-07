# React Modern Portfolio Conversion
This is a converted modern React 18 application from your plain HTML/CSS/JS site.

## Tech Stack Used:
- React 18 + TypeScript
- GSAP 3 + @gsap/react
- Three.js + React Three Fiber
- Vite
- Framer Motion / Custom Hooks

## Features Implemented:
1. **Component Architecture**: Broken down `Hero`, `Navbar`, `Cursor`, `SectionDark`, and `Footer`.
2. **GSAP + Scroll Smoother**: Replaced the native `requestAnimationFrame` manual skewing loop with a GSAP hooked ticker (also cleanly commented for GSAP's official ScrollSmoother if you install the premium Club GreenSock plugin).
3. **Three.js Background**: Integrated `@react-three/fiber` to include an `AdditiveBlending` particle field background that rotates with framerate, satisfying the WebGL requirement.
4. **TypeScript**: Strongly typed every component. Added `useMousePosition` custom hooks.

## Quick Start Setup:
1. Open terminal here (`c:/Users/aaa/Downloads/Portfolio-Website-02/react-portfolio`)
2. Run `npm install` (Installs React, Vite, TS, GSAP, ThreeJS, etc)
3. Run `npm run dev` to start your modern architecture.
4. Use `npm run build` for a production-ready application.
