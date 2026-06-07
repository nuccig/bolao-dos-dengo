import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MStripe } from "../MStripe";

describe("MStripe", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(<MStripe />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders the three-band stripe element with the m-stripe class", () => {
    const { container } = render(<MStripe />);
    const stripe = container.querySelector(".m-stripe");
    expect(stripe).not.toBeNull();
  });

  it("contains the middle-band span required by the CSS grid", () => {
    const { container } = render(<MStripe />);
    const span = container.querySelector(".m-stripe > span");
    expect(span).not.toBeNull();
  });

  it("forwards additional class names without removing m-stripe", () => {
    const { container } = render(<MStripe className="w-14" />);
    const el = container.firstChild as HTMLElement;
    expect(el.classList.contains("m-stripe")).toBe(true);
    expect(el.classList.contains("w-14")).toBe(true);
  });

  it("does not render visible text that could confuse screen readers", () => {
    const { container } = render(<MStripe />);
    expect(container.textContent).toBe("");
  });
});
