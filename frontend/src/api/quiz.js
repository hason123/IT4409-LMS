const API_URL = "http://localhost:8080/api/v1/lms/quizzes";

export async function createQuiz(quizData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quizData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create quiz");
  }

  return await response.json();
}

export async function createQuizInChapter(chapterId, quizData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`http://localhost:8080/api/v1/lms/chapters/${chapterId}/quizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quizData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create quiz in chapter");
  }

  return await response.json();
}

export async function getQuizById(id) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quiz");
  }

  return await response.json();
}

export async function updateQuiz(id, quizData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quizData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update quiz");
  }

  return await response.json();
}

export async function deleteQuiz(id) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete quiz");
  }

  if (response.status === 204) {
    return { success: true };
  }

  return await response.json();
}
