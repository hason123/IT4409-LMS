const API_URL = "http://localhost:8080/api/v1/lms";

export async function getAllCourses(pageNumber = 1, pageSize = 10) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${API_URL}/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return await response.json();
}

export async function getAdminCourses(pageNumber = 1, pageSize = 10) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${API_URL}/admin/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin courses");
  }

  return await response.json();
}

export async function getTeacherCourses(pageNumber = 1, pageSize = 10) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${API_URL}/teacher/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch teacher courses");
  }

  return await response.json();
}

export async function getApprovedCourses(pageNumber = 1, pageSize = 10) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${API_URL}/courses/approved?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch approved courses");
  }

  return await response.json();
}

export async function getPendingCourses(pageNumber = 1, pageSize = 10) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${API_URL}/courses/pending?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pending courses");
  }

  return await response.json();
}

export async function getCourseById(id) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch course details");
  }

  return await response.json();
}

export async function createCourse(courseData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create course");
  }

  return await response.json();
}

export async function uploadCourseImage(courseId, file) {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/courses/${courseId}/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload course image");
  }

  return await response.json();
}

export async function updateCourse(id, courseData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update course");
  }

  return await response.json();
}

export async function deleteCourse(id) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete course");
  }

  // Handle 204 No Content response (empty body)
  if (response.status === 204) {
    return { success: true };
  }

  return await response.json();
}
