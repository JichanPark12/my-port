import { gsap } from '@/app/_source/animation/RegisterEffects';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  SiAxios,
  SiDaisyui,
  SiMockserviceworker,
  SiReact,
  SiReactquery,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TransitioningOut } from '../..';
import { RiNextjsLine } from 'react-icons/ri';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import { GiStomp } from 'react-icons/gi';

interface Props {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

const projects = [
  {
    title: '그린볼',
    description:
      '냉장고 관리 시스템과 연동되는 AI 추천 레시피로 냉장고 재료를 효율적으로 관리하는 프로젝트',
    image: '/그린볼_시연영상.mp4',
    imgType: 'video',
    techStack: [RiNextjsLine, SiReact, SiTailwindcss, SiShadcnui, SiTypescript],
    github: 'https://github.com/green-bowl/greenbowl-frontend',
    demo: 'https://greenbowl-eta.vercel.app/',
    notionLink: '',
    lessons: [
      'Next.js의 SSR과 SSG 차이를 명확히 이해하고, 상황에 맞게 활용함.',
      'Zustand를 사용한 전역 상태 관리로 성능 최적화 및 코드 구조 간소화 경험.',
      'Next.js의 Server Cache와 개인화된 캐싱 전략에 대한 깊은 이해 확보.',
      'NextAuth와 middleware를 활용한 효율적인 인증/인가 및 회원 라우팅 구축 경험',
      '디자인 토큰(Token Studio)을 Tailwind에 적용하는 파서 코드 작성으로 디자인 시스템화 경험.',
      'Shadcn-ui를 활용해 일관성 있는 UI 컴포넌트를 빠르게 구현, 개발 속도 향상.',
    ],
  },
  {
    title: 'Matching Goal',
    description:
      '경기 일정과 주소를 쉽게 잡고 일정을 관리할 수 있는 웹 기반의 매칭 시스템',
    image: '/matching-goal.png',
    imgType: 'image',
    techStack: [
      RiNextjsLine,
      SiTailwindcss,
      SiDaisyui,
      SiAxios,
      SiReactquery,
      SiMockserviceworker,
      GiStomp,
      SiTypescript,
    ],
    github: 'https://github.com/matching-goal/frontend',
    demo: 'none',
    notionLink:
      'https://stripe-algebra-28f.notion.site/matching-goal-41105daa3fa14f21896205279b4a9955',
    lessons: [
      'Next.js의 폴더 기반 라우팅 경험',
      'TS를 활용한 효율적인 타입 관리 및 코드 가독성 향상',
      'React Query를 활용한 데이터 패칭 및 클라이언트 상태 관리와 유저 경험 개선',
      'React Query의 useSuspenseInfiniteQuery를 사용한 게시글 무한스크롤 구현',
      'Mock Service Worker(MSW)를 활용한 API Mocking 경험',
      'Next API Route를 활용한 mock data 구현',
      'Axios를 활용한 API 통신 및 에러 핸들링 경험',
      'Stomp.js를 활용한 실시간 채팅 기능 구현 경험',
      'DaisyUI를 활용한 UI 컴포넌트 라이브러리 경험',
    ],
  },
];

export default function MyProjects({
  transitioningOut,
  onExitComplete,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    videoRefs.current = Array.from(document.querySelectorAll('video'));
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
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
      className="w-full  bg-black text-white flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl font-bold mb-8">MY PROJECTS</h2>

      <div className="w-[90%] max-w-5xl flex items-center justify-center bg-neutral-900  rounded-2xl shadow-lg">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-full"
          onSlideChange={() => {
            videoRefs.current.forEach((video) => {
              video.pause();
              video.currentTime = 0;
            });
          }}
        >
          {projects.map((project, idx) => (
            <SwiperSlide
              key={idx}
              className="flex justify-center items-center overflow-y-scroll scrollbar-custom "
            >
              <div className="flex p-8 h-full items-center  flex-col md:flex-row gap-6 ">
                <div className="w-full md:w-1/2">
                  {project.imgType === 'video' && (
                    <video controls>
                      <source src={project.image} type="video/mp4" />
                    </video>
                  )}
                  {project.imgType === 'image' && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={500}
                      className="rounded-xl shadow-md w-full object-contain h-full"
                    />
                  )}
                </div>

                <div className="w-full md:w-1/2 text-white">
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-lg mb-4">{project.description}</p>

                  <div className="mb-4">
                    <p className="font-semibold">LESSONS LEARNED</p>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {project.lessons.map((lesson, i) => (
                        <li key={i}>{lesson}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4 mb-4">
                    {project.techStack.map((Icon, i) => (
                      <Icon
                        key={i}
                        className="text-2xl text-gray-400 hover:text-white"
                      />
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center justify-center bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700 text-sm sm:text-base w-full sm:w-auto"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </Link>
                    {project.demo !== 'none' && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        className="flex items-center justify-center bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 text-sm sm:text-base w-full sm:w-auto"
                      >
                        <FiExternalLink className="mr-2" /> Live Demo
                      </Link>
                    )}
                    <Link
                      href={project.notionLink}
                      target="_blank"
                      className="flex items-center justify-center bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700 text-sm sm:text-base w-full sm:w-auto"
                    >
                      Notion
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
