"use client";
import React, { useState } from "react";
import type { ReactElement } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Zap,
  Shield,
  Code,
  TrendingUp,
  Rocket,
} from "lucide-react";

// --- Slide Types (discriminated unions for full TS safety) ---
type TitleSlide = {
  type: "title";
  title: string;
  subtitle: string;
  tagline: string;
  gradient: string;
};

type ProblemItem = { icon: string; text: string };
type ProblemSlide = {
  type: "problem";
  title: string;
  content: ProblemItem[];
  footer?: string;
};

type Feature = { icon: ReactElement; text: string; detail: string };
type SolutionSlide = {
  type: "solution";
  title: string;
  headline: string;
  features: Feature[];
};

type ArchitectureStep = { num: string; title: string; desc: string };
type ArchitectureSlide = {
  type: "architecture";
  title: string;
  content: string;
  steps: ArchitectureStep[];
  code: string;
};

type UseCase = { icon: string; title: string; desc: string };
type UseCasesSlide = { type: "use-cases"; title: string; cases: UseCase[] };

type Reason = {
  icon: ReactElement;
  title: string;
  value: string;
  desc: string;
};
type WhyAptosSlide = {
  type: "why-aptos";
  title: string;
  reasons: Reason[];
  footer?: string;
};

type VisionStat = { label: string; value: string };
type VisionSlide = {
  type: "vision";
  title: string;
  vision: string;
  stats: VisionStat[];
  cta: string;
  contact: string;
};

export type Slide =
  | TitleSlide
  | ProblemSlide
  | SolutionSlide
  | ArchitectureSlide
  | UseCasesSlide
  | WhyAptosSlide
  | VisionSlide;

// --- Slide data ---
const slides: Slide[] = [
  {
    type: "title",
    title: "HASA",
    subtitle: "Stripe for Aptos",
    tagline: "Payments infrastructure for the global Aptos economy",
    gradient: "from-blue-600 to-purple-600",
  },

  {
    type: "problem",
    title: "The Problem",
    content: [
      {
        icon: "⏰",
        text: "Building payment infrastructure on blockchain takes 6-12 months",
      },
      { icon: "💰", text: "Costs millions in engineering resources" },
      { icon: "🔧", text: "Requires deep blockchain expertise" },
      { icon: "⚖️", text: "Complex compliance and security requirements" },
    ],
    footer:
      "Every fintech wants blockchain payments. Almost none can build it themselves.",
  },

  {
    type: "solution",
    title: "The Solution",
    headline: "Production-ready Wallet API in 5 minutes",
    features: [
      {
        icon: <Zap />,
        text: "Instant Integration",
        detail: "RESTful API, no blockchain knowledge needed",
      },
      {
        icon: <Globe />,
        text: "Multi-tenant Architecture",
        detail: "Built for B2B from day one",
      },
      {
        icon: <Shield />,
        text: "Enterprise-grade Security",
        detail: "KYC/AML compliance built-in",
      },
      {
        icon: <Code />,
        text: "Developer-first",
        detail: "Webhooks, SDKs, sandbox environment",
      },
    ],
  },

  {
    type: "architecture",
    title: "How It Works",
    content: "Simple 3-step integration",
    steps: [
      { num: "1", title: "Sign Up", desc: "Get API keys in seconds" },
      { num: "2", title: "Integrate", desc: "One API call creates wallets" },
      { num: "3", title: "Go Live", desc: "Process payments on Aptos" },
    ],
    code: `// Create a wallet for your user
POST /api/v1/users/:userId/wallet
{
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
}



// Response: Instant Aptos wallet
{
    "id": "638c431a-cee8-4c72-b438-2af83ef7005e",
    "walletIds": [
        "5cbf7b34-086a-428d-a428-d7d03a1ace29"
    ],
    "externalUserId": "ORG-USER-12345",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe2@example.com",
        "phone": "+1234567890",
        "country": "US",
        "dateOfBirth": "1990-05-15T00:00:00.000Z"
    },
    "status": "ACTIVE",
    "limits": {
        "dailyLimit": 10000,
        "perTransactionLimit": 5000,
        "monthlyLimit": 100000
    },
    "restrictions": {
        "canReceive": true,
        "canSend": true,
        "canWithdraw": true,
        "frozenByOrg": false,
        "frozenByPlatform": false
    },
    "createdAt": "2025-10-01T16:08:36.660Z",
    "updatedAt": "2025-10-01T16:08:36.705Z",
    "lastActive": "2025-10-01T16:08:36.659Z",
    "totalTransactions": 0,
    "totalVolume": 0,
    "metadata": {
        "tags": [
            "premium",
            "verified"
        ],
        "notes": "High-value customer from enterprise sales",
        "createdBy": "system",
        "walletSetupFailed": false
    }
}`,
  },

  {
    type: "use-cases",
    title: "Powering Global Payments",
    cases: [
      {
        icon: "🏦",
        title: "Neobanks",
        desc: "Instant crypto accounts for customers",
      },
      {
        icon: "🌍",
        title: "Remittance",
        desc: "Fast, low-cost cross-border transfers",
      },
      { icon: "🎮", title: "Gaming", desc: "In-game economies on Aptos" },
      {
        icon: "🛒",
        title: "E-commerce",
        desc: "Accept Aptos payments in checkout",
      },
      { icon: "💳", title: "Payroll", desc: "Pay global teams in crypto" },
      {
        icon: "🤝",
        title: "P2P Platforms",
        desc: "Enable user-to-user payments",
      },
    ],
  },

  {
    type: "why-aptos",
    title: "Why Aptos?",
    reasons: [
      {
        icon: <Zap />,
        title: "Speed",
        value: "Sub-second finality",
        desc: "Real-time payment experience",
      },
      {
        icon: <TrendingUp />,
        title: "Scalability",
        value: "160,000+ TPS",
        desc: "Built for global scale",
      },
      {
        icon: <Globe />,
        title: "Low Costs",
        value: "$0.0001 per tx",
        desc: "Viable for micropayments",
      },
      {
        icon: <Shield />,
        title: "Security",
        value: "Move language",
        desc: "Safer smart contracts",
      },
    ],
    footer: "Aptos is the perfect chain for the global trading engine",
  },

  {
    type: "vision",
    title: "Our Vision",
    vision: "Power the next set of super apps on Aptos",
    stats: [
      { label: "Current Status", value: "Working API on Testnet" },
      {
        label: "Target Market",
        value: "Global Payments, Investment and Staking",
      },
      { label: "Go-to-Market", value: "Fintechs, Neobanks, Web3 Apps" },
    ],
    cta: "Let's make Aptos the global trading engine, one API call at a time.",
    contact: "",
  },
];

// --- Component ---
const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index: number) => setCurrentSlide(index);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      {/* Main Slide Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          {/* Title */}
          {slide.type === "title" && (
            <div className="text-center space-y-8">
              <div
                className={`inline-block px-8 py-3 rounded-full bg-blue-900/30 border border-blue-500/30 text-sm font-semibold mb-4`}
              >
                CTRL+MOVE HACKATHON 2025
              </div>
              <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-5xl font-light text-gray-300 mb-8">
                {slide.subtitle}
              </p>
              <p className="text-2xl text-gray-400 italic">{slide.tagline}</p>
            </div>
          )}

          {/* Problem */}
          {slide.type === "problem" && (
            <div className="space-y-12">
              <h2 className="text-6xl font-bold text-center mb-16">
                {slide.title}
              </h2>
              <div className="grid grid-cols-2 gap-8">
                {slide.content.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-8 hover:scale-105 transition-transform"
                  >
                    <div className="text-6xl mb-4">{item.icon}</div>
                    <p className="text-2xl font-medium text-gray-200">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solution */}
          {slide.type === "solution" && (
            <div className="space-y-12">
              <h2 className="text-6xl font-bold text-center mb-8">
                {slide.title}
              </h2>
              <p className="text-4xl text-center text-blue-400 font-semibold mb-16">
                {slide.headline}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {slide.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-900/30  border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition-all"
                  >
                    <div className="text-blue-400 mb-3">
                      {React.isValidElement(feature.icon)
                        ? React.cloneElement(
                            feature.icon as React.ReactElement<any>,
                            { size: 40 } as any,
                          )
                        : feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.text}</h3>
                    <p className="text-lg text-gray-400">{feature.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture */}
          {slide.type === "architecture" && (
            <div className="space-y-10">
              <h2 className="text-6xl font-bold text-center mb-8">
                {slide.title}
              </h2>
              <p className="text-3xl text-center text-gray-400 mb-12">
                {slide.content}
              </p>

              <div className="flex justify-center items-center gap-8 mb-12">
                {slide.steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-blue-900/30 flex items-center justify-center text-3xl font-bold mb-4">
                        {step.num}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-lg text-gray-400 text-center">
                        {step.desc}
                      </p>
                    </div>
                    {idx < slide.steps.length - 1 && (
                      <ChevronRight
                        size={40}
                        className="text-gray-600 mt-[-40px]"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
                <pre className="text-sm text-green-400 overflow-x-auto">
                  <code>{slide.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Use Cases */}
          {slide.type === "use-cases" && (
            <div className="space-y-12">
              <h2 className="text-6xl font-bold text-center mb-16">
                {slide.title}
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {slide.cases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-6 hover:scale-105 transition-transform text-center"
                  >
                    <div className="text-5xl mb-4">{useCase.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-gray-400">{useCase.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why Aptos */}
          {slide.type === "why-aptos" && (
            <div className="space-y-12">
              <h2 className="text-6xl font-bold text-center mb-16">
                {slide.title}
              </h2>
              <div className="grid grid-cols-2 gap-8">
                {slide.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-2xl p-8"
                  >
                    <div className="text-green-400 mb-4">
                      {React.isValidElement(reason.icon)
                        ? React.cloneElement(
                            reason.icon as React.ReactElement<any>,
                            { size: 40 } as any,
                          )
                        : reason.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-2xl text-blue-400 font-semibold mb-2">
                      {reason.value}
                    </p>
                    <p className="text-lg text-gray-400">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vision */}
          {slide.type === "vision" && (
            <div className="space-y-12 text-center">
              <h2 className="text-6xl font-bold mb-8">{slide.title}</h2>
              <p className="text-4xl font-light text-blue-400 mb-16">
                {slide.vision}
              </p>

              <div className="grid grid-cols-3 gap-8 mb-16">
                {slide.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-8"
                  >
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-600 rounded-2xl p-8 mb-8">
                <p className="text-3xl font-semibold mb-4">{slide.cta}</p>
              </div>

              <div className="flex items-center justify-center gap-4 text-gray-400">
                <Rocket size={24} />
                <p className="text-xl">{slide.contact}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-gray-900/50 backdrop-blur border-t border-gray-800 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-30"
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide
                    ? "bg-blue-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-30"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
