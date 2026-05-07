import { useGSAP } from "@gsap/react";
import { SetStateAction, useRef } from "react";
import { gsap } from "../../animation/RegisterEffects";
import { ScreenComponents } from "../../types/type";
import { TransitioningOut } from "..";

interface Props {
  id: ScreenComponents;
  children: React.ReactNode;
  setTransitioningOut: React.Dispatch<SetStateAction<TransitioningOut>>;
  currentState: ScreenComponents;
}

const NavItem = ({
  children,
  setTransitioningOut,
  id,
  currentState,
}: Props) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const isActive = currentState === id;
  const { contextSafe } = useGSAP();

  const handleClick = contextSafe(() => {
    if (currentState === id) return;
    setTransitioningOut({
      exiting: true,
      to: id,
    });
  });

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;
      if (isActive) return; // active 탭은 hover 효과 없이 항상 채워진 상태

      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        ".background-circle",
        {
          strokeDashoffset: 400,
          strokeDasharray: 400,
        },
        {
          strokeDashoffset: 0,
          duration: 0.3,
          ease: "linear",
        }
      );
      const handleMouseEnter = contextSafe(() => {
        tl.restart();
      });
      const handleMouseLeave = contextSafe(() => {
        tl.reverse();
      });
      itemRef.current?.addEventListener("mouseenter", handleMouseEnter);
      itemRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        itemRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        itemRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: itemRef, dependencies: [isActive] }
  );

  return (
    <div
      onClick={handleClick}
      ref={itemRef}
      className={`mr-0 md:mr-5 h-20 w-20 md:h-32 md:w-32 rounded-full flex items-center justify-center relative ${isActive ? "cursor-default" : "cursor-pointer"}`}
    >
      <svg className=" absolute h-full w-full " transform="rotate(-90)">
        <circle
          ref={circleRef}
          className=" border-gray-500"
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="#6B7280"
          strokeWidth="2"
        ></circle>
      </svg>
      <svg className=" absolute  h-full w-full" transform="rotate(-90)">
        <circle
          className="background-circle"
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray={isActive ? undefined : 400}
          strokeDashoffset={isActive ? undefined : 400}
        ></circle>
      </svg>
      <span className={`px-1 text-sm md:text-base text-center font-medium ${isActive ? "text-white" : "text-gray-400"}`}>
        {children}
      </span>
    </div>
  );
};

export default NavItem;
