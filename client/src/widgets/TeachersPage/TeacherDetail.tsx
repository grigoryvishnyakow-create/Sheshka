import { useState, useEffect } from "react";
import type { Teacher } from "./types";
import {
  PageContainer,
  BackButton,
  HeroSection,
  HeroLeft,
  HeroAvatar,
  HeroName,
  HeroSubject,
  HeroRight,
  Badges,
  Badge,
  BioCard,
  BioTitle,
  BioText,
  ProgressWrapper,
  ProgressBar,
  ProgressFill,
} from "./styles";
import styled from "styled-components";

interface Props {
  teacher: Teacher;
  onBack: () => void;
  studentId?: number;
  onPointsEarned?: (points: number, newBalance: number) => void;
}

const ComicButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 10px;
  border-radius: 999px;
  border: none;
  background: #075fab;
  color: white;

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ComicModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  cursor: pointer;
`;

const ComicImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 16px;
  cursor: default;
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
`;

const QuizQuestion = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
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
  text-align: left;
  cursor: pointer;

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
  font-weight: 600;
  cursor: pointer;
`;

const CompletedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 24px;
  background: #006e1d;
  color: white;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
`;

const ErrorMessage = styled.div`
  color: #ba1a1a;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
`;

const TeacherDetail = ({
  teacher,
  onBack,
  studentId,
  onPointsEarned,
}: Props) => {
  const [showComic, setShowComic] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [rewardCollected, setRewardCollected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rewardPoints = 15;
  
  // Проверяем есть ли у преподавателя комикс и тест
  const hasComicAndQuiz = teacher.comicImage && teacher.quiz;

  // Проверка статуса при монтировании
  useEffect(() => {
    const checkStatus = async () => {
      if (!studentId || !hasComicAndQuiz) {
        return;
      }

      try {
        const res = await fetch(`/api/student/${studentId}/completed-quests`);
        const data = await res.json();

        if (data.success) {
          const completed = data.completed_quests?.some(
            (q: any) => q.quest_id === `comic_teacher_${teacher.id}`,
          );
          setRewardCollected(completed || false);
        }
      } catch (error) {
        console.error("Ошибка проверки:", error);
      }
    };

    checkStatus();
  }, [studentId, teacher.id, hasComicAndQuiz]);

  const handleOpenComic = () => setShowComic(true);

  const handleCloseComic = () => {
    setShowComic(false);
    // Открываем тест ТОЛЬКО если ещё не проходили и тест существует
    if (!rewardCollected && teacher.quiz) {
      setShowQuiz(true);
      setSelectedOption(null);
      setAnswered(false);
      setError(null);
    }
  };

  const handleSelectOption = (index: number) => {
    if (!answered && !rewardCollected) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = async () => {
    if (selectedOption === null || !teacher.quiz) return;
    if (rewardCollected) {
      return;
    }

    setAnswered(true);

    const isCorrect = selectedOption === teacher.quiz.correctIndex;

    if (isCorrect && studentId) {
      setIsProcessing(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/student/${studentId}/complete-quest`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quest_id: `comic_teacher_${teacher.id}`,
              quest_title: `Комикс: ${teacher.name}`,
              points: rewardPoints,
            }),
          },
        );

        const data = await response.json();

        if (data.success) {
          setRewardCollected(true);
          onPointsEarned?.(rewardPoints, data.new_points);

          // Обновляем localStorage
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            const user = JSON.parse(savedUser);
            user.points = data.new_points;
            localStorage.setItem("user", JSON.stringify(user));
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
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <PageContainer>
      <BackButton onClick={onBack}>← Назад</BackButton>

      <HeroSection>
        <HeroLeft>
          <HeroAvatar src={teacher.avatar} alt={teacher.name} />
          <HeroName>{teacher.name}</HeroName>
          <HeroSubject>{teacher.position}</HeroSubject>
        </HeroLeft>

        <HeroRight>
          <Badges>
            <Badge>
              <span className="material-symbols-outlined">verified_user</span>
              Top Rated
            </Badge>
            <Badge>
              <span className="material-symbols-outlined">school</span>
              PhD
            </Badge>
            <Badge>
              <span className="material-symbols-outlined">timer</span>
              {teacher.experience}+ лет опыта
            </Badge>
          </Badges>

          <BioCard>
            <BioTitle>О преподавателе</BioTitle>
            <BioText>{teacher.description}</BioText>
          </BioCard>
        </HeroRight>
      </HeroSection>

      {hasComicAndQuiz && (
        <>
          <ProgressWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "#888" }}>Прогресс чтения</span>
              <span style={{ color: "#075fab", fontWeight: 600 }}>100%</span>
            </div>
            <ProgressBar>
              <ProgressFill />
            </ProgressBar>
          </ProgressWrapper>
          
          {!rewardCollected ? (
            <ComicButton onClick={handleOpenComic} disabled={isProcessing}>
              {isProcessing ? "Обработка..." : "Посмотреть комикс"}
            </ComicButton>
          ) : (
            <CompletedBadge>
              <span className="material-symbols-outlined">check_circle</span>+
              {rewardPoints} шешек получено
            </CompletedBadge>
          )}
        </>
      )}

      {/* Модалка комикса */}
      {showComic && teacher.comicImage && (
        <ComicModal onClick={handleCloseComic}>
          <ComicImage
            src={teacher.comicImage}
            alt="Комикс"
            onClick={(e) => e.stopPropagation()}
          />
        </ComicModal>
      )}

      {/* Модалка теста */}
      {showQuiz && teacher.quiz && (
        <QuizOverlay onClick={handleCloseQuiz}>
          <QuizCard onClick={(e) => e.stopPropagation()}>
            <QuizQuestion>{teacher.quiz.question}</QuizQuestion>

            <OptionList>
              {teacher.quiz.options.map((option, index) => (
                <OptionButton
                  key={index}
                  selected={selectedOption === index}
                  correct={answered && index === teacher.quiz!.correctIndex}
                  wrong={
                    answered &&
                    selectedOption === index &&
                    index !== teacher.quiz!.correctIndex
                  }
                  onClick={() => handleSelectOption(index)}
                  disabled={answered || rewardCollected}
                >
                  {option}
                </OptionButton>
              ))}
            </OptionList>

            {!answered && !rewardCollected && (
              <ComicButton
                onClick={handleCheckAnswer}
                disabled={selectedOption === null || isProcessing}
                style={{ background: "#075fab", marginTop: 20 }}
              >
                {isProcessing ? "Обработка..." : "Проверить"}
              </ComicButton>
            )}

            {answered && (
              <>
                <QuizFeedback
                  correct={selectedOption === teacher.quiz.correctIndex}
                >
                  {selectedOption === teacher.quiz.correctIndex
                    ? "✅ Верно!"
                    : `❌ Неверно. Правильный ответ: ${teacher.quiz.options[teacher.quiz.correctIndex]}`}
                </QuizFeedback>

                {selectedOption === teacher.quiz.correctIndex &&
                  !rewardCollected && (
                    <RewardDisplay>🎉 +{rewardPoints} шешки</RewardDisplay>
                  )}

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <CloseQuizButton onClick={handleCloseQuiz}>
                  Закрыть
                </CloseQuizButton>
              </>
            )}
          </QuizCard>
        </QuizOverlay>
      )}
    </PageContainer>
  );
};

export default TeacherDetail;