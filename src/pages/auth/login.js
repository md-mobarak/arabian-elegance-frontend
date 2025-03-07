"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "../firebaseConfig";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../../../firebase.init";

const LoginPage = () => {
//   const navigate = ();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      toast.success("Login successful!");
    //   navigate("/");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email", { required: "Email is required" })} placeholder="Email" className="w-full p-2 border mb-2 rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input type="password" {...register("password", { required: "Password is required" })} placeholder="Password" className="w-full p-2 border mb-2 rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-3">Login</button>
        </form>
        <div className="mt-4">
          <button onClick={() => signInWithGoogle()} className="w-full bg-red-500 text-white p-2 rounded mb-2">Login with Google</button>
          <button onClick={() => signInWithFacebook()} className="w-full bg-blue-700 text-white p-2 rounded">Login with Facebook</button>
        </div>
        <p className="text-center mt-3">Don't have an account? <a href="auth/signup" className="text-blue-500">Signup</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
