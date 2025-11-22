// API xác thực cho frontend
export async function login(username, password) {
  const response = await fetch('http://localhost:8080/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // nhận cookie refresh_token
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error('Sai tài khoản hoặc mật khẩu');
  return await response.json(); // trả về accessToken, user info
}
