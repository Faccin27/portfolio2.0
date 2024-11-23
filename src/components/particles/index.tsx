import { loadFull } from "tsparticles";
import { Container, Engine } from "tsparticles-engine";
import TsParticles from "react-tsparticles";
import json from "./particles.json";

export interface ParticlesProps {
  isLoaded?: () => void;
}

export const Particles = ({ isLoaded }: ParticlesProps) => {
  const config = { ...json }; // Mantém `config` imutável e evita alterar diretamente o arquivo importado

  if (typeof window !== "undefined" && window.innerWidth < 600) {
    config.particles.number.value = 30;
  }

  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

const particlesLoaded = async (_container?: Container): Promise<void> => {
  if (isLoaded) {
    isLoaded();
  }
};


  return (
    <TsParticles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={config as any}
    />
  );
};
