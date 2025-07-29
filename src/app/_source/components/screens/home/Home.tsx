import { screenTextObject } from "@/app/_source/constants/text";
import TypewriterEffect from "../../TypewriterEffect";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/_source/animation/RegisterEffects";
import { TransitioningOut } from "../..";
import { useRef } from "react";

interface Props {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

const Home = ({ transitioningOut, onExitComplete }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!transitioningOut.exiting) return;
    gsap.to(ref.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: onExitComplete,
    });
    console.log(transitioningOut.exiting);
  }, [transitioningOut.exiting]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="flex items-center flex-col text-center">
          <div className="aboutMeScrollTrigger flex flex-col justify-center items-center ">
            {screenTextObject["home"].list.map((textObject) => (
              <TypewriterEffect
                key={textObject.id}
                textObject={textObject}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${textObject.className}`}
                waiting={1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
