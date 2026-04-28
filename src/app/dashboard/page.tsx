const cards = [
  { label: "Templates Active", value: "01" },
  { label: "Pending Vendors", value: "00" },
  { label: "Client Requests", value: "00" },
  { label: "Deployments", value: "00" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <section className="glass rounded-2xl p-5">
        <h2 className="text-xl font-semibold text-white">Welcome back, Admin</h2>
        <p className="mt-1 text-sm text-slate-300">
          Phase 1 shell is ready. Core authentication and protected routes are active.
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-cyan-100">{card.value}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
