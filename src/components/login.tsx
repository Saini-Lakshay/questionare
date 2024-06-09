"use client";
import React, { useState } from "react";
import CustomInput from "./common/cusomInput";
import CustomButton from "./common/customButton";
import axios from "axios";
import { signIn } from "next-auth/react";
import Loading from "./common/loading";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);
    if (isLogin) {
      const resp = await signIn("credentials", {
        redirect: false,
        identifier: JSON.stringify({ email: email }),
        password: password,
      });
      if (resp?.ok && resp.status === 200) {
        toast.success("Logged in!");
        setLoading(false);
        router.push("/home");
      } else {
        setLoading(false);
        toast.error(resp?.error);
      }
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      if (response.success) {
        toast.success("Successfully registered!");
        setIsLogin(true);
      } else {
        toast.error(response?.message);
      }
      setLoading(false);
    }
  };
  return (
    <section className="border-[3px] rounded-xl border-black px-8 py-8 w-[80%] lg:w-[40%] bg-[white]">
      <Loading loading={loading} />
      <section className="flex justify-between items-center">
        <p className="text-center">{isLogin ? "Login" : "SignUp"}</p>
        <span
          className="my-4 cursor-pointer hover:text-[red]"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          <p className="text-center text-xl py-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
        </span>
      </section>
      <div className="mb-10 mt-12">
        <CustomInput
          value={email}
          label={"Email"}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <CustomInput
          value={password}
          label={"Password"}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
      </div>
      <CustomButton
        label={isLogin ? "Login" : "SignUp"}
        handleClick={handleLogin}
      />
    </section>
  );
};

export default Login;
