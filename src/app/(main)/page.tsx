"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Bell,
  BarChart3,
  Check,
  Code,
  Lock,
  Clock,
  Database,
  Menu,
  X,
  Wallet,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Stablecoin Wallet Creation",
      description:
        "Generate Aptos stablecoin wallets in milliseconds with a single API call",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security for Stablecoins",
      description:
        "HSM-backed key storage with bank-grade encryption for stablecoin assets",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Stablecoin Support",
      description:
        "USDC, USDT, PYUSD, and other stablecoins—all in one platform",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-Time Stablecoin Analytics",
      description:
        "Stablecoin transaction monitoring and insights at your fingertips",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Webhooks for Payments",
      description:
        "Event-driven notifications for every stablecoin transaction",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Built-in Compliance for Stablecoins",
      description: "KYC/AML workflows and monitoring for stablecoin operations",
    },
  ];

  const useCases = [
    {
      title: "Payment Platforms",
      description:
        "Seamless stablecoin onboarding for cross-border payments & remittances",
      gradient: "from-[#007acc]/20 to-[#66a3ff]/20",
    },
    {
      title: "Fintech Apps",
      description: "Stablecoin rails for your payment and settlement products",
      gradient: "from-[#00509e]/20 to-[#007acc]/20",
    },
    {
      title: "Remittance Services",
      description: "Low-cost stablecoin transfers for global money movement",
      gradient: "from-[#66a3ff]/20 to-[#007acc]/20",
    },
    {
      title: "E-commerce Marketplaces",
      description: "Stablecoin wallet infrastructure for buyers & sellers",
      gradient: "from-[#003366]/20 to-[#00509e]/20",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Developers" },
    { value: "250M+", label: "Stablecoin Transactions" },
    { value: "99.9%", label: "Uptime" },
    { value: "<1s", label: "Latency" },
  ];

  return (
    <div className="min-h-screen bg-black/80 text-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-60 md:w-96 h-60 md:h-96 bg-[#007acc]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-60 md:w-96 h-60 md:h-96 bg-[#66a3ff]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-20 md:py-20 text-center">
          <div className="mb-6 inline-block">
            <span className="flex px-2 sm:px-4 py-2 bg-[#007acc15] border border-[#007acc20] rounded-full text-[#66a3ff70] text-xs font-medium">
              Production-ready stablecoin infrastructure in hours<span className="hidden md:block">, not months</span>
            </span>
          </div>

          <h1 className="text-[44px] md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 leading-tight">
            Stop Building Wallets <br />
            <span className="bg-[#007acc70] bg-clip-text text-transparent">
              Start Building Products
            </span>
          </h1>

          <p className="text-sm md:text-base text-[#FFFFFF80] mb-12 max-w-3xl mx-auto">
            The fastest way to embed stablecoin wallets on Aptos into your
            platform. Create, manage, and scale stablecoin wallets for millions
            of users without worrying about a private key.
          </p>

          <div className="flex gap-2 md:gap-4 justify-center items-center text-[13px] md:text-sm">
            <button className="group px-3 md:px-8 py-3 bg-[#007acc70] hover:bg-[#00509e] rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2">
              <Link href="/docs">Start Building</Link>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-3 md:px-8 py-3 bg-transparent border border-[#007acc70] rounded-lg font-semibold transition-all hover:scale-105">
            <Link href="/docs/reference#getting-started"> View Documentation</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gradient-to-b from-black/80 to-[#007acc10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Building stablecoin infrastructure shouldn't slow you down
            </h2>
            <p className="text-[#FFFFFF80] text-sm md:text-base">
              Why teams choose HASA over building in-house
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4 bg-black/50 border border-[#A1A1A140] rounded-xl transition-all">
              <div className="w-10 h-10 bg-[#007acc30] rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-[#66a3ff]" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Complex Key Management for Stablecoins
              </h3>
              <p className="text-[#FFFFFF80] text-sm">
                Private keys, mnemonics, recovery endless security nightmares
                for stablecoin operations that drain your resources
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-[#A1A1A140] rounded-xl transition-all">
              <div className="w-10 h-10 bg-[#007acc30] rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#66a3ff]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Months of Development</h3>
              <p className="text-[#FFFFFF80] text-sm">
                6+ months just to launch basic stablecoin wallet features. Your
                competitors are already shipping
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-[#A1A1A140] rounded-xl transition-all">
              <div className="w-10 h-10 bg-[#007acc30] rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-[#66a3ff]" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Compliance Headaches for Stablecoins
              </h3>
              <p className="text-[#FFFFFF80] text-sm">
                KYC, AML, transaction monitoring navigating endless regulations
                for stablecoins alone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Three lines of code. <span className="text-[#66a3ff]">Infinite stablecoin possibilities.</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-black border border-[#007acc]/30 rounded-xl p-8 font-mono text-sm overflow-x-auto">
              <div className="mb-4 text-gray-500">// Step 1: Authenticate</div>
              <div className="text-[#66a3ff] mb-6">const client = new HASA ( apiKey: 'your_api_key' );</div>
              
              <div className="mb-4 text-gray-500">// Step 2: Create Stablecoin Wallet</div>
              <div className="text-[#66a3ff] mb-6">const wallet = await client.wallets.create(&#123; userId: 'user_123', asset: 'USDC' &#125;);</div>
              
              <div className="mb-4 text-gray-500">// Step 3: Send Stablecoin</div>
              <div className="text-[#66a3ff]">const tx = await wallet.send(&#123; to: '0x...', amount: '10', asset: 'USDC' &#125;);</div>
            </div>

            <div className="mt-8 text-center">
              <a href="#" className="text-[#66a3ff] hover:text-[#007acc] font-medium flex items-center justify-center gap-2">
                View full documentation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features */}
      <section id="features" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Everything you need to scale stablecoin operations
            </h2>
            <p className="text-[#FFFFFF80] text-sm md:text-base">
              Enterprise-grade features. Developer-first experience for
              stablecoins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-4 bg-[#18181b80] border border-[#A1A1A120] rounded-xl hover:border-[#007acc]/50 transition-all hover:scale-105"
              >
                <div className="w-10 h-10 bg-[#007acc]/10 rounded-lg flex items-center justify-center mb-4 text-[#66a3ff] transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-1.5">{feature.title}</h3>
                <p className="text-[#FFFFFF60] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="use-cases"
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Built for every type of stablecoin builder
            </h2>
            <p className="text-[#FFFFFF80] text-sm md:text-base">
              From payments to remittances. Power your stablecoin vision with
              HASA
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`p-7 bg-[#18181b80] border border-[#A1A1A120] rounded-xl transition-all hover:scale-105`}
              >
                <h3 className="text-lg font-bold mb-1.5">{useCase.title}</h3>
                <p className="text-[#FFFFFF60] text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-8">
                <div className="text-5xl font-bold text-[#66a3ff] mb-2">{stat.value}</div>
                <div className="text-[#FFFFFF80] text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#003366]/20 via-black to-[#007acc]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-[#F9F9F9]">
            Ready to ship stablecoin features faster?
          </h2>
          <p className="text-sm md:text-base text-[#FFFFFF80] mb-12">
            Join the builders choosing stablecoin infrastructure over
            implementation.
          </p>

          <div className="flex gap-2 md:gap-4 justify-center items-center">
            <button className="group px-4 md:px-10 py-3 bg-[#007acc40] rounded-lg font-bold text-sm md:text-base cursor-pointer transition-all hover:scale-105 flex items-center gap-2">
              Get API Access
              <ArrowRight className="w-4 md:w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-4 md:px-10 py-3 bg-transparent border border-[#007acc40] rounded-lg font-bold text-sm md:text-base cursor-pointer transition-all hover:scale-105">
              Schedule Demo
            </button>
          </div>
          {/* 
          <div className="mt-12 text-gray-500">
            No credit card required • Start free • Scale as you grow
          </div> */}
        </div>
      </section>
    </div>
  );
}
