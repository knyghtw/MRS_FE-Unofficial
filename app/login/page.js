
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Import both icons

import login from "@/api/auth/login";
import setCookie from "@/utils/setCookie";
import setTimeExpired from "@/utils/setTimeExpired";
import getToken from "@/utils/getCookie";

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleForm = async () => {
    if (!isSubmit) {
      setIsClient(false);

      const credential = new FormData();
      credential.append("username", username);
      credential.append("password", password);
      const response = await login(credential);

      if (response.success) {
        await setCookie(response.data.token_detail.token);
        const date = new Date(response.data.token_detail.expires_at);
        const tokenExpired = Math.floor(date.getTime());
        await setTimeExpired(tokenExpired);
        router.push("/admin/manage-page");
      } else {
        alert(response.message);
      }

      setIsClient(true);
    }
  };

  useEffect(() => {
    if (username !== null && password !== null) {
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
    }

    if (username === "") {
      setUsername(null);
    }
    if (password === "") {
      setPassword(null);
    }
  }, [username, password]);

  useEffect(() => {
    // if (getToken() !== undefined) {
    //   router.push("/admin/manage-page");
    // }
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="grid grid-cols-2 grid-flow-col gap-2 bg-gray-200 min-h-screen text-black">
          <div>
            <figure>
              <img
                src="/adminlogin.png"
                alt="Movie"
                className="rounded-xl w-full h-screen p-6"
              />
            </figure>
          </div>
          <form className="self-center px-10">
            <h2 className="card-title text-4xl font-semibold">Login</h2>
            <p className="text-2xl font-bold my-6">Hai, selamat datang</p>{" "}
            <div className="py-2">
              <p>Username</p>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                className="border-black bg-gray-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="py-2">
              <p>Password</p>
              <Input
                name="password"
                type={showPassword ? "text" : "password"} // Toggle type based on showPassword
                placeholder="Password"
                onRight={true}
                className="border-black bg-gray-200"
                svg={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-orange rounded-full" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-orange rounded-full" />
                    )}
                  </button>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              color="primary w-full my-2"
              text="LOGIN"
              type="button"
              onClick={handleForm}
              isDisabled={isSubmit}
            />
          </form>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center bg-gray-100">
          <span className="loading loading-spinner loading-lg text-pink-700"></span>
        </div>
      )}
    </>
  );
}
