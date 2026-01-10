const API_URL = "http://localhost:8080/api/v1/lms/reviews";

export async function getReviewsByCourse(courseId, params = {}) {
  const token = localStorage.getItem("accessToken");
  const queryParams = new URLSearchParams({
    page: params.page || 0,
    size: params.size || 10,
    sort: params.sort || "createdAt,desc",
    ...params,
  });

  const response = await fetch(
    `${API_URL}/course/${courseId}?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return await response.json();
}

export async function getReviewStats(courseId) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/course/${courseId}/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch review stats");
  }

  return await response.json();
}

export async function createReview(courseId, reviewData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/course/${courseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create review");
  }

  return await response.json();
}

export async function updateReviewHelpful(reviewId, isHelpful) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/${reviewId}/helpful`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isHelpful }),
  });

  if (!response.ok) {
    throw new Error("Failed to update review helpful");
  }

  return await response.json();
}
