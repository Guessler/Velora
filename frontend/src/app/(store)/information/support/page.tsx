
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Headset,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react";

const supportCategories = [
  {
    icon: ShoppingBag,
    title: "Покупки",
    description: "Поиск товаров, оформление и отмена заказов.",
    href: "/support/purchases",
  },
  {
    icon: Package,
    title: "Доставка и возврат",
    description: "Статус доставки, получение и возврат товаров.",
    href: "/support/delivery",
  },
  {
    icon: CreditCard,
    title: "Оплата",
    description: "Способы оплаты, платежи и возвраты средств.",
    href: "/support/payment",
  },
  {
    icon: Store,
    title: "Для продавцов",
    description: "Создание магазина, товары и управление заказами.",
    href: "/support/sellers",
  },
  {
    icon: ShieldCheck,
    title: "Аккаунт и безопасность",
    description: "Доступ к аккаунту, личные данные и безопасность.",
    href: "/support/account",
  },
  {
    icon: CircleHelp,
    title: "Другие вопросы",
    description: "Помощь по другим вопросам о работе Velora.",
    href: "/support/other",
  },
];

const faq = [
  {
    question: "Как оформить заказ?",
    answer:
      "Выберите интересующие товары, добавьте их в корзину и перейдите к оформлению заказа. Укажите необходимые данные для доставки и выберите доступный способ оплаты.",
  },
  {
    question: "Как отследить свой заказ?",
    answer:
      "Информация о заказах доступна в личном кабинете в разделе «Мои заказы». Там можно посмотреть актуальный статус заказа.",
  },
  {
    question: "Как вернуть товар?",
    answer:
      "Условия возврата зависят от категории товара и применимых правил. Обратитесь в поддержку, указав номер заказа и причину возврата.",
  },
  {
    question: "Как стать продавцом на Velora?",
    answer:
      "Перейдите в раздел «Стать продавцом», заполните заявку и отправьте её на рассмотрение. После одобрения вы получите доступ к кабинету продавца.",
  },
  {
    question: "Как изменить данные аккаунта?",
    answer:
      "Перейдите в личный кабинет и откройте настройки профиля. Там можно управлять доступными личными данными и контактной информацией.",
  },
  {
    question: "Что делать, если возникла проблема с заказом?",
    answer:
      "Свяжитесь с нашей службой поддержки и укажите номер заказа, опишите ситуацию. Это поможет быстрее разобраться в проблеме.",
  },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredFaq = faq.filter((item) =>
    `${item.question} ${item.answer}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
              <Headset size={27} strokeWidth={1.6} />
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Центр поддержки Velora
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              Чем мы можем помочь?
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
              Найдите ответы на популярные вопросы или обратитесь к нашей
              службе поддержки.
            </p>

            <div className="relative mx-auto mt-10 max-w-2xl">
              <Search
                size={21}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setActiveFaq(null);
                }}
                placeholder="Например, как вернуть товар?"
                className="h-16 w-full rounded-2xl border border-neutral-200 bg-white pl-14 pr-5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 sm:px-8 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Разделы помощи
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Выберите тему обращения
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-neutral-500">
            Мы собрали полезную информацию по основным вопросам использования
            платформы.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportCategories.map(
            ({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-neutral-200 p-7 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-100 transition group-hover:bg-white">
                  <Icon size={23} strokeWidth={1.7} />
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <ArrowRight
                    size={19}
                    className="shrink-0 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-black"
                  />
                </div>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {description}
                </p>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-screen-2xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              FAQ
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Популярные вопросы
            </h2>

            <p className="mt-5 leading-7 text-neutral-500">
              Возможно, ответ на ваш вопрос уже есть здесь. Посмотрите
              подборку наиболее частых обращений.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
              <CircleHelp size={19} />
              <span>Не нашли нужный ответ?</span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((item) => {
                const originalIndex = faq.indexOf(item);
                const isOpen = activeFaq === originalIndex;

                return (
                  <div
                    key={item.question}
                    className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFaq(isOpen ? null : originalIndex)
                      }
                      className="flex w-full cursor-pointer items-center justify-between gap-5 p-5 text-left sm:p-6"
                    >
                      <span className="font-medium">{item.question}</span>

                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-neutral-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-neutral-100 px-5 pb-6 pt-4 text-sm leading-7 text-neutral-500 sm:px-6">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center">
                <Search
                  size={26}
                  className="mx-auto text-neutral-400"
                />
                <p className="mt-4 font-medium">
                  Ничего не найдено
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  Попробуйте изменить поисковый запрос.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Свяжитесь с нами
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Мы готовы помочь.
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-neutral-500">
              Если вы не нашли ответ на свой вопрос, напишите нам. Опишите
              ситуацию, и мы постараемся помочь разобраться.
            </p>
          </div>

          <div className="rounded-3xl bg-neutral-950 p-8 text-white sm:p-10">
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
              <MessageCircle size={24} />
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              Остались вопросы?
            </h3>

            <p className="mt-4 leading-7 text-neutral-400">
              Перейдите к форме обращения, чтобы сообщить о проблеме или
              задать вопрос нашей команде.
            </p>

            <Link
              href="/support/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Написать в поддержку
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-4 px-5 py-8 text-sm text-neutral-400 sm:flex-row sm:items-center sm:px-8">
          <Link
            href="/home"
            className="text-lg font-black tracking-[0.2em] text-black"
          >
            VELORA
          </Link>

          <p>© 2026 Velora. Все права защищены.</p>

          <Link
            href="/about"
            className="transition hover:text-black"
          >
            О компании
          </Link>
        </div>
      </footer>
    </main>
  );
}
