import React, { useState, useEffect } from "react";
import styled from "styled-components";

export interface HistoryEntryData {
  id: string;
  icon: string;
  title: string;
  text: string;
  fullText?: string;
  image?: string;
  year?: string;
  overlay?: boolean;
  locked?: boolean;
  badges?: string[];
}

interface Props {
  entry: HistoryEntryData;
  studentId: number;
  onBack: () => void;
  onPointsEarned?: (points: number, newBalance: number) => void;
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 16px;
  color: #075fab;
  cursor: pointer;
  margin-bottom: 24px;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

const HeroImage = styled.div<{ src: string }>`
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  background: url(${(p) => p.src}) center/cover;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Badge = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: #d4e3ff;
  color: #004884;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  color: #727782;
  font-size: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e3e6;
`;

const Text = styled.div`
  font-size: 18px;
  line-height: 1.8;
  color: #414751;
  margin-bottom: 32px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: #f2f4f7;
  padding: 16px;
  border-radius: 16px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #075fab;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #727782;
  margin-top: 4px;
`;


const TestButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  background: #075fab;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 32px;
  transition: opacity 0.2s;
  box-shadow: 0 4px 12px rgba(7, 95, 171, 0.2);

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;



const QuizOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
`;

const QuizCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const QuizQuestion = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  line-height: 1.4;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionButton = styled.button<{
  selected?: boolean;
  correct?: boolean;
  wrong?: boolean;
}>`
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid
    ${(p) =>
      p.correct
        ? "#006e1d"
        : p.wrong
          ? "#ba1a1a"
          : p.selected
            ? "#075fab"
            : "#e0e3e6"};
  background: ${(p) =>
    p.correct
      ? "rgba(0, 110, 29, 0.1)"
      : p.wrong
        ? "rgba(186, 26, 26, 0.1)"
        : p.selected
          ? "rgba(7, 95, 171, 0.05)"
          : "white"};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #075fab;
    background: rgba(7, 95, 171, 0.03);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const QuizFeedback = styled.div<{ correct: boolean }>`
  margin-top: 20px;
  padding: 16px;
  border-radius: 12px;
  background: ${(p) =>
    p.correct ? "rgba(0, 110, 29, 0.1)" : "rgba(186, 26, 26, 0.1)"};
  color: ${(p) => (p.correct ? "#006e1d" : "#ba1a1a")};
  font-weight: 500;
  text-align: center;
`;

const RewardDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  font-size: 24px;
  font-weight: 700;
  color: #006e1d;
`;

const CloseQuizButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #075fab;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ba1a1a;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
`;

const quizData: Record<
  string,
  { question: string; options: string[]; correctIndex: number }
> = {
  foundation: {
    question: "В каком году был заложен первый камень корпуса Б?",
    options: ["1885", "1890", "1895", "1900"],
    correctIndex: 1,
  },
  "main-hall": {
    question:
      "Сколько лауреатов Нобелевской премии упоминается в истории Главного хола?",
    options: ["Два", "Три", "Четыре", "Пять"],
    correctIndex: 1,
  },
  default: {
    question: "Внимательно ли вы прочитали материал?",
    options: ["Да", "Нет", "Частично"],
    correctIndex: 0,
  },
};

const HistoryDetail: React.FC<Props> = ({ entry, studentId, onBack, onPointsEarned }) => {
  const [quizActive, setQuizActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [rewardCollected, setRewardCollected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quiz = quizData[entry.id] || quizData.default;
  const isCorrect = selectedOption === quiz.correctIndex;
  const rewardPoints = 20;

  // ПРОВЕРКА ВЫПОЛНЕН ЛИ ТЕСТ
  useEffect(() => {
    const checkQuestStatus = async () => {
      try {
        const response = await fetch(`/api/student/${studentId}/completed-quests`);
        const data = await response.json();
        
        if (data.success) {
          const questCompleted = data.completed_quests.some(
            (q: any) => q.quest_id === entry.id
          );
          setRewardCollected(questCompleted);
        }
      } catch (error) {
        console.error("Ошибка проверки статуса квеста:", error);
      }
    };
    
    checkQuestStatus();
  }, [studentId, entry.id]);

  const handleOpenQuiz = () => {
    setQuizActive(true);
    setSelectedOption(null);
    setAnswered(false);
    setError(null);
  };

  const handleSelectOption = (index: number) => {
    if (!answered && !rewardCollected) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = async () => {
    if (selectedOption !== null && !rewardCollected) {
      setAnswered(true);
      
      if (isCorrect) {
        setIsProcessing(true);
        
        try {
          const response = await fetch(`/api/student/${studentId}/complete-quest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quest_id: entry.id,
              quest_title: entry.title,
              points: rewardPoints
            })
          });
          
          const data = await response.json();
          
          if (data.success) {
            setRewardCollected(true);
            onPointsEarned?.(rewardPoints, data.new_points);
            
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
              const user = JSON.parse(savedUser);
              user.points = data.new_points;
              localStorage.setItem('user', JSON.stringify(user));
            }
          } else {
            setError(data.message || "Не удалось получить награду");
          }
        } catch (error) {
          console.error("Ошибка при выполнении квеста:", error);
          setError("Ошибка соединения с сервером");
        } finally {
          setIsProcessing(false);
        }
      }
    }
  };

  const handleCloseQuiz = () => {
    setQuizActive(false);
  };

  return (
    <Wrapper>
      <BackButton onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
        Назад к туру
      </BackButton>


      {entry.image && <HeroImage src={entry.image} />}


      <Content>

        {entry.badges && (
          <Badges>
            {entry.badges.map((badge) => (
              <Badge key={badge}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  verified_user
                </span>
                {badge}
              </Badge>
            ))}
          </Badges>
        )}

        <Title>{entry.title}</Title>
        <Subtitle>Тур «Архитектура и наследие» • {entry.year}</Subtitle>

        <Text>
          <p>{entry.fullText || entry.text}</p>
        </Text>


        <StatsGrid>
          <StatCard>
            <StatValue>{entry.year}</StatValue>
            <StatLabel>Год основания</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>100%</StatValue>
            <StatLabel>Уровень достоверности</StatLabel>
          </StatCard>
        </StatsGrid>


        {!rewardCollected && (
          <TestButton onClick={handleOpenQuiz} disabled={isProcessing}>
            <span className="material-symbols-outlined">quiz</span>
            {isProcessing ? "Обработка..." : "Ответить на вопрос и получить баллы"}
          </TestButton>
        )}


        {rewardCollected && (
          <TestButton
            as="div"
            style={{
              background: "#006e1d",
              cursor: "default",
              boxShadow: "0 4px 12px rgba(0, 110, 29, 0.2)",
            }}
          >
            <span className="material-symbols-outlined">check_circle</span>
            Награда получена! +{rewardPoints} 🌱
          </TestButton>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Content>

  
      {quizActive && (
        <QuizOverlay onClick={handleCloseQuiz}>
          <QuizCard onClick={(e) => e.stopPropagation()}>
            <QuizQuestion>{quiz.question}</QuizQuestion>

            <OptionList>
              {quiz.options.map((option, index) => (
                <OptionButton
                  key={index}
                  selected={selectedOption === index}
                  correct={answered && index === quiz.correctIndex}
                  wrong={
                    answered &&
                    selectedOption === index &&
                    index !== quiz.correctIndex
                  }
                  onClick={() => handleSelectOption(index)}
                  disabled={answered || rewardCollected}
                >
                  {option}
                </OptionButton>
              ))}
            </OptionList>

            {!answered && !rewardCollected && (
              <TestButton
                onClick={handleCheckAnswer}
                disabled={selectedOption === null || isProcessing}
                style={{
                  marginTop: 20,
                  opacity: selectedOption === null ? 0.5 : 1,
   
                }}
              >
                Проверить
              </TestButton>
            )}

            {answered && (
              <>
                <QuizFeedback correct={isCorrect}>
                  {isCorrect
                    ? "✅ Верно! Вы отлично усвоили материал."
                    : `❌ Неверно. Правильный ответ: ${quiz.options[quiz.correctIndex]}`}
                </QuizFeedback>

                {isCorrect && !rewardCollected && (
                  <RewardDisplay>
                    <span>🌱</span> +{rewardPoints} баллов
                  </RewardDisplay>
                )}

                <CloseQuizButton onClick={handleCloseQuiz}>
                  {isCorrect ? "Супер, закрыть" : "Понятно, закрыть"}
                </CloseQuizButton>
              </>
            )}
          </QuizCard>
        </QuizOverlay>
      )}
    </Wrapper>
  );
};

export default HistoryDetail;
