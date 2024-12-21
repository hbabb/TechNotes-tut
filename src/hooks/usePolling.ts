import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function usePolling(searchParam: string | null, ms = 60000) {
  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("interval running");
      if (!searchParam) {
        console.log("refreshing data");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);
  }, [searchParam, ms]); // eslint-disable-line react-hooks/exhaustive-deps
}
