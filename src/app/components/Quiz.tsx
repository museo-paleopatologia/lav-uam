import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  image: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: QuizQuestion[] = [
  {
    question: '¿Qué patología ósea se observa en esta imagen?',
    image:
      'https://images.unsplash.com/photo-1776202176510-80871355f03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    options: ['Osteoporosis', 'Trepanación craneal', 'Artritis', 'Fractura curada'],
    correctAnswer: 1,
    explanation:
      'La trepanación craneal era una práctica quirúrgica antigua donde se perforaba el cráneo, posiblemente para aliviar presión intracraneal o por razones rituales.',
  },
  {
    question: 'Identifica la condición visible en estos restos',
    image:
      'https://images.unsplash.com/photo-1762331876061-fc3f84fd4469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    options: [
      'Desarrollo óseo normal',
      'Deformidad por malnutrición',
      'Trauma craneal',
      'Modificación cultural',
    ],
    correctAnswer: 2,
    explanation:
      'El trauma craneal en restos arqueológicos puede revelar información sobre violencia, accidentes o prácticas culturales en poblaciones antiguas.',
  },
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 shadow-lg text-center"
      >
        <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl text-[#2C1810] mb-4">
          ¡Quiz completado!
        </h3>
        <p style={{ fontFamily: 'var(--font-body)' }} className="text-2xl text-[#6B5D52] mb-6">
          Tu puntuación: {score} de {questions.length}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetQuiz}
          className="bg-[#C1440E] text-white px-8 py-3 hover:bg-[#A33A0C] transition-colors duration-300 flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={20} />
          Reintentar
        </motion.button>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 md:p-8 shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span style={{ fontFamily: 'var(--font-body)' }} className="text-sm text-[#6B5D52]">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span style={{ fontFamily: 'var(--font-body)' }} className="text-sm text-[#C1440E]">
            Puntuación: {score}
          </span>
        </div>
        <div className="w-full bg-[#E5DCC8] h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-[#C1440E]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <img
              src={question.image}
              alt="Imagen de patología"
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h3
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-2xl text-[#2C1810] mb-4"
            >
              {question.question}
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  whileHover={selectedAnswer === null ? { x: 4 } : {}}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 border-2 transition-all duration-300 ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                          ? 'border-[#C1440E] bg-[#FDF8F3]'
                          : 'border-[#D4C9B3] hover:border-[#C1440E]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="text-[#2C1810] flex-1"
                    >
                      {option}
                    </span>
                    {showCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                    {showIncorrect && <XCircle className="text-red-500" size={24} />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#F5F1E8] p-6 mb-6 border-l-4 border-[#C1440E]"
            >
              <h4
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-xl text-[#2C1810] mb-2"
              >
                Explicación
              </h4>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-[#6B5D52]">
                {question.explanation}
              </p>
            </motion.div>
          )}

          {showResult && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextQuestion}
              className="w-full bg-[#C1440E] text-white py-3 hover:bg-[#A33A0C] transition-colors duration-300"
            >
              {currentQuestion < questions.length - 1 ? 'Siguiente pregunta' : 'Ver resultados'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
