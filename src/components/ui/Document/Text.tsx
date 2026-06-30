type TextProps = {
  pattern?: 1 | 2
  children: React.ReactNode;
};

export function Text({ children, pattern = 1 }: TextProps) {
    switch (pattern) {
      case 1:
        return (
           <p className="leading-8 text-orange-950">
            {children}
           </p>
        )
      case 2:
        return (
          <p className="leading-8 text-orange-950 text-center">
            {children}
          </p>
        )
    }
}