import { useRef, useMemo } from 'react';
import { useGsapAnimation, gsap } from '../animations';
import Hyperspeed from './Hyperspeed';

export default function HeroSection() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  const hyperspeedOptions = useMemo(() => {
    return {
      onSpeedUp: () => { },
      onSlowDown: () => { },
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [12, 80],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x03b3c3,
      }
    };
  }, []);

  useGsapAnimation(() => {
    // 1. Initial Cinematic Fade-in for text
    // OPTIMIZATION: Added `force3D: true` to offload to GPU matrix completely. 
    // Adjusted ease to 'expo.out' which starts violently fast and slows down drastically, simulating real cinematic lenses.
    gsap.fromTo(
      textRef.current.children,
      { y: 120, opacity: 0, filter: 'blur(20px)', scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 2.5,
        stagger: 0.25,
        ease: 'expo.out',
        delay: 0.3,
        force3D: true, // Hardware acceleration
      }
    );

    // 2. Continuous Ambient Slow Zoom
    // OPTIMIZATION: We now animate the parent wrapper rather than the raw <video> tag, avoiding paint thrashing.
    gsap.fromTo(
      videoWrapperRef.current,
      { scale: 1.02 },
      {
        scale: 1.15,
        duration: 45, // Much slower execution implies massive scale
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        force3D: true,
      }
    );

    // 3. Parallax transition to next section
    // OPTIMIZATION: Replaced static scrub with `scrub: 1.5`, which introduces a buttery momentum drag.
    // Also shrinking the text (scale down) as it fades out creates a "falling away" depth layer.
    gsap.to(textRef.current, {
      y: 300,
      opacity: 0,
      scale: 0.85,
      ease: 'power2.inOut',
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5, // 1.5 seconds to catch up to the scroll bar
      },
    });

    // Darken overlay
    gsap.to(overlayRef.current, {
      opacity: 1,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5, // Responds faster than the text to plunge into darkness sooner
      },
    });
  }, [], containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-zinc-950"
    >
      {/* Background Video Wrapper 
          OPTIMIZATION: will-change-transform tells the browser to allocate a standalone texture 
          in VRam before animation even begins.
      */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full transform-gpu origin-center will-change-transform"
      >
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>

      {/* Cinematic Dark Overlay Matrix */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/40 to-zinc-950/90 z-0 opacity-80 transform-gpu will-change-opacity"
      />

      {/* Content wrapper */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 transform-gpu will-change-transform"
      >
        <h1 className="text-8xl md:text-[10rem] font-black leading-none tracking-tighter text-zinc-50 drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]">
          Department of Physical Education
        </h1>
        <p className="mt-8 text-1xl md:text-2xl font-light tracking-[0.4em] md:tracking-[0.8em] text-zinc-300 uppercase drop-shadow-2xl flex items-center gap-6">
          CHRIST (Deemed to be University) <span className="opacity-20 inline-block h-6 w-[2px] bg-zinc-50 transform rotate-12"></span> BYC
        </p>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute z-10 bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 pointer-events-none">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>
    </section>
  );
}
