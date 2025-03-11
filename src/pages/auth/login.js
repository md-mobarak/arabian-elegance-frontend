// "use client";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// // import { auth } from "../firebaseConfig";
// // import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import auth from "../../../firebase.init";

// const LoginPage = () => {
// //   const navigate = ();
//   const { register, handleSubmit, formState: { errors } } = useForm();
  
//   const [signInWithGoogle] = useSignInWithGoogle(auth);
//   const [signInWithFacebook] = useSignInWithFacebook(auth);
//   const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  
//   const onSubmit = async (data) => {
//     try {
//       await signInWithEmailAndPassword(data.email, data.password);
//       toast.success("Login successful!");
//     //   navigate("/");
//     } catch (err) {
//       toast.error("Login failed: " + err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 shadow-md rounded-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input {...register("email", { required: "Email is required" })} placeholder="Email" className="w-full p-2 border mb-2 rounded" />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//           <input type="password" {...register("password", { required: "Password is required" })} placeholder="Password" className="w-full p-2 border mb-2 rounded" />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-3">Login</button>
//         </form>
//         <div className="mt-4">
//           <button onClick={() => signInWithGoogle()} className="w-full bg-red-500 text-white p-2 rounded mb-2">Login with Google</button>
//           <button onClick={() => signInWithFacebook()} className="w-full bg-blue-700 text-white p-2 rounded">Login with Facebook</button>
//         </div>
//         <p className="text-center mt-3">Don't have an account? <a href="auth/signup" className="text-blue-500">Signup</a></p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



// 'use client';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import axios from 'axios';
// import Image from 'next/image';
// import auth from '../../../firebase.init';

// const LoginPage = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [signInWithGoogle] = useSignInWithGoogle(auth);
//   const [signInWithFacebook] = useSignInWithFacebook(auth);
//   const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(auth);
//   const [socialLoading, setSocialLoading] = useState(false);

  
//   const handleSocialLogin = async (provider) => {
//     try {
//       setSocialLoading(true);
//       let result;
//       if(provider === 'google') result = await signInWithGoogle();
//       if(provider === 'facebook') result = await signInWithFacebook();

//       const idToken = await result.user.getIdToken();
//       const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', { idToken });
      
//       localStorage.setItem('accessToken', data.accessToken);
//       document.cookie = `refreshToken=${data.refreshToken}; path=/; secure`;
      
//       toast.success('Login successful! Redirecting...');
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);

//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       toast.error(`Login failed: ${errorMessage}`);
//       setSocialLoading(false);
//     }
//   };

//   const onSubmit = async ({ email, password }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(email, password);
//       if (!userCredential) throw new Error('Login failed');

//       const idToken = await userCredential.user.getIdToken();
      
//       const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', { idToken });
//       localStorage.setItem('accessToken', data.accessToken);
//       document.cookie = `refreshToken=${data.refreshToken}; path=/; secure`;
      
//       toast.success('Login successful! Redirecting...');
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);

//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       toast.error(`Login failed: ${errorMessage}`);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-500">Sign in to continue to Arabian Elegance</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               {...register("email", { required: "Email is required" })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-8">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           <div className="mt-6 grid grid-cols-2 gap-3">
//             <button
//               onClick={() => handleSocialLogin('google')}
//               disabled={socialLoading}
//               className="w-full flex items-center justify-center gap-2 bg-white border py-3 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Image src="/google.svg" alt="Google" width={20} height={20} />
//               <span>Google</span>
//             </button>

//             <button
//               onClick={() => handleSocialLogin('facebook')}
//               disabled={socialLoading}
//               className="w-full flex items-center justify-center gap-2 bg-white border py-3 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
//               <span>Facebook</span>
//             </button>
//           </div>
//         </div>

//         <p className="text-center mt-8 text-gray-600">
//           Don't have an account?{' '}
//           <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// 'use client';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   useSignInWithGoogle,
//   useSignInWithFacebook,
//   useSignInWithEmailAndPassword,
//   useAuthState,
// } from 'react-firebase-hooks/auth';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import Image from 'next/image';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import auth from '../../../firebase.init';

// const LoginPage = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   // const [signInWithGoogle] = useSignInWithGoogle(auth);
//   // const [signInWithFacebook] = useSignInWithFacebook(auth);
//   const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(auth);
//   const [socialLoading, setSocialLoading] = useState(false);
//   const router = useRouter();
  
//   // Create Axios instance
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/v1', // Replace with your API URL
// });
//   // Read the redirect query param (if any), defaulting to home page.
//   const redirectUrl = router.query.redirect || '/';

//   // Handle social login for Google and Facebook.
//   const handleSocialLogin = async (provider) => {
//     try {
//       setSocialLoading(true);
//       let result;
//       if (provider === 'google') {
//         result = await signInWithGoogle();
//       } else if (provider === 'facebook') {
//         result = await signInWithFacebook();
//       }
//       if (!result || !result.user) {
//         throw new Error('Social login failed');
//       }
//       // const idToken = await result.user.getIdToken();
//       // const [user, loading, error] = useAuthState(auth, options);

//  console.log(result.user)
//       const { data } = await api.post('/auth/login',);
      
//       // Store tokens in localStorage and cookies.
      
//     // if (data && data.accessToken) {
//     //   const { accessToken, user } = data;
//     // }
//       // Store token and user details in localStorage
//       // localStorage.setItem('accessToken', accessToken);
//       // localStorage.setItem('user', JSON.stringify(user));

//       // Set token in Axios headers for future requests
//       api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//       // console.log('Login successful', user);
//       localStorage.setItem('accessToken', data.accessToken);
//       document.cookie = `refreshToken=${data.refreshToken}; path=/; secure`;
      
//       toast.success('Login successful! Redirecting...');
//       setTimeout(() => {
//         router.push(redirectUrl);
//       }, 1000);
//       console.log(auth)
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       toast.error(`Login failed: ${errorMessage}`);
//       setSocialLoading(false);
//     }
//   };


// // Function to login and store token
// const loginUser = async (email, password) => {
//   try {
//     const response = await api.post('/login', { email, password });

//     if (response.data && response.data.accessToken) {
//       const { accessToken, user } = response.data;

//       // Store token and user details in localStorage
//       localStorage.setItem('accessToken', accessToken);
//       localStorage.setItem('user', JSON.stringify(user));

//       // Set token in Axios headers for future requests
//       api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//       console.log('Login successful', user);
//     } else {
//       console.error('Login failed: No access token received');
//     }
//   } catch (error) {
//     console.error('Login failed:', error.response?.data || error.message);
//   }
// };


//   // Handle email/password login.
//   const onSubmit = async ({ email, password }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(email, password);
//       if (!userCredential) throw new Error('Login failed');
      
//       // const idToken = await userCredential.user.getIdToken();
//       const response= await axios.post('http://localhost:5000/api/v1/auth/login');
      
//       localStorage.setItem('accessToken', data.accessToken);
//       document.cookie = `refreshToken=${data.refreshToken}; path=/; secure`;
      
//       toast.success('Login successful! Redirecting...');
//       setTimeout(() => {
//         router.push(redirectUrl);
//       }, 1000);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       toast.error(`Login failed: ${errorMessage}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-500">Sign in to continue to Arabian Elegance</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               {...register("email", { required: "Email is required" })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-8">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           {/* <div className="mt-6 grid grid-cols-2 gap-3">
//             <button
//               onClick={() => handleSocialLogin('google')}
//               disabled={socialLoading}
//               className="w-full flex items-center justify-center gap-2 bg-white border py-3 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Image src="/google.svg" alt="Google" width={20} height={20} />
//               <span>Google</span>
//             </button>

//             <button
//               onClick={() => handleSocialLogin('facebook')}
//               disabled={socialLoading}
//               className="w-full flex items-center justify-center gap-2 bg-white border py-3 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
//               <span>Facebook</span>
//             </button>
//           </div> */}
//         </div>

//         <p className="text-center mt-8 text-gray-600">
//           Don't have an account?{' '}
//           <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// 'use client';
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { PulseLoader } from 'react-spinners';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/v1',
// });

// export default function LoginPage() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//     // const user = 'hello'
//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (token) router.push('/dashboard');
//   }, [router]);

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       const response = await api.post('/auth/login', data);
      
//       localStorage.setItem('accessToken', response.data.accessToken)
//       document.cookie = `refreshToken=${response.data.refreshToken}; path=/; secure; sameSite=strict`;
      
//       api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

//       localStorage.setItem('userRole', response.data.user.role);
//       localStorage.setItem('userId', response.data.user._id);
//       // userId: localStorage.getItem("userId") || ""
//       const redirectPath = response.data.user.role === 'admin' ? '/dashboard' : '/';
//       // console.log(redirectPath)

//       toast.success('Login Successful! Redirecting...');
//       router.push(redirectPath);
      
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login Failed');
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <input
//               {...register("email", { 
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="john@example.com"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               {...register("password", { 
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters'
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 bottom-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               {showPassword ? (
//                 <EyeSlashIcon className="w-6 h-6 text-gray-500" />
//               ) : (
//                 <EyeIcon className="w-6 h-6 text-gray-500" />
//               )}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <PulseLoader size={8} color="#fff" />
//                 <span>Signing In...</span>
//               </>
//             ) : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link 
//               href="/auth/signup" 
//               className="text-blue-600 hover:underline font-semibold"
//             >
//               Create Account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { PulseLoader } from 'react-spinners';
import Image from 'next/image'; // Ensure Image is imported
import { baseUrl } from '@/utils/api';

const api = axios.create({
  baseURL: baseUrl,
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) router.push('/dashboard');
  }, [router]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', data);

      localStorage.setItem('accessToken', response.data.accessToken);
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/; secure; sameSite=strict`;

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userId', response.data.user._id);

      const redirectPath = response.data.user.role === 'admin' ? '/dashboard' : '/';
      toast.success('Login Successful! Redirecting...');
      router.push(redirectPath);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              {...register("email", { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <PulseLoader size={8} color="#fff" />
                <span>Signing In...</span>
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
