"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pollinationImage } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Сканирование материала",
    copy: "Партия проходит входной контроль: геометрия, направление волокна, карта дефектов.",
    prompt:
      "industrial_luxury_woodworking_workshop_operator_scanning_dark_walnut_board_with_laser_grid_cnc_factory_titanium_metal_surfaces_cinematic_low_key_light_hyperrealistic_8k",
  },
  {
    number: "02",
    title: "Оптимизация карты",
    copy: "ПО раскладывает детали так, чтобы кромка, текстура и припуски работали как единая система.",
    prompt:
      "close_up_of_cnc_cutting_optimization_screen_reflected_in_dark_walnut_panel_precision_furniture_manufacturing_minimal_high_tech_workshop_chrome_details_8k",
  },
  {
    number: "03",
    title: "Чистый распил",
    copy: "Диск ведется без рывка: рез сохраняет плоскость, а торец не требует маскировки.",
    prompt:
      "macro_photography_of_panel_saw_cutting_premium_dark_wood_board_flying_sawdust_controlled_motion_cinematic_industrial_luxury_lighting_8k",
  },
  {
    number: "04",
    title: "Кромка и присадка",
    copy: "Финальные операции фиксируют точность: фасад закрывается без зазора, фурнитура садится ровно.",
    prompt:
      "hyperrealistic_edge_banding_machine_applying_dark_walnut_edge_to_furniture_panel_cnc_drilling_station_background_titanium_chrome_factory_8k",
  },
];

export function GalleryProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#0a0a0a]">
      <div className="absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[0.45em] text-white/45 md:left-8">
        gallery process
      </div>
      <div ref={trackRef} className="flex h-full w-max will-change-transform">
        {steps.map((step) => (
          <article
            key={step.number}
            className="process-panel grid h-screen w-screen shrink-0 grid-rows-[1fr_auto] overflow-hidden border-r border-white/10 md:grid-cols-[44vw_56vw] md:grid-rows-1"
          >
            <div className="process-copy flex flex-col justify-between p-5 pt-20 md:p-10 md:pt-24">
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
            <div className="relative min-h-[52vh] overflow-hidden md:min-h-0">
              <img
                src={pollinationImage(step.prompt)}
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
