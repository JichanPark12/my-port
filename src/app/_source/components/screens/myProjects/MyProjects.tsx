'use client';

import { gsap } from '@/app/_source/animation/RegisterEffects';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  SiAxios, SiDaisyui, SiMockserviceworker, SiReact,
  SiReactquery, SiShadcnui, SiTailwindcss, SiTypescript,
  SiMysql, SiNestjs,
} from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';
import { GiStomp } from 'react-icons/gi';
import { TransitioningOut } from '../..';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import ProjectDetailModal, { ProjectDetailData } from './ProjectDetailModal';

interface Props {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

interface Project {
  title: string;
  description: string;
  image: string;
  imgType: 'video' | 'image' | 'placeholder';
  techStack: React.ComponentType<{ className?: string }>[];
  github: string;
  demo: string;
  notionLink: string;
  lessons: string[];
  detail: ProjectDetailData;
}

const projects: Project[] = [
  {
    title: '내티켓',
    description: '실전과 유사한 티켓팅 연습 환경을 제공하는 티켓팅 시뮬레이터',
    image: '',
    imgType: 'placeholder',
    techStack: [RiNextjsLine, SiTypescript, SiTailwindcss, SiReactquery, SiNestjs, SiMysql],
    github: 'https://github.com/boostcampwm2025/web10-beastcamp',
    demo: 'https://neticket.site',
    notionLink: '',
    lessons: [
      'ISR + CSR 하이브리드 렌더링으로 트래픽 밀집 상황 대응',
      'Composition Pattern + Native Context로 use client 전염 방지',
      'PerformanceNavigationTiming API로 비정상 접근 분기 처리',
      '직접 DOM 조작 기반 useZoomPan 훅으로 렌더링 병목 해결',
      '[트러블슈팅] Vercel 배포 환경 Hydration Mismatch 에러 해결',
      '[트러블슈팅] TanStack Query 캐싱 이슈로 인한 대기열 bypass 해결',
      '[트러블슈팅] React Compiler 메모이제이션 무력화 원인 분석 및 최적화',
    ],
    detail: {
      period: '2025.12 - 2026.02 (7주)',
      team: '5명 (FE: 2, BE: 2, FullStack: 1)',
      role: 'FE — 티켓팅 예매(공연장 렌더링, 좌석 상태관리), 공연 정보 표시, 네트워크 환경 점검, FE 버그 수정',
      implementations: [
        {
          title: '트래픽 밀집도를 고려한 하이브리드 렌더링 전략 (ISR + CSR) 설계',
          items: [
            { label: '고민', content: '수만 명이 동시 접속하는 티켓팅 특성상 서버 부하 최소화와 실시간 좌석 정보 제공을 동시에 만족해야 했습니다.' },
            { label: '정적 데이터 (공연 정보)', content: '1분 단위의 ISR을 적용하여, 수만 명의 동시 접속 시에도 서버 추가 연산 없이 정적 파일을 즉시 서빙하도록 구현했습니다.' },
            { label: '동적 데이터 (좌석 상태)', content: '실시간성이 필수적인 좌석 선택 및 상태 업데이트는 CSR + TanStack Query를 조합해 페이지 전체 리로드 없이 필요한 데이터만 부분 동기화했습니다.' },
          ],
          outcome: '대규모 트래픽 상황에서도 서버 부하를 최소화하고, 실시간 좌석 상태를 지연 없이 사용자에게 제공했습니다.',
        },
        {
          title: 'Composition Pattern + Native Context 기반 렌더링 정밀 제어',
          items: [
            { label: '고민', content: '복잡한 예약 로직으로 인해 use client가 컴포넌트 트리 전체로 전염되어 RSC의 이점(보안, 번들 감소)을 전혀 활용하지 못하는 문제가 있었습니다.' },
            { label: '구조적 설계', content: 'children prop을 활용한 Composition Pattern을 도입하여 비즈니스 로직과 정적 UI를 분리, use client 전염을 방지하고 RSC 이점을 보존했습니다.' },
            { label: '상태 최적화', content: '외부 라이브러리 없이 Native Context API만으로 예약 시스템을 구축하고, State와 Dispatch Context를 물리적으로 분리하여 렌더링 포인트를 정밀 제어했습니다.' },
          ],
          outcome: '필요한 부분만 하이드레이션되도록 설계하여 초기 로딩 속도를 개선하고 동적 인터랙션 렌더링 비용을 최소화했습니다.',
        },
        {
          title: 'PerformanceNavigationTiming API 기반 UX/보안 최적화',
          items: [
            { label: '문제', content: 'URL 직접 입력, 새로고침 등 비정상 경로로 예약 페이지 진입 시 데이터 누락 엣지 케이스가 발생했습니다.' },
            { label: '설계', content: 'PerformanceNavigationTiming API로 유저 의도를 구분하여 분기 처리했습니다. 단순 새로고침은 Alert 없이 즉시 리다이렉트, 비정상 접근(직접 URL 입력)은 경고 노출 및 차단했습니다.' },
            { label: '기술 구현', content: 'condition 파라미터 기반의 Pass Ticket 로직과 인터셉터를 구현하여 정상 라우팅 시 검증을 생략하도록 했습니다.' },
          ],
          outcome: '잘못된 접근으로 인한 런타임 에러를 차단하고 예약 데이터 무결성을 확보했습니다.',
        },
        {
          title: '직접 DOM 조작 기반 Zoom/Pan 커스텀 훅 (useZoomPan) 개발',
          items: [
            { label: '문제', content: '수천 개의 좌석이 렌더링되는 SVG 지도에서 React 상태(State) 기반 줌/팬 조작 시 심각한 렌더링 병목이 발생했습니다.' },
            { label: '해결', content: '선언적 렌더링 대신 직접 DOM 조작 전략을 채택했습니다. useRef로 좌표 상태를 관리하고 style.transform을 직접 업데이트하는 useZoomPan 훅을 구현했습니다.' },
          ],
          outcome: '드래그 및 줌 동작 시 불필요한 리렌더링을 완전히 제거하여, 수천 개의 좌석 환경에서도 매끄러운 사용자 경험을 제공했습니다.',
        },
      ],
      troubleshooting: [
        {
          index: 1,
          title: '배포 환경의 Hydration Mismatch (Timezone) 에러 해결',
          problem: '로컬 환경과 달리 Vercel 배포 환경에서만 React Hydration Error(Error #418)가 발생했습니다.',
          cause: 'Chrome DevTools 브레이크포인트로 에러 발생 노드를 추적한 결과, 서버(UTC)와 클라이언트(KST) 간 9시간 시차로 인해 생성된 HTML 텍스트가 불일치함을 확인했습니다.',
          solution: 'isMounted 상태를 활용한 Mounted 래퍼 컴포넌트를 제작하여, 시간 관련 UI는 클라이언트 사이드에서만 렌더링되도록 구조를 개선했습니다.',
          outcome: '배포 환경 Hydration 에러가 완전히 해결되었습니다.',
        },
        {
          index: 2,
          title: '대기열 모듈 캐싱 이슈 분석 및 동기화 해결',
          problem: '예매 완료 후 재진입 시 대기열이 건너뛰어지는 논리적 버그가 발견되었습니다.',
          cause: '전역 상태 초기화 로직 전수 조사 결과, 상태 관리가 아닌 TanStack Query의 Stale-While-Revalidate 캐싱 동작이 원인이었습니다. 서버 응답 전 기존 캐시 데이터가 반환되어 대기열 로직 오류를 유발했습니다.',
          solution: '대기열 관련 쿼리에 gcTime: 0을 적용하여, 서버 응답 전 기존 캐시 데이터가 반환되는 것을 원천 차단했습니다.',
          outcome: '대기열 bypass 버그가 해결되었고, 예매 재진입 시 항상 올바른 대기열 흐름이 보장되었습니다.',
        },
        {
          index: 3,
          title: 'React Compiler 메모이제이션 무력화 원인 분석 및 최적화',
          problem: 'React Compiler 적용 후에도 특정 훅(useSelection)의 반환 함수들이 메모이제이션되지 않고 매 렌더링마다 참조가 파괴되었습니다.',
          cause: 'useRef와 useEffect를 활용해 함수 주소값을 비교하는 DebugObserver를 직접 구현하여 분석한 결과, 매개변수 기본값(initialValues = new Map())이 매번 새로운 객체를 생성하여 컴파일러의 정적 분석 및 캐싱 로직을 무력화함을 식별했습니다.',
          solution: '기본값 설정을 제거하고 지연 초기화(Lazy Initialization) 패턴으로 변경했습니다. 인자가 없을 시 undefined를 유지하게 하여 React 의존성 비교 알고리즘을 안정화했습니다.',
          outcome: '불필요한 하위 컴포넌트 리렌더링이 차단되어 예약 UI 전반의 렌더링 성능이 개선되었습니다.',
        },
      ],
    },
  },
  {
    title: '그린볼',
    description: '냉장고 관리 시스템과 연동되는 AI 추천 레시피로 냉장고 재료를 효율적으로 관리하는 프로젝트',
    image: '/그린볼_시연영상.mp4',
    imgType: 'video',
    techStack: [RiNextjsLine, SiReact, SiTailwindcss, SiShadcnui, SiTypescript],
    github: 'https://github.com/green-bowl/greenbowl-frontend',
    demo: 'https://greenbowl-eta.vercel.app/',
    notionLink: '',
    lessons: [
      'Next.js의 SSR과 SSG 차이를 명확히 이해하고, 상황에 맞게 활용함',
      'Zustand를 사용한 전역 상태 관리로 성능 최적화 및 코드 구조 간소화 경험',
      'Next.js의 Server Cache와 개인화된 캐싱 전략에 대한 깊은 이해 확보',
      'NextAuth와 middleware를 활용한 효율적인 인증/인가 및 회원 라우팅 구축 경험',
      '디자인 토큰(Token Studio)을 Tailwind에 적용하는 파서 코드 작성으로 디자인 시스템화 경험',
      'Shadcn-ui를 활용해 일관성 있는 UI 컴포넌트를 빠르게 구현, 개발 속도 향상',
    ],
    detail: {
      period: '2025.01 - 2025.04',
      team: '5명 (FE: 1, BE: 1, FullStack: 1, PM: 1, PD: 1)',
      role: 'FE — SVG 애니메이션, 라우팅 및 접근 권한 설정, 재료 CRUD, 슬라이드 모달 구현, 소개 페이지, 건강 설문조사 로직',
      implementations: [
        {
          title: 'Next.js App Router 기반 확장 가능한 라우팅 및 인증 아키텍처 설계',
          items: [
            { label: '라우팅 최적화', content: 'Route Groups를 활용하여 (with-layout), (no-header) 등 조건부 레이아웃을 모듈화하고 복잡한 라우팅 구조를 깔끔하게 분리했습니다.' },
            { label: '인증 및 보안', content: 'NextAuth.js를 커스터마이징하여 OAuth 2.0(카카오/구글) 소셜 로그인을 구현했습니다. JWT 콜백과 Custom Fetch Client를 연동하여 모든 API 요청에 토큰이 자동 주입되는 안전한 접근 제어 로직을 구축했습니다.' },
          ],
        },
        {
          title: '도메인 주도 독립적 상태 관리 및 디자인 시스템 구축',
          items: [
            { label: '상태 관리 (Zustand)', content: '재료, 레시피, 알림 등 8개 도메인별로 스토어를 독립적으로 분리하여 전역 상태의 복잡도를 낮추고 TypeScript로 타입 안정성을 확보했습니다.' },
            { label: '디자인 토큰', content: 'Style Dictionary를 활용해 색상, 타이포그래피 등의 체계를 중앙 집중화하고 커스텀 빌드 스크립트로 변환을 자동화하여 Tailwind CSS와 매끄럽게 통합했습니다.' },
            { label: 'UI/UX 고도화', content: 'Radix UI를 활용해 접근성(a11y) 높은 공통 컴포넌트(Dialog, Dropdown 등)를 자체 개발하고, GSAP를 적용하여 동적이고 부드러운 사용자 경험을 제공했습니다.' },
          ],
        },
        {
          title: '검색 엔진 최적화(SEO) 및 모바일 사용성 개선',
          items: [
            { label: 'SEO 고도화', content: 'Open Graph 메타태그, Sitemap, Robots.txt를 동적으로 구성하여 구글 및 네이버 검색 엔진 노출을 최적화했습니다.' },
            { label: '반응형 설계', content: '최대 600px 기준의 모바일 우선(Mobile-First) 뷰포트 전략을 채택하여 다양한 디바이스 환경에서 일관된 레이아웃을 제공했습니다.' },
          ],
        },
      ],
    },
  },
  {
    title: 'Matching Goal',
    description: '경기 일정과 주소를 쉽게 잡고 일정을 관리할 수 있는 웹 기반의 매칭 시스템',
    image: '/matching-goal.png',
    imgType: 'image',
    techStack: [RiNextjsLine, SiTailwindcss, SiDaisyui, SiAxios, SiReactquery, SiMockserviceworker, GiStomp, SiTypescript],
    github: 'https://github.com/matching-goal/frontend',
    demo: 'none',
    notionLink: 'https://stripe-algebra-28f.notion.site/matching-goal-41105daa3fa14f21896205279b4a9955',
    lessons: [
      'Next.js의 폴더 기반 라우팅 경험',
      'TS를 활용한 효율적인 타입 관리 및 코드 가독성 향상',
      'React Query를 활용한 데이터 패칭 및 클라이언트 상태 관리와 유저 경험 개선',
      'useSuspenseInfiniteQuery를 사용한 게시글 무한스크롤 구현',
      'Mock Service Worker(MSW)를 활용한 API Mocking 경험',
      'Stomp.js를 활용한 실시간 채팅 기능 구현 경험',
    ],
    detail: {
      period: '2024',
      team: '팀 프로젝트',
      role: 'FE — 경기 매칭, 실시간 채팅, 무한스크롤 피드',
      implementations: [
        {
          title: 'React Query 기반 데이터 패칭 및 UX 최적화',
          items: [
            { label: '설계', content: 'React Query를 활용한 데이터 패칭 및 클라이언트 상태 관리로 유저 경험을 개선했습니다.' },
            { label: '무한스크롤', content: 'useSuspenseInfiniteQuery를 사용하여 게시글 무한스크롤을 구현했습니다.' },
            { label: 'API Mocking', content: 'Mock Service Worker(MSW)와 Next API Route를 활용해 백엔드 없이도 개발을 진행했습니다.' },
          ],
        },
        {
          title: 'Stomp.js 기반 실시간 채팅 구현',
          items: [
            { label: '구현', content: 'Stomp.js를 활용하여 WebSocket 기반 실시간 채팅 기능을 구현했습니다.' },
            { label: '타입 안전성', content: 'TypeScript로 API 응답 타입을 정의하여 런타임 에러를 사전에 방지하고 코드 가독성을 향상시켰습니다.' },
          ],
        },
      ],
    },
  },
];

export default function MyProjects({ transitioningOut, onExitComplete }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [openDetailIdx, setOpenDetailIdx] = useState<number | null>(null);

  useEffect(() => {
    videoRefs.current = Array.from(document.querySelectorAll('video'));
  }, []);

  useGSAP(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
  }, []);

  useGSAP(() => {
    if (!transitioningOut.exiting) return;
    gsap.to(ref.current, { opacity: 0, y: -20, duration: 0.5, onComplete: onExitComplete });
  }, [transitioningOut.exiting]);

  return (
    <>
      <div ref={ref} className="w-full bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-8">MY PROJECTS</h2>

        <div className="w-[90%] max-w-5xl flex items-center justify-center bg-neutral-900 rounded-2xl shadow-lg">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-full"
            onSlideChange={() => {
              videoRefs.current.forEach((v) => { v.pause(); v.currentTime = 0; });
            }}
          >
            {projects.map((project, idx) => (
              <SwiperSlide
                key={idx}
                className="flex justify-center items-center overflow-y-scroll scrollbar-custom"
              >
                <div className="flex p-8 h-full items-center flex-col md:flex-row gap-6">
                  {/* Media */}
                  <div className="w-full md:w-1/2">
                    {project.imgType === 'video' && (
                      <video controls className="rounded-xl w-full">
                        <source src={project.image} type="video/mp4" />
                      </video>
                    )}
                    {project.imgType === 'image' && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="rounded-xl shadow-md w-full object-contain"
                      />
                    )}
                    {project.imgType === 'placeholder' && (
                      <div className="rounded-xl w-full aspect-video bg-zinc-800 flex flex-col items-center justify-center border border-zinc-700">
                        <span className="text-zinc-400 text-lg font-semibold">{project.title}</span>
                        <span className="text-zinc-600 text-sm mt-1">이미지 준비 중</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="w-full md:w-1/2 text-white">
                    <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                    <p className="text-lg mb-4">{project.description}</p>

                    {/* Lessons */}
                    <div className="mb-4">
                      <p className="font-semibold mb-1">LESSONS LEARNED</p>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-0.5">
                        {project.lessons.map((lesson, i) => (
                          <li key={i}>{lesson}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {project.techStack.map((Icon, i) => (
                        <Icon key={i} className="text-2xl text-gray-400 hover:text-white transition-colors" />
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full flex-wrap">
                      {/* 상세보기 */}
                      <button
                        onClick={() => setOpenDetailIdx(idx)}
                        className="flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                      >
                        📋 상세 보기
                      </button>

                      <Link
                        href={project.github}
                        target="_blank"
                        className="flex items-center justify-center bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700 text-sm"
                      >
                        <FaGithub className="mr-2" /> GitHub
                      </Link>

                      {project.demo !== 'none' && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          className="flex items-center justify-center bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 text-sm"
                        >
                          <FiExternalLink className="mr-2" /> Live Demo
                        </Link>
                      )}

                      {project.notionLink && (
                        <Link
                          href={project.notionLink}
                          target="_blank"
                          className="flex items-center justify-center bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700 text-sm"
                        >
                          Notion
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Detail Modal */}
      {openDetailIdx !== null && (
        <ProjectDetailModal
          title={projects[openDetailIdx].title}
          description={projects[openDetailIdx].description}
          data={projects[openDetailIdx].detail}
          onClose={() => setOpenDetailIdx(null)}
        />
      )}
    </>
  );
}
