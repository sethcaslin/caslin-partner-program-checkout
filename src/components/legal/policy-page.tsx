import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"

type PolicyPageProps = {
  title: string
  description: string
  children: React.ReactNode
}

export function PolicyPage({
  title,
  description,
  children,
}: PolicyPageProps) {
  return (
    <main className="program-surface min-h-[100dvh] px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      <article className="mx-auto w-full max-w-[860px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_40px_100px_-55px_rgba(15,23,42,0.55)]">
        <header className="border-b border-slate-200 bg-slate-50/70 px-6 py-7 sm:px-10 sm:py-9">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--program-blue)]"
          >
            <ArrowLeft weight="bold" aria-hidden="true" />
            Back to checkout
          </Link>
          <div className="mt-7 flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--program-blue-soft)] text-[var(--program-blue)]">
              <ShieldCheck weight="fill" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--program-blue)]">
                Caslin Partner Program
              </p>
              <h1 className="mt-2 font-heading text-3xl font-black sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-[680px] text-base leading-7 text-slate-600">
                {description}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-500">
                Effective August 2026
              </p>
            </div>
          </div>
        </header>

        <div className="legal-copy px-6 py-8 sm:px-10 sm:py-10">
          {children}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-5 text-sm sm:px-10">
          <span className="font-semibold text-slate-500">
            SETH CASLIN LLC
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-extrabold text-[var(--program-blue)]">
            <Link href="/terms">Purchase Terms</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <a href="https://caslinpartnerprogram.com/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </footer>
      </article>
    </main>
  )
}
