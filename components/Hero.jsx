"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const wordRef = useRef(null);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 170, damping: 18, mass: 0.4 });
  const rotateX = useTransform(springY, [-34, 34], [7, -7]);
  const rotateY = useTransform(springX, [-34, 34], [-7, 7]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".hero-letter");
      const mm = gsap.matchMedia();

      gsap.set(panelRef.current, {
        clipPath: "inset(42% 5% 7% 5%)",
        scale: 1.08,
      });

      mm.add("(min-width: 769px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=135%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline
          .to(letters, {
            x: (index) => (index - (letters.length - 1) / 2) * 28,
            y: (index) => (index % 2 === 0 ? -18 : 18),
            letterSpacing: "0.04em",
            opacity: 0.24,
            ease: "power2.out",
          })
          .to(
            panelRef.current,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              ease: "power2.out",
            },
            0
          )
          .to(
            ".hero-meta",
            {
              yPercent: -40,
              opacity: 0,
              ease: "power2.out",
            },
            0
          );
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(panelRef.current, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
      });

      gsap.from(".hero-kicker span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMove = (event) => {
    const bounds = buttonRef.current?.getBoundingClientRect();
    if (!bounds) return;

    x.set(event.clientX - bounds.left - bounds.width / 2);
    y.set(event.clientY - bounds.top - bounds.height / 2);
  };

  const resetMagnet = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black text-stone-100">
      <div
        ref={panelRef}
        className="absolute inset-x-3 bottom-24 top-[38%] z-0 overflow-hidden border border-white/10 bg-[#17120f] md:inset-0 md:border-0"
      >
        <img
          src={images.heroCut}
          alt="Макро распил темного ореха на высокоточном станке"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.64)),radial-gradient(circle_at_52%_28%,rgba(222,176,116,0.14),transparent_36%)]" />
      </div>

      <div className="relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] px-5 py-5 md:min-h-screen md:px-10 md:py-8">
        <header className="hero-meta flex items-start justify-between text-[10px] uppercase tracking-[0.34em] text-stone-300/70 md:text-xs">
          <span>millimeter / cnc atelier</span>
          <span className="hidden md:block">0.1 mm tolerance</span>
          <span>precision</span>
        </header>

        <div className="flex flex-col justify-end pb-10 md:pb-14">
          <p className="hero-kicker mb-5 flex flex-wrap gap-x-3 overflow-hidden text-xs uppercase tracking-[0.44em] text-titanium md:text-sm">
            {["распил", "кромление", "присадка", "деталировка"].map((item) => (
              <span className="inline-block" key={item}>
                {item}
              </span>
            ))}
          </p>

          <h1
            ref={wordRef}
            aria-label="millimeter"
            className="hero-word select-none whitespace-nowrap text-[21vw] font-black lowercase leading-[0.82] tracking-[-0.115em] md:text-[18.2vw]"
          >
            {"millimeter".split("").map((letter, index) => (
              <span
                className="hero-letter inline-block text-transparent"
                style={{
                  backgroundImage: `url("${images.heroCut}")`,
                  backgroundSize: "145% 115%",
                  backgroundPosition: `${index * 11}% 44%`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextStroke: "1px rgba(232,226,214,0.26)",
                }}
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </h1>

          <div className="hero-meta mt-6 grid gap-7 md:mt-8 md:grid-cols-[minmax(0,0.88fr)_auto] md:items-end">
            <p className="max-w-2xl text-balance text-xl leading-[1.08] text-stone-100 md:text-4xl">
              Высокоточный цех для мебельных проектов, где геометрия, материал и край сходятся в одну
              безошибочную линию.
            </p>

            <motion.a
              ref={buttonRef}
              href="#contact"
              onMouseMove={handleMove}
              onMouseLeave={resetMagnet}
              style={{ x: springX, y: springY, rotateX, rotateY }}
              className="magnetic-button group relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-stone-100/30 text-center text-[10px] uppercase tracking-[0.22em] text-stone-100 md:h-36 md:w-36 md:text-xs"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-stone-100 transition-transform duration-500 group-hover:scale-100" />
              <span className="relative z-10 max-w-20 transition-colors duration-500 group-hover:text-black">
                Рассчитать проект
              </span>
            </motion.a>
          </div>
        </div>

        <div className="hero-meta flex justify-between border-t border-stone-100/15 pt-4 text-[10px] uppercase tracking-[0.28em] text-stone-400 md:text-xs">
          <span>precision cut</span>
          <span>scroll to release image</span>
        </div>
      </div>
    </section>
  );
}
