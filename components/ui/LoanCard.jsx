"use client";
import Link from "next/link";
import { Home, Building2, GraduationCap, User, Briefcase, Car, Award, Users } from "lucide-react";
import GlassCard from "./GlassCard";
import Button from "./Button";

const BUTTON_ICONS = {
  "Home Loan": Home,
  "Loan Against Property": Building2,
  "Education Loan": GraduationCap,
  "Personal Loan": User,
  "Non-Salaried Loan": Users,
  "Business Loan": Briefcase,
  "Car Loan": Car,
};

const BUTTON_TEXTS = {
  "Home Loan": "Explore Home Loan",
  "Loan Against Property": "Explore Property Loan",
  "Education Loan": "Explore Education Loan",
  "Personal Loan": "Explore Personal Loan",
  "Non-Salaried Loan": "Explore Non-Salaried Loan",
  "Business Loan": "Explore Business Loan",
  "Car Loan": "Explore Car Loan",
};

export default function LoanCard({ icon: Icon, title, description, href, delay = 0, best = false }) {
  const ButtonIcon = BUTTON_ICONS[title] || Home;
  const buttonText = BUTTON_TEXTS[title] || "Calculate EMI";

  return (
    <GlassCard hover delay={delay} className={`text-center relative transition-all duration-300 ${best ? 'ring-2 ring-gold-primary/40 shadow-lg shadow-gold-primary/10 scale-[1.02]' : ''}`}>
      {best && (
        <div className="absolute -top-3 right-4 bg-gold-primary text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
          <Award className="w-3 h-3 shrink-0" />
          Best in Class
        </div>
      )}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${best ? 'bg-gold-primary' : 'bg-gold-primary/10'}`}>
        <Icon className={`w-8 h-8 ${best ? 'text-white' : 'text-gold-primary'}`} />
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${best ? 'text-gray-900' : 'text-gray-800'}`}>{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <Link href={href || "/emi-calculator"}>
        <Button variant={best ? "primary" : "secondary"} className="w-full flex items-center justify-center gap-2">
          <ButtonIcon className="w-4 h-4 shrink-0" />
          {buttonText}
        </Button>
      </Link>
    </GlassCard>
  );
}
