type ListProps = {
  children: React.ReactNode;
};

export function List({
  children,
}: ListProps) {
  return (
    <ol className="list-decimal space-y-2 pl-6">
      {children}
    </ol>
  );
}