
"use client";

import { useRef } from "react";
import { UploadCloud, X } from "lucide-react";

interface ImageUploaderProps {
  value: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  description?: string;
  minHeight?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Изображение",
  description = "PNG, JPG или WEBP",
  minHeight = "min-h-[320px]",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const imageUrl = value ? URL.createObjectURL(value) : null;

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-gray-800">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className={`relative group w-full ${minHeight} rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer overflow-hidden flex items-center justify-center`}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Предпросмотр изображения"
              className="absolute inset-0 w-full h-full object-contain p-8"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center px-6">
            <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm mb-5">
              <UploadCloud className="w-9 h-9 text-gray-500" />
            </div>

            <p className="text-lg font-semibold text-gray-800">
              Загрузите изображение
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Нажмите, чтобы выбрать файл
            </p>

            <span className="text-xs text-gray-400 mt-5">
              {description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
