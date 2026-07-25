type AuthPageProps = {
  title?: string;
  helperText?: string;
  children: React.ReactNode;
};

export function AuthPage({ title, helperText, children }: AuthPageProps) {
  return (
    <>
      {title && (
        <div className="mb-9">
          <h1 className="text-center text-xl font-bold">
            {title}
          </h1>
        
          {helperText && <p className="text-left text-sm text-neutral-700 mt-4">{helperText}</p>}
        </div>
      )}
      {children}
    </>
  );
}