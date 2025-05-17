import { SignalData } from "@/types/signals";

const API_URL = "https://prayalabs.com/rest/api/iot";

export async function fetchSignalData(): Promise<SignalData> {
  try {
    const response = await fetch(API_URL);
    
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
