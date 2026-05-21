"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Building2, GraduationCap } from "lucide-react";
import GlassCard from "./GlassCard";
import Button from "./Button";

export default function LoanCard({ icon: Icon, title, description, href, delay = 0 }) {
  const getButtonText = () => {
    switch (title) {
      case "Home Loan":
        return "Explore Home Loan";
      case "Loan Against Property":
        return "Explore Property Loan";
      case "Education Loan":
        return "Explore Education Loan";
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
      default:
        return Home;
    }
  };

  const ButtonIcon = getButtonIcon();

  return (
    <GlassCard hover delay={delay} className="text-center">
      <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-[#C9A84C]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <Link href={href || "/emi-calculator"}>
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
          <ButtonIcon className="w-4 h-4" />
          {getButtonText()}
        </Button>
      </Link>
    </GlassCard>
  );
}