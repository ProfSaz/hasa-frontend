"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  Book,
  Key,
  Users,
  Wallet,
  ArrowLeftRight,
  Settings,
  Shield,
  Zap,
} from "lucide-react";

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeEndpoint, setActiveEndpoint] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | number | null>(null);
  const [activeTab, setActiveTab] = useState("curl");
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Map section names to first endpoint IDs
      const sectionMapping: Record<string, string> = {
        "getting-started": "introduction",
        organization: "org-profile",
        users: "users-create",
        wallets: "wallets-create",
        transactions: "tx-transfer",
      };

      // Check if hash is a section or direct endpoint
      const targetId = sectionMapping[hash] || hash;

      if (endpoints[targetId]) {
        setActiveSection(targetId);
        setActiveEndpoint(targetId);
      }
    }
  }, []);

  const copyToClipboard = (code: string, id: string | number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navigation = [
    {
      title: "Getting Started",
      icon: <Book className="w-4 h-4" />,
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "authentication", label: "Authentication" },
        // { id: 'quick-start', label: 'Quick Start' },
        // { id: 'environments', label: 'Environments' },
      ],
    },
    {
      title: "Organization API",
      icon: <Settings className="w-4 h-4" />,
      items: [
        { id: "org-profile", label: "Get Profile" },
        { id: "org-settings", label: "Update Settings" },
        { id: "org-limits", label: "Get Limits" },
        { id: "org-api-keys", label: "Manage API Keys" },
        { id: "org-metrics", label: "Get Metrics" },
      ],
    },
    {
      title: "Users API",
      icon: <Users className="w-4 h-4" />,
      items: [
        { id: "users-create", label: "Create User" },
        { id: "users-list", label: "List Users" },
        { id: "users-get", label: "Get User" },
        { id: "users-update", label: "Update User" },
        { id: "users-delete", label: "Delete User" },
        { id: "users-freeze", label: "Freeze/Unfreeze User" },
        { id: "users-wallet", label: "Get User Wallet" },
      ],
    },
    {
      title: "Wallets API",
      icon: <Wallet className="w-4 h-4" />,
      items: [
        { id: "wallets-create", label: "Create Wallet" },
        { id: "wallets-list", label: "List Wallets" },
        { id: "wallets-get", label: "Get Wallet" },
        { id: "wallets-user", label: "Get User Wallets" },
        { id: "wallets-sync", label: "Sync Balance" },
        { id: "wallets-transfer", label: "Transfer Funds" },
        { id: "wallets-status", label: "Update Status" },
      ],
    },
    {
      title: "Transactions API",
      icon: <ArrowLeftRight className="w-4 h-4" />,
      items: [
        { id: "tx-transfer", label: "Process Transfer" },
        { id: "tx-list", label: "List Transactions" },
        { id: "tx-get", label: "Get Transaction" },
        { id: "tx-wallet", label: "Wallet Transactions" },
        { id: "tx-stats", label: "Transaction Stats" },
      ],
    },
  ];

  const endpoints: Record<string, any> = {
    // Getting Started
    introduction: {
      title: "Introduction",
      description:
        "Welcome to HASA API documentation. Our API allows you to integrate Aptos wallet infrastructure into your application with ease.",
      content: `
## Overview

HASA provides a comprehensive Wallet-as-a-Service platform built on Aptos blockchain. Our API enables you to:

- Create and manage user wallets
- Process blockchain transactions
- Monitor balances and transaction history
- Implement compliance workflows
- Access real-time analytics

## Base URL

**Production:** \`https://api.hasa.io\`
**Sandbox:** \`https://sandbox-api.hasa.io\`

## Rate Limits

- **Standard:** 100 requests per minute
- **Enterprise:** Custom limits available

## Support

Need help? Contact us at support@hasa.io or visit our support portal.
      `,
    },
    authentication: {
      title: "Authentication",
      description:
        "Learn how to authenticate your API requests using API keys and HMAC signatures.",
      method: "POST",
      endpoint: "/api/v1/*",
      content: `
## API Key Authentication

All API requests must be authenticated using your API key pair:

- **Public Key:** \`pk_xxxxxxxxxxxxx\` (safe to expose)
- **Secret Key:** \`sk_xxxxxxxxxxxxx\` (keep secure, never expose)

## Request Headers

Every request must include:

\`\`\`
x-api-key: your_public_key
x-api-secret: your_secret_key
x-timestamp: 1640995200
x-signature: hmac_signature
\`\`\`

## HMAC Signature

Generate signature using:
\`\`\`
HMAC-SHA256(timestamp + method + path + body, secret_key)
\`\`\`

## Example
      `,
      code: {
        curl: `curl -X POST https://api.hasa.io/api/v1/users \\
  -H "x-api-key: pk_your_public_key" \\
  -H "x-api-secret: sk_your_secret_key" \\
  -H "x-timestamp: 1640995200" \\
  -H "x-signature: your_hmac_signature" \\
  -H "Content-Type: application/json"`,
        javascript: `const axios = require('axios');
const crypto = require('crypto');

const apiKey = 'pk_your_public_key';
const apiSecret = 'sk_your_secret_key';
const timestamp = Date.now();

// Generate HMAC signature
const signature = crypto
  .createHmac('sha256', apiSecret)
  .update(timestamp + 'POST' + '/api/v1/users' + JSON.stringify(body))
  .digest('hex');

const response = await axios.post(
  'https://api.hasa.io/api/v1/users',
  body,
  {
    headers: {
      'x-api-key': apiKey,
      'x-api-secret': apiSecret,
      'x-timestamp': timestamp,
      'x-signature': signature
    }
  }
);`,
        python: `import requests
import hmac
import hashlib
import time

api_key = 'pk_your_public_key'
api_secret = 'sk_your_secret_key'
timestamp = str(int(time.time()))

# Generate HMAC signature
message = timestamp + 'POST' + '/api/v1/users' + json.dumps(body)
signature = hmac.new(
    api_secret.encode(),
    message.encode(),
    hashlib.sha256
).hexdigest()

response = requests.post(
    'https://api.hasa.io/api/v1/users',
    json=body,
    headers={
        'x-api-key': api_key,
        'x-api-secret': api_secret,
        'x-timestamp': timestamp,
        'x-signature': signature
    }
)`,
      },
    },

    // Organization APIs
    "org-profile": {
      title: "Get Organization Profile",
      description: "Retrieve your organization profile information",
      method: "GET",
      endpoint: "/api/v1/organization/profile",
      response: `{
  "id": "org_1234567890",
  "legalName": "Acme Corporation",
  "displayName": "Acme",
  "type": "ENTERPRISE",
  "status": "ACTIVE",
  "email": "contact@acme.com",
  "createdAt": "2025-01-15T10:30:00Z"
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/organization/profile \\
  -H "x-api-key: pk_your_key" \\
  -H "x-api-secret: sk_your_secret"`,
        javascript: `const response = await hasa.organization.getProfile();
console.log(response.data);`,
        python: `response = hasa.organization.get_profile()
print(response)`,
      },
    },
    "org-settings": {
      title: "Update Organization Settings",
      description: "Update your organization settings and preferences",
      method: "PATCH",
      endpoint: "/api/v1/organization/settings",
      request: `{
  "webhookUrl": "https://yourapp.com/webhooks",
  "autoConversion": true,
  "allowedAssets": ["APT", "USDC"]
}`,
      response: `{
  "success": true,
  "message": "Settings updated successfully"
}`,
      code: {
        curl: `curl -X PATCH https://api.hasa.io/api/v1/organization/settings \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_your_key" \\
  -d '{
    "webhookUrl": "https://yourapp.com/webhooks",
    "autoConversion": true
  }'`,
        javascript: `const response = await hasa.organization.updateSettings({
  webhookUrl: 'https://yourapp.com/webhooks',
  autoConversion: true
});`,
        python: `response = hasa.organization.update_settings({
    'webhook_url': 'https://yourapp.com/webhooks',
    'auto_conversion': True
})`,
      },
    },
    "org-limits": {
      title: "Get Organization Limits",
      description: "View your current usage limits and quotas",
      method: "GET",
      endpoint: "/api/v1/organization/limits",
      response: `{
  "transactionLimits": {
    "daily": 100000,
    "monthly": 3000000,
    "perTransaction": 50000,
    "used": {
      "daily": 45000,
      "monthly": 890000
    }
  },
  "userLimits": {
    "maxUsers": 10000,
    "currentUsers": 3542
  }
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/organization/limits \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const limits = await hasa.organization.getLimits();`,
        python: `limits = hasa.organization.get_limits()`,
      },
    },
    "org-api-keys": {
      title: "Get API Keys",
      description: "Retrieve your API keys information",
      method: "GET",
      endpoint: "/api/v1/organization/api-keys",
      response: `{
  "publicKey": "pk_1234567890abcdef",
  "environment": "PRODUCTION",
  "lastUsedAt": "2025-09-30T01:45:00Z",
  "lastKeyRotation": "2025-08-15T10:00:00Z"
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/organization/api-keys \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const keys = await hasa.organization.getApiKeys();`,
        python: `keys = hasa.organization.get_api_keys()`,
      },
    },

    // Users APIs
    "users-create": {
      title: "Create User",
      description: "Create a new user in your organization",
      method: "POST",
      endpoint: "/api/v1/users",
      request: `{
  "externalUserId": "user_abc123",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US"
  }
}`,
      response: `{
  "id": "usr_9876543210",
  "externalUserId": "user_abc123",
  "organizationId": "org_1234567890",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  "status": "ACTIVE",
  "createdAt": "2025-09-30T02:00:00Z"
}`,
      code: {
        curl: `curl -X POST https://api.hasa.io/api/v1/users \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_your_key" \\
  -d '{
    "externalUserId": "user_abc123",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }'`,
        javascript: `const user = await hasa.users.create({
  externalUserId: 'user_abc123',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  }
});`,
        python: `user = hasa.users.create({
    'external_user_id': 'user_abc123',
    'profile': {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com'
    }
})`,
      },
    },
    "users-list": {
      title: "List Users",
      description: "Get a paginated list of all users in your organization",
      method: "GET",
      endpoint: "/api/v1/users?page=1&limit=20",
      response: `{
  "data": [
    {
      "id": "usr_9876543210",
      "externalUserId": "user_abc123",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      },
      "status": "ACTIVE",
      "createdAt": "2025-09-30T02:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}`,
      code: {
        curl: `curl -X GET "https://api.hasa.io/api/v1/users?page=1&limit=20" \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const users = await hasa.users.list({ page: 1, limit: 20 });`,
        python: `users = hasa.users.list(page=1, limit=20)`,
      },
    },
    "users-get": {
      title: "Get User",
      description: "Retrieve details of a specific user",
      method: "GET",
      endpoint: "/api/v1/users/:userId",
      response: `{
  "id": "usr_9876543210",
  "externalUserId": "user_abc123",
  "organizationId": "org_1234567890",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US"
  },
  "walletIds": ["wlt_abc123", "wlt_def456"],
  "status": "ACTIVE",
  "kycStatus": "VERIFIED",
  "createdAt": "2025-09-30T02:00:00Z",
  "lastActive": "2025-09-30T10:30:00Z"
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/users/usr_9876543210 \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const user = await hasa.users.get('usr_9876543210');`,
        python: `user = hasa.users.get('usr_9876543210')`,
      },
    },
    "users-wallet": {
      title: "Get User Wallet",
      description: "Retrieve wallet information for a specific user",
      method: "GET",
      endpoint: "/api/v1/users/:userId/wallet",
      response: `{
  "id": "wlt_abc123",
  "userId": "usr_9876543210",
  "aptosAddress": "0x1234567890abcdef...",
  "assets": [
    {
      "symbol": "APT",
      "balance": "1000.50",
      "frozenBalance": "0",
      "lastUpdated": "2025-09-30T10:30:00Z"
    },
    {
      "symbol": "USDC",
      "balance": "5000.00",
      "frozenBalance": "0",
      "lastUpdated": "2025-09-30T10:30:00Z"
    }
  ],
  "status": "ACTIVE"
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/users/usr_9876543210/wallet \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const wallet = await hasa.users.getWallet('usr_9876543210');`,
        python: `wallet = hasa.users.get_wallet('usr_9876543210')`,
      },
    },

    // Wallets APIs
    "wallets-create": {
      title: "Create Wallet",
      description: "Create a new wallet for your organization or a user",
      method: "POST",
      endpoint: "/api/v1/wallets",
      request: `{
  "type": "USER",
  "userId": "usr_9876543210",
  "label": "Main Wallet"
}`,
      response: `{
  "id": "wlt_abc123",
  "type": "USER",
  "userId": "usr_9876543210",
  "aptosAddress": "0x1234567890abcdef...",
  "assets": [],
  "status": "ACTIVE",
  "createdAt": "2025-09-30T02:00:00Z"
}`,
      code: {
        curl: `curl -X POST https://api.hasa.io/api/v1/wallets \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_your_key" \\
  -d '{
    "type": "USER",
    "userId": "usr_9876543210",
    "label": "Main Wallet"
  }'`,
        javascript: `const wallet = await hasa.wallets.create({
  type: 'USER',
  userId: 'usr_9876543210',
  label: 'Main Wallet'
});`,
        python: `wallet = hasa.wallets.create({
    'type': 'USER',
    'user_id': 'usr_9876543210',
    'label': 'Main Wallet'
})`,
      },
    },
    "wallets-list": {
      title: "List Wallets",
      description: "Get all wallets in your organization",
      method: "GET",
      endpoint: "/api/v1/wallets",
      response: `{
  "data": [
    {
      "id": "wlt_abc123",
      "type": "USER",
      "aptosAddress": "0x1234567890abcdef...",
      "assets": [
        {
          "symbol": "APT",
          "balance": "1000.50"
        }
      ],
      "status": "ACTIVE"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50
  }
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/wallets \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const wallets = await hasa.wallets.list();`,
        python: `wallets = hasa.wallets.list()`,
      },
    },
    "wallets-get": {
      title: "Get Wallet",
      description: "Retrieve details and balance of a specific wallet",
      method: "GET",
      endpoint: "/api/v1/wallets/:id",
      response: `{
  "id": "wlt_abc123",
  "type": "USER",
  "userId": "usr_9876543210",
  "aptosAddress": "0x1234567890abcdef...",
  "assets": [
    {
      "symbol": "APT",
      "balance": "1000.50",
      "frozenBalance": "0",
      "lastUpdated": "2025-09-30T10:30:00Z"
    }
  ],
  "status": "ACTIVE",
  "createdAt": "2025-09-30T02:00:00Z"
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/wallets/wlt_abc123 \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const wallet = await hasa.wallets.get('wlt_abc123');`,
        python: `wallet = hasa.wallets.get('wlt_abc123')`,
      },
    },
    "wallets-transfer": {
      title: "Transfer Funds",
      description: "Transfer funds between wallets",
      method: "POST",
      endpoint: "/api/v1/wallets/transfer",
      request: `{
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef1234567890...",
  "asset": "APT",
  "amount": "100.50",
  "description": "Payment for services"
}`,
      response: `{
  "transactionId": "tx_xyz789",
  "status": "PENDING",
  "hash": "0xtxhash...",
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef1234567890...",
  "amount": "100.50",
  "asset": "APT",
  "createdAt": "2025-09-30T10:30:00Z"
}`,
      code: {
        curl: `curl -X POST https://api.hasa.io/api/v1/wallets/transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_your_key" \\
  -d '{
    "fromWalletId": "wlt_abc123",
    "toAddress": "0xabcdef1234567890...",
    "asset": "APT",
    "amount": "100.50"
  }'`,
        javascript: `const tx = await hasa.wallets.transfer({
  fromWalletId: 'wlt_abc123',
  toAddress: '0xabcdef1234567890...',
  asset: 'APT',
  amount: '100.50'
});`,
        python: `tx = hasa.wallets.transfer({
    'from_wallet_id': 'wlt_abc123',
    'to_address': '0xabcdef1234567890...',
    'asset': 'APT',
    'amount': '100.50'
})`,
      },
    },
    "wallets-sync": {
      title: "Sync Wallet Balance",
      description: "Synchronize wallet balance with blockchain",
      method: "POST",
      endpoint: "/api/v1/wallets/:id/sync",
      response: `{
  "success": true,
  "wallet": {
    "id": "wlt_abc123",
    "assets": [
      {
        "symbol": "APT",
        "balance": "1050.75",
        "lastUpdated": "2025-09-30T10:35:00Z"
      }
    ]
  }
}`,
      code: {
        curl: `curl -X POST https://api.hasa.io/api/v1/wallets/wlt_abc123/sync \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const result = await hasa.wallets.sync('wlt_abc123');`,
        python: `result = hasa.wallets.sync('wlt_abc123')`,
      },
    },

    // Transactions APIs
    "tx-transfer": {
      title: "Process Transfer",
      description: "Create and process a blockchain transfer",
      method: "POST",
      endpoint: "/api/v1/transactions/process-transfer",
      request: `{
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef1234567890...",
  "asset": "APT",
  "amount": "50.25",
  "externalReference": "order_12345"
}`,
      response: `{
  "id": "tx_xyz789",
  "type": "TRANSFER",
  "status": "PENDING",
  "hash": "0xtxhash...",
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef1234567890...",
  "asset": {
    "symbol": "APT",
    "amount": "50.25"
  },
  "createdAt": "2025-09-30T10:30:00Z"
}`,
      code: {
        curl: `curl -X POST https://api.hasa.io/api/v1/transactions/process-transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_your_key" \\
  -d '{
    "fromWalletId": "wlt_abc123",
    "toAddress": "0xabcdef...",
    "asset": "APT",
    "amount": "50.25"
  }'`,
        javascript: `const tx = await hasa.transactions.processTransfer({
  fromWalletId: 'wlt_abc123',
  toAddress: '0xabcdef...',
  asset: 'APT',
  amount: '50.25'
});`,
        python: `tx = hasa.transactions.process_transfer({
    'from_wallet_id': 'wlt_abc123',
    'to_address': '0xabcdef...',
    'asset': 'APT',
    'amount': '50.25'
})`,
      },
    },
    "tx-list": {
      title: "List Transactions",
      description: "Get all transactions for your organization",
      method: "GET",
      endpoint: "/api/v1/transactions",
      response: `{
  "data": [
    {
      "id": "tx_xyz789",
      "type": "TRANSFER",
      "status": "CONFIRMED",
      "hash": "0xtxhash...",
      "amount": "50.25",
      "asset": "APT",
      "createdAt": "2025-09-30T10:30:00Z",
      "confirmedAt": "2025-09-30T10:31:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500
  }
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/transactions \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const transactions = await hasa.transactions.list();`,
        python: `transactions = hasa.transactions.list()`,
      },
    },
    "tx-get": {
      title: "Get Transaction",
      description: "Retrieve details of a specific transaction",
      method: "GET",
      endpoint: "/api/v1/transactions/:id",
      response: `{
  "id": "tx_xyz789",
  "type": "TRANSFER",
  "status": "CONFIRMED",
  "hash": "0xtxhash...",
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef...",
  "asset": {
    "symbol": "APT",
    "amount": "50.25",
    "usdValue": 502.50
  },
  "blockchain": {
    "confirmations": 15,
    "blockNumber": 12345678,
    "gasUsed": "0.001"
  },
  "fees": {
    "networkFee": "0.001",
    "platformFee": "0.00025",
    "totalFee": "0.00125"
  },
  "createdAt": "2025-09-30T10:30:00Z",
  "confirmedAt": "2025-09-30T10:31:00Z"
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/transactions/tx_xyz789 \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const tx = await hasa.transactions.get('tx_xyz789');`,
        python: `tx = hasa.transactions.get('tx_xyz789')`,
      },
    },
    "tx-stats": {
      title: "Transaction Stats",
      description: "Get transaction statistics and summary",
      method: "GET",
      endpoint: "/api/v1/transactions/stats/summary",
      response: `{
  "totalVolume": {
    "APT": "50000.50",
    "USDC": "250000.00"
  },
  "totalTransactions": 1250,
  "successRate": 98.5,
  "averageConfirmationTime": "45s",
  "pending": 5,
  "failed": 12
}`,
      code: {
        curl: `curl -X GET https://api.hasa.io/api/v1/transactions/stats/summary \\
  -H "x-api-key: pk_your_key"`,
        javascript: `const stats = await hasa.transactions.getStats();`,
        python: `stats = hasa.transactions.get_stats()`,
      },
    },
  };

  const filteredNavigation = navigation
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0);

  const currentEndpoint = endpoints[activeEndpoint || activeSection];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#007acc]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-[#66a3ff] to-[#007acc] bg-clip-text text-transparent"
              >
                HASA
              </a>
              <span className="text-gray-400">API Documentation</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-[#007acc]/10 border border-[#007acc]/30 rounded text-[#66a3ff] text-sm">
                v1.0
              </span>
              <a href="/" className="text-gray-400 hover:text-[#66a3ff]">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-[#007acc]/20 overflow-y-auto">
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-[#007acc]/20 rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50"
              />
            </div>

            {/* Navigation */}
            {/* Navigation */}
            <nav className="space-y-6">
              {filteredNavigation.map((section, idx) => {
                const isCollapsed = collapsedSections.includes(section.title);

                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        setCollapsedSections((prev) =>
                          prev.includes(section.title)
                            ? prev.filter((s) => s !== section.title)
                            : [...prev, section.title],
                        );
                      }}
                      className="w-full flex items-center justify-between gap-2 text-gray-400 text-xs font-semibold uppercase mb-3 hover:text-[#66a3ff] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {section.icon}
                        <span>{section.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${!isCollapsed ? "rotate-90" : ""}`}
                      />
                    </button>

                    {!isCollapsed && (
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => {
                                setActiveSection(item.id);
                                setActiveEndpoint(item.id);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                activeEndpoint === item.id ||
                                activeSection === item.id
                                  ? "bg-[#007acc]/20 text-[#66a3ff]"
                                  : "text-gray-400 hover:text-white hover:bg-gray-900"
                              }`}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {currentEndpoint && (
            <div className="max-w-4xl">
              {/* Endpoint Header */}
              <div className="mb-8">
                {currentEndpoint.method && (
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-lg font-mono text-sm font-semibold ${
                        currentEndpoint.method === "GET"
                          ? "bg-green-500/20 text-green-400"
                          : currentEndpoint.method === "POST"
                            ? "bg-blue-500/20 text-blue-400"
                            : currentEndpoint.method === "PATCH"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : currentEndpoint.method === "PUT"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {currentEndpoint.method}
                    </span>
                    <code className="text-[#66a3ff] font-mono">
                      {currentEndpoint.endpoint}
                    </code>
                  </div>
                )}
                <h1 className="text-4xl font-bold mb-4">
                  {currentEndpoint.title}
                </h1>
                <p className="text-xl text-gray-400">
                  {currentEndpoint.description}
                </p>
              </div>

              {/* Content */}
              {currentEndpoint.content && (
                <div className="prose prose-invert max-w-none mb-8">
                  <div className="text-gray-300 whitespace-pre-wrap">
                    {currentEndpoint.content}
                  </div>
                </div>
              )}

              {/* Request Body */}
              {currentEndpoint.request && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Request Body</h3>
                  <div className="bg-gray-900 border border-[#007acc]/20 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{currentEndpoint.request}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Code Examples */}
              {currentEndpoint.code && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Code Examples</h3>

                  {/* Tabs */}
                  <div className="flex gap-2 mb-4">
                    {["curl", "javascript", "python"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          activeTab === lang
                            ? "bg-[#007acc] text-white"
                            : "bg-gray-900 text-gray-400 hover:text-white"
                        }`}
                      >
                        {lang === "curl"
                          ? "cURL"
                          : lang === "javascript"
                            ? "JavaScript"
                            : "Python"}
                      </button>
                    ))}
                  </div>

                  {/* Code Block */}
                  <div className="relative bg-gray-900 border border-[#007acc]/20 rounded-lg">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          currentEndpoint.code[activeTab],
                          activeTab,
                        )
                      }
                      className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copiedCode === activeTab ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                      <code>{currentEndpoint.code[activeTab]}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Response */}
              {currentEndpoint.response && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Response</h3>
                  <div className="relative bg-gray-900 border border-[#007acc]/20 rounded-lg">
                    <button
                      onClick={() =>
                        copyToClipboard(currentEndpoint.response, "response")
                      }
                      className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copiedCode === "response" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                      <code>{currentEndpoint.response}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-8 border-t border-[#007acc]/20">
                <a
                  href="#"
                  className="text-[#66a3ff] hover:text-[#007acc] flex items-center gap-2"
                >
                  Need help? Contact Support
                </a>
                <a
                  href="#"
                  className="text-[#66a3ff] hover:text-[#007acc] flex items-center gap-2"
                >
                  Report an Issue
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
