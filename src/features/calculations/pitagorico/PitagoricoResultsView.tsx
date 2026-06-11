import type { HioxxProfile } from "../core/types";
import type { PitagoricoResult } from "./pitagorico.engine";

interface Props {
  result: PitagoricoResult;
  profile: HioxxProfile;
}

export function PitagoricoResultsView({ result, profile }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 text-center">
      <h2 className="text-3xl font-light text-dark/80 step-title-font">
        Cálculo Pitagórico
      </h2>
      <p className="text-lg text-dark/60 font-light">
        Resultado para <span className="text-gold">{profile.fullName}</span>
      </p>
      <div className="p-8 bg-gold/5 rounded-lg border border-gold/20">
        <p className="text-dark/50 font-light">{result.message}</p>
      </div>
    </div>
  );
}
