"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Heart from "@/assets/svg/heart";
import { ShoppingCart, Star, Wallet } from "lucide-react";

const CardProduct = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/60 sm:rounded-2xl">
      <div className="relative flex aspect-square shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-neutral-50 to-violet-200/40 sm:aspect-[4/3]">
        <div className="absolute -left-10 -top-10 size-24 rounded-full bg-violet-300/30 blur-2xl sm:size-32" />
        <div className="absolute -bottom-10 -right-10 size-24 rounded-full bg-violet-400/20 blur-2xl sm:size-32" />

        <Badge className="absolute left-2 top-2 z-1 cursor-pointer rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white hover:bg-red-500 sm:left-2.5 sm:top-2.5 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-base">
          −20%
        </Badge>

        <img
          src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-11.png?width=300&format=auto"
          alt="Nike Jordan Air Rev"
          className="relative z-10 w-[82%] max-w-56 object-contain drop-shadow-xl sm:w-[85%]"
        />

        <Button
          size="icon"
          variant="secondary"
          aria-label={liked ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={() => setLiked((prev) => !prev)}
          className="absolute right-2 top-2 z-1 size-8 cursor-pointer rounded-full bg-white/80 backdrop-blur-md hover:bg-white sm:right-2.5 sm:top-2.5 sm:size-10"
        >
          <Heart
            className={
              liked
                ? "size-4 fill-red-500 stroke-red-500 sm:size-[18px]"
                : "size-4 stroke-neutral-500 sm:size-[18px]"
            }
          />
        </Button>
      </div>

      <Card className="flex flex-1 flex-col gap-0 rounded-none border-0 pt-0 shadow-none ring-0">
        <CardHeader className="flex-1 space-y-2 p-2.5 pb-2 sm:space-y-2.5 sm:p-4 sm:pb-3">
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 sm:gap-1.5 sm:px-2.5 sm:py-1.5">
              <Star className="size-3.5 fill-amber-400 stroke-amber-400 sm:size-[18px]" />

              <span className="text-xs font-bold text-neutral-900 sm:text-base">
                5.0
              </span>
            </div>

            <span className="truncate text-xs text-neutral-500 sm:text-base">
              128 отзывов
            </span>
          </div>

          <CardTitle className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 sm:text-lg">
            Nike Jordan Air Rev
          </CardTitle>

          <div className="flex min-w-0 flex-wrap items-center gap-1.5 pt-0.5 sm:gap-2 sm:pt-1">
            <Wallet className="size-4 shrink-0 text-neutral-500 sm:size-5" />

            <span className="text-base font-bold tracking-tight text-neutral-900 sm:text-2xl">
              646 ₽
            </span>

            <span className="text-xs text-neutral-400 line-through sm:text-base">
              808 ₽
            </span>


          </div>
        </CardHeader>

        <CardFooter className="p-2.5 pt-1.5 sm:p-4 sm:pt-2">
          <Button
            className="h-9 w-full cursor-pointer gap-1.5 rounded-lg bg-neutral-900 px-2 text-xs font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 sm:h-12 sm:gap-2 sm:rounded-xl sm:text-base"
          >
            <ShoppingCart className="size-4 shrink-0 sm:size-5" />
            В корзину
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardProduct;
