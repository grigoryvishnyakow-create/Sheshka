// src/api/config.ts
export const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  async getDailyProgress(studentId: number) {
    const response = await fetch(
      `${API_BASE_URL}/student/${studentId}/daily-progress`,
    );
    return response.json();
  },

  async completeQuest(
    studentId: number,
    questId: string,
    points: number,
    questTitle: string,
  ) {
    const response = await fetch(
      `${API_BASE_URL}/student/${studentId}/complete-quest`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quest_id: questId,
          points,
          quest_title: questTitle,
        }),
      },
    );
    return response.json();
  },
};
