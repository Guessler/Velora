
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, UploadCloud, X } from "lucide-react";

export default function CreatePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const image = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const inputClassName =
    "w-full h-14 px-4 text-base text-gray-900 placeholder:text-gray-400 bg-white border border-gray-300 rounded-xl shadow-sm focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-200";

  const labelClassName = "text-sm font-semibold text-gray-800";

  const handleImageChange = (selectedFile?: File) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Поддерживаются только PNG, JPG и WEBP");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setFile(selectedFile);
  };

  const removeImage = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      quantity: Number(formData.get("quantity") || 0),
      price: Number(formData.get("price") || 0),
      discount: Number(formData.get("discount") || 0),
      image: file,
    };

    console.log(productData);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Создание товара
        </h1>

        <p className="text-gray-500 mt-2">
          Заполните информацию, чтобы добавить товар в каталог
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 lg:p-10 shadow-sm"
      >
        <div className="flex flex-col gap-3">
          <label className={labelClassName}>
            Изображение товара
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0])}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative group w-full min-h-[320px] lg:min-h-[480px] rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Предпросмотр товара"
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-100 transition"
                  aria-label="Удалить изображение"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center px-6">
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm mb-5 group-hover:shadow-md transition">
                  <UploadCloud className="w-9 h-9 text-gray-500" />
                </div>

                <p className="text-lg font-semibold text-gray-800">
                  Перетащите изображение сюда
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  или нажмите, чтобы выбрать файл
                </p>

                <span className="text-xs text-gray-400 mt-5">
                  PNG, JPG или WEBP
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400">
            Рекомендуется использовать качественное изображение товара
        </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className={labelClassName}>
              Название товара
            </label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Например, Футболка Oversize"
              required
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className={labelClassName}>
              Описание товара
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Расскажите подробнее о товаре..."
              rows={6}
              className="w-full min-h-36 resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="quantity" className={labelClassName}>
                Количество товара
              </label>

              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                placeholder="100"
                required
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className={labelClassName}>
                Цена товара, ₽
              </label>

              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="2490"
                required
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="discount" className={labelClassName}>
              Скидка на товар, %
            </label>

            <Input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              placeholder="Например, 15"
              className={inputClassName}
            />
          </div>

          <div className="pt-3 mt-auto">
            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold rounded-xl"
            >
              <ImagePlus className="w-5 h-5 mr-2" />
              Создать товар
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
