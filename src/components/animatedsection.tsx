"use client"

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight";
}

export default function AnimatedSection({ children, className = "", animation = "fadeUp" }: AnimatedSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const variants = {
    fadeUp: {
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 50 }
    },
    fadeDown: {
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: -50 }
    },
    fadeLeft: {
      visible: { opacity: 1, x: 0 },
      hidden: { opacity: 0, x: 50 }
    },
    fadeRight: {
      visible: { opacity: 1, x: 0 },
      hidden: { opacity: 0, x: -50 }
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={variants[animation]}
      className={className}
    >
      {children}
    </motion.div>
  );
}