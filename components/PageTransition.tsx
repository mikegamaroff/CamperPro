import { motion } from "framer-motion";
import React from "react";
export const PageTransition: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};
