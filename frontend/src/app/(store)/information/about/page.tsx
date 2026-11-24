
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Package,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react";

const advantages = [
  {
    icon: ShoppingBag,
    title: "Удобные покупки",
    description:
      "Мы стремимся сделать поиск и покупку товаров простыми, понятными и комфортными.",
  },
  {
    icon: Store,
    title: "Возможности для продавцов",
    description:
      "Помогаем предпринимателям находить покупателей и развивать собственный бизнес.",
  },
  {
    icon: ShieldCheck,
    title: "Доверие и прозрачность",
    description:
      "Создаём понятную среду взаимодействия между покупателями и продавцами.",
  },
  {
    icon: Package,
    title: "Разнообразие товаров",
    description:
      "Объединяем разные категории товаров на одной площадке, чтобы выбор был шире.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="mx-auto max-w-screen-2xl px-5 py-24 sm:px-8 lg:py-36">
          <div className="max-w-4xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
              About Velora
            </p>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl">
              Больше, чем
              <br />
              просто покупки.
              <span className="text-neutral-400"> Это Velora.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-500 sm:text-xl">
              Velora — пространство, объединяющее покупателей и продавцов.
              Мы создаём удобную площадку, где можно находить интересные
              товары, открывать новые бренды и развивать собственное дело.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Перейти в каталог
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/seller/request"
                className="inline-flex items-center gap-3 rounded-full border border-neutral-300 px-7 py-4 text-sm font-medium transition hover:bg-neutral-100"
              >
                Стать продавцом
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 size-[500px] rounded-full bg-neutral-100 blur-3xl" />
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Наша философия
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Хороший выбор начинается с первого шага.
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-6 text-base leading-8 text-neutral-500 sm:text-lg">
            <p>
              Мы верим, что онлайн-покупки должны быть не просто способом
              приобрести необходимую вещь, а удобным опытом, к которому
              хочется возвращаться.
            </p>

            <p>
              Поэтому Velora развивается как единая площадка, где покупатели
              могут находить товары, а продавцы — представлять свои магазины,
              управлять ассортиментом и взаимодействовать с аудиторией.
            </p>

            <p>
              Наша цель — сделать торговлю доступнее, а взаимодействие
              между её участниками — проще и понятнее.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Почему Velora
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Создаём пространство для удобной торговли.
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-500">
              Мы хотим, чтобы каждый участник платформы находил здесь
              возможности для себя.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white p-8 transition hover:bg-neutral-50 sm:p-10"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-100">
                  <Icon size={23} strokeWidth={1.7} />
                </div>

                <h3 className="mt-8 text-xl font-semibold">{title}</h3>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-[380px] flex-col justify-between rounded-3xl bg-neutral-950 p-8 text-white sm:p-12">
            <div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                <Heart size={24} />
              </div>

              <h2 className="mt-10 text-3xl font-semibold sm:text-4xl">
                Для покупателей
              </h2>

              <p className="mt-5 max-w-md leading-7 text-neutral-400">
                Открывайте новые товары, находите интересные предложения и
                собирайте всё необходимое в одном месте.
              </p>
            </div>

            <Link
              href="/"
              className="mt-10 inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition hover:text-neutral-300"
            >
              Начать покупки
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex min-h-[380px] flex-col justify-between rounded-3xl bg-neutral-100 p-8 sm:p-12">
            <div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-white">
                <Store size={24} />
              </div>

              <h2 className="mt-10 text-3xl font-semibold sm:text-4xl">
                Для продавцов
              </h2>

              <p className="mt-5 max-w-md leading-7 text-neutral-500">
                Создавайте собственный магазин, размещайте товары,
                обрабатывайте заказы и развивайте своё дело вместе с Velora.
              </p>
            </div>

            <Link
              href="/seller/request"
              className="mt-10 inline-flex w-fit items-center gap-3 text-sm font-semibold text-black transition hover:text-neutral-500"
            >
              Стать продавцом
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-5 py-24 text-center sm:px-8 lg:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Velora
          </p>

          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Откройте для себя новый опыт покупок.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
            Исследуйте каталог, находите интересные товары и становитесь
            частью Velora.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Перейти в магазин
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
