import { useQuery } from "@tanstack/react-query";
import { fetchSignalData } from "@/lib/api";
import { SignalData } from "@/types/signals";

export function useSignalData() {
  return useQuery<SignalData, string>({
    queryKey: ["iot-signals"],
    queryFn: async () => {
      try {
        return await fetchSignalData();
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "Failed to fetch signal data";
      }
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
