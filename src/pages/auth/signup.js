// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSignInWithGoogle, useSignInWithFacebook } from "react-firebase-hooks/auth";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Link from "next/link";
// import auth from "../../../firebase.init";
// import { useMutation } from "@tanstack/react-query";

// export default function SignupPage() {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Firebase Social Login Hooks
//   const [signInWithGoogle] = useSignInWithGoogle(auth);
//   const [signInWithFacebook] = useSignInWithFacebook(auth);

//   // React Query Mutation to Handle Registration API Request
//   const mutation = useMutation({
//     mutationFn: async (data) => {
//       const response = await axios.post("/api/auth/register", data);
//       return response.data;
//     },
//     onSuccess: () => {
//       router.push("/login");
//     },
//     onError: (err) => {
//       setError(err.response?.data?.message || "Something went wrong");
//     },
//   });

//   const onSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">Sign Up</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Full Name and Email */}
//           <div className="flex flex-col space-y-2">
//             <input
//               type="text"
//               placeholder="Full Name"
//               {...register("name", { required: "Name is required" })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                   message: "Please enter a valid email",
//                 },
//               })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Password and Contact Info */}
//           <div className="flex flex-col space-y-2">
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//               })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//             <input
//               type="text"
//               placeholder="Phone"
//               {...register("phone", { required: "Phone number is required" })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

//             <input
//               type="text"
//               placeholder="District"
//               {...register("district", { required: "District is required" })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}

//             <input
//               type="text"
//               placeholder="Thana"
//               {...register("thana", { required: "Thana is required" })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.thana && <p className="text-red-500 text-sm">{errors.thana.message}</p>}

//             <input
//               type="text"
//               placeholder="Village"
//               {...register("village", { required: "Village is required" })}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {errors.village && <p className="text-red-500 text-sm">{errors.village.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         <div className="flex justify-between mt-6 gap-4">
//           <button
//             onClick={() => signInWithGoogle()}
//             className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300"
//           >
//             Google
//           </button>
//           <button
//             onClick={() => signInWithFacebook()}
//             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Facebook
//           </button>
//         </div>

//         <p className="text-center mt-4">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-600 hover:text-blue-800">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignInWithGoogle, useSignInWithFacebook, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import auth from "../../../firebase.init";
import { useMutation } from "@tanstack/react-query";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Firebase Social Login Hooks
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);

  // React Query Mutation to Handle Registration API Request
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:5000/api/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    useCreateUserWithEmailAndPassword(data.email, data.password)
    mutation.mutate(data);
    reset()
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name and Email */}
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password and Contact Info */}
          <div className="flex flex-col space-y-2">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <input
              type="text"
              placeholder="Phone"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            <input
              type="text"
              placeholder="District"
              {...register("district", { required: "District is required" })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}

            <input
              type="text"
              placeholder="Thana"
              {...register("thana", { required: "Thana is required" })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.thana && <p className="text-red-500 text-sm">{errors.thana.message}</p>}

            <input
              type="text"
              placeholder="Village"
              {...register("village", { required: "Village is required" })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.village && <p className="text-red-500 text-sm">{errors.village.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300"
          >
            Google
          </button>
          <button
            onClick={() => signInWithFacebook()}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Facebook
          </button>
        </div>

        <p className="text-center mt-4">
          Already have an account?
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
