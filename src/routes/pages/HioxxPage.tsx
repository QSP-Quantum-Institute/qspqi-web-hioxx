import { StepperContainer } from "../../components/stepper";
import { NameStep } from "../../components/stepper/NameStep";
import { BirthDateStep } from "../../components/stepper/BirthDateStep";
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
];

export function HioxxPage() {
  const { data } = useStepperStore();

  const handleComplete = () => {
    console.log("Stepper completed with data:", data);
    // Aquí puedes agregar la lógica para procesar los datos
    // Por ejemplo, enviar a una API, mostrar resultados, etc.
    alert(
      `¡Gracias ${data.fullName}! Tu información ha sido registrada. Fecha: ${data.birthDate}`
    );
    // reset(); // Opcional: resetear el stepper
  };

  return (
    <div className="min-h-screen bg-white">
      <StepperContainer steps={steps} onComplete={handleComplete} />
    </div>
  );
}
