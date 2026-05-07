'use client';

import { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { gsap } from '@/app/_source/animation/RegisterEffects';
import { useGSAP } from '@gsap/react';

export interface ImplementationItem {
  label: string;
  content: string;
}

export interface Implementation {
  title: string;
  items: ImplementationItem[];
  outcome?: string;
}

export interface TroubleShooting {
  index: number;
  title: string;
  problem: string;
  cause: string;
  solution: string;
  outcome?: string;
}

export interface ProjectDetailData {
  period: string;
  team: string;
  role: string;
  implementations: Implementation[];
  troubleshooting?: TroubleShooting[];
}

interface Props {
  title: string;
  description: string;
  data: ProjectDetailData;
  onClose: () => void;
}

const Tag = ({ children, variant = 'default' }: { children: string; variant?: 'default' | 'muted' | 'outcome' }) => {
  const styles = {
    default: 'bg-zinc-800 text-zinc-300',
    muted: 'bg-zinc-800/60 text-zinc-400',
    outcome: 'bg-zinc-800 text-zinc-200',
  };
  return (
    <span className={`self-start shrink-0 inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded ${styles[variant]}`}>
      {children}
    </span>
  );
};

const ProjectDetailModal = ({ title, description, data, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(modalRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18 });
    gsap.to(modalRef.current, { opacity: 0, y: 24, duration: 0.18, onComplete: onClose });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        ref={modalRef}
        className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 py-6 border-b border-zinc-800 shrink-0">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <p className="text-zinc-500 text-xs">{data.period} &nbsp;·&nbsp; {data.team}</p>
            <p className="text-zinc-400 text-xs leading-relaxed">{data.role}</p>
            <p className="text-zinc-500 text-xs pt-0.5">{description}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-600 hover:text-zinc-300 transition-colors ml-6 shrink-0 mt-0.5"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto scrollbar-custom flex-1 px-7 py-6 space-y-10">

          {/* Implementations */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-0.5 h-4 bg-white rounded-full" />
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">구현 &amp; 설계</h4>
            </div>
            <div className="space-y-3">
              {data.implementations.map((impl, i) => (
                <div key={i} className="border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                  <h5 className="text-sm font-semibold text-zinc-100 mb-4 leading-snug">{impl.title}</h5>
                  <div className="space-y-3">
                    {impl.items.map((item, j) => (
                      <div key={j} className="flex gap-3 text-sm leading-relaxed">
                        <Tag>{item.label}</Tag>
                        <span className="text-zinc-400 flex-1 mt-0.5">{item.content}</span>
                      </div>
                    ))}
                  </div>
                  {impl.outcome && (
                    <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-3 text-sm">
                      <Tag variant="outcome">성과</Tag>
                      <span className="text-zinc-300 flex-1 mt-0.5">{impl.outcome}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          {data.troubleshooting && data.troubleshooting.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-0.5 h-4 bg-zinc-500 rounded-full" />
                <h4 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase">트러블슈팅</h4>
              </div>
              <div className="space-y-3">
                {data.troubleshooting.map((ts) => (
                  <div key={ts.index} className="border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        #{String(ts.index).padStart(2, '0')}
                      </span>
                      <h5 className="text-sm font-semibold text-zinc-100 leading-snug">{ts.title}</h5>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <Tag variant="muted">문제</Tag>
                        <span className="text-zinc-400 flex-1 mt-0.5">{ts.problem}</span>
                      </div>
                      <div className="flex gap-3">
                        <Tag variant="muted">원인</Tag>
                        <span className="text-zinc-400 flex-1 mt-0.5">{ts.cause}</span>
                      </div>
                      <div className="flex gap-3">
                        <Tag>해결</Tag>
                        <span className="text-zinc-300 flex-1 mt-0.5">{ts.solution}</span>
                      </div>
                      {ts.outcome && (
                        <div className="flex gap-3 pt-3 border-t border-zinc-800">
                          <Tag variant="outcome">성과</Tag>
                          <span className="text-zinc-300 flex-1 mt-0.5">{ts.outcome}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
