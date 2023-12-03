export const logout = (setAuth) => {
    document.body.classList.remove("app");
    localStorage.removeItem("token")
    setAuth({});
}