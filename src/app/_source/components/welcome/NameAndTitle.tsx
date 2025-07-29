import { useRef } from "react";
import { gsap } from "../../animation/RegisterEffects";
import { useGSAP } from "@gsap/react";
import TypewriterEffect from "../TypewriterEffect";

interface Props {
  setIsPassInitialScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const textObjectList = [
  {
    id: "first",
    text: "WELCOME TO",
  },
  {
    id: "second",
    text: "JICHAN`S PORTFOLIO",
  },
];

const NameAndTitle = ({ setIsPassInitialScreen }: Props) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    textObjectList.forEach((textObject) => {
      tl.smokeFadeOut(`.${textObject.id}`, `2.5`);
    });

    tl.to(titleRef, {
      duration: 0.5,
      onComplete: () => {
        setIsPassInitialScreen(true);
      },
    });

    tl.play();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col px-10">
      <div
        ref={titleRef}
        className="font-bold text-center flex flex-col gap-y-4 text-2xl sm:text-6xl lg:text-7xl px-4"
      >
        {textObjectList.map((textObject) => (
          <TypewriterEffect key={textObject.id} textObject={textObject} />
        ))}
      </div>
    </div>
  );
};
export default NameAndTitle;
