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


// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSignInWithGoogle, useSignInWithFacebook, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
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
//       const response = await axios.post("http://localhost:5000/api/auth/register", data);
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
//     useCreateUserWithEmailAndPassword(data.email, data.password)
//     mutation.mutate(data);
//     reset()
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
//           Already have an account?
//           <Link href="/login" className="text-blue-600 hover:text-blue-800">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }







// 'use client';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import auth from '../../../firebase.init';

// const SignupPage = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);
//   const router = useRouter();
  
//   // Optionally, if a redirect query param is present.
//   const redirectUrl = router.query.redirect || '/auth/login';

//   const onSubmit = async ({ email, password, name }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(email, password,name);
//       if (!userCredential) throw new Error('Signup failed');
      
//       // const idToken = await userCredential.user.getIdToken();
//       const { data } = await axios.post('http://localhost:5000/api/v1/auth/register', {
//         email, password,name
//       });
      
//       // localStorage.setItem('accessToken', data.accessToken);
//       // document.cookie = `refreshToken=${data.refreshToken}; path=/; secure`;
      
//       toast.success('Account created successfully! Redirecting...');
//       setTimeout(() => {
//         router.push(redirectUrl);
//       }, 1000);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       toast.error(`Signup failed: ${errorMessage}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
//           <p className="text-gray-500">Start your journey with Arabian Elegance</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               {...register("name", { required: "Name is required" })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: { value: 6, message: "Minimum 6 characters" },
//               })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
//           >
//             {loading ? 'Creating account...' : 'Sign Up'}
//           </button>
//         </form>

//         <p className="text-center mt-8 text-gray-600">
//           Already have an account?{' '}
//           <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { PulseLoader } from 'react-spinners';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await api.post('/auth/register', data);
      toast.success('Registration Successful! Please login');
      router.push('/auth/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Start your journey with us</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              {...register("name", { 
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters'
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email", { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: "Password is required",
                minLength: { 
                  value: 6, 
                  message: "Minimum 6 characters" 
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => 
                  value === watch('password') || "Passwords do not match"
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <PulseLoader size={8} color="#fff" />
                <span>Creating Account...</span>
              </>
            ) : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="text-blue-600 hover:underline font-semibold"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
