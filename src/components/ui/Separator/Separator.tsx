interface SeparatorProps {
  children?: React.ReactNode
}

export function Separator({ children }: SeparatorProps) {
  const margin = children ? '0.5em' : '0'

  return (
    <div className="w-full flex items-center text-xs text-text-placeholder">
      {/* 左の線 */}
      <div
        className="flex-1 border border-disabled"
        style={{ marginRight: margin }}
      />
      {/* 中央の文字 */}
      {children && <span>{children}</span>}
      {/* 右の線 */}
      <div
        className="flex-1 border border-disabled"
        style={{ marginLeft: margin }}
      />
    </div>
  )
}