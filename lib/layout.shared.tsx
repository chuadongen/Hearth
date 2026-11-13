import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function HearthMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 24 24" className="size-5 text-clay" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2c.6 3.2 4.8 5.3 4.8 10.2A4.8 4.8 0 0 1 12 17a4.8 4.8 0 0 1-4.8-4.8c0-2.2 1.2-3.6 2.2-4.6.2 1.6 1 2.6 2 2.9C11 8.6 11 5 12 2Z"
        />
        <rect x="4" y="19" width="16" height="2.2" rx="1.1" fill="currentColor" opacity=".55" />
      </svg>
      <span className="font-serif text-lg font-medium tracking-tight">{appName}</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <HearthMark />,
    },
    themeSwitch: { enabled: false },
    githubUrl: gitConfig ? `https://github.com/${gitConfig.user}/${gitConfig.repo}` : undefined,
  };
}
