import Cookies from "js-cookie";

export default function deleteCookieUser() {
  Cookies.remove("token_user");
  Cookies.remove("expired");
}
