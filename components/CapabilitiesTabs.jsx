"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Распил",
    metric: "0.1 mm",
    text: "Оптимизированный раскрой плитных материалов на форматно-раскроечном центре с чистой геометрией, картами реза и контролем каждой детали.",
    image: images.cut,
  },
  {
    title: "Кромление",
    metric: "zero line",
    text: "Кромка как продолжение плоскости: бесшовный визуальный контур, аккуратные радиусы и стабильная адгезия на сложных декорах.",
    image: images.edge,
  },
  {
    title: "Присадка",
    metric: "CNC grid",
    text: "Сверление, фрезеровка и посадочные узлы под фурнитуру выполняются в единой координатной логике без ручных допусков.",
    image: images.drill,
  },
  {
    title: "Деталировка",
    metric: "ready kit",
    text: "Маркировка, упаковка и спецификации превращают набор панелей в понятный конструктор для сборки без лишнего шума.",
    image: images.detail,
  },
];

export default function CapabilitiesTabs() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !imageFrameRef.current) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        imageFrameRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const current = capabilities[active];

  return (
    <section ref={sectionRef} className="section cap-section" id="capabilities">
      <div className="section-kicker">
        <span>02</span>
        <span>Производственные режимы</span>
      </div>

      <div className="cap-grid">
        <div className="cap-copy">
          <SplitText as="h2" className="section-title">
            Четыре операции. Одна система допусков.
          </SplitText>
          <div className="tab-list" role="tablist" aria-label="Услуги millimeter">
            {capabilities.map((item, index) => (
              <button
                className={`tab-button ${active === index ? "is-active" : ""}`}
                key={item.title}
                onClick={() => setActive(index)}
                role="tab"
                type="button"
                aria-selected={active === index}
              >
                <span>{item.title}</span>
                <small>{item.metric}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="cap-visual" ref={imageFrameRef}>
          <AnimatePresence mode="wait">
            <motion.div
              className="cap-image-layer"
              key={current.title}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(18px)", rotate: 0.4 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(16px)", rotate: -0.4 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={current.image}
                alt={`${current.title} millimeter`}
                className="image-cover"
                loading={active === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          </AnimatePresence>
          <div className="cap-panel">
            <p>{current.text}</p>
            <span>{current.metric}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
