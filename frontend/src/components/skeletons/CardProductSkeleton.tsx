
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardProductSkeleton = () => {
  return (
    <div className="relative flex min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/60 sm:rounded-2xl">
      <div className="relative flex aspect-square shrink-0 items-center justify-center overflow-hidden bg-neutral-100 sm:aspect-[4/3]">
        <Skeleton className="h-full w-full rounded-none" />

        <Skeleton className="absolute left-2 top-2 z-10 h-5 w-14 rounded-md sm:left-2.5 sm:top-2.5 sm:h-7 sm:w-20 sm:rounded-lg" />

        <Skeleton className="absolute right-2 top-2 z-10 size-8 rounded-full sm:right-2.5 sm:top-2.5 sm:size-10" />
      </div>

      <Card className="flex flex-1 flex-col gap-0 rounded-none border-0 pt-0 shadow-none ring-0">
        <CardHeader className="flex-1 space-y-2 p-2.5 pb-2 sm:space-y-2.5 sm:p-4 sm:pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-14 rounded-md sm:h-9 sm:w-16" />
            <Skeleton className="h-4 w-20 rounded sm:h-5 sm:w-28" />
          </div>

          <div className="space-y-1.5">
            <Skeleton className="h-4 w-4/5 rounded sm:h-6" />
            <Skeleton className="h-4 w-2/5 rounded sm:h-6" />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5 sm:pt-1">
            <Skeleton className="size-4 rounded sm:size-5" />
            <Skeleton className="h-5 w-20 rounded sm:h-7 sm:w-24" />
            <Skeleton className="h-4 w-14 rounded sm:h-5 sm:w-16" />
          </div>
        </CardHeader>

        <CardFooter className="p-2.5 pt-1.5 sm:p-4 sm:pt-2">
          <Skeleton className="h-9 w-full rounded-lg sm:h-12 sm:rounded-xl" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardProductSkeleton;
