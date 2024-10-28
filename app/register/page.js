"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Import both icons

import register from "@/api/auth/register";
import login from "@/api/auth/login";
import setCookie from "@/utils/setCookie";
import setTimeExpired from "@/utils/setTimeExpired";

export default function RegisterLayout() {
  const [isClient, setIsClient] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [username, setUsername] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passNotMatch, isPassNotMatch] = useState(false);
  const [shortUsername, isShortUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const handleForm = async () => {
    if (!isSubmit) {
      setIsClient(false);

      const credential = new FormData();
      credential.append("username", username);
      credential.append("password", password);
      try {
        const response = await register(credential);
        const userCredential = await login(credential);
        await setCookie(userCredential.data.token_detail.token);
        const date = new Date(userCredential.data.token_detail.expires_at);
        const tokenExpired = Math.floor(date.getTime());
        await setTimeExpired(tokenExpired);
        router.push("/");
      } catch (error) {
        console.log(error);
        alert("Error: " + error);
      }

      setIsClient(true);
    }
  };

  useEffect(() => {
    const isShortUser = username.length < 4;
    const doPassNotMatch = password !== password2;

    isShortUsername(isShortUser);
    isPassNotMatch(doPassNotMatch);

    if (
      !isShortUser &&
      password?.length >= 8 &&
      password2?.length >= 8 &&
      !doPassNotMatch
    ) {
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
    }
  }, [username, password, password2, passNotMatch, usernameTouched]);

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
                src="/loginpic.png"
                alt="Movie"
                className="rounded-xl w-full h-screen p-6"
              />
            </figure>
          </div>
          <form className="self-center px-10">
            <h2 className="card-title text-4xl font-semibold my-6">Register</h2>
            <div className="py-2">
              <p>Username</p>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                className={
                  usernameTouched && shortUsername
                    ? "border-red bg-gray-200"
                    : "border-black bg-gray-200"
                }
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setUsernameTouched(true)}
                required
              />
            </div>
            {usernameTouched && shortUsername ? (
              <p className="text-red py-1">
                Panjang username kurang dari 4 huruf
              </p>
            ) : (
              <></>
            )}
            <div className="py-2">
              <p>Password</p>
              <Input
                name="password"
                type={showPassword ? "text" : "password"} // Toggle type based on showPassword
                placeholder="Password"
                onRight={true}
                className={
                  passNotMatch
                    ? "border-red bg-gray-200"
                    : "border-black bg-gray-200"
                }
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
            {passNotMatch ? (
              <p className="text-red py-1">Password tidak cocok</p>
            ) : (
              <></>
            )}
            <div className="py-2">
              <p>Ulangi password</p>
              <Input
                name="password2"
                type={showPassword2 ? "text" : "password"} // Toggle type based on showPassword
                placeholder="Ulangi Password"
                onRight={true}
                // className="border-black bg-gray-200"
                className={
                  passNotMatch
                    ? "border-red bg-gray-200"
                    : "border-black bg-gray-200"
                }
                svg={
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="focus:outline-none"
                  >
                    {showPassword2 ? (
                      <EyeSlashIcon className="h-5 w-5 text-orange rounded-full" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-orange rounded-full" />
                    )}
                  </button>
                }
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
            {passNotMatch ? (
              <p className="text-red py-1">Password tidak cocok</p>
            ) : (
              <></>
            )}
            <Button
              color="primary w-full my-2 text-white"
              text="Daftar Akun"
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
