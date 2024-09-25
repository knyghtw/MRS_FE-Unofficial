import Cookies from "js-cookie";

export default function deleteCookie() {
  Cookies.remove("token");
  Cookies.remove("expired");
}
