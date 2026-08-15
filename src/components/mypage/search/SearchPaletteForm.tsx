"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthPage } from "@/components/layout/AuthPage";
import { Dropdown, DropdownOption } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { searchSchema, type SearchSchema } from "@/libs/validations/schema";
import { useRouter } from "next/navigation"
import type { PaletteUIModel } from "@/utils/transform";
import { getTokyoDateParts } from "../libs/formatDate";

export type SearchPaletteFormProps = {
  palettes: PaletteUIModel[]
}


export function SearchPaletteForm({palettes}: SearchPaletteFormProps) {
  const {
        handleSubmit,
        control,
        setError,
        setValue,
        reset,
        formState: { errors, isValid, isSubmitting },
      } = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
         defaultValues: {
          placeId: "",
          date: "all",
          time: "all",
        },
        mode: "onChange",
      })
  
  const router = useRouter();

  const placeId = useWatch({
    control,
    name: "placeId",
  });

  const date = useWatch({
    control,
    name: "date",
  });

  const placeOptions: DropdownOption[] = Array.from(
    new Map(
      palettes.map((palette) => [
        palette.place.id,
        palette.place.name,
      ])
    )
  ).map(([id, name]) => ({
    value: id,
    label: name,
  }));

  const dateOptions: DropdownOption[] = [
  { value: "all", label: "すべて" },

  ...Array.from(
    new Set(
      palettes
        .filter((palette) => {
          if (!palette.captureDate) return false;

          return palette.place.id === placeId;
        })
        .map((palette) => {
          const parts = getTokyoDateParts(palette.captureDate!);

          return `${parts.year}-${parts.month}-${parts.day}`;
        })
    )
  ).map((date) => ({
    value: date,
    label: date,
  })),
];

  const timeOptions: DropdownOption[] = [
  { value: "all", label: "すべて" },

  ...Array.from(
    new Set(
      palettes
        .filter((palette) => {
          if (!palette.captureDate) return false;
          if (date === "all") return false;

          if (palette.place.id !== placeId) return false;

          const parts = getTokyoDateParts(palette.captureDate);
          const paletteDate =
            `${parts.year}-${parts.month}-${parts.day}`;

          return paletteDate === date && palette.hasTime;
        })
        .map((palette) => {
          const parts = getTokyoDateParts(palette.captureDate!);

          return Number(parts.hour);
        })
    )
  )
    .sort((a, b) => a - b)
    .map((hour) => ({
      value: String(hour),
      label: `${String(hour).padStart(2, "0")}時`,
    })),
];

  const onSubmit = (data: SearchSchema) => {
    const params = new URLSearchParams();

    params.set("placeId", data.placeId);

    if (data.date !== "all") {
      params.set("date", data.date);
    }

    if (data.time !== "all") {
      params.set("time", data.time);
    }

    router.push(`/mypage/search/result?${params.toString()}`);
  };
  
  return (
    <AuthPage title="カラー検索">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <Controller
          control={control}
          name="placeId"
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              label="場所" 
              iconName="landscape_2" 
              options={placeOptions} 
              placeholder="選択してください"
              helperText="場所を選択します"
              emptyText="登録された場所がありません"
              htmlFor="place"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue("date", "all");
                setValue("time", "all");
              }}
            />
          )}
          />
        <Controller
          control={control}
          name="date"
          rules={{ required: false }}
          render={({ field }) => (
            <Dropdown
              label="年月日" 
              iconName="calendar_month" 
              options={dateOptions} 
              placeholder="すべて"
              helperText="日付を選択します"
              htmlFor="date"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                if (value === "all") {
                  setValue("time", "all");
                }
              }}
            />
          )}
          />
        <Controller
          control={control}
          name="time"
          rules={{ required: false }}
          render={({ field }) => (
            <Dropdown
              label="時間" 
              iconName="schedule" 
              options={timeOptions} 
              placeholder="すべて"
              helperText="時間を選択します"
              htmlFor="time"
              value={field.value}
              onChange={field.onChange}
              disabled={date === "all"}
            />
          )}
          />
        <div className="flex flex-col mx-auto">
          {errors.root && (
            <p className="text-text-error text-sm mb-2">
              {errors.root.message}
            </p>
          )}
          <div className="flex items-center mx-auto">
            <Button 
              variant="Outline"
              size="Small"
              type="submit"   
              loading={isSubmitting}
              loadingText="検索中..."
              disabled={isSubmitting}
            >
              検索
            </Button>
          </div>
        </div>
        </div>
      </form>
    </AuthPage>
  )
}