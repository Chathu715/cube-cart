"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Face } from "./Face";

export interface CubeData {
  front: React.ReactNode;
  right: React.ReactNode;
  back: React.ReactNode;
  left: React.ReactNode;
  top: React.ReactNode;
  bottom: React.ReactNode;
}

interface CubeProps {
  data: CubeData;
}

export const Cube = ({ data }: CubeProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") rotate("right");
      if (e.key === "ArrowLeft") rotate("left");
      if (e.key === "ArrowUp") rotate("up");
      if (e.key === "ArrowDown") rotate("down");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotation]);

  const rotate = (direction: "left" | "right" | "up" | "down") => {
    setRotation((prev) => {
      let { x, y } = prev;
      switch (direction) {
        case "right": y -= 90; break;
        case "left": y += 90; break;
        case "up": x += 90; break;
        case "down": x -= 90; break;
      }
      return { x, y };
    });
  };

  // Cube size based on screen
  const cubeSize = isMobile ? 280 : 320;
  const translateZ = cubeSize / 2;

  return (
    <div className="relative">
      <div
        className="scene-container relative mx-auto"
        style={{
          width: `${cubeSize}px`,
          height: `${cubeSize}px`
        }}
      >
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateX: rotation.x, rotateY: rotation.y }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Face transform={`rotateY(0deg) translateZ(${translateZ}px)`} label="Start" size={cubeSize}>
            {data.front}
          </Face>
          <Face transform={`rotateY(90deg) translateZ(${translateZ}px)`} label="Step 1" size={cubeSize}>
            {data.right}
          </Face>
          <Face transform={`rotateY(180deg) translateZ(${translateZ}px)`} label="Step 2" size={cubeSize}>
            {data.back}
          </Face>
          <Face transform={`rotateY(-90deg) translateZ(${translateZ}px)`} label="Step 3" size={cubeSize}>
            {data.left}
          </Face>
          <Face transform={`rotateX(90deg) translateZ(${translateZ}px)`} label="Ingredients" size={cubeSize}>
            {data.top}
          </Face>
          <Face transform={`rotateX(-90deg) translateZ(${translateZ}px)`} label="Finish" size={cubeSize}>
            {data.bottom}
          </Face>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-20 md:mt-24 flex justify-center gap-3 md:gap-4">
        <button
          onClick={() => rotate("left")}
          className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
          aria-label="Rotate left"
        >
          ⬅️
        </button>
        <div className="flex flex-col gap-2 md:gap-3">
          <button
            onClick={() => rotate("up")}
            className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
            aria-label="Rotate up"
          >
            ⬆️
          </button>
          <button
            onClick={() => rotate("down")}
            className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
            aria-label="Rotate down"
          >
            ⬇️
          </button>
        </div>
        <button
          onClick={() => rotate("right")}
          className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
          aria-label="Rotate right"
        >
          ➡️
        </button>
      </div>
    </div>
  );
};
