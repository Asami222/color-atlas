type HeadingProps = {
  level: 1 | 2 | 3;
  children: React.ReactNode;
};

export function Heading({
  level,
  children,
}: HeadingProps) {
  switch (level) {
    case 1:
      return (
        <h1 className="text-4xl font-bold text-center">
          {children}
        </h1>
      );

    case 2:
      return (
        <h2 className="mt-12 text-2xl font-semibold">
          {children}
        </h2>
      );

    default:
      return (
        <h3 className="text-xl font-medium">
          {children}
        </h3>
      );
  }
}