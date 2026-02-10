import { StepperContainer } from "../../components/stepper";
import { NameStep } from "../../components/stepper/NameStep";
import { BirthDateStep } from "../../components/stepper/BirthDateStep";
import { BirthTimeStep } from "../../components/stepper/BirthTimeStep";
import { BloodTypeStep } from "../../components/stepper/BloodTypeStep";
import { LocationStep } from "../../components/stepper/LocationStep";
import { useStepperStore } from "../../stores";
import type { StepperStep } from "../../common/types/stepper";

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
    id: "bloodtype",
    label: "Tipo de sangre",
    description: "Selecciona tu tipo de sangre",
    component: BloodTypeStep,
  },
  {
    id: "location",
    label: "Ubicación",
    description: "Selecciona tu lugar de nacimiento",
    component: LocationStep,
  },
];

export function HioxxPage() {
  const { data } = useStepperStore();

  const handleComplete = () => {
    console.log("Stepper completed with data:", data);
    const locationInfo = data.city
      ? `${data.city}, ${data.state}, ${data.country}`
      : "No especificada";
    const coordinatesInfo =
      data.latitude && data.longitude
        ? `\nCoordenadas: ${data.latitude.toFixed(4)}, ${data.longitude.toFixed(
            4
          )}`
        : "";
    alert(
      `¡Gracias ${data.fullName}!\n\nTu información ha sido registrada:\n\n` +
        `Fecha de nacimiento: ${data.birthDate}\n` +
        `Hora de nacimiento: ${data.birthTime}\n` +
        `Tipo de sangre: ${data.bloodType}\n` +
        `Ubicación: ${locationInfo}${coordinatesInfo}`
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <StepperContainer steps={steps} onComplete={handleComplete} />
    </div>
  );
}
