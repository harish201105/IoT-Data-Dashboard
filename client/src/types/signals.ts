export interface Signal {
  signal: string;
  duration: string;
  status: string;
}

export interface SignalData {
  [key: string]: Signal;
}
