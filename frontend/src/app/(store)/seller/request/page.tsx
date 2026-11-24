
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Info,
  ShieldCheck,
  Store,
  UserRound,
} from "lucide-react";

type SellerType = "SELF_EMPLOYED" | "SOLE_PROPRIETOR" | "LEGAL_ENTITY";

export default function SellerRequestPage() {
  const [sellerType, setSellerType] =
    useState<SellerType>("SELF_EMPLOYED");

  const [formData, setFormData] = useState({
    fullName: "",
    country: "Россия",
    inn: "",
    ogrnip: "",
    ogrn: "",
    legalName: "",
    storeName: "",
    description: "",
    category: "",
    phone: "",
    email: "",
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Здесь подключается отправка заявки на backend.
    // Например: await createSellerApplication({ ...formData, sellerType });
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5";

  const labelClass = "text-sm font-medium text-neutral-800";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/home"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Вернуться в магазин
        </Link>

        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
            <Store size={23} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Станьте продавцом Velora
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-500">
            Создайте собственный магазин и начните продавать товары
            на нашей площадке. Для этого заполните заявку — мы проверим
            предоставленные сведения и сообщим вам о результате.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <FileText className="mb-4 text-neutral-500" size={21} />
            <h3 className="font-medium text-neutral-900">
              Заполните форму
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Укажите сведения о себе и вашем бизнесе.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <ShieldCheck className="mb-4 text-neutral-500" size={21} />
            <h3 className="font-medium text-neutral-900">
              Пройдите проверку
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Наша команда проверит данные и заявку.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <Store className="mb-4 text-neutral-500" size={21} />
            <h3 className="font-medium text-neutral-900">
              Откройте магазин
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              После одобрения появится доступ к панели продавца.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
                  <BriefcaseBusiness size={18} />
                </div>
                <h2 className="text-lg font-semibold text-neutral-950">
                  Тип продавца
                </h2>
              </div>

              <p className="mt-2 text-sm text-neutral-500">
                Выберите форму регистрации вашего бизнеса.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: "SELF_EMPLOYED",
                  title: "Самозанятый",
                  description: "Физическое лицо с налогом на профессиональный доход",
                  icon: UserRound,
                },
                {
                  value: "SOLE_PROPRIETOR",
                  title: "ИП",
                  description: "Индивидуальный предприниматель",
                  icon: BriefcaseBusiness,
                },
                {
                  value: "LEGAL_ENTITY",
                  title: "Юридическое лицо",
                  description: "ООО и другие организации",
                  icon: Building2,
                },
              ].map((item) => {
                const Icon = item.icon;
                const selected = sellerType === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setSellerType(item.value as SellerType)
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <Icon size={21} className="text-neutral-700" />
                      {selected && (
                        <CheckCircle2
                          size={19}
                          className="text-neutral-900"
                        />
                      )}
                    </div>

                    <p className="font-medium text-neutral-900">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-neutral-500">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
                  <UserRound size={18} />
                </div>
                <h2 className="text-lg font-semibold text-neutral-950">
                  Данные продавца
                </h2>
              </div>

              <p className="mt-2 text-sm text-neutral-500">
                Укажите сведения, необходимые для идентификации продавца.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  ФИО *
                </label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Иванов Иван Иванович"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Страна регистрации *
                </label>
                <input
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Россия"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  ИНН *
                </label>
                <input
                  required
                  name="inn"
                  value={formData.inn}
                  onChange={handleChange}
                  placeholder="Введите ИНН"
                  className={inputClass}
                />
              </div>

              {sellerType === "SOLE_PROPRIETOR" && (
                <div>
                  <label className={labelClass}>
                    ОГРНИП *
                  </label>
                  <input
                    required
                    name="ogrnip"
                    value={formData.ogrnip}
                    onChange={handleChange}
                    placeholder="Введите ОГРНИП"
                    className={inputClass}
                  />
                </div>
              )}

              {sellerType === "LEGAL_ENTITY" && (
                <>
                  <div>
                    <label className={labelClass}>
                      ОГРН *
                    </label>
                    <input
                      required
                      name="ogrn"
                      value={formData.ogrn}
                      onChange={handleChange}
                      placeholder="Введите ОГРН"
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Полное наименование организации *
                    </label>
                    <input
                      required
                      name="legalName"
                      value={formData.legalName}
                      onChange={handleChange}
                      placeholder="Например, ООО «Компания»"
                      className={inputClass}
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
                  <Store size={18} />
                </div>
                <h2 className="text-lg font-semibold text-neutral-950">
                  Информация о магазине
                </h2>
              </div>

              <p className="mt-2 text-sm text-neutral-500">
                Расскажите, что вы планируете продавать на Velora.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Название магазина *
                </label>
                <input
                  required
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="Например, Urban Wear"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Категория товаров *
                </label>
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Выберите категорию
                  </option>
                  <option value="clothing">Одежда</option>
                  <option value="shoes">Обувь</option>
                  <option value="accessories">Аксессуары</option>
                  <option value="electronics">Электроника</option>
                  <option value="home">Товары для дома</option>
                  <option value="beauty">Красота и уход</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Описание магазина *
                </label>
                <textarea
                  required
                  minLength={30}
                  maxLength={1000}
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Расскажите о вашем магазине, ассортименте и товарах..."
                  className={`${inputClass} resize-none`}
                />
                <p className="mt-2 text-right text-xs text-neutral-400">
                  {formData.description.length}/1000
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-950">
                Контактная информация
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Укажите контакты, по которым мы сможем связаться с вами.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Электронная почта *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Номер телефона *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 000-00-00"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8">
            <div className="flex gap-3 rounded-xl bg-neutral-50 p-4">
              <Info
                size={20}
                className="mt-0.5 shrink-0 text-neutral-500"
              />
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Что произойдёт после отправки?
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Мы проверим предоставленные сведения. Если потребуется
                  дополнительная информация, свяжемся с вами по указанным
                  контактам. После одобрения заявки в боковом меню появится
                  кнопка «Панель продавца».
                </p>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3">
              <input
                required
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-neutral-900"
              />
              <span className="text-sm leading-6 text-neutral-600">
                Я подтверждаю достоверность предоставленных сведений
                и даю согласие на обработку персональных данных
                в соответствии с политикой конфиденциальности.
              </span>
            </label>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs leading-5 text-neutral-400">
              Отправляя заявку, вы соглашаетесь с правилами регистрации
              продавцов на платформе Velora.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-7 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Отправить заявку
              <ArrowRight size={17} />
            </button>
          </div>
        </form>

        {/* Bottom note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-neutral-400">
          <Clock3 size={16} />
          <span>Статус заявки можно будет отслеживать в личном кабинете</span>
        </div>
      </div>
    </div>
  );
}
