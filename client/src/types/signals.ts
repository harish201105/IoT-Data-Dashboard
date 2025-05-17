export interface Signal {
  signal: string;
  duration: string;
  status: string;
  timestamp?: string;
}

export interface SignalData {
  [key: string]: Signal;
}
