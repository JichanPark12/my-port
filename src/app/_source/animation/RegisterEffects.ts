import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

gsap.registerEffect({
  name: "typewriterEffect",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effect: (targets: any, config: any) => {
    return gsap.to(targets, {
      opacity: 1,
      stagger: config.stagger,
      duration: config.duration,
      repeatDelay: config.repeatDelay,
      yoyo: config.yoyo,
      repeat: config.repeat,
      ease: config.ease,
    });
  },
  extendTimeline: true,
  defaults: {
    duration: 0.8,
    stagger: 0.05,
    repeatDelay: 1,
    yoyo: false,
    repeat: 0,
    ease: "linear",
  },
});
gsap.registerEffect({
  name: "fadeIn",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effect: (targets: any, config: any) => {
    return gsap.to(targets, {
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
    });
  },
  extendTimeline: true,
  defaults: {
    duration: 1,
    ease: "linear",
  },
});
gsap.registerEffect({
  name: "smokeFadeOut",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effect: (targets: any, config: any) => {
    return gsap.to(targets, {
      keyframes: {
        "50%": { opacity: 1 },
        "100%": {
          filter: "blur(60px)",
          opacity: 0,
          scale: 0.1,
        },
      },
      onComplete: config.onComplete,
      stagger: 0.05,
      duration: 1,
      transform: "translateX(-50px) translateY(-30px) rotate(15deg) ",
    });
  },
  extendTimeline: true,
});
export * from "gsap";
