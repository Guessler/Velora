"use client";

import Link from "next/link";
import {
  PackagePlus,
  Tags,
  ArrowUpRight,
  FolderTree,
} from "lucide-react";

export default function SellerPage() {
  return (
    <div className="w-full space-y-8 pt-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Управление магазином
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Создавайте товары и управляйте ассортиментом вашего магазина
        </p>
      </div>

      <Link
        href="/seller/products/create"
        className="group flex items-center justify-between gap-5 rounded-2xl bg-black p-6 text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <PackagePlus size={25} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Создать товар</h2>
            <p className="mt-1 text-sm text-white/60">
              Добавьте новый товар в ассортимент магазина
            </p>
          </div>
        </div>

        <ArrowUpRight
          size={22}
          className="shrink-0 text-white/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/seller/brands/create"
          className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-400 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
              <Tags size={22} />
            </div>

            <ArrowUpRight
              size={20}
              className="text-neutral-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-5 text-base font-semibold text-neutral-900">
            Мои бренды
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            Управляйте брендами или добавляйте новые
          </p>
        </Link>

        <Link
          href="/seller/products"
          className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-400 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
              <FolderTree size={22} />
            </div>

            <ArrowUpRight
              size={20}
              className="text-neutral-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-5 text-base font-semibold text-neutral-900">
            Мой ассортимент
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            Просматривайте товары и управляйте остатками
          </p>
        </Link>

        <Link
          href="/seller/categories/request"
          className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-400 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
              <FolderTree size={22} />
            </div>

            <ArrowUpRight
              size={20}
              className="text-neutral-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-5 text-base font-semibold text-neutral-900">
            Предложить категорию
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            Предложите новую категорию для общего каталога Velora
          </p>
        </Link>
      </div>
    </div>
  );
}