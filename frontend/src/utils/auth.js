export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirect to login page
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
