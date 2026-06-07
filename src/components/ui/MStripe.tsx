import clsx from "clsx";

interface MStripeProps {
  className?: string;
}

/**
 * M tricolor stripe — the BMW M brand accent divider.
 * Three equal bands: m-blue-light → m-blue-dark → m-red.
 * Always aria-hidden; purely decorative.
 */
export function MStripe({ className }: MStripeProps) {
  return (
    <div aria-hidden="true" className={clsx("m-stripe", className)}>
      <span />
    </div>
  );
}
