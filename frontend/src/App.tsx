import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-bg-primary"
    >
      <HomePage />
    </motion.div>
  );
}

export default App;