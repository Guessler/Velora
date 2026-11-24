
import CardProduct from "@/components/shadcn-studio/card/card-12";
import CardProductSkeleton from "@/components/skeletons/CardProductSkeleton";
import { Suspense } from "react";
export default function Home() {

  return (
    <div className="px-10 xl:px-0 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4 py-6 mx-auto w-full max-w-screen-2xl">
          <Suspense
            fallback={Array.from({ length: 10 }).map((_, index) => (
              <CardProductSkeleton key={index} />
            ))}
          >
            {Array.from({ length: 100 }).map((_, index) => (
              <CardProduct  key={index} />
            ))}
          </Suspense>
        </div>
    </div>
  );
}
