"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRegisterMutation } from "@/redux/featured/auth/authApi";
import { useDispatch } from "react-redux";
import { registerSuccess } from "@/redux/featured/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registrationStatus, setRegistrationStatus] = useState("");

const onSubmit = async (data) => {
  try {
    // registration data prepare
    const registrationData = {
      userName: data.userName.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    // API call
    const response = await registerUser(registrationData).unwrap();

    if (response.success) {
      // dispatch success action
      dispatch(
        registerSuccess({
          user: response.user || null,
          accessToken: response.accessToken || response.token,
          email: registrationData.email,
        })
      );

      toast.success("Account created successfully!");

      // যদি verification দরকার হয়
      if (response.needsVerification || !response.accessToken) {
        const email = encodeURIComponent(registrationData.email);
        router.push(`/otp-verify?email=${email}&type=registration`);
      } else {
        // auto login successful হলে
        toast.success("Welcome! You're now logged in.");
        router.push("/");
      }
    }
  } catch (error) {
    console.error("Registration failed:", error);

    const errorMessage =
      error?.data?.message || error.message || "Registration failed!";
    setRegistrationStatus(errorMessage);
    toast.error(errorMessage);
  }
};


  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center">
      {/* Left side image */}
      {/* <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="h-auto  w-full max-w-[900px] p-4">
          <Image
            src="/assests/registerImage.png"
            alt="Side Illustration"
            width={900}
            height={700}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div> */}

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#FCFCFC3B] border border-white backdrop-blur-md rounded-lg p-6 md:p-8 w-full max-w-lg mx-auto">
          {/* <div className="flex justify-center mb-4">
            <Image
              src="/assests/logo.png"
              height={120}
              width={160}
              alt="Logo"
              className="mx-auto"
            />
          </div> */}

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-center text-white">
           Sing Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="userName" className="block text-sm mb-2 text-white">

                User Name*
              </label>
              <Input
                id="userName"
                placeholder="Enter your full name"
                {...register("userName", { required: " Name is required" })}

                className="w-full py-6 text-white  border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"

              />
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-white">
                Email Address*
              </label>
              <Input
                id="email"
                placeholder="Enter your email address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full py-6 text-white  border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"

              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 text-white"
              >
                Password*
              </label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  className="w-full py-6 text-white  border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm mb-2 text-white"
              >
                Confirm Password*
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => 
                      value === getValues("password") || "Passwords do not match"
                  })}
                  className="w-full py-6 text-white  border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primary text-white w-full h-10 md:h-12 rounded-md my-4 md:my-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Sing Up"}
            </Button>
          </form>

          {registrationStatus && (
            <p className="text-center mt-4 text-red-500">
              {registrationStatus}
            </p>
          )}

          <p className="text-sm md:text-base mt-4 text-center text-white">
             Have an account ?
            <Link
              className="text-white font-bold ml-1 hover:text-primary"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
