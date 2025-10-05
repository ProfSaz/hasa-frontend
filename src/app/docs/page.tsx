import React from "react";
import {
  Book,
  Users,
  Wallet,
  ArrowLeftRight,
  Settings,
  Zap,
  ArrowRight,
  Key,
} from "lucide-react";
import Link from "next/link";

export default function DocsLandingPage() {
  const apiSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      description:
        "Learn the basics of HASA API, authentication, and quick start guide",
      icon: <Book className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      topics: ["Introduction", "Authentication"],
    },
    {
      id: "organization",
      title: "Organization API",
      description: "Manage your organization profile, settings, and API keys",
      icon: <Settings className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      topics: [
        "Get Profile",
        "Update Settings",
        "Get Limits",
        "Manage API Keys",
      ],
    },
    {
      id: "users",
      title: "Users API",
      description: "Create and manage users within your organization",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      topics: [
        "Create User",
        "List Users",
        "Get User",
        "Update User",
        "Delete User",
      ],
    },
    {
      id: "wallets",
      title: "Wallets API",
      description: "Handle wallet creation, balance sync, and fund transfers",
      icon: <Wallet className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      topics: [
        "Create Wallet",
        "List Wallets",
        "Get Wallet",
        "Sync Balance",
        "Transfer Funds",
      ],
    },
    {
      id: "transactions",
      title: "Transactions API",
      description: "Process transfers and monitor transaction history",
      icon: <ArrowLeftRight className="w-8 h-8" />,
      color: "from-red-500 to-rose-500",
      topics: [
        "Process Transfer",
        "List Transactions",
        "Get Transaction",
        "Transaction Stats",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007acc]/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDdhY2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTggMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007acc]/10 border border-[#007acc]/30 rounded-full mb-8">
              <Zap className="w-4 h-4 text-[#66a3ff]" />
              <span className="text-sm text-[#66a3ff] font-medium">
                API v1.0 Documentation
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build with
              <span className="bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent">
                {" "}
                HASA API
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Comprehensive documentation for integrating wallet infrastructure
              into your application. Choose an API section below to get started.
            </p>

            {/* <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div>99.9% Uptime</div>
            </div> */}
          </div>
        </div>
      </div>

      {/* API Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiSections.map((section) => (
            <Link
              key={section.id}
              href={`/docs/reference#${section.id}`}
              className="group relative bg-gray-900 border border-[#007acc]/20 rounded-xl p-6 hover:border-[#007acc]/50 transition-all cursor-pointer hover:scale-105 duration-300"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}
              ></div>

              <div className="relative">
                <div
                  className={`inline-flex p-3 bg-gradient-to-br ${section.color} rounded-lg mb-4`}
                >
                  {section.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#66a3ff] transition-colors">
                  {section.title}
                </h3>

                <p className="text-gray-400 mb-4">{section.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {section.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-[#66a3ff] font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#007acc]/10 to-[#007acc]/5 border border-[#007acc]/20 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Key className="w-6 h-6 text-[#66a3ff] mb-3" />
              <h4 className="font-bold mb-2">Authentication</h4>
              <p className="text-gray-400 text-sm mb-3">
                Learn how to authenticate your API requests using HMAC
                signatures
              </p>
              <Link
                href="/docs/reference#authentication"
                className="text-[#66a3ff] text-sm font-medium hover:underline"
              >
                View Guide →
              </Link>
            </div>

            <div>
              <Zap className="w-6 h-6 text-[#66a3ff] mb-3" />
              <h4 className="font-bold mb-2">Quick Start</h4>
              <p className="text-gray-400 text-sm mb-3">
                Get up and running with HASA API in under 5 minutes
              </p>
              <Link
                href="/docs/reference#quick-start"
                className="text-[#66a3ff] text-sm font-medium hover:underline"
              >
                Start Building →
              </Link>
            </div>

            <div>
              <Book className="w-6 h-6 text-[#66a3ff] mb-3" />
              <h4 className="font-bold mb-2">Code Examples</h4>
              <p className="text-gray-400 text-sm mb-3">
                Browse code samples in cURL, JavaScript, and Python
              </p>
              <Link
                href="/docs/reference"
                className="text-[#66a3ff] text-sm font-medium hover:underline"
              >
                View Examples →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
