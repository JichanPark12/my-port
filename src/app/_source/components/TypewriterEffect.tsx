import { useGSAP } from "@gsap/react";
import { TextObject } from "./../types/text-object";
import { gsap } from "../animation/RegisterEffects";

interface Props {
  className?: string;
  textObject: TextObject;
  waiting?: number;

  //   tl?: gsap.core.Timeline;
  //   tweenVars?: gsap.TweenVars;
  //   timing?: string;
}

const TypewriterEffect = ({ className, textObject, waiting = 0 }: Props) => {
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.typewriterEffect(
      `.${textObject.id}`,
      {
        duration: 1,
        stagger: 0.07,
      },
      waiting
    );

    tl.play();
  });
  return (
    <div key={textObject.id} className="flex mb-5 w-full justify-center ">
      {textObject.text.split("").map((char, idx) => (
        <p
          key={idx}
          className={`${textObject.id} opacity-0 typeWriter pointer-events-none ${className}`}
        >
          {char === " " ? "\u00a0" : char}
        </p>
      ))}
    </div>
  );
};

export default TypewriterEffect;
