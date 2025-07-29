import SiZustand from "@/components/svg/SiZustand";
import { FaReact, FaJs, FaGitAlt, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiCss3,
  SiNextdotjs,
  SiTailwindcss,
  SiReactquery,
  SiHtml5,
} from "react-icons/si";
import { TransitioningOut } from "../..";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/_source/animation/RegisterEffects";

const skills = [
  { name: "React", icon: <FaReact className="text-sky-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-300" /> },
  { name: "CSS", icon: <SiCss3 className="text-blue-400" /> },
  { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "TanStack Query", icon: <SiReactquery className="text-pink-500" /> },
  { name: "Zustand", icon: <SiZustand /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
];

interface SkillsProps {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

const Skills = ({ transitioningOut, onExitComplete }: SkillsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, []);

  useGSAP(() => {
    if (!transitioningOut.exiting) return;
    gsap.to(ref.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: onExitComplete,
    });
  }, [transitioningOut.exiting]);

  return (
    <div
      ref={ref}
      className="bg-black  text-white flex flex-col items-center justify-center px-4 "
    >
      <h2 className="text-4xl font-bold mb-8">SKILLS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
          >
            <div className="text-5xl mb-3">{skill.icon}</div>
            <span className="text-lg font-medium text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Skills;
