"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const links = [
  {
    label: "Обсудить в Telegram",
    href: "https://t.me/YOUR_TAG",
  },
  {
    label: "Написать в WhatsApp",
    href: "https://wa.me/YOUR_NUMBER",
  },
];

export default function ContactInteraction() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useSpring(x, { stiffness: 180, damping: 22 });
  const cursorY = useSpring(y, { stiffness: 180, damping: 22 });

  const handleMove = (event) => {
    const bounds = ref.current.getBoundingClientRect();
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  return (
    <section
      id="contact"
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative overflow-hidden border-t border-[var(--line)] px-4 py-24 md:px-8 md:py-36"
    >
      <motion.div
        className="pointer-events-none absolute z-0 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(176,128,83,0.55)] md:block"
        style={{
          left: cursorX,
          top: cursorY,
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.5,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-16 border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-6 md:grid-cols-[0.75fr_1.25fr] md:p-10">
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
            Контактный рез
          </p>
          <p className="max-w-md text-sm leading-7 text-white/55 md:text-base">
            Пришлите чертеж, спецификацию или идею. Мы разложим материал,
            проверим критические узлы и вернем точный маршрут производства.
          </p>
        </div>

        <div>
          <h2 className="max-w-5xl text-[18vw] font-black uppercase leading-[0.78] tracking-[-0.12em] md:text-[10vw]">
            Запустить
            <span className="block text-outline">проект</span>
          </h2>

          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden border border-[var(--line)] px-6 py-6 text-sm uppercase tracking-[0.22em] text-white transition-colors hover:border-[rgba(176,128,83,0.75)]"
              >
                <span className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-500 group-hover:h-full" />
                <span className="relative z-10 transition-colors group-hover:text-black">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
