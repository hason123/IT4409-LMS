const API_URL = 'http://localhost:8080/api/v1/lms/courses';

export async function getAllCourses(pageNumber = 1, pageSize = 10) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return await response.json();
}

export async function getCourseById(id) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch course details');
  }

  return await response.json();
}

export async function createCourse(courseData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(courseData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create course');
  }

  return await response.json();
}

export async function uploadCourseImage(courseId, file) {
  const token = localStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/${courseId}/avatar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload course image');
  }

  return await response.json();
}
