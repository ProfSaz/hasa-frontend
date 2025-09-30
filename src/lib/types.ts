// src/lib/types.ts

// --- Data Interfaces for Platform Admin Dashboard ---

export interface KpiMetrics {
  totalRevenueLTM: string; // Last Twelve Months
  newOrganizations30Days: number;
  totalWalletsCreated: number;
  transactionVolume24h: string; // As string for precision
}

export interface ChartDataPoint {
  date: string; // e.g., "2023-10-26"
  value: number;
}

export interface ComplianceAlert {
  id: string;
  organizationId: string;
  organizationName: string;
  riskScore: number;
  flagType: string; // e.g., "Large Transaction", "Failed KYC"
  timestamp: string; // ISO string
  description: string;
}

export interface SystemStatus {
  overall: 'operational' | 'degraded' | 'major_outage';
  aptosBlockchain: 'active' | 'lagging' | 'down';
  mongoDB: 'active' | 'degraded' | 'down';
  // Add other critical services here
}

export interface PlatformDashboardData {
  kpis: KpiMetrics;
  transactionVolumeData: ChartDataPoint[]; // For line chart
  organizationGrowthData: ChartDataPoint[]; // For bar chart (e.g., monthly sign-ups)
  systemStatus: SystemStatus;
  criticalComplianceAlerts: ComplianceAlert[];
}

// --- General API Response Types (examples) ---

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
}

// Example for an Organization entity (simplified for frontend view)
export interface Organization {
  id: string;
  displayName: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  createdAt: string;
  // ... other fields as needed for admin views
}

// Example for a User entity (simplified for frontend view)
export interface User {
  id: string;
  organizationId: string;
  email: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  // ...
}

// Example for a Wallet entity (simplified for frontend view)
export interface Wallet {
  id: string;
  aptosAddress: string;
  organizationId: string;
  userId?: string;
  balance: string; // APT balance
  // ...
}