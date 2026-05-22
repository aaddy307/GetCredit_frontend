"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Building2, GraduationCap, User, Briefcase, Car, Award, Users } from "lucide-react";
import GlassCard from "./GlassCard";
import Button from "./Button";

export default function LoanCard({ icon: Icon, title, description, href, delay = 0, best = false }) {
  const getButtonText = () => {
    switch (title) {
      case "Home Loan":
        return "Explore Home Loan";
      case "Loan Against Property":
        return "Explore Property Loan";
      case "Education Loan":
        return "Explore Education Loan";
      case "Personal Loan":
        return "Explore Personal Loan";
      case "Non-Salaried Loan":
        return "Explore Non-Salaried Loan";
      case "Business Loan":
        return "Explore Business Loan";
      case "Car Loan":
        return "Explore Car Loan";
      default:
        return "Calculate EMI";
    }
  };

  const getButtonIcon = () => {
    switch (title) {
      case "Home Loan":
        return Home;
      case "Loan Against Property":
        return Building2;
      case "Education Loan":
        return GraduationCap;
      case "Personal Loan":
        return User;
      case "Non-Salaried Loan":
        return Users;
      case "Business Loan":
        return Briefcase;
      case "Car Loan":
        return Car;
      default:
        return Home;
    }
  };

  const ButtonIcon = getButtonIcon();

  return (
    <GlassCard hover delay={delay} className={`text-center relative transition-all duration-300 ${best ? 'ring-2 ring-[#C9A84C]/40 shadow-lg shadow-[#C9A84C]/10 scale-[1.02]' : ''}`}>
      {best && (
        <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#C9A84C] to-[#E5C76B] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
          <Award className="w-3 h-3" />
          Best in Class
        </div>
      )}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${best ? 'bg-gradient-to-br from-[#C9A84C] to-[#E5C76B]' : 'bg-[#C9A84C]/10'}`}>
        <Icon className={`w-8 h-8 ${best ? 'text-white' : 'text-[#C9A84C]'}`} />
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${best ? 'text-gray-900' : 'text-gray-800'}`}>{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <Link href={href || "/emi-calculator"}>
        <Button variant={best ? "primary" : "secondary"} className="w-full flex items-center justify-center gap-2">
          <ButtonIcon className="w-4 h-4" />
          {getButtonText()}
        </Button>
      </Link>
    </GlassCard>
  );
}