"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  Wallet,
  ArrowLeftRight,
  Shield,
  Landmark,
  Settings,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  Plus,
  Filter,
} from "lucide-react";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "organizations",
      label: "Organizations",
      icon: <Building2 className="w-5 h-5" />,
      badge: 3,
    },
    { id: "users", label: "Users", icon: <Users className="w-5 h-5" /> },
    { id: "wallets", label: "Wallets", icon: <Wallet className="w-5 h-5" /> },
    {
      id: "transactions",
      label: "Transactions",
      icon: <ArrowLeftRight className="w-5 h-5" />,
    },
    {
      id: "compliance",
      label: "Compliance",
      icon: <Shield className="w-5 h-5" />,
      badge: 8,
    },
    {
      id: "treasury",
      label: "Treasury",
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      id: "system",
      label: "System Health",
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  const stats = [
    {
      label: "Total Organizations",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Users",
      value: "12,458",
      change: "+23%",
      trend: "up",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Transaction Volume",
      value: "$2.4M",
      change: "+8%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Platform Revenue",
      value: "$48.2K",
      change: "+15%",
      trend: "up",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Active Wallets",
      value: "8,234",
      change: "+18%",
      trend: "up",
      icon: <Wallet className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
    },
    {
      label: "System Health",
      value: "99.8%",
      change: "+0.1%",
      trend: "up",
      icon: <Activity className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const recentActivity = [
    {
      type: "org",
      title: "New Organization",
      description: "FinTech Innovations signed up",
      time: "5 minutes ago",
      icon: <Building2 className="w-4 h-4" />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      type: "transaction",
      title: "Large Transaction",
      description: "Acme Corp: $25,000 transfer",
      time: "12 minutes ago",
      icon: <ArrowLeftRight className="w-4 h-4" />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      type: "alert",
      title: "Compliance Alert",
      description: "Transaction flagged for review",
      time: "23 minutes ago",
      icon: <AlertCircle className="w-4 h-4" />,
      color: "bg-red-500/20 text-red-400",
    },
    {
      type: "system",
      title: "System Update",
      description: "API response time improved",
      time: "1 hour ago",
      icon: <CheckCircle className="w-4 h-4" />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      type: "user",
      title: "KYC Completed",
      description: "45 users verified today",
      time: "2 hours ago",
      icon: <Users className="w-4 h-4" />,
      color: "bg-purple-500/20 text-purple-400",
    },
  ];

  const topOrganizations = [
    {
      name: "Acme Corporation",
      volume: "$450K",
      users: 1234,
      transactions: 5678,
      status: "active",
      logo: "🏢",
    },
    {
      name: "FinTech Innovations",
      volume: "$320K",
      users: 892,
      transactions: 3421,
      status: "active",
      logo: "🏦",
    },
    {
      name: "GameCo Studios",
      volume: "$280K",
      users: 654,
      transactions: 2890,
      status: "active",
      logo: "🎮",
    },
    {
      name: "CryptoTraders Inc",
      volume: "$195K",
      users: 445,
      transactions: 1987,
      status: "active",
      logo: "💹",
    },
  ];

  const pendingApprovals = [
    {
      type: "Organization",
      name: "BlockChain Solutions",
      submitted: "2 days ago",
      priority: "high",
    },
    {
      type: "KYC Review",
      name: "John Doe (Acme Corp)",
      submitted: "1 day ago",
      priority: "medium",
    },
    {
      type: "Transaction",
      name: "$50K transfer flagged",
      submitted: "3 hours ago",
      priority: "high",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-[#007acc]/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#007acc]/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent">
            HASA
          </h1>
          <p className="text-sm text-gray-400 mt-1">Platform Admin</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                activePage === item.id
                  ? "bg-[#007acc]/20 text-[#66a3ff]"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#007acc]/20">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-[#66a3ff] to-[#007acc] rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gray-900/50 backdrop-blur-lg border-b border-[#007acc]/20 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {navigation.find((n) => n.id === activePage)?.label}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50 w-64"
                />
              </div>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activePage === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6 hover:border-[#007acc]/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}
                      >
                        {stat.icon}
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-semibold ${
                          stat.trend === "up"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Transaction Volume Chart */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Transaction Volume</h3>
                    <select className="px-3 py-1 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[40, 65, 55, 80, 70, 90, 85].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-gradient-to-t from-[#007acc] to-[#66a3ff] rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-400">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Organization Growth Chart */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Organization Growth</h3>
                    <select className="px-3 py-1 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                      <option>Last 6 months</option>
                      <option>Last year</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[30, 45, 55, 70, 80, 100].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-400">
                          {["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity & Top Organizations */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${activity.color}`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Organizations */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Top Organizations</h3>
                    <button className="text-[#66a3ff] text-sm hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {topOrganizations.map((org, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{org.logo}</span>
                          <div>
                            <p className="font-medium text-sm">{org.name}</p>
                            <p className="text-xs text-gray-400">
                              {org.users} users • {org.transactions} txns
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#66a3ff]">
                            {org.volume}
                          </p>
                          <p className="text-xs text-green-400">Active</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pending Approvals & Quick Actions */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Pending Approvals */}
                <div className="lg:col-span-2 bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Pending Approvals</h3>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-semibold">
                      {pendingApprovals.length} pending
                    </span>
                  </div>
                  <div className="space-y-3">
                    {pendingApprovals.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-[#007acc]/50 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">
                              {item.type}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                item.priority === "high"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {item.priority}
                            </span>
                          </div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Submitted {item.submitted}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-[#007acc] hover:bg-[#00509e] rounded-lg text-sm font-medium transition-colors">
                            Review
                          </button>
                          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#007acc]/20 hover:bg-[#007acc]/30 border border-[#007acc]/30 rounded-lg transition-all">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Create Organization</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">View Compliance</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">
                      <Activity className="w-5 h-5" />
                      <span className="font-medium">System Status</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Platform Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Organizations Page */}
          {activePage === "organizations" && (
            <div className="space-y-6">
              {/* Top Actions Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search organizations..."
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50 w-80"
                    />
                  </div>
                  <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                    <option>All Types</option>
                    <option>Enterprise</option>
                    <option>SME</option>
                    <option>Startup</option>
                  </select>
                  <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-medium transition-colors">
                  <Plus className="w-4 h-4" />
                  Create Organization
                </button>
              </div>

              {/* Organizations Table */}
              <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800/50 border-b border-[#007acc]/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Organization
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Users
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Volume (30d)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      {
                        name: "Acme Corporation",
                        type: "Enterprise",
                        status: "active",
                        users: 1234,
                        volume: "$450K",
                        created: "Jan 15, 2025",
                        logo: "🏢",
                      },
                      {
                        name: "FinTech Innovations",
                        type: "SME",
                        status: "active",
                        users: 892,
                        volume: "$320K",
                        created: "Feb 20, 2025",
                        logo: "🏦",
                      },
                      {
                        name: "GameCo Studios",
                        type: "Startup",
                        status: "active",
                        users: 654,
                        volume: "$280K",
                        created: "Mar 10, 2025",
                        logo: "🎮",
                      },
                      {
                        name: "CryptoTraders Inc",
                        type: "Enterprise",
                        status: "active",
                        users: 445,
                        volume: "$195K",
                        created: "Apr 5, 2025",
                        logo: "💹",
                      },
                      {
                        name: "BlockChain Solutions",
                        type: "SME",
                        status: "pending",
                        users: 0,
                        volume: "$0",
                        created: "Sep 28, 2025",
                        logo: "⛓️",
                      },
                      {
                        name: "Digital Payments Co",
                        type: "Startup",
                        status: "suspended",
                        users: 234,
                        volume: "$45K",
                        created: "May 12, 2025",
                        logo: "💳",
                      },
                    ].map((org, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{org.logo}</span>
                            <div>
                              <p className="font-medium">{org.name}</p>
                              <p className="text-xs text-gray-400">
                                org_{Math.random().toString(36).substr(2, 9)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                            {org.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              org.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : org.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {org.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {org.users.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[#66a3ff]">
                            {org.volume}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {org.created}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-4 py-2 bg-[#007acc]/20 hover:bg-[#007acc]/30 text-[#66a3ff] rounded-lg text-sm font-medium transition-colors">
                              View
                            </button>
                            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing 1-6 of 156 organizations
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#007acc] rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users Page */}
          {activePage === "users" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Users",
                    value: "12,458",
                    icon: <Users className="w-5 h-5" />,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "Active Today",
                    value: "3,421",
                    icon: <Activity className="w-5 h-5" />,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "KYC Verified",
                    value: "9,876",
                    icon: <CheckCircle className="w-5 h-5" />,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    label: "Pending KYC",
                    value: "234",
                    icon: <Clock className="w-5 h-5" />,
                    color: "from-yellow-500 to-orange-500",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6"
                  >
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50"
                  />
                </div>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Organizations</option>
                  <option>Acme Corp</option>
                  <option>FinTech Inc</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>KYC: All</option>
                  <option>Verified</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800/50 border-b border-[#007acc]/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Organization
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        KYC
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Wallets
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Last Active
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      {
                        name: "John Doe",
                        email: "john@acme.com",
                        org: "Acme Corp",
                        status: "active",
                        kyc: "verified",
                        wallets: 2,
                        lastActive: "5 min ago",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane@fintech.com",
                        org: "FinTech Inc",
                        status: "active",
                        kyc: "verified",
                        wallets: 1,
                        lastActive: "2 hours ago",
                      },
                      {
                        name: "Bob Johnson",
                        email: "bob@gameco.com",
                        org: "GameCo",
                        status: "active",
                        kyc: "pending",
                        wallets: 3,
                        lastActive: "1 day ago",
                      },
                      {
                        name: "Alice Williams",
                        email: "alice@crypto.com",
                        org: "CryptoTraders",
                        status: "active",
                        kyc: "verified",
                        wallets: 1,
                        lastActive: "3 hours ago",
                      },
                      {
                        name: "Charlie Brown",
                        email: "charlie@block.com",
                        org: "BlockChain Sol",
                        status: "suspended",
                        kyc: "rejected",
                        wallets: 0,
                        lastActive: "5 days ago",
                      },
                    ].map((user, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#66a3ff] to-[#007acc] rounded-full flex items-center justify-center font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{user.org}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.kyc === "verified"
                                ? "bg-green-500/20 text-green-400"
                                : user.kyc === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {user.kyc}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {user.wallets}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-4 py-2 bg-[#007acc]/20 hover:bg-[#007acc]/30 text-[#66a3ff] rounded-lg text-sm font-medium transition-colors">
                              View
                            </button>
                            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing 1-5 of 12,458 users
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#007acc] rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Wallets Page */}
          {activePage === "wallets" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Wallets",
                    value: "8,234",
                    icon: <Wallet className="w-5 h-5" />,
                    color: "from-indigo-500 to-blue-500",
                  },
                  {
                    label: "Total Balance",
                    value: "$12.5M",
                    icon: <DollarSign className="w-5 h-5" />,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "Active Wallets",
                    value: "7,890",
                    icon: <CheckCircle className="w-5 h-5" />,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Frozen Wallets",
                    value: "12",
                    icon: <AlertCircle className="w-5 h-5" />,
                    color: "from-red-500 to-rose-500",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6"
                  >
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by address or user..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50"
                  />
                </div>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Types</option>
                  <option>User Wallet</option>
                  <option>Organization</option>
                  <option>Treasury</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Assets</option>
                  <option>APT</option>
                  <option>USDC</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Frozen</option>
                </select>
              </div>

              {/* Wallets Table */}
              <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800/50 border-b border-[#007acc]/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Wallet Address
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Organization
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Balance
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      {
                        address: "0x1234...abcd",
                        type: "User",
                        org: "Acme Corp",
                        user: "John Doe",
                        balance: "1,250 APT",
                        status: "active",
                      },
                      {
                        address: "0x5678...ef01",
                        type: "User",
                        org: "FinTech Inc",
                        user: "Jane Smith",
                        balance: "850 APT",
                        status: "active",
                      },
                      {
                        address: "0x9abc...2345",
                        type: "Organization",
                        org: "GameCo",
                        user: "-",
                        balance: "5,000 APT",
                        status: "active",
                      },
                      {
                        address: "0xdef0...6789",
                        type: "Treasury",
                        org: "Acme Corp",
                        user: "-",
                        balance: "10,000 APT",
                        status: "active",
                      },
                      {
                        address: "0x3456...bcde",
                        type: "User",
                        org: "CryptoTraders",
                        user: "Bob Johnson",
                        balance: "450 APT",
                        status: "frozen",
                      },
                    ].map((wallet, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <code className="text-[#66a3ff] font-mono text-sm">
                            {wallet.address}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                            {wallet.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {wallet.org}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {wallet.user}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[#66a3ff]">
                            {wallet.balance}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              wallet.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {wallet.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-4 py-2 bg-[#007acc]/20 hover:bg-[#007acc]/30 text-[#66a3ff] rounded-lg text-sm font-medium transition-colors">
                              View
                            </button>
                            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing 1-5 of 8,234 wallets
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#007acc] rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Page */}
          {activePage === "transactions" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Today Volume",
                    value: "$450K",
                    icon: <DollarSign className="w-5 h-5" />,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    label: "Pending",
                    value: "15",
                    icon: <Clock className="w-5 h-5" />,
                    color: "from-yellow-500 to-orange-500",
                  },
                  {
                    label: "Failed (24h)",
                    value: "3",
                    icon: <AlertCircle className="w-5 h-5" />,
                    color: "from-red-500 to-rose-500",
                  },
                  {
                    label: "Avg Confirmation",
                    value: "45s",
                    icon: <Activity className="w-5 h-5" />,
                    color: "from-blue-500 to-cyan-500",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6"
                  >
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by TX ID or address..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50"
                  />
                </div>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Organizations</option>
                  <option>Acme Corp</option>
                  <option>FinTech Inc</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                  <option>Flagged</option>
                </select>
                <select className="px-4 py-2 bg-gray-800 border border-[#007acc]/20 rounded-lg text-sm">
                  <option>All Assets</option>
                  <option>APT</option>
                  <option>USDC</option>
                </select>
              </div>

              {/* Transactions Table */}
              <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800/50 border-b border-[#007acc]/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        TX ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Organization
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        From → To
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      {
                        id: "tx_abc123",
                        time: "2 min ago",
                        org: "Acme Corp",
                        from: "0x12...34",
                        to: "0x56...78",
                        amount: "100 APT",
                        status: "confirmed",
                      },
                      {
                        id: "tx_def456",
                        time: "5 min ago",
                        org: "FinTech Inc",
                        from: "0xab...cd",
                        to: "0xef...01",
                        amount: "50 USDC",
                        status: "pending",
                      },
                      {
                        id: "tx_ghi789",
                        time: "10 min ago",
                        org: "GameCo",
                        from: "0x23...45",
                        to: "0x67...89",
                        amount: "25 APT",
                        status: "flagged",
                      },
                      {
                        id: "tx_jkl012",
                        time: "15 min ago",
                        org: "CryptoTraders",
                        from: "0x9a...bc",
                        to: "0xde...f0",
                        amount: "75 APT",
                        status: "confirmed",
                      },
                      {
                        id: "tx_mno345",
                        time: "20 min ago",
                        org: "Acme Corp",
                        from: "0x12...34",
                        to: "0x98...76",
                        amount: "200 USDC",
                        status: "failed",
                      },
                    ].map((tx, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <code className="text-[#66a3ff] font-mono text-sm">
                            {tx.id}
                          </code>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {tx.time}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{tx.org}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <code className="text-gray-400">{tx.from}</code>
                            <span className="text-gray-600">→</span>
                            <code className="text-gray-400">{tx.to}</code>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[#66a3ff]">
                            {tx.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              tx.status === "confirmed"
                                ? "bg-green-500/20 text-green-400"
                                : tx.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : tx.status === "flagged"
                                    ? "bg-orange-500/20 text-orange-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-4 py-2 bg-[#007acc]/20 hover:bg-[#007acc]/30 text-[#66a3ff] rounded-lg text-sm font-medium transition-colors">
                              View
                            </button>
                            {tx.status === "flagged" && (
                              <button className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-sm font-medium transition-colors">
                                Review
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing 1-5 of 45,678 transactions
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#007acc] rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Treasury Page */}
          {activePage === "treasury" && (
            <div className="space-y-6">
              {/* Platform Treasury Overview */}
              <div className="bg-gradient-to-br from-[#007acc]/20 to-[#007acc]/5 border border-[#007acc]/30 rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Platform Treasury
                    </h3>
                    <p className="text-gray-400">
                      Total balance across all treasury wallets
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#007acc] hover:bg-[#00509e] rounded-lg font-medium transition-colors">
                    <Plus className="w-4 h-4" />
                    New Treasury Wallet
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/30 backdrop-blur-sm border border-[#007acc]/20 rounded-lg p-6">
                    <p className="text-sm text-gray-400 mb-2">
                      Total Balance (USD)
                    </p>
                    <p className="text-4xl font-bold text-[#66a3ff] mb-1">
                      $2.5M
                    </p>
                    <p className="text-sm text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +12.5% this month
                    </p>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm border border-[#007acc]/20 rounded-lg p-6">
                    <p className="text-sm text-gray-400 mb-2">APT Holdings</p>
                    <p className="text-4xl font-bold mb-1">1.2M APT</p>
                    <p className="text-sm text-gray-400">≈ $1.8M USD</p>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm border border-[#007acc]/20 rounded-lg p-6">
                    <p className="text-sm text-gray-400 mb-2">USDC Holdings</p>
                    <p className="text-4xl font-bold mb-1">$700K</p>
                    <p className="text-sm text-gray-400">Stablecoin reserves</p>
                  </div>
                </div>
              </div>

              {/* Treasury Breakdown */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Asset Distribution */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-6">Asset Distribution</h3>
                  <div className="space-y-4">
                    {[
                      {
                        asset: "APT",
                        amount: "1.2M",
                        value: "$1.8M",
                        percentage: 72,
                      },
                      {
                        asset: "USDC",
                        amount: "700K",
                        value: "$700K",
                        percentage: 28,
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#66a3ff] to-[#007acc] rounded-full flex items-center justify-center font-bold">
                              {item.asset.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{item.asset}</p>
                              <p className="text-xs text-gray-400">
                                {item.amount}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#66a3ff]">
                              {item.value}
                            </p>
                            <p className="text-xs text-gray-400">
                              {item.percentage}%
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#66a3ff] to-[#007acc] h-2 rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Treasury Activity */}
                <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      {
                        type: "deposit",
                        org: "Acme Corp",
                        amount: "+50K APT",
                        time: "2 hours ago",
                        color: "text-green-400",
                      },
                      {
                        type: "withdrawal",
                        org: "FinTech Inc",
                        amount: "-25K USDC",
                        time: "5 hours ago",
                        color: "text-red-400",
                      },
                      {
                        type: "rebalance",
                        org: "Platform",
                        amount: "100K APT",
                        time: "1 day ago",
                        color: "text-blue-400",
                      },
                      {
                        type: "deposit",
                        org: "GameCo",
                        amount: "+30K APT",
                        time: "2 days ago",
                        color: "text-green-400",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === "deposit"
                                ? "bg-green-500"
                                : activity.type === "withdrawal"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                            }`}
                          ></div>
                          <div>
                            <p className="font-medium capitalize">
                              {activity.type}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.org}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${activity.color}`}>
                            {activity.amount}
                          </p>
                          <p className="text-xs text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Organization Treasury Wallets */}
              <div className="bg-gray-900 border border-[#007acc]/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">
                    Organization Treasury Wallets
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50 border-b border-[#007acc]/20">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                          Organization
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                          Treasury Wallet
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                          APT Balance
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                          USDC Balance
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                          Last Updated
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[
                        {
                          org: "Acme Corporation",
                          address: "0x1234...abcd",
                          apt: "50,000",
                          usdc: "25,000",
                          updated: "2 min ago",
                          logo: "🏢",
                        },
                        {
                          org: "FinTech Innovations",
                          address: "0x5678...ef01",
                          apt: "35,000",
                          usdc: "40,000",
                          updated: "15 min ago",
                          logo: "🏦",
                        },
                        {
                          org: "GameCo Studios",
                          address: "0x9abc...2345",
                          apt: "28,000",
                          usdc: "15,000",
                          updated: "1 hour ago",
                          logo: "🎮",
                        },
                        {
                          org: "CryptoTraders Inc",
                          address: "0xdef0...6789",
                          apt: "42,000",
                          usdc: "30,000",
                          updated: "3 hours ago",
                          logo: "💹",
                        },
                      ].map((treasury, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{treasury.logo}</span>
                              <div>
                                <p className="font-medium">{treasury.org}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-[#66a3ff] font-mono text-sm">
                              {treasury.address}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold">
                              {treasury.apt} APT
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold">
                              ${treasury.usdc}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {treasury.updated}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="px-4 py-2 bg-[#007acc]/20 hover:bg-[#007acc]/30 text-[#66a3ff] rounded-lg text-sm font-medium transition-colors">
                                Manage
                              </button>
                              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Treasury Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <button className="p-6 bg-gray-900 border border-[#007acc]/20 rounded-xl hover:border-[#007acc]/50 transition-all text-left group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <ArrowLeftRight className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-bold">Rebalance</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Rebalance treasury assets across organizations
                  </p>
                </button>

                <button className="p-6 bg-gray-900 border border-[#007acc]/20 rounded-xl hover:border-[#007acc]/50 transition-all text-left group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-bold">Investment</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Execute treasury investment strategies
                  </p>
                </button>

                <button className="p-6 bg-gray-900 border border-[#007acc]/20 rounded-xl hover:border-[#007acc]/50 transition-all text-left group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-bold">Analytics</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    View detailed treasury analytics and reports
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for remaining pages */}
          {![
            "overview",
            "organizations",
            "users",
            "wallets",
            "transactions",
            "treasury",
          ].includes(activePage) && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {navigation.find((n) => n.id === activePage)?.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {navigation.find((n) => n.id === activePage)?.label}
                </h3>
                <p className="text-gray-400">
                  This page will be implemented next
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
