import { useNavigate } from "react-router-dom";
import {
  StepperContainer,
  NameStep,
  BirthDateStep,
  BirthTimeStep,
  BloodTypeStep,
  LocationStep,
} from "../../features/intake/components";
import { useStepperStore } from "../../features/intake/store/stepperStore";
import { useHioxxSessionStore } from "../../stores/hioxxSessionStore";
import { AppRoutes } from "../../common/enums";
import type { StepperStep } from "../../features/intake/types/stepper";

const steps: StepperStep[] = [
  {
    id: "name",
    label: "Nombre",
    description: "Ingresa tu nombre completo",
    component: NameStep,
  },
  {
    id: "birthdate",
    label: "Fecha",
    description: "Ingresa tu fecha de nacimiento",
    component: BirthDateStep,
  },
  {
    id: "birthtime",
    label: "Hora",
    description: "Ingresa tu hora de nacimiento",
    component: BirthTimeStep,
  },
  {
    id: "location",
    label: "Ubicación",
    description: "Selecciona tu lugar de nacimiento",
    component: LocationStep,
  },
  {
    id: "bloodtype",
    label: "Tipo de sangre",
    description: "Selecciona tu tipo de sangre",
    component: BloodTypeStep,
  },
];

export function IntakePage() {
  const navigate = useNavigate();
  const { data } = useStepperStore();
  const { setProfileFromStepper } = useHioxxSessionStore();

  const handleComplete = () => {
    const success = setProfileFromStepper(data);
    if (success) {
      navigate(AppRoutes.SUMMARY);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <StepperContainer steps={steps} onComplete={handleComplete} />
    </div>
  );
}
