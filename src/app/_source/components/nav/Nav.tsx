import { useGSAP } from "@gsap/react";
import NavItem from "./NavItem";
import NavTitle from "./NavTitle";
import { useRef } from "react";
import { gsap } from "../../animation/RegisterEffects";
import { ScreenComponents } from "../../types/type";
import { TransitioningOut } from "..";

interface Props {
  setTransitioningOut: React.Dispatch<React.SetStateAction<TransitioningOut>>;
  currentState: ScreenComponents;
}

const navItemList: { id: ScreenComponents; text: string }[] = [
  {
    id: "aboutMe",
    text: "About Me",
  },
  {
    id: "skills",
    text: "Skills",
  },
  {
    id: "myProjects",
    text: "My Projects",
  },
];

const Nav = ({ setTransitioningOut, currentState }: Props) => {
  const navRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fadeIn(navRef.current, {});
  }, []);

  return (
    <div
      ref={navRef}
      className="z-10 bg-black opacity-0 max-w-screen-xl mx-auto p-4 w-full fixed flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <NavTitle setTransitioningOut={setTransitioningOut}></NavTitle>
      <div className=" flex  gap-4">
        {navItemList.map((navItem) => (
          <NavItem
            key={navItem.id}
            setTransitioningOut={setTransitioningOut}
            currentState={currentState}
            id={navItem.id}
          >
            {navItem.text}
          </NavItem>
        ))}
      </div>
    </div>
  );
};

export default Nav;
