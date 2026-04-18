import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CaseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  period: string;
  onClick: () => void;
  index: number;
}

export function CaseCard({ title, description, imageUrl, period, onClick, index }: CaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={onClick}
      className="group cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-[#C1440E] text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
            <ArrowRight size={24} />
          </div>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-xs tracking-wider uppercase text-[#C1440E]"
          >
            {period}
          </span>
        </div>

        <h3
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-2xl text-[#2C1810] mb-3 group-hover:text-[#C1440E] transition-colors duration-300"
        >
          {title}
        </h3>

        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-[#6B5D52] leading-relaxed line-clamp-3"
        >
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-[#C1440E] group-hover:gap-4 transition-all duration-300">
          <span style={{ fontFamily: 'var(--font-body)' }} className="text-sm">
            Ver detalles
          </span>
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
