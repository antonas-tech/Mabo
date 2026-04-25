"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Сканирование материала",
    copy: "Партия проходит входной контроль: геометрия, направление волокна, карта дефектов.",
    image: images.titaniumMachine,
  },
  {
    number: "02",
    title: "Оптимизация карты",
    copy: "ПО раскладывает детали так, чтобы кромка, текстура и припуски работали как единая система.",
    image: images.detail,
  },
  {
    number: "03",
    title: "Чистый распил",
    copy: "Диск ведется без рывка: рез сохраняет плоскость, а торец не требует маскировки.",
    image: images.processCut,
  },
  {
    number: "04",
    title: "Кромка и присадка",
    copy: "Финальные операции фиксируют точность: фасад закрывается без зазора, фурнитура садится ровно.",
    image: images.processEdge,
  },
];

export default function GalleryProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return undefined;

    const context = gsap.context(() => {
      const panels = gsap.utils.toArray(".process-panel");
      const images = gsap.utils.toArray(".process-panel img");

      const horizontal = gsap.to(trackRef.current, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${trackRef.current.offsetWidth}`,
        },
      });

      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".process-copy"),
          { yPercent: 70, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: "left 70%",
              end: "left 35%",
              scrub: true,
            },
          }
        );
      });

      images.forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.2, xPercent: -5 },
          {
            scale: 1,
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              containerAnimation: horizontal,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="process-section">
      <div className="absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[0.45em] text-white/45 md:left-8">
        gallery process
      </div>
      <div ref={trackRef} className="process-track">
        {steps.map((step) => (
          <article
            key={step.number}
            className="process-panel"
          >
            <div className="process-copy">
              <div className="font-display text-[20vw] font-black leading-none tracking-[-0.1em] text-white/8 md:text-[14vw]">
                {step.number}
              </div>
              <div className="max-w-xl">
                <h3 className="font-display text-4xl uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-7xl">
                  {step.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/58 md:text-lg">
                  {step.copy}
                </p>
              </div>
            </div>
            <div className="process-image">
              <img
                src={step.image}
                alt={step.title}
                className="h-full w-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.42),transparent_45%,rgba(10,10,10,0.24))]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
