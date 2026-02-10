export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  component: React.ComponentType;
}

export interface StepperData {
  fullName: string;
  birthDate: string | null;
  birthTime: string | null;
  bloodType: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface StepperProps {
  steps: StepperStep[];
  onComplete?: (data: StepperData) => void;
}

export type StepStatus = "pending" | "active" | "completed";
