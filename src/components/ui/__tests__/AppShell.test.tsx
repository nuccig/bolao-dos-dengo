import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppShell } from "../AppShell";

// next/link renders as a plain <a> in jsdom; mock it for test isolation.
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("AppShell — navigation landmark", () => {
  it("renders the primary navigation landmark with an accessible label", () => {
    render(<AppShell><p>content</p></AppShell>);
    expect(
      screen.getByRole("navigation", { name: /navegação principal/i })
    ).toBeInTheDocument();
  });

  it("renders the brand link pointing to the root", () => {
    render(<AppShell><p>content</p></AppShell>);
    const link = screen.getByRole("link", { name: /bolão dos dengo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the M tricolor stripe as a decorative element", () => {
    const { container } = render(<AppShell><p>content</p></AppShell>);
    const stripe = container.querySelector(".m-stripe[aria-hidden='true']");
    expect(stripe).not.toBeNull();
  });
});

describe("AppShell — content slot", () => {
  it("renders children inside the <main> landmark", () => {
    render(
      <AppShell>
        <section>
          <h2>Partidas</h2>
        </section>
      </AppShell>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Partidas" })).toBeInTheDocument();
  });

  it("does not render a navRight slot when the prop is omitted", () => {
    const { container } = render(<AppShell><p>content</p></AppShell>);
    // When navRight is absent the nav has only one child div (the brand group)
    const navEl = container.querySelector("nav");
    const navChildren = navEl ? Array.from(navEl.children) : [];
    expect(navChildren).toHaveLength(1);
  });
});

describe("AppShell — navRight slot", () => {
  it("renders navRight content with an accessible name", () => {
    render(
      <AppShell navRight={<a href="/login">Entrar</a>}>
        <p>content</p>
      </AppShell>
    );
    expect(screen.getByRole("link", { name: /entrar/i })).toBeInTheDocument();
  });

  it("preserves the brand link when navRight is present", () => {
    render(
      <AppShell navRight={<a href="/login">Entrar</a>}>
        <p>content</p>
      </AppShell>
    );
    expect(
      screen.getByRole("link", { name: /bolão dos dengo/i })
    ).toBeInTheDocument();
  });
});

describe("AppShell — integration: representative route render", () => {
  it("renders a full pool-list-style layout without errors", () => {
    render(
      <AppShell navRight={<a href="/login">Entrar</a>}>
        <section className="m-container py-10">
          <header className="m-page-header">
            <p className="m-eyebrow">Meus grupos</p>
            <h1 className="m-display">Bolões</h1>
          </header>
          <div className="mt-8 grid gap-4">
            <article className="m-card p-6">
              <h2 className="text-2xl font-bold uppercase">Copa Dengo 2026</h2>
            </article>
          </div>
        </section>
      </AppShell>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /bolões/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /copa dengo/i })
    ).toBeInTheDocument();
  });

  it("preserves readable heading hierarchy on a mobile-sized layout", () => {
    render(
      <AppShell
        navRight={<a href="/pools/new" className="m-button">Criar bolão</a>}
      >
        <section>
          <h1>Seu bolão da Copa</h1>
          <p>Seu grupo competindo jogo a jogo.</p>
          <a href="/pools/new" className="m-button">Criar meu bolão</a>
        </section>
      </AppShell>
    );

    const h1 = screen.getByRole("heading", { level: 1, name: /seu bolão da copa/i });
    expect(h1).toBeInTheDocument();

    const primaryAction = screen.getByRole("link", { name: /criar meu bolão/i });
    expect(primaryAction).toBeInTheDocument();
  });
});
