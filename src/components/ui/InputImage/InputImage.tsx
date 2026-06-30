// InputImage.tsx（1枚専用）
import { Dropzone } from "../Dropzone";
import { ImagePreview } from "../ImagePreview";
import { useState, useEffect } from "react";

export type InputImageProps = { 
  hasError?: boolean;
  width?: string;
  height?: string;
  onChange?: (file: File | null) => void;
}

export function InputImage({
  hasError,
  width = "368px",
  height = "284px",
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
    <div className="relative" style={{ width, height }}>
      
      {!file && (
      <Dropzone               
        onChange={handleDrop}
        error={hasError}
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