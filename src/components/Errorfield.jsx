import { motion } from "framer-motion";
import React from "react";

export const Errorfield = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <p data-error="error-textfield" className="error">{message}</p>
  </motion.div>
);
