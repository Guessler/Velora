"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  X,
  ImagePlus,
  ArrowUpDown,
  FolderTree,
} from "lucide-react";
import { CREATE_CATEGORY } from "@/graphql/mutations/categories";
import { useMutation } from "@apollo/client/react";

export default function CreateCategoryPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

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
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Поддерживаются только PNG, JPG, WEBP и SVG");

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

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      await createCategory({
        variables: {
          input: {
            name: form.get("name"),
            slug: form.get("slug"),
            parentId: form.get("parentId") || null,
            image: null,
            sortOrder: Number(form.get("sortOrder")),
            isActive,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-8 pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Создание категории
        </h1>

        <p className="text-gray-500 mt-2">
          Заполните информацию, чтобы добавить новую категорию в Velora
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 lg:p-10 shadow-sm"
      >
        {/* Изображение категории */}
        <div className="flex flex-col gap-3">
          <label className={labelClassName}>Изображение категории</label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0])}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative group w-full min-h-[320px] lg:min-h-[400px] rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Изображение категории"
                  className="absolute inset-0 w-full h-full object-contain p-8"
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
                  Загрузите изображение
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Нажмите, чтобы выбрать файл
                </p>

                <span className="text-xs text-gray-400 mt-5">
                  PNG, JPG, WEBP или SVG
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400">
            Рекомендуется использовать изображение, отражающее содержимое
            категории
          </p>
        </div>

        {/* Информация о категории */}
        <div className="flex flex-col gap-6">
          {/* Название */}
          <div className="space-y-2">
            <label htmlFor="name" className={labelClassName}>
              Название категории
            </label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Например, Электроника"
              required
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className={labelClassName}>
              Slug
            </label>

            <Input
              id="slug"
              name="slug"
              type="text"
              placeholder="electronics"
              required
              className={inputClassName}
            />

            <p className="text-xs text-gray-400">
              Используется в URL страницы категории:
              velora.ru/categories/electronics
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="parentId" className={labelClassName}>
              Родительская категория
            </label>

            <div className="relative">
              <FolderTree
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                id="parentId"
                name="parentId"
                type="text"
                placeholder="ID родительской категории"
                className={`${inputClassName} pl-11`}
              />
            </div>

            <p className="text-xs text-gray-400">
              Оставьте поле пустым, если категория является корневой
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="sortOrder" className={labelClassName}>
              Порядок сортировки
            </label>

            <div className="relative">
              <ArrowUpDown
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                min="0"
                defaultValue="0"
                placeholder="0"
                className={`${inputClassName} pl-11`}
              />
            </div>

            <p className="text-xs text-gray-400">
              Чем меньше число, тем выше категория в списке
            </p>
          </div>

          {/* Активность */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Активность категории
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Отображать категорию в публичном каталоге
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="peer sr-only"
              />

              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
            </label>
          </div>

          <div className="pt-3 mt-auto">
            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold rounded-xl"
            >
              <ImagePlus className="w-5 h-5 mr-2" />
              Создать категорию
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
