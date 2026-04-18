import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  period: string;
  imageUrl: string;
  simpleExplanation: string;
  scientificExplanation: string;
  characteristics: string[];
}

export function CaseModal({
  isOpen,
  onClose,
  title,
  period,
  imageUrl,
  simpleExplanation,
  scientificExplanation,
  characteristics,
}: CaseModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2C1810]/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#F5F1E8] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white text-[#2C1810] p-2 rounded-full hover:bg-[#C1440E] hover:text-white transition-colors duration-300"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <div className="relative h-80 overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="mb-4">
              <span
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-sm tracking-wider uppercase text-[#C1440E]"
              >
                {period}
              </span>
            </div>

            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-4xl md:text-5xl text-[#2C1810] mb-8"
            >
              {title}
            </h2>

            <div className="space-y-8">
              {/* Simple Explanation */}
              <div>
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl text-[#2C1810] mb-4"
                >
                  ¿Qué es?
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-lg text-[#6B5D52] leading-relaxed"
                >
                  {simpleExplanation}
                </p>
              </div>

              {/* Characteristics */}
              <div>
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl text-[#2C1810] mb-4"
                >
                  Características observables
                </h3>
                <ul className="space-y-3">
                  {characteristics.map((char, index) => (
                    <li
                      key={index}
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="flex items-start gap-3 text-[#6B5D52]"
                    >
                      <span className="flex-shrink-0 w-2 h-2 bg-[#C1440E] rounded-full mt-2"></span>
                      <span className="leading-relaxed">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scientific Explanation */}
              <div className="bg-white p-6 border-l-4 border-[#C1440E]">
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-xl text-[#2C1810] mb-3"
                >
                  Explicación científica
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-body)' }}
                  className="text-[#6B5D52] leading-relaxed"
                >
                  {scientificExplanation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
