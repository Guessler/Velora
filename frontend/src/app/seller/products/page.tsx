"use client";
import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerPage() {
  const pathname = usePathname();
  return (
    <div>
      <Link href={`${pathname}/create`}>
        <Button className="h-11 gap-2 cursor-pointer rounded-xl flex flex-row items-center justify-center bg-black px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md active:scale-[0.98]">
          <Plus size={18} strokeWidth={2.2} />
          Создать товар
        </Button>
      </Link>
    </div>
  );
}
