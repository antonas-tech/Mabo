"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pollinationImage } from "@/lib/images";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const words =
  "Мы измеряем не сантиметрами, а тишиной стыка. Каждый лист проходит через цифровую карту реза, кромку с контролем температуры и присадку, где ошибка меньше толщины человеческого волоса.";

export default function Philosophy() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const imageRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordRefs.current,
        { color: "rgba(245, 239, 225, 0.2)" },
        {
          color: "#f5efe1",
          stagger: 0.065,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 45%",
            scrub: true
          }
        }
      );

      gsap.fromTo(
        maskRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: maskRef.current,
            start: "top 78%",
            end: "top 38%",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, yPercent: -8 },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: maskRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="precision-grid section-pad min-h-screen">
      <div className="mx-auto grid max-w-[1640px] gap-12 lg:grid-cols-[0.95fr_1.35fr] lg:gap-20">
        <div className="space-y-10">
          <div>
            <p className="text-metal text-xs uppercase tracking-[0.52em]">философия допуска</p>
            <SplitText
              text="точность без декоративного шума"
              className="mt-6 max-w-2xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.08em] text-ivory sm:text-7xl lg:text-8xl"
            />
          </div>
          <div
            ref={maskRef}
            className="image-reveal h-[58vh] min-h-[420px] overflow-hidden border border-white/10 bg-graphite"
          >
            <img
              ref={imageRef}
              src={pollinationImage(
                "hyperrealistic industrial luxury furniture workshop technician measuring dark walnut board with digital caliper titanium ruler CNC background cinematic sidelight 8k precision editorial photography",
                1200,
                1600
              )}
              alt="Точная проверка распила темного ореха цифровым штангенциркулем"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center">
          <p className="max-w-5xl text-[clamp(2.3rem,6vw,7.5rem)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
            {words.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="inline-block pr-[0.18em] text-ivory/20"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
