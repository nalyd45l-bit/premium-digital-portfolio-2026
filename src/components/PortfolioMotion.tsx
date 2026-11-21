import { useEffect } from 'react';

const REVEAL_SELECTOR = [
  '[data-reveal]',
  '.about-heading',
  '.task-lens',
  '.career-heading',
  '.career-lens',
  '.capability-heading',
  '.capability-shell',
  '.capability-bottom',
  '.project-tabs',
  '.project-stage',
  '.project-summary-row',
  '.company-results',
  '.armada-result',
  '.directions',
  '.contact-copy',
  '.contact-signature',
  '.offer-panel',
].join(', ');

const TILT_SELECTOR =
  '.hero-panel, .step-glass-card, .capability-shell, .project-stage, .armada-result, .contact-signature';

export function PortfolioMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.cinematic-portfolio');
    if (!root) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const cleanups: Array<() => void> = [];
    const frames = new Set<number>();
    let scrollFrame = 0;

    const progressBar = document.createElement('div');
    progressBar.className = 'motion-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    root.prepend(progressBar);

    const heroPanel = root.querySelector<HTMLElement>('.hero-panel');
    const heroItems: HTMLElement[] = [];

    if (heroPanel) {
      heroPanel.classList.add('motion-hero');
      Array.from(heroPanel.children).forEach((child, index) => {
        const element = child as HTMLElement;
        element.classList.add('motion-hero-item');
        element.style.setProperty('--motion-delay', String(index * 105) + 'ms');
        heroItems.push(element);
      });
    }

    const revealTargets = Array.from(
      new Set(Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))),
    );

    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--motion-delay', String((index % 3) * 85) + 'ms');
    });

    let revealObserver: IntersectionObserver | null = null;

    if (typeof IntersectionObserver !== 'undefined') {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.classList.add('is-visible');
            revealObserver?.unobserve(element);
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -45px 0px' },
      );
      revealTargets.forEach((element) => revealObserver?.observe(element));
    } else {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
    }

    const countTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'));
    let countObserver: IntersectionObserver | null = null;

    const animateCount = (element: HTMLElement) => {
      const target = Number(element.dataset.count);
      if (!Number.isFinite(target) || target < 0) return;

      const startedAt = performance.now();
      const duration = 1350;
      let frame = 0;

      const tick = (now: number) => {
        frames.delete(frame);

        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = new Intl.NumberFormat('ru-RU').format(
          Math.round(target * eased),
        );

        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
          frames.add(frame);
        }
      };

      element.textContent = '0';
      frame = window.requestAnimationFrame(tick);
      frames.add(frame);
    };

    if (typeof IntersectionObserver !== 'undefined') {
      countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            animateCount(element);
            countObserver?.unobserve(element);
          });
        },
        { threshold: 0.55 },
      );
      countTargets.forEach((element) => countObserver?.observe(element));
    } else {
      countTargets.forEach(animateCount);
    }

    const updateProgress = () => {
      if (scrollFrame) return;

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio =
          maxScroll > 0
            ? Math.max(0, Math.min(1, window.scrollY / maxScroll))
            : 0;
        progressBar.style.transform = 'scaleX(' + ratio + ')';
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    cleanups.push(() => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    });

    const hero = root.querySelector<HTMLElement>('.hero');
    const heroVideo =
      hero?.querySelector<HTMLVideoElement>('.hero-video video') || null;
    let ambient: HTMLDivElement | null = null;

    if (hero) {
      ambient = document.createElement('div');
      ambient.className = 'motion-ambient';
      ambient.setAttribute('aria-hidden', 'true');
      hero.appendChild(ambient);

      const onHeroMove = (event: PointerEvent) => {
        const rect = hero.getBoundingClientRect();
        const x = rect.width ? (event.clientX - rect.left) / rect.width : 0.5;
        const y = rect.height ? (event.clientY - rect.top) / rect.height : 0.5;

        hero.style.setProperty(
          '--motion-spot-x',
          Math.max(0, Math.min(100, x * 100)) + '%',
        );
        hero.style.setProperty(
          '--motion-spot-y',
          Math.max(0, Math.min(100, y * 100)) + '%',
        );

        if (heroVideo) {
          heroVideo.style.setProperty(
            '--motion-parallax-x',
            ((0.5 - x) * 14).toFixed(2) + 'px',
          );
          heroVideo.style.setProperty(
            '--motion-parallax-y',
            ((0.5 - y) * 10).toFixed(2) + 'px',
          );
        }
      };

      const onHeroLeave = () => {
        hero.style.setProperty('--motion-spot-x', '50%');
        hero.style.setProperty('--motion-spot-y', '50%');

        if (heroVideo) {
          heroVideo.style.setProperty('--motion-parallax-x', '0px');
          heroVideo.style.setProperty('--motion-parallax-y', '0px');
        }
      };

      hero.addEventListener('pointermove', onHeroMove, { passive: true });
      hero.addEventListener('pointerleave', onHeroLeave);

      cleanups.push(() => {
        hero.removeEventListener('pointermove', onHeroMove);
        hero.removeEventListener('pointerleave', onHeroLeave);
        hero.style.removeProperty('--motion-spot-x');
        hero.style.removeProperty('--motion-spot-y');

        if (heroVideo) {
          heroVideo.style.removeProperty('--motion-parallax-x');
          heroVideo.style.removeProperty('--motion-parallax-y');
        }

        ambient?.remove();
      });
    }

    const supportsFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;

    let activeTilt: HTMLElement | null = null;

    const resetTilt = () => {
      if (!activeTilt) return;
      activeTilt.style.setProperty('--motion-rx', '0deg');
      activeTilt.style.setProperty('--motion-ry', '0deg');
      activeTilt.classList.remove('is-tilting');
      activeTilt = null;
    };

    const onTiltMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const candidate = event.target.closest<HTMLElement>(TILT_SELECTOR);
      if (!candidate || !root.contains(candidate)) {
        resetTilt();
        return;
      }

      if (activeTilt !== candidate) {
        resetTilt();
        activeTilt = candidate;
        activeTilt.classList.add('motion-spotlight');
      }

      const rect = candidate.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const normalizedX = Math.max(-1, Math.min(1, x * 2 - 1));
      const normalizedY = Math.max(-1, Math.min(1, y * 2 - 1));

      candidate.style.setProperty(
        '--motion-spot-x',
        Math.max(0, Math.min(100, x * 100)) + '%',
      );
      candidate.style.setProperty(
        '--motion-spot-y',
        Math.max(0, Math.min(100, y * 100)) + '%',
      );
      candidate.style.setProperty(
        '--motion-rx',
        (-normalizedY * 1.8).toFixed(2) + 'deg',
      );
      candidate.style.setProperty(
        '--motion-ry',
        (normalizedX * 1.8).toFixed(2) + 'deg',
      );
      candidate.classList.add('is-tilting');
    };

    const onTiltOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const from = event.target.closest<HTMLElement>(TILT_SELECTOR);
      const to =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest<HTMLElement>(TILT_SELECTOR)
          : null;

      if (from && from === activeTilt && (!to || !from.contains(to))) {
        resetTilt();
      }
    };

    if (supportsFinePointer) {
      root.addEventListener('pointermove', onTiltMove, { passive: true });
      root.addEventListener('pointerout', onTiltOut);

      cleanups.push(() => {
        root.removeEventListener('pointermove', onTiltMove);
        root.removeEventListener('pointerout', onTiltOut);
        resetTilt();
      });
    }

    return () => {
      revealObserver?.disconnect();
      countObserver?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      progressBar.remove();

      heroPanel?.classList.remove('motion-hero');
      heroItems.forEach((item) => {
        item.classList.remove('motion-hero-item');
        item.style.removeProperty('--motion-delay');
      });

      revealTargets.forEach((element) => {
        element.classList.remove('motion-reveal', 'is-visible');
        element.style.removeProperty('--motion-delay');
      });

      root.querySelectorAll<HTMLElement>('.motion-spotlight').forEach((element) => {
        element.classList.remove('motion-spotlight', 'is-tilting');
        element.style.removeProperty('--motion-spot-x');
        element.style.removeProperty('--motion-spot-y');
        element.style.removeProperty('--motion-rx');
        element.style.removeProperty('--motion-ry');
      });
    };
  }, []);

  return null;
}
