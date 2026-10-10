"use client";

import { Spinner } from "@heroui/react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface PullToRefreshProps {
  /** Called when the user releases past the threshold. The overlay stays until the promise settles. */
  onRefresh?: () => Promise<unknown> | void;
  children: React.ReactNode;
  /** Pull distance (px, after damping) required to trigger a refresh. */
  threshold?: number;
  /** Max visual pull distance (px). */
  maxPull?: number;
  disabled?: boolean;
  /** Pass a ref when you scroll inside an element instead of the window. */
  scrollContainer?: React.RefObject<HTMLElement | null>;
  pullLabel?: string;
  releaseLabel?: string;
  refreshingLabel?: string;
  doneLabel?: string;
  className?: string;
}

type Status = "idle" | "pulling" | "ready" | "refreshing" | "done";

const PILL_HEIGHT = 44;
const HOLD_OFFSET = 72; // where the overlay rests while refreshing
const INTERACTIVE =
  "a,button,input,textarea,select,label,[role='button'],[contenteditable='true']";

const springConfig = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  maxPull = 140,
  disabled = false,
  scrollContainer,
  pullLabel = "Pull to refresh",
  releaseLabel = "Release to refresh",
  refreshingLabel = "Refreshing…",
  doneLabel = "Updated",
  className,
}: PullToRefreshProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [status, setStatusState] = useState<Status>("idle");
  const statusRef = useRef<Status>("idle");
  const onRefreshRef = useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  // p = how far the overlay has been pulled down (0 = hidden above the viewport)
  const p = useMotionValue(0);
  const y = useTransform(p, (v) => v - PILL_HEIGHT - 12);
  const opacity = useTransform(p, [0, 24], [0, 1]);
  const scale = useTransform(p, [0, threshold], [0.7, 1], { clamp: true });
  const rotate = useTransform(p, [0, threshold], [0, 180], { clamp: true });

  const setStatus = useCallback((s: Status) => {
    statusRef.current = s;
    setStatusState(s);
  }, []);

  const finish = useCallback(async () => {
    setStatus("done");
    await new Promise((r) => setTimeout(r, 450));
    // animate the icon/overlay back up to the top of the page
    await animate(p, 0, springConfig);
    setStatus("idle");
  }, [p, setStatus]);

  const startRefresh = useCallback(async () => {
    setStatus("refreshing");
    animate(p, HOLD_OFFSET, springConfig);
    try {
      await onRefreshRef.current?.();
    } finally {
      await finish();
    }
  }, [p, setStatus, finish]);

  useEffect(() => {
    const el = wrapperRef.current;

    if (!el || disabled) return;

    // Stop the browser's native pull-to-refresh / rubber-banding from fighting us.
    const root = document.documentElement;
    const prevOverscroll = root.style.overscrollBehaviorY;

    root.style.overscrollBehaviorY = "contain";

    let startY = 0;
    let startX = 0;
    let tracking = false;
    let pulling = false;
    let wasDragged = false;

    const atTop = () => {
      const c = scrollContainer?.current;

      return c
        ? c.scrollTop <= 0
        : (window.scrollY || root.scrollTop || 0) <= 0;
    };

    const damp = (d: number) => maxPull * (1 - Math.exp((-d * 1.5) / maxPull));

    const begin = (x: number, yy: number) => {
      if (statusRef.current === "refreshing" || statusRef.current === "done")
        return;
      if (!atTop()) return;
      tracking = true;
      pulling = false;
      startX = x;
      startY = yy;
    };

    // returns true when the move was consumed as a pull (caller should preventDefault)
    const move = (x: number, yy: number): boolean => {
      if (!tracking) return false;
      const dy = yy - startY;
      const dx = x - startX;

      if (!pulling) {
        if (dy <= 0 && Math.abs(dy) > 6) {
          tracking = false; // user is scrolling up/down the page normally

          return false;
        }
        if (dy < 4 || Math.abs(dx) > Math.abs(dy)) return false;
        if (!atTop()) {
          tracking = false;

          return false;
        }
        pulling = true;
        document.body.style.userSelect = "none";
      }

      const dist = Math.max(0, dy);

      p.set(damp(dist));
      const next: Status = damp(dist) >= threshold ? "ready" : "pulling";

      if (statusRef.current !== next) setStatus(next);

      return true;
    };

    const end = () => {
      if (!tracking) return;
      tracking = false;
      document.body.style.userSelect = "";
      if (!pulling) return;
      pulling = false;
      wasDragged = true;

      if (statusRef.current === "ready") {
        void startRefresh();
      } else {
        animate(p, 0, springConfig);
        setStatus("idle");
      }
    };

    // ---- touch (mobile) ----
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      begin(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (move(e.touches[0].clientX, e.touches[0].clientY) && e.cancelable)
        e.preventDefault();
    };

    // ---- mouse (desktop) ----
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
      begin(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (move(e.clientX, e.clientY)) e.preventDefault();
    };
    // Don't fire a click on whatever is under the cursor after a drag
    const onClickCapture = (e: MouseEvent) => {
      if (wasDragged) {
        e.stopPropagation();
        e.preventDefault();
        wasDragged = false;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", end);
    el.addEventListener("touchcancel", end);
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("click", onClickCapture, true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", end);

    return () => {
      root.style.overscrollBehaviorY = prevOverscroll;
      document.body.style.userSelect = "";
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", end);
      el.removeEventListener("touchcancel", end);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", end);
    };
  }, [
    disabled,
    maxPull,
    threshold,
    scrollContainer,
    p,
    setStatus,
    startRefresh,
  ]);

  const label =
    status === "refreshing"
      ? refreshingLabel
      : status === "done"
        ? doneLabel
        : status === "ready"
          ? releaseLabel
          : pullLabel;

  if (!onRefresh) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={wrapperRef} className={className}>
      {/* Overlay: fixed to the top of the page, follows the drag */}
      <motion.div
        aria-live="polite"
        className="pointer-events-none fixed left-1/2 top-0 z-100 -translate-x-1/2"
        role="status"
        style={{ y, opacity, scale }}
      >
        <div
          className="flex items-center gap-2 rounded-full border border-divider bg-content1/90 px-4 text-foreground shadow-medium backdrop-blur-md"
          style={{ height: PILL_HEIGHT }}
        >
          <div className="flex h-5 w-5 items-center justify-center text-primary">
            {status === "refreshing" ? (
              <Spinner color="current" size="sm" />
            ) : status === "done" ? (
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="flex text-success"
                initial={{ opacity: 0, scale: 0.4 }}
              >
                <CheckIcon />
              </motion.span>
            ) : (
              <motion.span className="flex" style={{ rotate }}>
                <ArrowIcon />
              </motion.span>
            )}
          </div>
          <span className="whitespace-nowrap text-small font-medium">
            {label}
          </span>
        </div>
      </motion.div>

      {children}
    </div>
  );
}

export default PullToRefresh;
