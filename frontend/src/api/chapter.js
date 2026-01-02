const API_URL = "http://localhost:8080/api/v1/lms/chapters";

export async function getChaptersByCourseId(courseId) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/course/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chapters");
  }

  return await response.json();
}

export async function getChapterById(id) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chapter");
  }

  return await response.json();
}

export async function createChapter(chapterData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chapterData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create chapter");
  }

  return await response.json();
}

export async function updateChapter(id, chapterData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chapterData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update chapter");
  }

  return await response.json();
}

export async function deleteChapter(id) {
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
    throw new Error(errorData.message || "Failed to delete chapter");
  }

  if (response.status === 204) {
    return { success: true };
  }

  return await response.json();
}
