"use client";

import clsx from "clsx"
import { Dropzone } from "../Dropzone";
import { ImagePreview } from "../ImagePreview";
import { useState, useEffect } from "react";

export type InputImageProps = { 
  hasError?: boolean;
  className?: string;
  onChange?: (file: File | null) => void;
}

export function InputImage({
  hasError,
  className,
  onChange,
}: InputImageProps) {

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();

  // Dropzone のファイル受取
  const handleDrop = (newFile: File | null) => {
    console.log("file", newFile);
    if (!newFile) return;

    const url = URL.createObjectURL(newFile);

    setFile(newFile);
    setPreviewUrl(url);

    onChange?.(newFile);
    };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(undefined);

    onChange?.(null);
  };

   // 外から渡される image が更新されたら反映
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={clsx("relative mx-auto max-w-104 max-h-78", className)} >
      {!file && (
      <Dropzone               
        onChange={handleDrop}
        error={hasError}
        disabled={false}
        className="w-full"
      />
      )}

      {/* プレビュー */}
     {previewUrl && (
      <ImagePreview
        src={previewUrl}
        onRemove={handleRemove}
      />
     )}
    </div>
  );
}

//親コンポーネント使用例
/*

<InputImage
  onChange={async (file) => {
    if (!file) {
      setPalette([]);
      return;
    }

    const palette = await generatePalette(file);

    setPalette(palette);
  }}
/>

*/