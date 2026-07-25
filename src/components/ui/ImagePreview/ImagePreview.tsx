import clsx from "clsx"
import Image from 'next/image'
import { Icon } from '../Icon'

type CloseBoxProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function CloseBox({children, ...rest}: CloseBoxProps) {
  return (
    <button 
      type="button" 
      aria-label="閉じる" 
      {...rest} 
      className={clsx(
        'flex items-center justify-center absolute -top-2 -right-2 w-8 h-8',
        'rounded-default cursor-pointer',
        'bg-secondary border border-border-secondary',
        'enabled:hover:bg-primary-hover'
      )}
    >
      {children}
    </button>
  )
}

export type ImagePreviewProps = {
  src: string
  alt?: string
  sizes?: string
  className?: string
  onRemove?: () => void
}

export function ImagePreview ({
  src,
  alt,
  sizes = "100vw",
  className,
  onRemove,
}: ImagePreviewProps) {

  // 閉じるボタンを押したらonRemoveを呼ぶ
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove?.();
  }

  console.log("ImagePreview", src, alt, sizes, className, onRemove)
  return (
    <>
      <div className={clsx('relative w-full h-full',className)}>
        <Image
          quality={75}
          src={src}
          alt={alt ?? "イメージ"}
          sizes={sizes}
          fill
          style={{objectFit: "contain", objectPosition: '50% 50%'}}
        />
        <CloseBox onClick={handleCloseClick}>
          <Icon name="close_small"/>
        </CloseBox>
      </div>
    </>
  )
}