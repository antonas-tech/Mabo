"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ text, children, as: Tag = "span", className = "", lineClassName = "" }) {
  const ref = useRef(null);
  const content = text || children || "";
  const words = String(content).split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-word",
        { yPercent: 115, rotate: 1.5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          stagger: 0.035,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={`split-text ${className}`} aria-label={String(content)}>
      {words.map((word, index) => (
        <span className={`split-line ${lineClassName}`} aria-hidden="true" key={`${word}-${index}`}>
          <span className="split-word">{word}</span>
          {index < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
