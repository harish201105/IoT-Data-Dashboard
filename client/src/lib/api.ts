import { SignalData } from "@/types/signals";

// Using a local server proxy to handle potential CORS issues
export async function fetchSignalData(): Promise<SignalData> {
  try {
    const response = await fetch("/api/iot");
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching signal data:", error);
    throw error;
  }
}
