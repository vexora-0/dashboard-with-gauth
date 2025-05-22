"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

export interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className = "", fill = "white" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Optional: Add a subtle autonomous movement when not being interacted with
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (opacity === 0) {
      timeoutId = setTimeout(() => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        setPosition({ x, y });
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [position, opacity]);

  return (
    <div
      ref={divRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity }}
      >
        <div
          className="absolute -inset-40 opacity-20 blur-[100px] transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${fill}, transparent 65%)`,
          }}
        />
      </div>
    </div>
  );
}
