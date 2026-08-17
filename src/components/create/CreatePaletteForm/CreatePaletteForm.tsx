"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLabel } from "@/components/ui/IconLabel"
import { useAtomValue } from "jotai";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPaletteAtom } from "@/store/createPalette";
import { CreatePaletteState } from "@/store/createPalette";
import { createColor } from "./action";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
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

export type CreatePaletteRequest = CreateSchema & CreatePaletteState

export function CreatePaletteForm() {
  const {
      register,
      handleSubmit,
      control,
      setError,
      getValues,
      setValue,
      reset,
      formState: { errors, isValid, isSubmitting },
    } = useForm<CreateSchema>({
      resolver: zodResolver(createSchema),
       defaultValues: {
        placeId: "",
        isDateEnabled: false,
        date: new Date(),
        hasTime: false,
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
    defaultValue: false,
  });

  const options = places.map((place) => ({
    value: place.id,
    label: place.name,
  })); 

const router = useRouter();
const queryClient = useQueryClient();
const createPalette = useAtomValue(createPaletteAtom);
const ShapeComponent = shapeMap[createPalette.shape];

const mutation = useMutation({
    mutationFn: createColor,
    onSuccess: async (result) => {
      if (!result.success) {
        if (result.message === "ログインが必要です") {
          router.push("/login?callbackUrl=/create");
          return;
      }
      setError("root", {
        type: "server",
        message: result.message,
      });
      return;
      }
      await queryClient.invalidateQueries({
        queryKey: ["createPalette"],
      });

      reset();
      toast.success("パレットを保存しました");
      router.push("/");
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

const isDisabled = mutation.isPending || isSubmitting;

const onSubmit = (data: CreateSchema) => {
  /* test debug
  console.log("submit");
  console.log(data);
  console.log(createPalette);
  */
    if (createPalette.colors.length === 0) {
      toast.error("ホームへ戻りパレットを作成し直してください");
      return;
    }

    mutation.mutate({
    ...data,
    shape: createPalette.shape,
    colors: createPalette.colors,
  });
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <IconLabel label="色彩" iconName="palette" htmlFor="colorData"/>
        <div className="flex justify-center items-end mx-auto w-full h-auto py-6 rounded-default bg-background-secondary">
        {ShapeComponent && (
          <div className="w-50"><ShapeComponent colorData={createPalette.colors} /></div>
        )}
        </div>
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
        <Button variant="Text" size="Small" onClick={() => setOpen(true)}>+ 新しい場所</Button>
        <CreatePlaceForm open={open} onOpenChange={setOpen} onCreated={handleCreated}/>
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
          render={({ field }) => {
            console.log("CreatePaletteForm → DateTimePicker", {
              value: field.value,
              hasTime,
            });
            return (
            <DateTimePicker
              value={field.value}
              hasTime={hasTime}
              onChange={field.onChange}
              onHasTimeChange={(hasTime) =>{
                console.log("CreatePaletteForm onHasTimeChange:", hasTime);
              setValue("hasTime", hasTime, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            />
            );
          }}
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
          loadingText="送信中..."
          disabled={isDisabled}
        >
          作成
        </Button>
      </div>
      </div>
    </div>
    </form>
  )
}