import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    year: '3000 a.C.',
    title: 'Primeras trepanaciones',
    description:
      'Evidencia de cirugía craneal en culturas neolíticas, con tasas de supervivencia sorprendentes.',
  },
  {
    year: '1500 a.C.',
    title: 'Tuberculosis en Egipto',
    description:
      'Primeros registros de tuberculosis espinal (mal de Pott) en momias egipcias.',
  },
  {
    year: '430 a.C.',
    title: 'Plaga de Atenas',
    description: 'Devastadora epidemia que cambió el curso de la Guerra del Peloponeso.',
  },
  {
    year: '165 d.C.',
    title: 'Plaga Antonina',
    description: 'Posiblemente viruela o sarampión, diezmó el Imperio Romano.',
  },
  {
    year: '1347-1353',
    title: 'Peste Negra',
    description: 'La pandemia más letal de la historia europea, eliminó hasta el 60% de la población.',
  },
  {
    year: '1918-1920',
    title: 'Gripe Española',
    description: 'Infectó a 500 millones de personas, causando entre 50-100 millones de muertes.',
  },
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#D4C9B3]"></div>

      <div className="space-y-12">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`relative flex items-center ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div
                className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 pl-16 md:pl-0' : 'md:pl-12 pl-16 md:pr-0'}`}
              >
                <motion.div
                  animate={{
                    scale: activeIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white p-6 shadow-md border-l-4 ${
                    activeIndex === index ? 'border-[#C1440E]' : 'border-[#D4C9B3]'
                  } transition-all duration-300`}
                >
                  <span
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-xl text-[#C1440E] block mb-2"
                  >
                    {event.year}
                  </span>
                  <h3
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-2xl text-[#2C1810] mb-3"
                  >
                    {event.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)' }} className="text-[#6B5D52]">
                    {event.description}
                  </p>
                </motion.div>
              </div>

              {/* Center Dot */}
              <motion.div
                animate={{
                  scale: activeIndex === index ? 1.5 : 1,
                  backgroundColor: activeIndex === index ? '#C1440E' : '#D4C9B3',
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#F5F1E8] z-10"
              ></motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
