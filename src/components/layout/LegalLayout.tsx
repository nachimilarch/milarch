export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen pt-36 pb-24 px-4 z-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-[var(--muted)] mb-12">Last updated: {updated}</p>
        <div className="prose-legal flex flex-col gap-8 text-[var(--muted)] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
