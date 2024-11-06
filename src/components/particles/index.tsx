import { loadFull } from "tsparticles";
import { Container, Engine } from "tsparticles-engine";
import TsParticles from "react-tsparticles";
import json from "./particles.json";

export interface ParticlesProps {
  isLoaded?: () => void;
}

export const Particles = ({ isLoaded }: ParticlesProps) => {
  let config = json;

  if (typeof window !== "undefined") {
    // detect window screen width function
    if (window.innerWidth < 600) {
      config.particles.number.value = 30;
    }
  }

  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  const particlesLoaded = async (_: Container | undefined) => {
    isLoaded && isLoaded();
  };

  return (
    <>
      <TsParticles
        id={"tsparticles"}
        init={particlesInit}
        loaded={particlesLoaded}
        options={config as any}
      />
    </>
  );
};
