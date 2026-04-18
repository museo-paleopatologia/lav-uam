import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToContent = () => {
    const element = document.querySelector('#que-es');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1776202176510-80871355f03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMHNrdWxsJTIwYXJjaGFlb2xvZ3klMjBhbmNpZW50fGVufDF8fHx8MTc3NjI2NzYxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cráneo arqueológico antiguo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1810]/70 via-[#2C1810]/50 to-[#F5F1E8]"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
          >
            Explora la historia de la enfermedad
            <br />
            <span className="text-[#E5DCC8]">en la humanidad</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-lg sm:text-xl md:text-2xl text-[#E5DCC8] mb-12 max-w-2xl mx-auto"
          >
            Un museo virtual interactivo que revela cómo las enfermedades han dejado
            su huella en los restos humanos a través de los siglos
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContent}
            style={{ fontFamily: 'var(--font-body)' }}
            className="bg-[#C1440E] text-white px-8 py-4 text-lg hover:bg-[#A33A0C] transition-colors duration-300 shadow-lg"
          >
            Explorar colección
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToContent}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span style={{ fontFamily: 'var(--font-body)' }} className="text-white text-sm">
              Descubre más
            </span>
            <ChevronDown size={24} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
