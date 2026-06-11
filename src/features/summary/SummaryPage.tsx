import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHioxxSessionStore } from "../../stores/hioxxSessionStore";
import { AppRoutes } from "../../common/enums";
import { formatDMS } from "../../utils/coordinates";
import { cn } from "../../utils/cn";

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-3 border-b border-gray-100">
      <span className="text-sm text-gray-400 font-light">{label}</span>
      <span className="text-base text-dark/70 font-light">{value}</span>
    </div>
  );
}

export function SummaryPage() {
  const navigate = useNavigate();
  const { profile, setPhase } = useHioxxSessionStore();

  const bloodDisplay =
    profile.bloodType === "OTRA"
      ? `OTRA (${profile.bloodTypeOther})`
      : profile.bloodType ?? "";

  const locationDisplay = [profile.city, profile.stateName, profile.countryName]
    .filter(Boolean)
    .join(", ");

  const coordsDisplay =
    profile.latitude !== null &&
    profile.latitude !== undefined &&
    profile.longitude !== null &&
    profile.longitude !== undefined
      ? `${formatDMS(profile.latitude, true)} / ${formatDMS(profile.longitude, false)}`
      : "No disponible";

  const handleContinue = () => {
    setPhase("calculation-select");
    navigate(AppRoutes.CALCULATION_SELECT);
  };

  const handleEdit = () => {
    setPhase("intake");
    navigate(AppRoutes.HOME);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(244,232,193,0.35) 50%, rgba(230,242,255,0.35) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <h1 className="text-3xl md:text-4xl text-center text-dark/80 font-light step-title-font mb-2">
          Resumen
        </h1>
        <p className="text-center text-gray-400 font-light mb-8">
          Verifica tu información antes de continuar
        </p>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-200/30 shadow-sm">
          <SummaryField label="Nombre completo" value={profile.fullName ?? ""} />
          <SummaryField label="Fecha de nacimiento" value={profile.birthDate ?? ""} />
          <SummaryField label="Hora de nacimiento" value={profile.birthTime ?? ""} />
          <SummaryField label="Lugar de nacimiento" value={locationDisplay} />
          <SummaryField label="Coordenadas" value={coordsDisplay} />
          <SummaryField label="Tipo de sangre" value={bloodDisplay} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleEdit}
            className={cn(
              "px-8 py-3 rounded-full text-sm font-light",
              "border border-gray-200/50 text-gray-500",
              "hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            )}
          >
            Editar datos
          </button>
          <button
            onClick={handleContinue}
            className={cn(
              "px-8 py-3 rounded-full text-sm font-light",
              "bg-gold/20 hover:bg-gold/30 text-gold",
              "transition-all duration-300 cursor-pointer"
            )}
          >
            Continuar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
