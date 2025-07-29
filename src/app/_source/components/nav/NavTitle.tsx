"use client";

import { SetStateAction, useRef } from "react";
import { TransitioningOut } from "..";

interface Props {
  setTransitioningOut: React.Dispatch<SetStateAction<TransitioningOut>>;
}
const NavTitle = ({ setTransitioningOut }: Props) => {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <header
      ref={titleRef}
      onClick={() => {
        setTransitioningOut({ exiting: true, to: "home" });
      }}
      className="text-xl md:text-2xl font-bold cursor-pointer text-center md:text-left"
    >
      <h1 className=" sr-only">박지찬 포트폴리오</h1>
      <p>JICHAN`S PORTFOLIO</p>
    </header>
  );
};

export default NavTitle;
