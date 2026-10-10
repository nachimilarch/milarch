/** Renders a brand name with its trademark sign set small, so "™" doesn't shout in display type. */
export default function BrandName({ name }: { name: string }) {
  const base = name.replace("™", "");
  return (
    <>
      {base}
      {name.includes("™") && <sup className="ml-0.5 align-super text-[0.4em] font-sans font-medium">™</sup>}
    </>
  );
}
