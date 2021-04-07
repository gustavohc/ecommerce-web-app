import ApiAuth from "@/services/api-auth.service"

const login = async credentials => {
  localStorage.removeItem("user");

  let response = await ApiAuth().post("/login", {
    username: credentials.username,
    password: credentials.password,
  });
  return response.data;

}

export const authService = {
  login,
}
