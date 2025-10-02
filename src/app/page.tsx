"use client";
import React, { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-lg border-b border-[#007acc]/20" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold flex  bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent">
                <Wallet className="text-blue-600 mt-1 mr-1.5" /> HASA
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-[#66a3ff] transition-colors"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="text-gray-300 hover:text-[#66a3ff] transition-colors"
              >
                Use Cases
              </a>
              <a
                href="/docs"
                className="text-gray-300 hover:text-[#66a3ff] transition-colors"
              >
                Docs
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-[#66a3ff] transition-colors"
              >
                Pricing
              </a>
              <button className="px-6 py-2 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-medium transition-all hover:scale-105">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-[#007acc]/20">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#features"
                className="block text-gray-300 hover:text-[#66a3ff]"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="block text-gray-300 hover:text-[#66a3ff]"
              >
                Use Cases
              </a>
              <a
                href="#docs"
                className="block text-gray-300 hover:text-[#66a3ff]"
              >
                Docs
              </a>
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-[#66a3ff]"
              >
                Pricing
              </a>
              <button className="w-full px-6 py-2 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007acc]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#66a3ff]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-[#007acc]/10 border border-[#007acc]/30 rounded-full text-[#66a3ff] text-sm font-medium">
              Production-ready stablecoin infrastructure in hours, not months
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stop Building Wallets <br />
            <span className="bg-gradient-to-r from-[#66a3ff] via-[#007acc] to-[#00509e] bg-clip-text text-transparent">
              Start Building Products
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The fastest way to embed stablecoin wallets on Aptos into your
            platform. Create, manage, and scale stablecoin wallets for millions
            of users—without touching a private key.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2">
              Start Building
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-[#007acc]/50 hover:border-[#007acc] rounded-lg font-semibold text-lg transition-all hover:scale-105">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Building stablecoin infrastructure shouldn't slow you down
            </h2>
            <p className="text-gray-400 text-lg">
              Why teams choose HASA over building in-house
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-black/50 border border-red-500/20 rounded-xl hover:border-red-500/50 transition-all">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Complex Key Management for Stablecoins
              </h3>
              <p className="text-gray-400">
                Private keys, mnemonics, recovery endless security nightmares
                for stablecoin operations that drain your resources
              </p>
            </div>

            <div className="p-8 bg-black/50 border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-all">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Months of Development</h3>
              <p className="text-gray-400">
                6+ months just to launch basic stablecoin wallet features. Your
                competitors are already shipping
              </p>
            </div>

            <div className="p-8 bg-black/50 border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Compliance Headaches for Stablecoins
              </h3>
              <p className="text-gray-400">
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
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to scale stablecoin operations
            </h2>
            <p className="text-gray-400 text-lg">
              Enterprise-grade features. Developer-first experience for
              stablecoins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-[#007acc]/20 rounded-xl hover:border-[#007acc]/50 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-[#007acc]/10 rounded-lg flex items-center justify-center mb-4 text-[#66a3ff] group-hover:bg-[#007acc]/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="use-cases"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built for every type of stablecoin builder
            </h2>
            <p className="text-gray-400 text-lg">
              From payments to remittances—power your stablecoin vision with
              HASA
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`p-10 bg-gradient-to-br ${useCase.gradient} border border-[#007acc]/30 rounded-xl hover:border-[#007acc] transition-all hover:scale-105`}
              >
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-300 text-lg">{useCase.description}</p>
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
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#003366]/20 via-black to-[#007acc]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to ship stablecoin features faster?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join the builders choosing stablecoin infrastructure over
            implementation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-10 py-5 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-bold text-lg transition-all hover:scale-105 flex items-center gap-2">
              Get API Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-transparent border-2 border-[#007acc]/50 hover:border-[#007acc] rounded-lg font-bold text-lg transition-all hover:scale-105">
              Schedule Demo
            </button>
          </div>
          {/* 
          <div className="mt-12 text-gray-500">
            No credit card required • Start free • Scale as you grow
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#007acc]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl flex font-bold bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent mb-4">
                <Wallet className="text-blue-600 mt-1 mr-1.5" /> HASA
              </div>
              <p className="text-gray-400">
                Stablecoin wallet infrastructure for the Aptos economy
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#66a3ff]">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#007acc]/20 pt-8 text-center text-gray-400">
            © 2025 HASA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
