"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Code,
  Database,
  Layout,
  Monitor,
  Server,
  ChevronRight,
  RefreshCw,
  Cpu,
  Palette,
  Layers,
  Globe,
  Lock,
  Zap,
  Award,
  Share2,
  Book,
  Timer,
  Info,
  ArrowLeft,
  MessageSquare,
  PieChart,
  BarChart,
  Download,
  FileText,
  Github,
  Coffee,
  Circle,
  Brain,
  Heart,
} from "lucide-react";

type Question = {
  id: number;
  text: string;
  tooltip?: string;
  category?: "preferences" | "skills" | "mindset" | "challenges";
  options: {
    text: string;
    value: "frontend" | "backend";
    icon: React.ReactNode;
  }[];
};

type Result = {
  type: "frontend" | "backend" | "fullstack";
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  careerPaths: string[];
  learningResources: {
    title: string;
    url: string;
  }[];
  strengths: string[];
  challenges: string[];
};

type AnswerData = {
  frontend: number;
  backend: number;
};

type CategoryBreakdown = {
  [key: string]: {
    frontend: number;
    backend: number;
    total: number;
  };
};

interface DevIconProps {
    type: string;
  }

export default function DevQuiz({
  isDarkMode,
  playHoverSound,
  playClickSound,
}: {
  isDarkMode: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: "frontend" | "backend";
  }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [animateQuestion, setAnimateQuestion] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerBreakdown, setAnswerBreakdown] = useState<AnswerData>({
    frontend: 0,
    backend: 0,
  });
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown>(
    {}
  );
  const [showResultDetails, setShowResultDetails] = useState<string | null>(
    null
  );
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);


  const questions: Question[] = [
    {
      id: 1,
      text: "Quando você visita um site, o que chama mais sua atenção?",
      tooltip:
        "Esta pergunta avalia sua preferência inicial ao interagir com produtos digitais.",
      category: "preferences",
      options: [
        {
          text: "O design e a experiência do usuário",
          value: "frontend",
          icon: <Layout className="h-5 w-5" />,
        },
        {
          text: "Como o site funciona e processa dados",
          value: "backend",
          icon: <Server className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 2,
      text: "O que você prefere criar?",
      tooltip: "Sua resposta indica sua orientação criativa.",
      category: "preferences",
      options: [
        {
          text: "Interfaces interativas e responsivas",
          value: "frontend",
          icon: <Monitor className="h-5 w-5" />,
        },
        {
          text: "Sistemas e APIs robustas",
          value: "backend",
          icon: <Database className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 3,
      text: "Qual desafio parece mais interessante?",
      tooltip:
        "Esta questão revela que tipo de problema você prefere resolver.",
      category: "challenges",
      options: [
        {
          text: "Criar uma animação complexa que impressione os usuários",
          value: "frontend",
          icon: <Palette className="h-5 w-5" />,
        },
        {
          text: "Otimizar um algoritmo para processar dados mais rapidamente",
          value: "backend",
          icon: <Cpu className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 4,
      text: "O que você prefere estudar?",
      tooltip:
        "Suas preferências de aprendizado podem indicar sua orientação técnica.",
      category: "skills",
      options: [
        {
          text: "CSS, React e técnicas de design",
          value: "frontend",
          icon: <Layers className="h-5 w-5" />,
        },
        {
          text: "Algoritmos, estruturas de dados e bancos de dados",
          value: "backend",
          icon: <Code className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 5,
      text: "Qual aspecto do desenvolvimento é mais importante para você?",
      tooltip:
        "Esta pergunta identifica seus valores principais como desenvolvedor.",
      category: "mindset",
      options: [
        {
          text: "Acessibilidade e experiência do usuário",
          value: "frontend",
          icon: <Globe className="h-5 w-5" />,
        },
        {
          text: "Segurança e performance",
          value: "backend",
          icon: <Lock className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 6,
      text: "Como você prefere resolver problemas?",
      tooltip:
        "Seu estilo de resolução de problemas pode se alinhar melhor com diferentes áreas.",
      category: "mindset",
      options: [
        {
          text: "Experimentando visualmente e recebendo feedback imediato",
          value: "frontend",
          icon:           <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>,
        },
        {
          text: "Analisando logicamente e planejando uma solução estruturada",
          value: "backend",
          icon: <Brain className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 7,
      text: "Qual aspecto técnico você acha mais satisfatório?",
      tooltip:
        "Esta questão explora o que traz satisfação profissional para você.",
      category: "preferences",
      options: [
        {
          text: "Ver elementos visuais tomando forma e interagindo",
          value: "frontend",
          icon: <Heart className="h-5 w-5" />,
        },
        {
          text: "Criar sistemas eficientes que processam dados rapidamente",
          value: "backend",
          icon: <Zap className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 8,
      text: "O que você faria primeiro em um novo projeto?",
      tooltip:
        "Sua abordagem inicial revela suas prioridades de desenvolvimento.",
      category: "mindset",
      options: [
        {
          text: "Esboçar a interface e pensar na jornada do usuário",
          value: "frontend",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          text: "Definir a arquitetura e modelar os dados",
          value: "backend",
          icon: <Database className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 9,
      text: "Qual desafio você prefere enfrentar?",
      tooltip:
        "Os problemas que você gosta de resolver indicam sua orientação técnica.",
      category: "challenges",
      options: [
        {
          text: "Garantir que um site funcione bem em todos os dispositivos",
          value: "frontend",
          icon: <Monitor className="h-5 w-5" />,
        },
        {
          text: "Otimizar consultas ao banco de dados para melhor desempenho",
          value: "backend",
          icon: <Cpu className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 10,
      text: "Qual habilidade você valoriza mais em si mesmo?",
      tooltip:
        "Suas habilidades naturais podem indicar onde você terá mais sucesso.",
      category: "skills",
      options: [
        {
          text: "Criatividade e sensibilidade visual",
          value: "frontend",
          icon: <Palette className="h-5 w-5" />,
        },
        {
          text: "Pensamento analítico e resolução lógica de problemas",
          value: "backend",
          icon: <Code className="h-5 w-5" />,
        },
      ],
    },
  ];

  const results: { [key: string]: Result } = {
    frontend: {
      type: "frontend",
      title: "Desenvolvedor Front-end",
      description:
        "Você tem uma forte inclinação para o desenvolvimento front-end! Sua paixão está em criar interfaces bonitas e experiências de usuário incríveis. Sua mentalidade criativa e orientada ao usuário são qualidades valiosas neste campo.",
      icon: <Monitor className="h-12 w-12" />,
      skills: [
        "HTML/CSS/JavaScript",
        "React/Vue/Angular/Svelte",
        "Design Responsivo",
        "UI/UX Design",
        "Animações e Microinterações",
        "Acessibilidade",
        "TypeScript",
        "Pré-processadores CSS",
      ],
      careerPaths: [
        "Desenvolvedor Front-end",
        "Desenvolvedor React/Angular/Vue",
        "Engenheiro de UI",
        "Especialista em UX/UI",
        "Desenvolvedor Web",
      ],
      learningResources: [
        { title: "Frontend Masters", url: "https://frontendmasters.com" },
        { title: "CSS Tricks", url: "https://css-tricks.com" },
        { title: "Smashing Magazine", url: "https://www.smashingmagazine.com" },
        { title: "React Documentation", url: "https://reactjs.org" },
      ],
      strengths: [
        "Habilidade de criar interfaces atraentes e funcionais",
        "Foco na experiência do usuário",
        "Criatividade visual e atenção aos detalhes",
        "Capacidade de traduzir designs em código",
        "Preocupação com acessibilidade e usabilidade",
      ],
      challenges: [
        "Manter-se atualizado com frameworks e ferramentas em rápida evolução",
        "Lidar com compatibilidade entre navegadores",
        "Balancear estética com desempenho",
        "Implementar designs responsivos para diversos dispositivos",
      ],
    },
    backend: {
      type: "backend",
      title: "Desenvolvedor Back-end",
      description:
        "Você tem uma forte inclinação para o desenvolvimento back-end! Sua paixão está em construir sistemas robustos e lidar com a lógica por trás das aplicações. Seu pensamento analítico e foco em eficiência são ativos valiosos neste campo.",
      icon: <Server className="h-12 w-12" />,
      skills: [
        "Node.js/Python/Java/Go/C#",
        "SQL e NoSQL Databases",
        "APIs RESTful e GraphQL",
        "Arquitetura de Sistemas",
        "Segurança e Autenticação",
        "Microserviços",
        "Serverless",
        "Message Queues",
      ],
      careerPaths: [
        "Desenvolvedor Back-end",
        "Engenheiro de API",
        "Engenheiro de Sistemas",
        "Arquiteto de Software",
        "Engenheiro de Dados",
      ],
      learningResources: [
        { title: "Backend Masters", url: "https://backendmasters.com" },
        {
          title: "System Design Primer",
          url: "https://github.com/donnemartin/system-design-primer",
        },
        {
          title: "Database Design",
          url: "https://www.postgresql.org/docs/current/tutorial.html",
        },
        { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
      ],
      strengths: [
        "Habilidade para projetar sistemas escaláveis e robustos",
        "Foco na segurança e integridade dos dados",
        "Pensamento analítico e resolução de problemas complexos",
        "Capacidade de otimização para melhor desempenho",
        "Compreensão de arquiteturas de sistema",
      ],
      challenges: [
        "Projetar sistemas que escalam adequadamente",
        "Manter a segurança contra ameaças em evolução",
        "Gerenciar o desempenho com volumes crescentes de dados",
        "Equilibrar novas funcionalidades com estabilidade do sistema",
      ],
    },
    fullstack: {
      type: "fullstack",
      title: "Desenvolvedor Full-stack",
      description:
        "Você tem um equilíbrio entre front-end e back-end! Sua versatilidade permite que você trabalhe em todas as camadas de uma aplicação, o que é extremamente valioso para equipes de desenvolvimento modernas.",
      icon: <Zap className="h-12 w-12" />,
      skills: [
        "JavaScript/TypeScript",
        "React/Vue/Angular + Node.js/Python/Java",
        "SQL e NoSQL Databases",
        "API Design",
        "UI/UX Básico",
        "Arquitetura de Aplicações Web",
        "DevOps Básico",
        "Gestão de Estado",
      ],
      careerPaths: [
        "Desenvolvedor Full-stack",
        "Engenheiro de Software",
        "Tech Lead",
        "CTO em Startups",
        "Consultor de Tecnologia",
      ],
      learningResources: [
        { title: "The Odin Project", url: "https://www.theodinproject.com" },
        { title: "Full Stack Open", url: "https://fullstackopen.com/en/" },
        { title: "JavaScript.Info", url: "https://javascript.info" },
        { title: "freeCodeCamp", url: "https://www.freecodecamp.org" },
      ],
      strengths: [
        "Versatilidade para trabalhar em diferentes partes de um projeto",
        "Compreensão mais ampla do ciclo de desenvolvimento completo",
        "Capacidade de construir MVPs (produtos mínimos viáveis) sozinho",
        "Facilidade de comunicação entre equipes especializadas",
        "Visão holística do produto",
      ],
      challenges: [
        "Manter-se atualizado em múltiplas áreas de tecnologia",
        "Evitar ser generalista demais sem especialização",
        "Equilibrar as demandas de duas áreas distintas",
        "Gerenciar o tempo entre frentes diversas de trabalho",
      ],
    },
  };

  
  // Componente SVG para representar um desenvolvedor
  const DevIcon = ({ type }: DevIconProps) => {
    return (
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center ${
          type === "frontend"
            ? "bg-gradient-to-br from-pink-500 to-orange-400"
            : type === "backend"
            ? "bg-gradient-to-br from-blue-500 to-cyan-400"
            : "bg-gradient-to-br from-purple-500 to-indigo-500"
        }`}
      >
        {type === "frontend" ? (
          <Layout className="h-10 w-10 text-white" />
        ) : type === "backend" ? (
          <Server className="h-10 w-10 text-white" />
        ) : (
          <Zap className="h-10 w-10 text-white" />
        )}
      </div>
    );
  };

  // Função para iniciar o quiz
  const startQuiz = () => {
    playClickSound();
    setShowIntro(false);
    setQuizStarted(true);
    setQuizStartTime(Date.now());
  };

  const handleAnswer = (value: "frontend" | "backend") => {
    playClickSound();

    setAnimateQuestion(false);

    // Atualiza as respostas
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    // Aguarda a animação de saída
    setTimeout(() => {
      // Se for a última pergunta, mostra o resultado
      if (currentQuestion === questions.length - 1) {
        calculateResult(newAnswers);
      } else {
        // Avança para a próxima pergunta
        setCurrentQuestion(currentQuestion + 1);
        setAnimateQuestion(true);
      }
    }, 300);
  };

  const calculateResult = (finalAnswers: {
    [key: number]: "frontend" | "backend";
  }) => {
    let frontendCount = 0;
    let backendCount = 0;
    const categoryStats: CategoryBreakdown = {};

    // Inicializa as estatísticas por categoria
    questions.forEach((q) => {
      if (q.category) {
        if (!categoryStats[q.category]) {
          categoryStats[q.category] = { frontend: 0, backend: 0, total: 0 };
        }
      }
    });

    // Conta as respostas
    Object.entries(finalAnswers).forEach(([questionIndex, answer]) => {
      const questionId = parseInt(questionIndex);
      const question = questions[questionId];

      if (answer === "frontend") frontendCount++;
      else backendCount++;

      // Atualiza estatísticas por categoria
      if (question.category) {
        categoryStats[question.category][answer]++;
        categoryStats[question.category].total++;
      }
    });

    // Determina o resultado
    let resultType: "frontend" | "backend" | "fullstack";

    if (Math.abs(frontendCount - backendCount) <= 1) {
      resultType = "fullstack";
    } else if (frontendCount > backendCount) {
      resultType = "frontend";
    } else {
      resultType = "backend";
    }

    setAnswerBreakdown({ frontend: frontendCount, backend: backendCount });
    setCategoryBreakdown(categoryStats);
    setResult(results[resultType]);
    setShowResult(true);
    setQuizCompleted(true);
    setQuizEndTime(Date.now());
  };

  const resetQuiz = () => {
    playClickSound();
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setShowResultDetails(null);
    setResult(null);
    setAnimateQuestion(true);
    setQuizStartTime(Date.now());
  };

  const shareResult = () => {
    if (result) {
      const shareText = `Fiz o Quiz de Desenvolvimento e descobri que sou um ${result.title}! #DevQuiz`;



      alert("Compartilhamento: " + shareText);
      alert("Implementar a função")
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  // Calcula o tempo para completar o quiz
  const getQuizDuration = () => {
    if (quizStartTime && quizEndTime) {
      const durationSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
      const minutes = Math.floor(durationSeconds / 60);
      const seconds = durationSeconds % 60;
      return `${minutes}m ${seconds}s`;
    }
    return "N/A";
  };

  // Renderiza o componente de introdução do quiz
  const renderIntro = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-32 h-32 rounded-full border-4 border-dashed border-opacity-30"
                style={{ borderColor: isDarkMode ? "#6366f1" : "#818cf8" }}
              />
            </div>

            <div className="flex space-x-4 relative z-10">
              <DevIcon type="frontend" />
              <DevIcon type="backend" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">Front-end ou Back-end?</h2>

        <p
          className={`text-lg mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Descubra qual área de desenvolvimento combina mais com o seu perfil
          através deste quiz de {questions.length} perguntas.
        </p>

        <div
          className={`p-4 rounded-lg mb-8 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h3 className="font-medium mb-3 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Como funciona?
          </h3>
          <ul
            className={`text-left text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <li className="mb-2">
              • Responda {questions.length} perguntas sobre suas preferências e
              habilidades
            </li>
            <li className="mb-2">
              • Obtenha uma análise detalhada do seu perfil técnico
            </li>
            <li className="mb-2">
              • Descubra recursos de aprendizado recomendados para sua área
            </li>
            <li>• Compartilhe seus resultados com amigos ou colegas</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startQuiz}
          className={`px-8 py-4 rounded-lg font-medium flex items-center justify-center mx-auto ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          onMouseEnter={playHoverSound}
        >
          Iniciar Quiz
          <ChevronRight className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.div>
    );
  };

  // Renderiza o componente de pergunta do quiz
  const renderQuiz = () => {
    return (
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span>
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div
            className={`h-2 w-full rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <motion.div
              className="h-full rounded-full bg-blue-500"
              initial={{
                width: `${(currentQuestion / questions.length) * 100}%`,
              }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: animateQuestion ? 1 : 0,
            y: animateQuestion ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-medium">
              {questions[currentQuestion].text}
            </h3>
            {questions[currentQuestion].tooltip && (
              <div className="relative ml-2">
                <button
                  onMouseEnter={() => {
                    playHoverSound();
                    setShowTooltip(true);
                  }}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                  className={`p-1 rounded-full ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <Info className="h-4 w-4 text-gray-400" />
                </button>
                {showTooltip && (
                  <div
                    className={`absolute z-10 right-0 top-full mt-2 p-3 rounded-md shadow-lg text-sm w-64 ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-200"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    {questions[currentQuestion].tooltip}
                  </div>
                )}
              </div>
            )}
          </div>

          {questions[currentQuestion].category && (
            <div
              className={`text-xs mb-6 inline-flex items-center px-2 py-1 rounded-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {questions[currentQuestion].category === "preferences" && (
                <Heart className="h-3 w-3 mr-1" />
              )}
              {questions[currentQuestion].category === "skills" && (
                <Book className="h-3 w-3 mr-1" />
              )}
              {questions[currentQuestion].category === "mindset" && (
                <Brain className="h-3 w-3 mr-1" />
              )}
              {questions[currentQuestion].category === "challenges" && (
                <Cpu className="h-3 w-3 mr-1" />
              )}
              {questions[currentQuestion].category.charAt(0).toUpperCase() +
                questions[currentQuestion].category.slice(1)}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                onMouseEnter={playHoverSound}
                className={`p-4 rounded-lg border-2 flex items-center text-left transition-colors ${
                  isDarkMode
                    ? "border-gray-700 hover:border-blue-500 bg-gray-800 hover:bg-gray-700"
                    : "border-gray-300 hover:border-blue-500 bg-white hover:bg-gray-50"
                } ${
                  answers[currentQuestion] === option.value
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : ""
                }`}
              >
                <div
                  className={`p-3 rounded-full mr-4 ${
                    option.value === "frontend"
                      ? "bg-gradient-to-br from-pink-500 to-orange-400"
                      : "bg-gradient-to-br from-blue-500 to-cyan-400"
                  }`}
                >
                  {option.icon}
                </div>
                <div>
                  <p className="font-medium">{option.text}</p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {option.value === "frontend" ? "Front-end" : "Back-end"}
                  </p>
                </div>
                {answers[currentQuestion] === option.value && (
                  <Check className="ml-auto text-blue-500 h-5 w-5" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              playClickSound();
              if (currentQuestion > 0) {
                setAnimateQuestion(false);
                setTimeout(() => {
                  setCurrentQuestion(currentQuestion - 1);
                  setAnimateQuestion(true);
                }, 300);
              }
            }}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md transition-colors flex items-center ${
              currentQuestion === 0
                ? "opacity-50 cursor-not-allowed"
                : isDarkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-200"
            }`}
            onMouseEnter={currentQuestion !== 0 ? playHoverSound : undefined}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Anterior
          </button>

          {Object.keys(answers).length > currentQuestion && (
            <button
              onClick={() => {
                playClickSound();
                if (currentQuestion < questions.length - 1) {
                  setAnimateQuestion(false);
                  setTimeout(() => {
                    setCurrentQuestion(currentQuestion + 1);
                    setAnimateQuestion(true);
                  }, 300);
                } else {
                  calculateResult(answers);
                }
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              onMouseEnter={playHoverSound}
            >
              {currentQuestion === questions.length - 1
                ? "Ver resultado"
                : "Próxima"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // Renderiza o componente de resultado do quiz
  const renderResult = () => {
    if (!result) return null;

    const totalFrontend = answerBreakdown.frontend;
    const totalBackend = answerBreakdown.backend;
    const totalQuestions = totalFrontend + totalBackend;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 mt-56 ${
              result.type === "frontend"
                ? "bg-gradient-to-br from-pink-500 to-orange-400"
                : result.type === "backend"
                ? "bg-gradient-to-br from-blue-500 to-cyan-400"
                : "bg-gradient-to-br from-purple-500 to-indigo-500"
            }`}
          >
            {result.icon}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold mb-2"
          >
            {result.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {result.description}
          </motion.p>

          {/* Abas de detalhamento do resultado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div
              className={`flex flex-wrap border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } mb-6`}
            >
              <button
                onClick={() => setShowResultDetails("overview")}
                className={`px-4 py-2 text-sm font-medium ${
                  showResultDetails === "overview" || !showResultDetails
                    ? isDarkMode
                      ? "border-b-2 border-blue-500 text-blue-400"
                      : "border-b-2 border-blue-500 text-blue-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onMouseEnter={playHoverSound}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setShowResultDetails("skills")}
                className={`px-4 py-2 text-sm font-medium ${
                  showResultDetails === "skills"
                    ? isDarkMode
                      ? "border-b-2 border-blue-500 text-blue-400"
                      : "border-b-2 border-blue-500 text-blue-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onMouseEnter={playHoverSound}
              >
                Habilidades
              </button>
              <button
                onClick={() => setShowResultDetails("career")}
                className={`px-4 py-2 text-sm font-medium ${
                  showResultDetails === "career"
                    ? isDarkMode
                      ? "border-b-2 border-blue-500 text-blue-400"
                      : "border-b-2 border-blue-500 text-blue-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onMouseEnter={playHoverSound}
              >
                Carreira
              </button>
              <button
                onClick={() => setShowResultDetails("analysis")}
                className={`px-4 py-2 text-sm font-medium ${
                  showResultDetails === "analysis"
                    ? isDarkMode
                      ? "border-b-2 border-blue-500 text-blue-400"
                      : "border-b-2 border-blue-500 text-blue-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onMouseEnter={playHoverSound}
              >
                Análise Detalhada
              </button>
            </div>

            {/* Conteúdo das abas */}
            {(!showResultDetails || showResultDetails === "overview") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6 text-left">
                  <div className="md:w-1/2">
                    <h4 className="font-medium mb-3">Pontos Fortes:</h4>
                    <ul
                      className={`text-sm space-y-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <h4 className="font-medium mb-3">Desafios:</h4>
                    <ul
                      className={`text-sm space-y-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {result.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <Circle className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {showResultDetails === "skills" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <h4 className="font-medium mb-4 text-left">
                  Habilidades Recomendadas:
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {result.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        result.type === "frontend"
                          ? "bg-pink-100 text-pink-800"
                          : result.type === "backend"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <h4 className="font-medium mb-4 text-left">
                  Recursos de Aprendizado:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  {result.learningResources.map((resource, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-white hover:bg-gray-50"
                      } transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2" />
                        <span className="font-medium">{resource.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {showResultDetails === "career" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <h4 className="font-medium mb-4 text-left">
                  Possíveis Carreiras:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  {result.careerPaths.map((career, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md ${
                        isDarkMode ? "bg-gray-700" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <Coffee className="h-4 w-4 mr-2" />
                        <span>{career}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {showResultDetails === "analysis" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-left">
                    Distribuição de Respostas:
                  </h4>
                  <div className="relative h-8 rounded-full overflow-hidden mb-2 bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-orange-400"
                      style={{
                        width: `${(totalFrontend / totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 mr-1" />
                      <span>
                        Front-end: {totalFrontend} (
                        {Math.round((totalFrontend / totalQuestions) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mr-1" />
                      <span>
                        Back-end: {totalBackend} (
                        {Math.round((totalBackend / totalQuestions) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-left">
                    Análise por Categoria:
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(categoryBreakdown).map(
                      ([category, stats]) => (
                        <div key={category} className="text-left">
                          <div className="flex items-center mb-1">
                            {category === "preferences" && (
                              <Heart className="h-3 w-3 mr-1" />
                            )}
                            {category === "skills" && (
                              <Book className="h-3 w-3 mr-1" />
                            )}
                            {category === "mindset" && (
                              <Brain className="h-3 w-3 mr-1" />
                            )}
                            {category === "challenges" && (
                              <Cpu className="h-3 w-3 mr-1" />
                            )}
                            <span className="text-sm font-medium">
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center h-4 text-xs">
                            <div
                              className="h-full bg-gradient-to-r from-pink-500 to-orange-400 rounded-l flex items-center justify-center"
                              style={{
                                width: `${
                                  (stats.frontend / stats.total) * 100
                                }%`,
                              }}
                            >
                              {stats.frontend > 0 &&
                                stats.frontend / stats.total > 0.25 &&
                                "Front-end"}
                            </div>
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-r flex items-center justify-center"
                              style={{
                                width: `${
                                  (stats.backend / stats.total) * 100
                                }%`,
                              }}
                            >
                              {stats.backend > 0 &&
                                stats.backend / stats.total > 0.25 &&
                                "Back-end"}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="font-medium mb-2">Estatísticas:</h4>
                  <div
                    className={`space-y-1 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Timer className="h-3 w-3" />
                      <span>Tempo de conclusão: {getQuizDuration()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-3 w-3" />
                      <span>
                        Perguntas respondidas: {Object.keys(answers).length} de{" "}
                        {questions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Ações finais */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={resetQuiz}
              className={`px-4 py-2 rounded-md flex items-center ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onMouseEnter={playHoverSound}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refazer o quiz
            </button>

            <button
              onClick={shareResult}
              className={`px-4 py-2 rounded-md flex items-center ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white`}
              onMouseEnter={playHoverSound}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar resultado
            </button>

            <button
              onClick={() => {
                playClickSound();
                // Aqui você implementaria a funcionalidade para baixar o resultado
                alert("Baixando certificado...");
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
              onMouseEnter={playHoverSound}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar certificado
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  };



  return (
    <div
      className={`w-full h-full flex flex-col ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <h2 className="text-xl font-bold flex items-center">
          <Award className="mr-2 h-5 w-5" />
          Quiz: Front-end ou Back-end?
        </h2>
        <p
          className={`mt-1 text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Descubra qual área de desenvolvimento combina mais com você
        </p>
      </div>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center p-6 overflow-y-auto" >
        {showIntro
          ? renderIntro()
          : !showResult
          ? renderQuiz()
          : renderResult()}
      </div>

      {/* Footer */}
      {!showIntro && (
        <div
          className={`p-3 border-t text-xs ${
            isDarkMode
              ? "border-gray-700 text-gray-500"
              : "border-gray-200 text-gray-400"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Github className="h-3 w-3 mr-1" />
              <span>v2.0</span>
            </div>
            <div className="flex items-center">
              {quizStarted && !quizCompleted && (
                <div className="flex items-center mr-4">
                  <Timer className="h-3 w-3 mr-1" />
                  <span>
                    Pergunta {currentQuestion + 1} de {questions.length}
                  </span>
                </div>
              )}
              <span>© 2025 DevQuiz</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
