"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLabel } from "@/components/ui/IconLabel"
import { useAtomValue, useSetAtom } from "jotai";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPaletteAtom } from "@/store/createPalette";
import { createColor } from "@/components/create/PaletteForm/action";
import { editColor } from "@/components/mypage/edit/editAction";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { Place } from "@/components/create/CreatePlaceForm";
import { CreatePlaceForm } from "@/components/create/CreatePlaceForm";
import { usePlaces } from "@/components/create/hooks/usePlaces"
import { SwitchButton } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { createSchema, type CreateSchema } from "@/libs/validations/schema";
import { DateTimePicker } from "@/components/DateTimePicker";
import { toast } from 'sonner';
import { shapeMap } from "@/components/PaletteShape/type";
import { PaletteUIModel } from "@/utils/transform";
import { ShapeButton, type ShapeType } from "@/components/ui/ShapeButton/ShapeButton";
import { CreatePaletteRequest, PaletteMutationResult, EditPaletteRequest, PaletteRequest } from "@/types/palette";
import { PendingCreateData } from "./type";
import { createPlace } from "@/components/create/CreatePlaceForm/action";
import { Spinner } from "@/components/ui/Spinner";

export type PaletteFormProps = {
  mode: "create" | "edit";
  initialPalette?: PaletteUIModel;
};

export function PaletteForm({ mode, initialPalette }: PaletteFormProps) {
  const {
      register,
      handleSubmit,
      control,
      setError,
      setValue,
      reset,
      formState: { errors, isValid, isSubmitting },
    } = useForm<CreateSchema>({
      resolver: zodResolver(createSchema),
       defaultValues: {
        placeId: initialPalette?.place.id ?? "",
        memo: initialPalette?.memo ?? "",
        isDateEnabled: !!initialPalette?.captureDate,
        hasTime: initialPalette?.hasTime ?? false,
        date : initialPalette?.captureDate ? new Date(initialPalette.captureDate) : new Date()
      },
      mode: "onChange",
    })

  const { data: places = []} = usePlaces()
  const [open, setOpen] = useState(false);

  const isDateEnabled = useWatch({
    control,
    name: "isDateEnabled",
  });

  const hasTime = useWatch({
    control,
    name: "hasTime",
  });
  
  const options = places.map((place) => ({
    value: place.id,
    label: place.name,
  })); 

const router = useRouter();
const [isRestoring, setIsRestoring] = useState(false);
const queryClient = useQueryClient();
const createPalette = useAtomValue(createPaletteAtom);
const setCreatePalette = useSetAtom(createPaletteAtom);
const [selectedShape, setSelectedShape] = useState<ShapeType>(initialPalette?.shape || "grid");
const shape = mode === "create" ? createPalette.shape : selectedShape;
const colors = mode === "create" ? createPalette.colors : initialPalette?.colors ?? [];
const ShapeComponent = shapeMap[shape];

useEffect(() => {
  const saved = sessionStorage.getItem("pending-create");

  if (!saved) {
    return;
  }

  const restore = async () => {
    setIsRestoring(true);
    try {
      const pending: PendingCreateData = JSON.parse(saved);

      // Palette復元
      if (pending.palette) {
        setCreatePalette({
          shape: pending.palette.shape,
          colors: pending.palette.colors,
        });
      }

      // Place復元
      if (pending.placeName) {
        const result = await createPlace(pending.placeName);

        if (result.success) {
          queryClient.setQueryData<Place[]>(
            ["places"],
            (old = []) => {
              if (old.some((place) => place.id === result.place.id)) {
                return old;
              }
              return [...old, result.place];
            }
          );
          setValue("placeId", result.place.id, {
            shouldValidate: true,
            shouldDirty: true,
          });
        } else if (result.message === "その場所は既に登録されています") {
          
        } else {
          console.error(
            "場所の復元に失敗しました:",
            result.message
          );
        }
      }
      sessionStorage.removeItem("pending-create");
    } catch (error) {
      console.error(
        "ログイン後の作成状態復元に失敗しました",
        error
      );
    } finally {
      setIsRestoring(false);
    }
  };

  restore();
}, [
  queryClient,
  setCreatePalette,
  setValue,
]);

const mutation = useMutation<PaletteMutationResult, Error, PaletteRequest>({
    mutationFn: async (data) => {
      if (mode === "create") {
        return createColor(data as CreatePaletteRequest);
      }
      return editColor(data as EditPaletteRequest);
    },
    onSuccess: async (result) => {
      if (!result.success) {
        if (result.message === "ログインが必要です") {
          router.push(mode === "create"
          ? "/login?callbackUrl=/create"
          : `/login?callbackUrl=/mypage/${initialPalette?.id}/edit`);
                return;
        }
      setError("root", {
        type: "server",
        message: result.message,
      });
      return;
      }
      await queryClient.invalidateQueries({
        queryKey: ["palettes"],
      });

      toast.success(
        mode === "create"
          ? "パレットを保存しました"
          : "パレットを更新しました"
      );
      if (mode === "create") {
        reset();
        router.push("/");
      } else {
        router.push(`/mypage/${initialPalette?.id}`);
        router.refresh();
      }
    },
    onError: (error) => {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "予期しないエラーが発生しました。",
      });
    },
  });

const handleCreated = (place: Place) => {
    setValue("placeId", place.id);
};

const handleBeforeLogin = (placeName: string) => {
  const pending: PendingCreateData = {
    palette: {
      shape: createPalette.shape,
      colors: createPalette.colors,
    },
    placeName,
  };

  sessionStorage.setItem(
    "pending-create",
    JSON.stringify(pending)
  );
};

const isDisabled = mutation.isPending || isSubmitting || isRestoring;

const onSubmit = (data: CreateSchema) => {
  console.log("submit data:", data);
    if (mode === "create" && createPalette.colors.length === 0) {
      toast.error("ホームへ戻りカラーパレットを作成し直してください");
      return;
    }

    if (mode === "create") {
      mutation.mutate({
        ...data,
        shape: createPalette.shape,
        colors: createPalette.colors,
      });
      return;
    }

    if (!initialPalette) {
      return;
    }

    mutation.mutate({
      id: initialPalette.id,
      ...data,
      shape: selectedShape,
      colors: initialPalette.colors,
  });
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <IconLabel label="色彩" iconName="palette" htmlFor="colorData"/>
        <div className="flex justify-center items-center mx-auto w-full min-h-62 py-6 rounded-default bg-background-secondary">
        {isRestoring ? (
            <Spinner
              size={24}
              color="var(--color-border-disabled)"
            />
          ) : ShapeComponent ? (
            <div className="w-50">
              <ShapeComponent colorData={colors} />
            </div>
          ) : null
        }
        </div>
        {mode === "edit" && (
          <div className="mx-auto mt-5"><ShapeButton selectedShape={selectedShape} onShapeChange={setSelectedShape}/></div>
        )}
      </div>
      <div className="flex flex-col">
        <Controller
          control={control}
          name="placeId"
          rules={{ required: true }}
          render={({ field }) => (
            <Dropdown
              label="場所" 
              iconName="landscape_2" 
              options={options} 
              placeholder="選択してください"
              helperText="場所やカテゴリーを作成します"
              htmlFor="place"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button type="button" variant="Text" size="Small" onClick={() => setOpen(true)}>+ 新しい場所</Button>
        <CreatePlaceForm open={open} onOpenChange={setOpen} onCreated={handleCreated} onBeforeLogin={handleBeforeLogin}/>
      </div>
      <div className="w-full flex justify-between items-center">
          <IconLabel label="日付と時間" iconName="calendar_clock" htmlFor="date" helperText="日付と時間を残す場合はONにしてください"/>
          <Controller
            control={control}
            name="isDateEnabled"
            render={({ field }) => (
              <SwitchButton
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
      </div>
      {isDateEnabled && (
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DateTimePicker
              value={field.value}
              hasTime={hasTime}
              onChange={field.onChange}
              onHasTimeChange={(hasTime) =>
                setValue("hasTime", hasTime, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          )}
        />
      )}
      <div className="flex flex-col gap-2">
        <IconLabel label="メモ" iconName="edit_note" htmlFor="memo"/>
        <Textarea
          placeholder="メモを記入できます"
          {...register("memo")}
        />
      </div>
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
          loading={mutation.isPending}
          loadingText={mode === "create" ? "保存中..." : "更新中..."}
          disabled={!isValid || isDisabled}
        >
          {mode === "create" ? "作成" : "更新"}
        </Button>
      </div>
      </div>
    </div>
    </form>
  )
}