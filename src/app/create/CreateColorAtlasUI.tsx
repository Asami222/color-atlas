"use client";

import { IconLabel } from "@/components/ui/IconLabel"
import { useAtomValue } from "jotai";
import { createPaletteAtom } from "@/store/createPalette";
import { Dropdown } from "@/components/ui/Dropdown";
import { 
  DynamicColorGrid, 
  DynamicHorizontalStripe, 
  DynamicRadial, 
  DynamicColorTriangle, 
  DynamicColorChip
} from "@/components/ShapeStyle";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Place } from "@/components/Place/CreatePlaceForm";
import { CreatePlaceForm } from "@/components/Place/CreatePlaceForm";
import { usePlaces } from "@/components/Place/hooks/usePlaces"

export function CreateColorAtlasUI() {
  const { data: places = []} = usePlaces()
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('')

  const options = places.map((place) => ({
    value: place.id,
    label: place.name,
  })); 

const createPalette = useAtomValue(createPaletteAtom);
const handleCreated = (place: Place) => {
    setSelectedPlace(place.id);
};

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-8">
        <IconLabel label="色彩" iconName="palette"/>
        <div className="flex justify-center items-end mx-auto w-full h-48 rounded-default bg-background-secondary">
        { createPalette.shape === "column" && <DynamicHorizontalStripe colorData={createPalette.colors}/> }
        { createPalette.shape === "grid" && <DynamicColorGrid colorData={createPalette.colors} /> }
        { createPalette.shape === "chips" && <DynamicColorChip colorData={createPalette.colors} /> }
        { createPalette.shape === "circle" && < DynamicRadial colorData={createPalette.colors} /> }
        { createPalette.shape === "triangle" && <DynamicColorTriangle colorData={createPalette.colors}/> }
        </div>
      </div>
      <div className="flex flex-col">
        <Dropdown label="場所" iconName="landscape_2" options={options} value={selectedPlace} onChange={setSelectedPlace} placeholder="選択してください"/>
        <Button variant="Text" size="Small" onClick={() => setOpen(true)}>+ 新しい場所</Button>
        <CreatePlaceForm open={open} onOpenChange={setOpen} onCreated={handleCreated}/>
      </div>
    </div>
  )
}