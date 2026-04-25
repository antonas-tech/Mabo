"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import { pollinationImage } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Распил",
    metric: "0.1 mm",
    text: "Оптимизированный раскрой плитных материалов на форматно-раскроечном центре с чистой геометрией, картами реза и контролем каждой детали.",
    prompt:
      "ultra_realistic_high_tech_panel_saw_cutting_dark_walnut_furniture_board_titanium_machine_body_cinematic_industrial_luxury_precise_laser_line_sawdust_particles_8k",
  },
  {
    title: "Кромление",
    metric: "zero line",
    text: "Кромка как продолжение плоскости: бесшовный визуальный контур, аккуратные радиусы и стабильная адгезия на сложных декорах.",
    prompt:
      "macro_photo_premium_edge_banding_machine_applying_dark_wood_veneer_to_graphite_panel_chrome_guides_warm_workshop_lighting_hyperreal_8k",
  },
  {
    title: "Присадка",
    metric: "CNC grid",
    text: "Сверление, фрезеровка и посадочные узлы под фурнитуру выполняются в единой координатной логике без ручных допусков.",
    prompt:
      "hyperrealistic_cnc_drilling_machine_making_precise_holes_in_black_furniture_panel_metal_bits_cool_titanium_lighting_minimal_factory_8k",
  },
  {
    title: "Деталировка",
    metric: "ready kit",
    text: "Маркировка, упаковка и спецификации превращают набор панелей в понятный конструктор для сборки без лишнего шума.",
    prompt:
      "premium_furniture_parts_detailing_table_labeled_dark_walnut_panels_technical_drawings_metal_ruler_graphite_background_cinematic_top_view_8k",
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
              <Image
                src={pollinationImage(current.prompt)}
                alt={`${current.title} millimeter`}
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className="image-cover"
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
