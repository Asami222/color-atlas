"use client";

import { useEffect, useState } from "react";
import{ Error } from "@/components/layout/Error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    setIsLoading(true);
    reset();
  };

    return (
      <div>
        <Error onClick={handleReset} isLoading={isLoading} />
      </div>
  );
}