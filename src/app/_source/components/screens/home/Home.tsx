import { screenTextObject } from '@/app/_source/constants/text';
import TypewriterEffect from '../../TypewriterEffect';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/_source/animation/RegisterEffects';
import { TransitioningOut } from '../..';
import { useRef } from 'react';

interface Props {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

const Home = ({ transitioningOut, onExitComplete }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // 버튼 초기 상태 설정 후 페이드인
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, delay: 2.2, ease: 'power2.out' },
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
    <div ref={ref} className="w-full pt-20">
      <div className="flex justify-center items-center min-h-[50vh] px-4">
        <div className="flex items-center flex-col text-center gap-10">
          <div className="aboutMeScrollTrigger flex flex-col justify-center items-center">
            {screenTextObject['home'].list.map((textObject) => (
              <TypewriterEffect
                key={textObject.id}
                textObject={textObject}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${textObject.className}`}
                waiting={1}
              />
            ))}
          </div>

          {/* 이력서 다운로드 버튼 */}
          <a
            ref={btnRef}
            href={'/resume_jichan_park.pdf'}
            download={'프론트엔드_박지찬_이력서.pdf'}
            style={{ opacity: 0 }}
            className="
              group inline-flex items-center gap-2.5
              px-7 py-3.5 rounded-full
              border border-white/30
              bg-white/5 backdrop-blur-sm
              text-white/80 text-sm font-medium tracking-wide
              transition-all duration-300 ease-out
              hover:bg-white/15 hover:border-white/60 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            이력서 다운로드
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
