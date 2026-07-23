import { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import SkillPhilosophy from "./SkillPhilosophy";

// Cubic-bezier easing matching (0.76, 0, 0.24, 1)
function ease(t: number): number {
  const p1x = 0.76,
    p2x = 0.24;
  const cx = 3 * p1x,
    bx = 3 * (p2x - p1x) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * 0,
    by = 3 * (1 - 0) - cy,
    ay = 1 - cy - by;
  let s = t;

  for (let i = 0; i < 8; i++) {
    const ex = (ax * s + cx) * s - t;
    const dx = (3 * ax * s + 2 * bx) * s + cx;
    if (Math.abs(dx) < 1e-7) break;
    s -= ex / dx;
  }
  return (ay * s + by) * s + cy;
}

const RECT_W = 340;
const RECT_H = 220;

const VectorBridge = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const BridgeLineRef = useRef<SVGPathElement>(null);
  const portalRecRef = useRef<HTMLDivElement>(null);
  const portalInnerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const sectionTopRef = useRef(0);
  const totallLineLenRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const measure = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      sectionTopRef.current = rect.top + window.scrollY;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 1. Recalculate SVG Path dynamically
    let newPath = "";
    if (!mobile) {
      const scx = vw / 3000;
      const ax = 1500 + 1100 * Math.cos((196 * Math.PI) / 180);
      const startX = ax * scx;
      const endX = vw / 2 - RECT_W / 2;
      const endY = vh / 2;
      const R_px = 1100 * scx;
      newPath = `M ${startX},0 A ${R_px} ${R_px} 0 0,0 ${endX},${endY}`;
    } else {
      const startX = vw / 2;
      const startY = -10;
      const endX = vw / 2;
      const endY = vh / 2 - RECT_H / 2;
      newPath = `M ${startX},${startY} L ${endX},${endY}`;
    }

    if (BridgeLineRef.current) {
      BridgeLineRef.current.setAttribute("d", newPath);
      try {
        const len = BridgeLineRef.current.getTotalLength();
        if (len > 0) totallLineLenRef.current = len;
      } catch (_) {}
    }

    // 2. Dynamic Height Calculation for Smooth Scrolling
    if (portalInnerRef.current && sectionRef.current) {
      const innerHeightPx = portalInnerRef.current.scrollHeight;
      const totalRequiredHeight = vh * 1.5 + innerHeightPx;
      sectionRef.current.style.height = `${totalRequiredHeight}px`;
      sectionRef.current.style.minHeight = `${totalRequiredHeight}px`;
    }

    setReady(true);
  }, []);

  useEffect(() => {
    // Double measurement step to account for font loading / layout shifts
    const timer = setTimeout(measure, 150);
    measure();

    window.addEventListener("resize", measure, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure]);

  useLenis(({ scroll }) => {
    if (!ready) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const line = BridgeLineRef.current;
      const box = portalRecRef.current;
      const inner = portalInnerRef.current;
      const svgCont = svgContainerRef.current;
      const totalLen = totallLineLenRef.current;

      if (!box || !inner) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const localScroll = scroll - sectionTopRef.current;

      // --- A. SVG Line Drawing Animation ---
      if (line && svgCont && totalLen > 0) {
        const drawProgress = Math.min(Math.max((localScroll + vh) / vh, 0), 1);
        line.style.strokeDasharray = `${totalLen}`;
        line.style.strokeDashoffset = `${(totalLen - drawProgress * totalLen).toFixed(1)}`;
      }

      // --- B. Portal Visibility Threshold ---
      if (localScroll < -vh * 0.35) {
        box.style.visibility = "hidden";
        box.style.opacity = "0";
      } else {
        box.style.visibility = "visible";
        box.style.opacity = "1";
      }

      // --- C. Portal Expansion & Pinning Logic ---
      const expansionRunway = vh * 1.2;

      if (localScroll <= 0) {
        // State 1: Before Expansion (Absolute top)
        box.style.position = "absolute";
        box.style.top = "50vh";
        box.style.transform = "translate3d(-50%, -50%, 0) scale(1, 1)";
        
        if (svgCont) {
          svgCont.style.position = "absolute";
          svgCont.style.top = "0px";
        }

        inner.style.transform = "translate3d(-50%, -50%, 0) scale(1, 1)";
        box.style.overflow = "hidden";
      } else if (localScroll > 0 && localScroll < expansionRunway) {
        // State 2: Active Expansion (Pinned Fixed)
        box.style.position = "fixed";
        box.style.top = "50%";
        
        if (svgCont) {
          svgCont.style.position = "fixed";
          svgCont.style.top = "0px";
        }

        box.style.overflow = "hidden";

        const expansionProgress = Math.min(Math.max(localScroll / expansionRunway, 0), 1);
        const e = ease(expansionProgress);

        const scaleX = 1 + e * (vw / RECT_W - 1);
        const scaleY = 1 + e * (vh / RECT_H - 1);

        box.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
        inner.style.transform = `translate3d(-50%, -50%, 0) scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;

        // Smoothly fade border during portal expansion
        const bOpacity = Math.max(0, 1 - e / 0.5);
        box.style.borderWidth = bOpacity < 0.01 ? "0px" : "2px";
        box.style.borderColor = `rgba(0, 0, 0, ${bOpacity.toFixed(3)})`;
      } else {
        // State 3: Fully Expanded (Unpin back to Absolute flow)
        box.style.position = "absolute";
        box.style.top = `${expansionRunway + vh / 2}px`;

        if (svgCont) {
          svgCont.style.position = "absolute";
          svgCont.style.top = `${expansionRunway}px`;
        }

        box.style.overflow = "visible";

        const scaleX = vw / RECT_W;
        const scaleY = vh / RECT_H;

        box.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
        inner.style.transform = `translate3d(-50%, -50%, 0) scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;
        box.style.borderWidth = "0px";
      }
    });
  });

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: "320vh" }}
      className="relative bg-white text-black"
    >
      <div
        id="philosophy"
        style={{
          position: "absolute",
          top: "120vh",
          left: "0",
          height: "1px",
          pointerEvents: "none",
        }}
      />

      <div
        ref={svgContainerRef}
        style={{
          position: "absolute",
          top: "0",
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 10,
          willChange: "transform, top, position",
        }}
      >
        <svg width="100%" height="100%" style={{ overflow: "visible" }}>
          <path
            ref={BridgeLineRef}
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            style={{
              strokeWidth: isMobile ? "0.8vw" : "10px",
              strokeDasharray: "99999",
              strokeDashoffset: "99999",
            }}
          />
        </svg>
      </div>

      <div
        ref={portalRecRef}
        style={{
          position: "absolute",
          top: "50vh",
          left: "50%",
          height: `${RECT_H}px`,
          width: `${RECT_W}px`,
          background: "white",
          border: "2px solid black",
          visibility: "hidden",
          opacity: 0,
          zIndex: 50,
          overflow: "hidden",
          willChange: "transform, top, position",
        }}
      >
        <div
          ref={portalInnerRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <SkillPhilosophy />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VectorBridge;