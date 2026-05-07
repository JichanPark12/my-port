import React, { useRef } from 'react';
import { Mail, Phone, Github, BookOpen } from 'lucide-react';
import { TransitioningOut } from '../..';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/_source/animation/RegisterEffects';
import Link from 'next/link';

interface Props {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
}

const timeline = [
  {
    id: 'boostcamp',
    period: '2025.06 – 2026.02',
    title: '네이버 부스트캠프 웹・모바일 10기',
    subtitle: '웹 풀스택 과정 수료',
    description:
      '바닐라 JS/Express 기반 웹 서비스 구현부터 React/NestJS 실전 개발까지. 팀 스프린트를 통해 실전 협업·코드리뷰 경험을 쌓았습니다.',
    icon: BookOpen,
  },
];

const contacts = [
  { icon: Phone, label: '010-7929-0179', href: 'tel:010-7929-0179' },
  { icon: Mail, label: 'pjc0179@naver.com', href: 'mailto:pjc0179@naver.com' },
  {
    icon: Github,
    label: 'github.com/JichanPark12',
    href: 'https://github.com/JichanPark12',
  },
];

const AboutMe = ({ transitioningOut, onExitComplete }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = ref.current?.querySelectorAll('.fade-in-item');
    gsap.fromTo(
      items ?? [],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' },
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
      className="bg-black text-white px-6 flex flex-col gap-14 items-center"
    >
      {/* 헤더 */}
      <div className="fade-in-item text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">ABOUT ME</h2>
        <p className="text-base text-gray-400 leading-relaxed">
          끊임없이 <span className="text-white font-semibold">왜?</span>를
          던지며 사용자와 코드 사이를 고민하는 프론트엔드 개발자{' '}
          <span className="text-white font-semibold">박지찬</span>입니다. 협업과
          소통을 중요하게 생각하며, 더 나은 사용자 경험을 위한 고민을 멈추지
          않습니다.
        </p>
      </div>

      {/* 타임라인 */}
      <div className="fade-in-item w-full max-w-2xl">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">
          Education
        </h3>
        <div className="relative flex flex-col gap-0">
          {/* 세로 선 */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />

          {timeline.map(
            ({ id, period, title, subtitle, description, icon: Icon }) => (
              <div key={id} className="relative flex gap-5 pb-10 last:pb-0">
                {/* 아이콘 도트 */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/15">
                  <Icon size={17} className="text-gray-300" />
                </div>

                {/* 내용 */}
                <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5 flex-1">
                  <span className="text-xs text-gray-500 font-mono">
                    {period}
                  </span>
                  <h4 className="text-base font-bold mt-0.5">{title}</h4>
                  <p className="text-sm font-medium mb-2 text-gray-400">
                    {subtitle}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* 연락처 */}
      <div className="fade-in-item w-full max-w-2xl">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          Contact
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {contacts.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 flex-1 bg-zinc-900/60 border border-white/5 rounded-xl px-4 py-3
                         text-sm text-gray-300 hover:text-white hover:border-white/20 hover:bg-zinc-800/60
                         transition-all duration-200"
            >
              <Icon size={15} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
