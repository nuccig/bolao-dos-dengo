import type { ReactNode } from "react";
import Link from "next/link";

import { MStripe } from "./MStripe";

interface AppShellProps {
  /** Page body content rendered inside <main>. */
  children: ReactNode;
  /**
   * Optional right-side navigation slot — place links or action controls here.
   * Commonly used for auth links on public pages or back-navigation on interior pages.
   */
  navRight?: ReactNode;
}

/**
 * AppShell — shared page wrapper for every MVP screen.
 *
 * Renders the DESIGN.md top-nav (64 px, canvas black, M stripe logo + brand
 * link at left, optional navRight slot at right) followed by a <main> content
 * area. Downstream page components place their <section> content inside
 * children; they do not need to repeat the nav or the m-page wrapper.
 *
 * This component is intentionally a plain React component (no async, no server-
 * only imports) so it can be tested with @testing-library/react in vitest.
 */
export function AppShell({ children, navRight }: AppShellProps) {
  return (
    <div className="m-page">
      <nav
        aria-label="Navegação principal"
        className="m-container flex h-16 items-center justify-between border-b m-hairline"
      >
        <div className="flex items-center gap-4">
          <MStripe className="w-14" />
          <Link
            aria-label="Bolão dos Dengo — página inicial"
            className="m-link"
            href="/"
          >
            Bolão dos Dengo
          </Link>
        </div>
        {navRight ? (
          <div className="flex items-center gap-4">{navRight}</div>
        ) : null}
      </nav>
      <main>{children}</main>
    </div>
  );
}
