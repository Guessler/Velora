import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function HeaderSkeleton() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between gap-10 px-6">
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold tracking-[0.2em] text-black"
        >
          VELORA
        </Link>

        <Skeleton className="h-[42px] w-[42px] shrink-0 rounded-xl" />

        <div className="relative w-full max-w-5xl">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>

        <div className="flex shrink-0 items-center gap-7">
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-[30px] w-[30px] rounded-full" />
            <Skeleton className="h-3.5 w-11 rounded" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-[30px] w-[30px] rounded-full" />
            <Skeleton className="h-3.5 w-14 rounded" />
          </div>
        </div>
      </div>
    </header>
  );
}
