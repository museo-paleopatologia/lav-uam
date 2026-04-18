import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CaseCard } from './components/CaseCard';
import { CaseModal } from './components/CaseModal';
import { Quiz } from './components/Quiz';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { Microscope, BookOpen, Users, Download, FlaskConical } from 'lucide-react';

interface CaseData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  period: string;
  simpleExplanation: string;
  scientificExplanation: string;
  characteristics: string[];
}

const casesData: CaseData[] = [
  {
    id: 1,
    title: 'Trepanación Craneal',
    description:
      'Antigua práctica quirúrgica que consistía en perforar el cráneo, documentada en diversas culturas prehistóricas.',
    imageUrl:
      'https://images.unsplash.com/photo-1776202176510-80871355f03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    period: 'Neolítico - 3000 a.C.',
    simpleExplanation:
      'La trepanación es el acto de hacer un agujero en el cráneo. Nuestros ancestros realizaban esta cirugía, y sorprendentemente, muchos pacientes sobrevivían, como lo demuestra la curación ósea alrededor de las perforaciones.',
    scientificExplanation:
      'La trepanación craneal prehistórica muestra evidencia de osteogénesis reactiva perilesional, indicando supervivencia postoperatoria. Los análisis tafonómicos revelan técnicas de raspado, perforación y corte, sugiriendo conocimiento anatómico sofisticado y posible control de hemorragias.',
    characteristics: [
      'Bordes óseos redondeados indicando curación',
      'Ausencia de signos de infección en muchos casos',
      'Múltiples trepanaciones en algunos individuos',
      'Diámetros variables entre 2-7 cm',
      'Técnicas diferentes según la cultura: raspado, perforación, corte',
    ],
  },
  {
    id: 2,
    title: 'Artritis en Restos Antiguos',
    description:
      'Desgaste articular observable en esqueletos arqueológicos que revela patrones de actividad física y envejecimiento.',
    imageUrl:
      'https://images.unsplash.com/photo-1770119001890-32147fab8d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    period: 'Diversas épocas',
    simpleExplanation:
      'La artritis es el desgaste de las articulaciones que causa dolor y rigidez. En huesos antiguos podemos ver los cambios que produjo: hueso extra creciendo en los bordes de las articulaciones y superficies desgastadas.',
    scientificExplanation:
      'La osteoartritis arqueológica presenta osteofitos marginales, eburnación articular, y porosidad subcondral. El análisis distribucional permite inferir patrones ocupacionales, con mayor prevalencia en articulaciones que soportan carga: columna vertebral, rodillas y caderas.',
    characteristics: [
      'Formación de osteofitos (espolones óseos)',
      'Superficies articulares pulidas (eburnación)',
      'Porosidad y quistes subcondrales',
      'Deformación de la morfología articular',
      'Patrón asimétrico según uso ocupacional',
    ],
  },
  {
    id: 3,
    title: 'Tuberculosis Espinal (Mal de Pott)',
    description:
      'Infección tuberculosa de la columna vertebral que causa deformidades características visibles en restos óseos.',
    imageUrl:
      'https://images.unsplash.com/photo-1762331876061-fc3f84fd4469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    period: 'Desde 3000 a.C.',
    simpleExplanation:
      'El mal de Pott es tuberculosis que ataca la columna vertebral. Las bacterias destruyen las vértebras, causando que se colapsen y la espalda se curve hacia adelante, creando una joroba visible incluso en esqueletos antiguos.',
    scientificExplanation:
      'La espondilitis tuberculosa muestra colapso vertebral anterior con cifosis angular (giba), destrucción de discos intervertebrales, y formación de abscesos paravertebrales. El diagnóstico diferencial requiere excluir otras espondilodiscitis infecciosas mediante análisis morfológico y, cuando posible, aDNA.',
    characteristics: [
      'Cifosis angular pronunciada (deformidad en joroba)',
      'Colapso de cuerpos vertebrales anteriores',
      'Fusión de vértebras adyacentes',
      'Preservación de arcos vertebrales posteriores',
      'Posibles abscesos calcificados (abscesos fríos)',
    ],
  },
  {
    id: 4,
    title: 'Fracturas y Traumatismos',
    description:
      'Lesiones óseas por impacto o violencia que muestran cómo nuestros ancestros sobrevivían a heridas graves.',
    imageUrl:
      'https://images.unsplash.com/photo-1655389818095-3b1cdecd2447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    period: 'Todas las épocas',
    simpleExplanation:
      'Los huesos rotos sanan formando un callo óseo, como una "soldadura" natural. En esqueletos antiguos podemos ver estas fracturas curadas, demostrando que las personas sobrevivieron semanas o meses después del trauma.',
    scientificExplanation:
      'Las fracturas arqueológicas presentan remodelación ósea con formación de callo perióstico y endóstico. El grado de remodelación indica tiempo de supervivencia postfractura. La ubicación y patrón fractural permite inferir mecanismos: defensa (fracturas de Parry), caídas, o violencia interpersonal.',
    characteristics: [
      'Callo óseo indicando curación',
      'Desalineación o acortamiento del hueso',
      'Remodelación perióstica',
      'Fracturas de Parry (antebrazo) sugieren defensa',
      'Fracturas craneales deprimidas por impacto',
    ],
  },
];

export default function App() {
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [expandedInfo, setExpandedInfo] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Navbar />
      <Hero />

      {/* Section: What is Paleopathology */}
      <section id="que-es" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Microscope className="text-[#C1440E]" size={40} />
              <h2
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-4xl md:text-5xl text-[#2C1810]"
              >
                ¿Qué es la Paleopatología?
              </h2>
            </div>

            <div className="space-y-6">
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-lg md:text-xl text-[#6B5D52] leading-relaxed"
              >
                La paleopatología es la ciencia que estudia las enfermedades y lesiones en restos
                humanos antiguos. A través del análisis de huesos, momias y otros tejidos
                preservados, podemos reconstruir la historia médica de nuestros ancestros.
              </p>

              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-lg md:text-xl text-[#6B5D52] leading-relaxed"
              >
                Cada hueso cuenta una historia: fracturas que sanaron, infecciones que dejaron
                marcas permanentes, enfermedades degenerativas que afectaron la calidad de vida.
                Estas huellas nos permiten entender cómo vivían, trabajaban y morían las personas
                del pasado.
              </p>

              <div className="bg-white p-8 shadow-md border-l-4 border-[#C1440E] my-8">
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl text-[#2C1810] mb-4"
                >
                  Conceptos clave
                </h3>
                <ul className="space-y-3">
                  {[
                    'Analiza evidencia física en restos óseos y tejidos preservados',
                    'Combina arqueología, antropología física y medicina',
                    'Revela información sobre dieta, estilo de vida y condiciones de salud',
                    'Ayuda a entender la evolución de enfermedades a través del tiempo',
                    'Contribuye al conocimiento sobre prácticas médicas antiguas',
                  ].map((item, index) => (
                    <li
                      key={index}
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="flex items-start gap-3 text-[#6B5D52]"
                    >
                      <span className="flex-shrink-0 w-2 h-2 bg-[#C1440E] rounded-full mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {!expandedInfo && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedInfo(true)}
                  className="text-[#C1440E] hover:text-[#A33A0C] transition-colors duration-200 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Ver información técnica
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              )}

              {expandedInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-[#2C1810] text-[#E5DCC8] p-8 rounded"
                >
                  <h4
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-2xl text-white mb-4"
                  >
                    Perspectiva científica
                  </h4>
                  <p
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="leading-relaxed mb-4"
                  >
                    La paleopatología emplea metodologías interdisciplinarias que incluyen análisis
                    macroscópicos, radiográficos, histológicos y biomoleculares. La interpretación
                    diagnóstica requiere considerar procesos tafonómicos, diagnósticos diferenciales
                    y la naturaleza sesgada del registro bioarqueológico.
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)' }} className="leading-relaxed">
                    Los avances en tecnologías como la tomografía computarizada, el análisis de ADN
                    antiguo (aDNA) y la espectrometría de masas han revolucionado nuestra capacidad
                    para identificar patógenos específicos y reconstruir la carga de morbilidad en
                    poblaciones pasadas.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: Collection/Cases */}
      <section id="coleccion" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-4xl md:text-5xl text-[#2C1810] mb-6"
            >
              Colección de Casos
            </h2>
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-lg md:text-xl text-[#6B5D52] max-w-3xl mx-auto"
            >
              Explora ejemplos reales de patologías encontradas en restos arqueológicos. Cada caso
              revela historias fascinantes sobre la vida y la muerte en el pasado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {casesData.map((caseItem, index) => (
              <CaseCard
                key={caseItem.id}
                title={caseItem.title}
                description={caseItem.description}
                imageUrl={caseItem.imageUrl}
                period={caseItem.period}
                onClick={() => setSelectedCase(caseItem)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Interactive - Quiz & Timeline */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-4xl md:text-5xl text-[#2C1810] mb-6"
            >
              Aprende Interactivamente
            </h2>
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-lg md:text-xl text-[#6B5D52] max-w-3xl mx-auto"
            >
              Pon a prueba tus conocimientos y explora la cronología de las enfermedades en la
              historia humana
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-3xl text-[#2C1810] mb-6 flex items-center gap-3"
              >
                <FlaskConical className="text-[#C1440E]" size={32} />
                Quiz: ¿Qué patología es esta?
              </h3>
              <Quiz />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-3xl text-[#2C1810] mb-6"
              >
                Línea de tiempo: Enfermedades en la historia
              </h3>
              <Timeline />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Educational Resources */}
      <section id="recursos" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <BookOpen className="text-[#C1440E]" size={40} />
              <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl md:text-5xl text-[#2C1810]">
                Recursos Educativos
              </h2>
            </div>
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-lg md:text-xl text-[#6B5D52] max-w-3xl mx-auto"
            >
              Material didáctico para estudiantes y docentes interesados en la paleopatología
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Guías de estudio',
                description: 'Material estructurado para aprender los fundamentos de la paleopatología',
                icon: BookOpen,
              },
              {
                title: 'Atlas visual',
                description: 'Colección de imágenes comparativas de patologías óseas',
                icon: Microscope,
              },
              {
                title: 'Actividades didácticas',
                description: 'Ejercicios prácticos para aulas y talleres educativos',
                icon: Users,
              },
              {
                title: 'Material descargable',
                description: 'PDFs, infografías y recursos para uso educativo',
                icon: Download,
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-[#F5F1E8] p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <resource.icon
                  className="text-[#C1440E] mb-4 group-hover:scale-110 transition-transform duration-300"
                  size={48}
                />
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl text-[#2C1810] mb-3"
                >
                  {resource.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)' }} className="text-[#6B5D52]">
                  {resource.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: About the Project */}
      <section id="sobre" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Users className="text-[#C1440E]" size={40} />
              <h2
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-4xl md:text-5xl text-[#2C1810]"
              >
                Sobre el Proyecto
              </h2>
            </div>

            <div className="space-y-6">
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-lg md:text-xl text-[#6B5D52] leading-relaxed"
              >
                Este museo virtual nace de la necesidad de hacer accesible el fascinante mundo de
                la paleopatología a estudiantes, docentes y público general. Nuestro objetivo es
                transformar el conocimiento científico complejo en una experiencia educativa clara,
                visual e interactiva.
              </p>

              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-lg md:text-xl text-[#6B5D52] leading-relaxed"
              >
                A través de tecnología web moderna y diseño centrado en la accesibilidad, creamos
                un espacio donde la historia de la enfermedad humana cobra vida, revelando las
                conexiones entre el pasado y el presente de nuestra salud.
              </p>

              <div className="bg-white p-8 shadow-md mt-8">
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl text-[#2C1810] mb-6"
                >
                  Equipo y colaboradores
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-lg text-[#2C1810] font-medium mb-2"
                    >
                      Investigación y contenido
                    </h4>
                    <p style={{ fontFamily: 'var(--font-body)' }} className="text-[#6B5D52]">
                      Equipo interdisciplinario de arqueólogos, antropólogos físicos y
                      paleontólogos
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-lg text-[#2C1810] font-medium mb-2"
                    >
                      Contexto académico
                    </h4>
                    <p style={{ fontFamily: 'var(--font-body)' }} className="text-[#6B5D52]">
                      Proyecto educativo desarrollado con fines divulgativos y pedagógicos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Case Modal */}
      {selectedCase && (
        <CaseModal
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
          title={selectedCase.title}
          period={selectedCase.period}
          imageUrl={selectedCase.imageUrl}
          simpleExplanation={selectedCase.simpleExplanation}
          scientificExplanation={selectedCase.scientificExplanation}
          characteristics={selectedCase.characteristics}
        />
      )}
    </div>
  );
}