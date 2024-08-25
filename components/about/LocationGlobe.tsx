"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

export const LocationGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const fadeMask =
    "radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)";

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const locationToAngles = (lat: number, long: number) => {
    const phi = ((long + 180) / 360) * 2 * Math.PI; // Adjusted for cobe's coordinate system
    const theta = (lat / 180) * Math.PI;
    return { phi, theta };
  };

  useEffect(() => {
    const longitude = 31.2357; // Cairo longitude
    const latitude = 30.0444; // Cairo latitude

    const { phi, theta } = locationToAngles(latitude, longitude);

    let width = 0;

    const onResize = () => {
      if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
        window.addEventListener("resize", onResize);
      }
    };
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phi, // Set initial value to focus on Cairo
      theta: theta, // Set initial value to focus on Cairo
      dark: 1,
      mapSamples: 6_000, // Lowered for less intensive processing
      mapBrightness: 1.5, // Reduced from 2 for smoother rendering
      diffuse: 1.5, // Reduced from 2
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [1, 1, 1],
      glowColor: [0.3, 0.3, 0.3],
      markers: [{ location: [latitude, longitude], size: 0.1 }],
      scale: 1.05,
      onRender: (state) => {
        state.phi = phi + r.get() - 100; // Lock phi to focus on Cairo and allow interaction
        state.theta = theta + 100; // Lock theta to focus on Cairo
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [r]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div className="absolute inset-x-0 bottom-[-150px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[350px]">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            placeItems: "center",
            placeContent: "center",
            overflow: "visible",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1/1",
              maxWidth: 800,
              WebkitMaskImage: fadeMask,
              maskImage: fadeMask,
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={(e) => {
                pointerInteracting.current =
                  e.clientX - pointerInteractionMovement.current;
                canvasRef.current &&
                  (canvasRef.current.style.cursor = "grabbing");
              }}
              onPointerUp={() => {
                pointerInteracting.current = null;
                canvasRef.current && (canvasRef.current.style.cursor = "grab");
              }}
              onPointerOut={() => {
                pointerInteracting.current = null;
                canvasRef.current && (canvasRef.current.style.cursor = "grab");
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta;
                  void api.start({
                    r: delta / 200,
                  });
                }
              }}
              onTouchMove={(e) => {
                if (pointerInteracting.current !== null && e.touches[0]) {
                  const delta =
                    e.touches[0].clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta;
                  void api.start({
                    r: delta / 100,
                  });
                }
              }}
              style={{
                width: "100%",
                height: "100%",
                contain: "layout paint size",
                cursor: "auto",
                userSelect: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
