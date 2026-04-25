"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { pollinationImage } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const heroTexture = pollinationImage(
  "extreme macro photography of a circular saw blade slicing through dark premium walnut wood, titanium dust particles, industrial luxury workshop, cinematic side lighting, hyperrealistic, 8k, shallow depth of field, no text, no logo",
  2400,
  1350
);

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

      gsap.set(panelRef.current, {
        clipPath: "inset(44% 8% 8% 8%)",
        scale: 1.14,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
        },
      });

      timeline
        .to(letters, {
          x: (index) => (index - (letters.length - 1) / 2) * 42,
          y: (index) => (index % 2 === 0 ? -34 : 34),
          letterSpacing: "0.08em",
          opacity: 0.18,
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
            yPercent: -80,
            opacity: 0,
            ease: "power2.out",
          },
          0
        );

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
        className="absolute inset-0 z-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url("${heroTexture}")` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.78))]" />
      </div>

      <div className="grain" />

      <div className="relative z-10 grid min-h-screen grid-rows-[auto_1fr_auto] px-5 py-5 md:px-10 md:py-8">
        <header className="hero-meta flex items-start justify-between text-[10px] uppercase tracking-[0.34em] text-stone-300/70 md:text-xs">
          <span>millimeter / cnc atelier</span>
          <span className="hidden md:block">0.1 mm tolerance</span>
          <span>moscow</span>
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
            className="hero-word select-none whitespace-nowrap text-[22vw] font-black lowercase leading-[0.72] tracking-[-0.12em] md:text-[18.7vw]"
          >
            {"millimeter".split("").map((letter, index) => (
              <span
                className="hero-letter inline-block text-transparent"
                style={{
                  backgroundImage: `url("${heroTexture}")`,
                  backgroundSize: "160% 120%",
                  backgroundPosition: `${index * 11}% 44%`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextStroke: "1px rgba(229,224,214,0.18)",
                }}
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </h1>

          <div className="hero-meta mt-8 grid gap-7 md:grid-cols-[minmax(0,0.88fr)_auto] md:items-end">
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
