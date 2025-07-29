import React, { useRef } from "react";
import { Mail, Phone, Github } from "lucide-react";
import { TransitioningOut } from "../..";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/_source/animation/RegisterEffects";
import Link from "next/link";

interface Props {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

const AboutMe = ({ transitioningOut, onExitComplete }: Props) => {
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
    console.log(transitioningOut.exiting);
  }, [transitioningOut.exiting]);
  return (
    <div
      ref={ref}
      className=" bg-black text-white px-6 flex flex-col gap-12 justify-center items-center"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">ABOUT ME</h2>
        <p className="text-lg text-gray-300 max-w-xl">
          안녕하세요! 끊임없이 왜? 를 던지며 사용자와 코드 사이를 고민하는
          프론트엔드 개발자 박지찬입니다. 협업과 소통을 중요하게 생각하며, 더
          나은 사용자 경험을 위한 고민을 멈추지 않습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-2">이름</h3>
          <p>박지찬</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-2">연락처</h3>
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span>010-7929-0179</span>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-2">이메일</h3>
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span>pjc0179@naver.com</span>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-2">GitHub</h3>
          <div className="flex items-center gap-2">
            <Github size={18} />
            <Link
              href="https://github.com/JichanPark12"
              className="hover:underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/JichanPark12
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
