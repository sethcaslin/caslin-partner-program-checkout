import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-[100dvh] bg-[var(--program-bg)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.78fr)]">
        <div className="grid gap-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-40 w-full max-w-[760px] rounded-[18px]" />
          <Skeleton className="h-24 w-full max-w-[720px] rounded-[18px]" />
          <Skeleton className="h-56 w-full rounded-[18px]" />
        </div>
        <Skeleton className="h-[620px] rounded-[22px]" />
      </div>
    </main>
  )
}
