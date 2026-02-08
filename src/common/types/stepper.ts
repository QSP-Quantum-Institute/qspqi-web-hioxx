export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  component: React.ComponentType;
}

export interface StepperData {
  fullName: string;
  birthDate: string | null;
}

export interface StepperProps {
  steps: StepperStep[];
  onComplete?: (data: StepperData) => void;
}

export type StepStatus = "pending" | "active" | "completed";
