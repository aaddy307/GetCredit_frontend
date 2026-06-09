"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthProvider, useAuth } from "../dashboard/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const prefersReducedMotion = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success("Welcome back!", { id: 'admin-login-success', duration: 5000 });
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 100);
    } else {
      toast.error(result.message || "Invalid credentials", { id: 'admin-login-error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F3EE] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,149,42,0.08)_0%,_transparent_50%)]" />
      
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Logo.jpeg"
            alt="Get Credit – Loan Consultancy Logo"
            className="w-16 h-16 rounded-2xl mx-auto mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 mt-2">Access your dashboard</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              placeholder="Enter admin email"
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-[#C9A84C]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 bg-white border border-[#C9A84C]/20 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A84C]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <LogIn className="w-4 h-4" />
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[rgba(201,149,42,0.1)] text-center">
            <p className="text-gray-500 text-sm">
              Enter your admin credentials
            </p>
          </div>
        </GlassCard>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[#C9A84C] hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
