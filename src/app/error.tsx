"use client";

import { useEffect } from "react";
import { ServerErrorScene } from "@/components/server-error-scene";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime error to console for diagnostics
    console.error("Runtime server/application error:", error);
  }, [error]);

  return <ServerErrorScene reset={reset} />;
}
