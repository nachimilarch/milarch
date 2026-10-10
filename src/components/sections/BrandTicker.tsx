import { products, therapyAreas } from "@/data/products";

const PILL_COLOURS = ["#E5195F", "#FFC20E", "#5EC4BA", "#5B55A5"];

/** A slow, endless strip of brand names and therapy areas between the hero and the catalogue. */
export default function BrandTicker() {
  const items = [
    ...products.map((p) => p.brandName.replace("™", "")),
    ...therapyAreas.map((a) => a.short),
  ];
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((label, i) => (
        <li key={`${label}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-2xl text-white md:text-3xl">{label}</span>
          <span
            className="block h-3 w-7 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${PILL_COLOURS[i % 4]} 50%, ${PILL_COLOURS[(i + 1) % 4]} 50%)`,
            }}
          />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-indigo py-5" role="presentation">
      <div className="ticker flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
