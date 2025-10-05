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
      const sectionMapping: Record<string, string> = {
        "getting-started": "introduction",
        organization: "org-profile",
        users: "users-create",
        wallets: "wallets-create",
        transactions: "tx-transfer",
      };
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
        { id: "users-transfer", label: " User Transfer" },
        { id: "users-wallet", label: "Get User Wallet" },
      ],
    },
    {
      title: "Wallets API",
      icon: <Wallet className="w-4 h-4" />,
      items: [
        { id: "org-wallet", label: "Get All Orgs wallet" },
        {id: "wallet-create", label: "Create Wallet For Users"},
        { id: "wallets-get", label: "Get Wallet by ID" },
        { id: "wallets-user", label: "Get User Wallets" },
        { id: "wallets-sync", label: "Sync Balance" },
        { id: "wallet-assets", label: "Get Wallet Assets Balance" },
        { id: "wallet-status", label: "Update Wallet Status"}
      ],
    },
    {
      title: "Transactions API",
      icon: <ArrowLeftRight className="w-4 h-4" />,
      items: [
        { id: "tx-org-transfer", label: "Get Org Transactions" },
        { id: "tx-get", label: "Get Transaction" },
        { id: "tx-wallet", label: "Wallet Transactions" },
        { id: "tx-stats", label: "Transaction Stats" },
      ],
    },
  ];

  const endpoints: Record<string, any> = {
    introduction: {
      title: "Introduction",
      description:
        "Welcome to HASA API documentation. Our API allows you to integrate Aptos wallet infrastructure into your application with ease.",
      content: `
## Overview
HASA provides a comprehensive Wallet-as-a-Service platform built on Aptos blockchain. Our API enables you to:
- Create and manage user wallets
- Create and manage Organization treasury and payment wallets
- Process blockchain transactions
- Monitor balances and transaction history
- Access real-time analytics

## Base URL
**Sandbox:** https://aptos-wallet-infa.onrender.com 

## Support
Need help? Contact on X/Twitter at @prof_saz.
      `,
    },
    authentication: {
      title: "Authentication",
      description:
        "Learn how to authenticate your API requests using API keys and HMAC signatures.",
      method: "",
      endpoint: "",
      content: `
## API Key Authentication
All API requests must be authenticated using your API key pair. We're still on testnet, so below you can copy already created test organizations API key pair to test using Postman or code.

**Test Key Pairs (Sandbox):**
- Pair 1: Public \`pk_5fb7588df8574cc1b357bc969aaaae43\` Secret \`sk_16c43ae06ff34558ae70557b5d81872a\`
- Pair 2: Public \`pk_3db45bb9cac949dab1fb7bc0b53943a6\` Secret \`sk_ba9b8245b2d744719a6e759d4c8f2c29\`
- Pair 3: Public \`pk_9f8e7d6c5b4a3210987654321fedcba\` Secret \`sk_0a1b2c3d4e5f67890123456789abcdef\`

## Request Headers
Every request must include:
\`\`\`
x-api-key: your_public_key
x-timestamp: 1640995200
x-signature: hmac_signature
\`\`\`

## HMAC Signature
Generate signature using:
\`\`\`
HMAC-SHA256(timestamp + method + fullPath + canonicalBody)
- **timestamp**: Unix seconds (e.g., \`Math.floor(Date.now() / 1000)\`)
- **method**: Uppercase HTTP method (e.g., \`POST\`)
- **fullPath**: Path + query string if present (e.g., \`/api/v1/users?page=1\`)
- **canonicalBody**: Sorted JSON string (keys alphabetically, recursively) or empty \`{}\` if no body. For form/urlencoded, sorted params.
\`\`\`

## Postman Setup (Recommended for Testing)
1. Create a Postman environment and set vars: \`HMAC_PUBLIC_KEY\` (public key) and \`HMAC_SECRET_KEY\` (secret key).
2. Paste the pre-request script below into your **Collection** (or request) Pre-request Script tab.
3. The script auto-generates timestamp, canonical body (handles JSON/form/urlencoded with key sorting), string-to-sign, and HMAC (requires CryptoJS—install via Postman extensions if needed).
4. Hit send, headers are set automatically!


### Pre-request Script
\`\`\`javascript
// =====================
// Postman Pre-request Script for HMAC Authentication
// =====================
// --- ENVIRONMENT VARIABLES ---
// Set in Postman environment:
// HMAC_PUBLIC_KEY
// HMAC_SECRET_KEY
const publicKey = pm.environment.get("HMAC_PUBLIC_KEY");
const secretKey = pm.environment.get("HMAC_SECRET_KEY");
if (!publicKey || !secretKey) {
    throw new Error("Missing HMAC keys! Please set HMAC_PUBLIC_KEY and HMAC_SECRET_KEY in your Postman environment.");
}
// --- TIMESTAMP ---
const timestamp = Math.floor(Date.now() / 1000).toString();
// --- REQUEST INFO ---
const method = pm.request.method.toUpperCase();
const path = pm.request.url.getPath();
const queryString = pm.request.url.getQueryString();
const fullPath = queryString ? path + "?" + queryString : path;
// --- HELPER: sort keys recursively ---
function sortKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(sortKeys);
    } else if (obj && typeof obj === "object") {
        return Object.keys(obj)
            .sort()
            .reduce((acc, key) => {
                acc[key] = sortKeys(obj[key]);
                return acc;
            }, {});
    }
    return obj;
}
// --- CANONICALIZE BODY ---
let canonicalBody = "";
if (pm.request.body) {
    if (pm.request.body.mode === "raw") {
        const raw = pm.request.body.raw || "";
        try {
            const parsed = JSON.parse(raw);
            canonicalBody = JSON.stringify(sortKeys(parsed));
        } catch {
            canonicalBody = raw.trim();
        }
    } else if (pm.request.body.mode === "urlencoded") {
        const params = {};
        pm.request.body.urlencoded.forEach((p) => {
            params[p.key] = p.value;
        });
        canonicalBody = new URLSearchParams(sortKeys(params)).toString();
    } else if (pm.request.body.mode === "formdata") {
        const params = {};
        pm.request.body.formdata.forEach((p) => {
            params[p.key] = p.value;
        });
        canonicalBody = new URLSearchParams(sortKeys(params)).toString();
    }
}
// --- FIX: If no body, use empty JSON object to match server ---
if (!canonicalBody) {
    canonicalBody = "{}";
}
// --- STRING TO SIGN ---
const stringToSign = timestamp + method + fullPath + canonicalBody;
// --- SIGNATURE ---
const signature = CryptoJS.HmacSHA256(stringToSign, secretKey).toString(CryptoJS.enc.Hex);
// --- DEBUG ---
console.log("=== POSTMAN DEBUG ===");
console.log("Timestamp:", timestamp);
console.log("Method:", method);
console.log("Path:", path);
console.log("Query String:", queryString);
console.log("Full Path:", fullPath);
console.log("Canonical body:", canonicalBody);
console.log("String to sign:", stringToSign);
console.log("Signature:", signature);
console.log("=====================");
// --- HEADERS ---
pm.request.headers.upsert({ key: "x-api-key", value: publicKey });
pm.request.headers.upsert({ key: "x-timestamp", value: timestamp });
pm.request.headers.upsert({ key: "x-signature", value: signature });

\`\`\`

## Example String-to-Sign Breakdown


For \`POST /api/v1/users with body {"externalUserId": "user_abc123"}:\`

\`\`\`- timestamp: "1727952000"
- method: "POST"
- fullPath: "/api/v1/users"
- canonicalBody: '{"externalUserId":"user_abc123"}' (keys sorted)
\`\`\`


\`- stringToSign: "1727952000POST/api/v1/users{\"externalUserId\":\"user_abc123\"}"\`


For curl/manual, generate sig separately—better to use Postman or code snippets below.

      `,
      code: {
        curl: `# Note: Curl requires manual HMAC generation (use Postman for auto-handling).
# 1. Set vars: PK=pk_f1d9f6dec8c94899802e9fd5078e543c; SK=sk_bbd5c516a60f43eab535ea7d5c59c930
# 2. TIMESTAMP=$(date +%s)
# 3. STRING_TO_SIGN="${"TIMESTAMP"}POST/api/v1/users{}"  # Add sorted body if present
# 4. SIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha256 -hmac "$SK" -binary | xxd -p)
curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/users \\
  -H "x-api-key: $PK" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -H "Content-Type: application/json" \\
  -d '{}'`,
        javascript: `const axios = require('axios');
const crypto = require('crypto');
const apiKey = 'pk_f1d9f6dec8c94899802e9fd5078e543c';
const apiSecret = 'sk_bbd5c516a60f43eab535ea7d5c59c930';
const timestamp = Date.now() / 1000 | 0;
// Helper to sort keys recursively
function sortKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = sortKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}
const body = {};  // Your request body
const canonicalBody = JSON.stringify(sortKeys(body)) || '{}';
const fullPath = '/api/v1/users';  // Add ?query if needed
const stringToSign = timestamp + 'POST' + fullPath + canonicalBody;
const signature = crypto
  .createHmac('sha256', apiSecret)
  .update(stringToSign)
  .digest('hex');
const response = await axios.post(
  'https://aptos-wallet-infa.onrender.com/api/v1/users',
  body,
  {
    headers: {
      'x-api-key': apiKey,
      'x-timestamp': timestamp,
      'x-signature': signature
    }
  }
);`,
        python: `import requests
import hmac
import hashlib
import time
import json
api_key = 'pk_f1d9f6dec8c94899802e9fd5078e543c'
api_secret = 'sk_bbd5c516a60f43eab535ea7d5c59c930'
timestamp = str(int(time.time()))
# Helper to sort keys recursively
def sort_keys(obj):
    if isinstance(obj, list):
        return [sort_keys(item) for item in obj]
    if isinstance(obj, dict):
        return {k: sort_keys(v) for k, v in sorted(obj.items())}
    return obj
body = {}  # Your request body
canonical_body = json.dumps(sort_keys(body)) or '{}'
full_path = '/api/v1/users'  # Add ?query if needed
string_to_sign = timestamp + 'POST' + full_path + canonical_body
signature = hmac.new(
    api_secret.encode(),
    string_to_sign.encode(),
    hashlib.sha256
).hexdigest()
response = requests.post(
    'https://aptos-wallet-infa.onrender.com/api/v1/users',
    json=body,
    headers={
        'x-api-key': api_key,
        'x-timestamp': timestamp,
        'x-signature': signature
    }
)`,
        postman: `# Postman: Auto-handled by pre-request script!
# 1. Set env: HMAC_PUBLIC_KEY=pk_f1d9f6dec8c94899802e9fd5078e543c, HMAC_SECRET_KEY=sk_bbd5c516a60f43eab535ea7d5c59c930
# 2. URL: POST https://aptos-wallet-infa.onrender.com/api/v1/users
# 3. Body (raw JSON): Paste below into Postman body tab
{
  # Add your request body here, e.g.:
  "externalUserId": "user_abc123",
  "profile": {
    "firstName": "John",
    "lastName": "Doe"
  }
}`,
      },
    },
    "org-profile": {
      title: "Get Organization Profile",
      description: "Retrieve your organization profile information",
      method: "GET",
      endpoint: "/api/v1/organization/profile",
      response: `{
    "id": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "legalName": "TechCorp4 Solutions Ltd",
    "displayName": "TechCorp2 Solutions",
    "type": "SME",
    "size": "MEDIUM",
    "industry": "TECHNOLOGY",
    "legalInformation": {
        "registrationNumber": "TC121145678",
        "taxId": "TAX-TC-981420",
        "vatNumber": "VAT-TC-123456",
        "incorporationDate": {},
        "incorporationCountry": "US",
        "legalStructure": "LLC",
        "registrationAddress": {
            "street": "123 Tech Street",
            "city": "San Francisco",
            "state": "California",
            "postalCode": "94105",
            "country": "US"
        }
    },
    "contactInformation": {
        "email": "admin8@techcorp-test.com",
        "phone": "+14155551234",
        "website": "https://techcorp-test.com",
        "businessAddress": {
            "street": "123 Tech Street",
            "city": "San Francisco",
            "state": "California",
            "postalCode": "94105",
            "country": "US"
        }
    },
    "settings": {
        "allowedAssets": [
            "APT",
            "USDC",
            "USDT"
        ],
        "autoConversion": true,
        "complianceLevel": "BASIC",
        "defaultCurrency": "USD",
        "timezone": "America/Los_Angeles",
        "businessHours": {
            "workingDays": []
        }
    },
    "limits": {
        "transactionLimits": {
            "daily": 50000,
            "monthly": 1000000,
            "perTransaction": 25000,
            "velocity": 50
        },
        "assetLimits": [
            {
                "asset": "APT",
                "dailyLimit": 10000,
                "monthlyLimit": 200000,
                "holdingLimit": 500000
            },
            {
                "asset": "USDC",
                "dailyLimit": 40000,
                "monthlyLimit": 800000,
                "holdingLimit": 2000000
            }
        ],
        "geographicRestrictions": [],
        "ipWhitelist": [],
        "userLimits": {
            "maxUsers": 1000,
            "maxAdmins": 10,
            "maxWallets": 100
        }
    },
    "treasurySettings": {
        "autoRebalancing": false,
        "riskTolerance": "MODERATE",
        "liquidityTarget": 25,
        "allocationStrategy": {
            "operating": 10,
            "reserve": 20,
            "investment": 10
        }
    },
    "status": "ACTIVE",
    "onboardingStatus": "APPROVED",
    "administratorIds": [
        "beb05897-983a-41e1-8e5e-832f5482532d"
    ],
    "walletIds": [
        "41cb90c7-545b-42da-8ab1-181044b17541",
        "ec73bf01-c95e-4b47-b2d7-01336312c7ae",
        "a36c6ac9-c13a-42cf-ab69-5982b398ab37",
        "7c2ef0b4-7185-4e87-a4e9-d3e3fba9031f",
        "f48d9ff1-d6af-4d41-aa29-6a6bec2ff271",
        "fe417398-194a-4b5c-b937-1e5f5f28a202"
    ],
    "treasuryAccountId": "41cb90c7-545b-42da-8ab1-181044b17541",
    "createdAt": {},
    "updatedAt": {}
}`,
      code: {
        curl: `# Note: Generate HMAC sig manually or use Postman.
# STRING_TO_SIGN="${"TIMESTAMP"}GET/api/v1/organization/profile{}"
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/profile \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const response = await hasa.organization.getProfile();
console.log(response.data);`,
        python: `response = hasa.organization.get_profile()
print(response)`,
        postman: `# Postman: No body needed—script handles headers.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/organization/profile
# (Leave body empty)`,
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
        curl: `# Note: Use Postman for sig. Body: sorted JSON.
curl -X PATCH https://aptos-wallet-infa.onrender.com/api/v1/organization/settings \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
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
        postman: `# Postman: Paste this into raw JSON body.
{
  "webhookUrl": "https://yourapp.com/webhooks",
  "autoConversion": true,
  "allowedAssets": ["APT", "USDC"]
}`,
      },
    },
    "org-limits": {
      title: "Get Organization Limits",
      description: "View your current usage limits and quotas",
      method: "GET",
      endpoint: "/api/v1/organization/limits",
      response: `{
    "limits": {
        "transactionLimits": {
            "daily": 50000,
            "monthly": 1000000,
            "perTransaction": 25000,
            "velocity": 50
        },
        "assetLimits": [
            {
                "asset": "APT",
                "dailyLimit": 10000,
                "monthlyLimit": 200000,
                "holdingLimit": 500000,
                "_id": "68dd50ebd1bafbaa748ef89e"
            },
            {
                "asset": "USDC",
                "dailyLimit": 40000,
                "monthlyLimit": 800000,
                "holdingLimit": 2000000,
                "_id": "68dd50ebd1bafbaa748ef89f"
            }
        ],
        "geographicRestrictions": [],
        "ipWhitelist": [],
        "userLimits": {
            "maxUsers": 1000,
            "maxAdmins": 10,
            "maxWallets": 100
        },
        "_id": "68dd50ebd1bafbaa748ef89d"
    },
    "usage": {
        "transactionsToday": 0,
        "transactionsThisMonth": 0,
        "currentUsers": 6,
        "volumeToday": 0,
        "volumeThisMonth": 0
    },
    "remaining": {
        "transactionsToday": 50000,
        "transactionsThisMonth": 1000000,
        "users": 994
    }
}`,
      code: {
        curl: `# Use Postman for easy sig gen.
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/limits \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const limits = await hasa.organization.getLimits();`,
        python: `limits = hasa.organization.get_limits()`,
        postman: `# Postman: No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/organization/limits`,
      },
    },
    "org-api-keys": {
      title: "Get API Keys",
      description: "Retrieve your API keys information",
      method: "GET",
      endpoint: "/api/v1/organization/api-keys",
      response: `{
    "publicKey": "pk_f1d9f6dec8c94899802e9fd5078e543c",
    "permissions": [
        "READ_WALLETS",
        "READ_TRANSACTIONS",
        "CREATE_TRANSACTIONS",
        "CREATE_WALLETS",
        "MANAGE_USERS"
    ],
    "environment": "SANDBOX",
    "rateLimit": 1000,
    "lastRotation": "2025-10-02T03:49:52.540Z"
}`,
      code: {
        curl: `# Sig via Postman recommended.
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/api-keys \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const keys = await hasa.organization.getApiKeys();`,
        python: `keys = hasa.organization.get_api_keys()`,
        postman: `# Postman: No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/organization/api-keys`,
      },
    },
    "org-metrics": {
      title: "Get Metrics",
      description: "Retrieve organization metrics and analytics",
      method: "GET",
      endpoint: "/api/v1/organization/metrics",
      response: `{
    "totalTransactions": 0,
    "totalVolume": 0,
    "activeWallets": 6,
    "period": "30d",
    "generatedAt": "2025-10-04T09:11:56.925Z"
}`,
      code: {
        curl: `
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/metrics \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `
const metrics = await hasa.organization.getMetrics();`,
        python: `
metrics = hasa.organization.get_metrics()`,
        postman: `# Postman: No body yet.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/organization/metrics`,
      },
    },
    "users-create": {
      title: "Create User",
      description: "Create a new user in your organization",
      method: "POST",
      endpoint: "/api/v1/users",
      request: `{
  "externalUserId": "ORG-USER-12W26", //User ID from the organization's database 
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US",
    "dateOfBirth": "1990-05-15T00:00:00.000Z"
  },
  "limits": {
    "dailyLimit": 10000,
    "perTransactionLimit": 5000,
    "monthlyLimit": 100000
  },
  "tags": ["premium", "verified"],
  "notes": "High-value customer from enterprise sales"
}`,
      response: `{
    "id": "0c1a8ac1-4b5a-46e0-8d55-c27d8dd78485",
    "externalUserId": "ORG-USER-12026",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
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
    "walletIds": [
        "06fab897-74f5-4242-8489-23d66235f661"
    ],
    "createdAt": "2025-10-04T23:48:23.832Z",
    "updatedAt": "2025-10-04T23:48:23.929Z",
    "lastActive": "2025-10-04T23:48:23.830Z",
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
      code: {
        curl: `# Postman handles sig + body sorting.
curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/users \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
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
        postman: `# Postman: Paste into raw JSON body.
{
  "externalUserId": "ORG-USER-12W26", //User ID from the organization's database 
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US",
    "dateOfBirth": "1990-05-15T00:00:00.000Z"
  },
  "limits": {
    "dailyLimit": 10000,
    "perTransactionLimit": 5000,
    "monthlyLimit": 100000
  },
  "tags": ["premium", "verified"],
  "notes": "High-value customer from enterprise sales"
}`,
      },
    },
    "users-list": {
      title: "List Users",
      description: "Get a paginated list of all users in your organization",
      method: "GET",
      endpoint: "/api/v1/users?page=1&limit=20",
      response: `{
    "users": [
        {
            "id": "0c1a8ac1-4b5a-46e0-8d55-c27d8dd78485",
            "externalUserId": "ORG-USER-12026",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "profile": {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
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
            "walletIds": [
                "06fab897-74f5-4242-8489-23d66235f661"
            ],
            "createdAt": "2025-10-04T23:48:23.832Z",
            "updatedAt": "2025-10-04T23:48:23.929Z",
            "lastActive": "2025-10-04T23:48:23.830Z",
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
        },
        {
            "id": "0fefc209-8a63-4d66-b824-4204bea261e0",
            "externalUserId": "ORG-USER-12W26",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "profile": {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@example.com",
                "phone": "+1234567891",
                "country": "US",
                "dateOfBirth": "1990-05-15T00:00:00.000Z"
            },
            "status": "ACTIVE",
            "limits": {
                "dailyLimit": 15000,
                "perTransactionLimit": 7500,
                "monthlyLimit": 150000
            },
            "restrictions": {
                "canReceive": true,
                "canSend": true,
                "canWithdraw": true,
                "frozenByOrg": false,
                "frozenByPlatform": false
            },
            "walletIds": [
                "6f9e75a0-cc2f-4726-9c34-a8e9924c9038",
                "106ad401-2c42-4b29-ac31-2d7d3898558b",
                "8e0fee6e-208c-4b55-90f6-d8a5157481d0"
            ],
            "createdAt": "2025-10-02T01:25:26.977Z",
            "updatedAt": "2025-10-02T02:54:13.209Z",
            "lastActive": "2025-10-02T02:53:43.706Z",
            "totalTransactions": 0,
            "totalVolume": 0,
            "metadata": {
                "tags": [
                    "premium",
                    "verified",
                    "vip"
                ],
                "notes": "Updated limits for VIP status",
                "createdBy": "system",
                "lastUpdatedBy": "system",
                "walletSetupFailed": false
            }
        },
    ]
  }`,
      code: {
        curl: `# Query in path; sig via Postman.
curl -X GET "https://aptos-wallet-infa.onrender.com/api/v1/users?page=1&limit=20" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const users = await hasa.users.list({ page: 1, limit: 20 });`,
        python: `users = hasa.users.list(page=1, limit=20)`,
        postman: `# Postman: Add ?page=1&limit=20 to URL. No body.`,
      },
    },
    "users-get": {
      title: "Get User",
      description: "Retrieve details of a specific user",
      method: "GET",
      endpoint: "/api/v1/users/:userId",
      response: `{
    "id": "usr_9876543210",
    "externalUserId": "ORG-USER-12W26",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "profile": {
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@example.com",
        "phone": "+1234567891",
        "country": "US",
        "dateOfBirth": "1990-05-15T00:00:00.000Z"
    },
    "status": "ACTIVE",
    "limits": {
        "dailyLimit": 15000,
        "perTransactionLimit": 7500,
        "monthlyLimit": 150000
    },
    "restrictions": {
        "canReceive": true,
        "canSend": true,
        "canWithdraw": true,
        "frozenByOrg": false,
        "frozenByPlatform": false
    },
    "walletIds": [
        "6f9e75a0-cc2f-4726-9c34-a8e9924c9038",
        "106ad401-2c42-4b29-ac31-2d7d3898558b",
        "8e0fee6e-208c-4b55-90f6-d8a5157481d0"
    ],
    "createdAt": "2025-10-02T01:25:26.977Z",
    "updatedAt": "2025-10-02T02:54:13.209Z",
    "lastActive": "2025-10-02T02:53:43.706Z",
    "totalTransactions": 0,
    "totalVolume": 0,
    "metadata": {
        "tags": [
            "premium",
            "verified",
            "vip"
        ],
        "notes": "Updated limits for VIP status",
        "createdBy": "system",
        "lastUpdatedBy": "system",
        "walletSetupFailed": false
    }
}`,
      code: {
        curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const user = await hasa.users.get('usr_9876543210');`,
        python: `user = hasa.users.get('usr_9876543210')`,
        postman: `# Postman: Replace :userId in URL. No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210`,
      },
    },
    "users-update": {
      title: "Update User",
      description: "Update user details",
      method: "PATCH",
      endpoint: "/api/v1/users/:userId",
      request: `{
  "profile": {
    "firstName": "Jane",
    "email": "jane.doe@example.com"
  }
}`,
      response: `{ "success": true, "updatedAt": "2025-09-30T03:00:00Z" }`,
      code: {
        curl: `# Stub—full coming soon. Use Postman pattern.
curl -X PATCH https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d '{
    "profile": {
      "firstName": "Jane"
    }
  }'`,
        javascript: `// Stub
const updated = await hasa.users.update('usr_9876543210', {
  profile: { firstName: 'Jane' }
});`,
        python: `// Stub
updated = hasa.users.update('usr_9876543210', {
    'profile': {'first_name': 'Jane'}
})`,
        postman: `# Postman: Add body as needed.
{
  "profile": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1234567891",
    "country": "US"
  },
  "status": "ACTIVE",
  "limits": {
    "dailyLimit": 15000,
    "perTransactionLimit": 7500,
    "monthlyLimit": 150000
  },
  "tags": ["premium", "verified", "vip"],
  "notes": "Updated limits for VIP status"
}`,
      },
    },
    "users-delete": {
      title: "Delete User",
      description: "Delete a user from your organization",
      method: "DELETE",
      endpoint: "/api/v1/users/:userId",
      response: `{ "success": true }`,
      code: {
        curl: `# Use Postman for sig.
curl -X DELETE https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
await hasa.users.delete('usr_9876543210');`,
        python: `// Stub
hasa.users.delete('usr_9876543210')`,
        postman: `# Postman: No body.
# URL: DELETE https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210`,
      },
    },
    "users-transfer": {
      title: "User transfers",
      description: "Asset transfer for users",
      method: "POST",
      endpoint: "/api/v1/users/:userId/transfer",
      request: `{
  "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
  "asset": {
    "symbol": "USDC",
    "amount": "0.5"
  },
  "description": "Payment for Netflix pro",
  "tags": ["Payment", "Subscription"]
}`,
      response: `{
    "transaction": {
        "id": "ef69eebf-88e5-4fa8-a05a-1a8a5b277db9",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "type": "WITHDRAWAL",
        "direction": "OUTBOUND",
        "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
        "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
        "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
        "asset": {
            "symbol": "USDC",
            "amount": "0.1",
            "usdValue": 0,
        },
        "status": "PENDING",
        "metadata": {
            "description": "Payment for Netflix pro",
        },
        "compliance": {
            "riskScore": 0,
            "flagged": false,
            "flags": [],
            "reviewRequired": false,
        },
        "fees": {
            "networkFee": "0",
            "platformFee": "0",
            "totalFee": "0",
        },
        "lastCheckedAt": "2025-10-05T00:08:59.996Z",
        "createdAt": "2025-10-05T00:08:58.504Z",
        "updatedAt": "2025-10-05T00:08:59.997Z",
        "blockchain": {
            "hash": "0x99d6475217dce954f02e01b0e9225dceae7ab599e7bfc87f4f5682be36df7de8",
            "confirmations": 0,
        }
    },
    "transferResult": {
        "hash": "0x99d6475217dce954f02e01b0e9225dceae7ab599e7bfc87f4f5682be36df7de8",
        "success": true
    }
}`,
      code: {
        curl: `# Stub.
curl -X PATCH https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210/transfer \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
 '`,
        javascript: `// Stub
await hasa.users.transfer('usr_9876543210');`,
        python: `// Stub
hasa.users.transfer('usr_9876543210')`,
        postman: `# Postman: Body.
{
  "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
  "asset": {
    "symbol": "USDC",
    "amount": "0.5"
  },
  "description": "Payment for Netflix pro",
  "tags": ["Payment", "Subscription"]
}`,
      },
    },
    "users-wallet": {
      title: "Get User Primary Wallet",
      description: "Retrieve wallet information for a specific user",
      method: "GET",
      endpoint: "/api/v1/users/:userId/wallet",
      response: `{
    "id": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
    "aptosAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
    "privatekey": "38f945dbe3f2013782d49b0252f38d32:58f9fb5e2af69a9590c5af0f1943379e67ccf7887e5d20485d5fca9a0ba8d2deda0a4342bf0e6033a2de75747ffac92155b4dd37ecc5cc017d2956736703e0d86b5a0b3b5d5c1d6adf148c1b16de0a27",
    "publickey": "0x0d5049218b89c114abe56e3bf178350aa488214d0ad4869b1b67e9b12dc04ebf",
    "assets": [
        {
            "symbol": "USDC",
            "balance": "0.9",
            "decimal": 6,
            "lastUpdated": "2025-10-04T23:08:59.000Z",
            "_id": "68e1b71f11a2664022f6d61b"
        }
    ],
    "status": "ACTIVE",
    "lastAccessedAt": "2025-10-05T00:20:05.344Z",
    "lastSyncedAt": "2025-10-05T00:09:03.334Z",
    "createdAt": "2025-10-01T16:08:36.703Z",
    "updatedAt": "2025-10-05T00:20:05.344Z"
}`,
      code: {
        curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210/wallet \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const wallet = await hasa.users.getWallet('usr_9876543210');`,
        python: `wallet = hasa.users.get_wallet('usr_9876543210')`,
        postman: `# Postman: Replace :userId. No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/users/usr_9876543210/wallet`,
      },
    },
    "org-wallet": {
      title: "Get Org Wallets",
      description: "Get all organization's user's wallet ",
      method: "GET",
      endpoint: "/api/v1/wallets",
      request: `{#leave empty}`,
      response: `[
    {
        "id": "06fab897-74f5-4242-8489-23d66235f661",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "userId": "0c1a8ac1-4b5a-46e0-8d55-c27d8dd78485",
        "type": "USER",
        "aptosAddress": "0x2cbbb358250699c18247cd88159a70128f602d49ac8a7d11190722eb56003089",
        "privateKey": "2faa15b388363f3e4e243c67a4f37ae1:c208cb62c756db1dbe2b7246b6f3d9c95de9c4c07ced15e8883b170503b48b13787c091f85e61de443660a821238cbf4dffcad0bb433bbc7c54a2c9cd1d51faac4c8eb2fe44971a756aa66087b45871d",
        "publicKey": "0x6a30635fc5fc61f1e0b13912005226da9e27acef7cea1445fff51ae77bd78c9f",
        "assets": [],
        "status": "ACTIVE",
        "lastAccessedAt": "2025-10-04T23:48:23.932Z",
        "lastSyncedAt": "2025-10-04T23:48:25.514Z",
        "createdAt": "2025-10-04T23:48:23.926Z",
        "updatedAt": "2025-10-04T23:48:25.514Z"
    },
    {
        "id": "8e0fee6e-208c-4b55-90f6-d8a5157481d0",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "userId": "0fefc209-8a63-4d66-b824-4204bea261e0",
        "type": "USER",
        "aptosAddress": "0x76b0d5a9a315bcd202b6120118b984f2a60b00edbfaacea8f48172685fcdcde2",
        "privateKey": "1fec192df5db6988c1fc402762fd2c6c:94b908ed7e696f282aca13cc23ace2aed3d349b69fa480eebbd15e3a252dd20f01380fd889df864c014c9e1ef86dd3d15af5a058c88a26feaf746f93c5eb03866a395c25e8571f60fa842a47774d6342",
        "publicKey": "0x178309164475e1026b2610e7718552187ee460ed522776f7c443404a29443b2f",
        "assets": [],
        "status": "ACTIVE",
        "lastAccessedAt": "2025-10-02T02:54:13.210Z",
        "lastSyncedAt": "2025-10-02T02:54:14.850Z",
        "createdAt": "2025-10-02T02:54:13.206Z",
        "updatedAt": "2025-10-02T02:54:14.851Z"
    },
    {
        "id": "106ad401-2c42-4b29-ac31-2d7d3898558b",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "userId": "0fefc209-8a63-4d66-b824-4204bea261e0",
        "type": "USER",
        "aptosAddress": "0x8ac872c35f3efc642b1c8df450fd68bb8130797903175fd2ac53beb7671c8dec",
        "privateKey": "8443f21e4478a7ce50d2cf5025939cc9:469f6a1b7aa4142043fd83018f6af1f03eab449e2e85925fcea04bb4e5a33531b87f1f3f3fc0b90828d776469139ab7fa8e3d154543ae61c13522b722d9a529089181cfdaebc0a0ca7134818cf60ace0",
        "publicKey": "0x64db2ce3f554b9256bb54b10f7acf1c069e5dfbc9babc8121d13ffadc395e208",
        "assets": [],
        "status": "ACTIVE",
        "lastAccessedAt": "2025-10-02T01:38:45.265Z",
        "lastSyncedAt": "2025-10-02T01:38:46.132Z",
        "createdAt": "2025-10-02T01:38:45.261Z",
        "updatedAt": "2025-10-02T01:38:46.133Z"
    }
]`,
      code: {
        curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
`,
        javascript: `const wallet = await hasa.wallets.getOrgWallets();`,
        python: `wallet = hasa.wallets.getOrgWallets()`,
        postman: `# Postman: Leave empty .`,
      },
    },
    "wallets-get": {
      title: "Get Wallet",
      description: "Retrieve details and balance of a specific wallet",
      method: "GET",
      endpoint: "/api/v1/wallets/:id",
      response: `{
    "id": "36c49dae-8124-4894-9798-f362debde84e",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
    "type": "USER",
    "aptosAddress": "0x86127bc5ae07aa0457a64c327737e22b940b6c008e0bee5f161dcc74019677f3",
    "privateKey": "bc6ff06cb27862639b3ea16d92d7f807:5ff0931d8d0fcf4b8e4154b9ef6e504e5e25499ced9a8694bcf5890f272553f48ecbfe4d3365e9183514c7f61fcf46b7dff066e8a442ace4c8f397cdf6f45a4eeae110ae194317dd175080b18750f476",
    "publicKey": "0xb6fa72c19819cd37a4f338106e6486e68df8dfdb8f56f097c25e5c112f17febb",
    "assets": [],
    "status": "ACTIVE",
    "lastAccessedAt": "2025-10-05T00:38:25.848Z",
    "lastSyncedAt": "2025-10-02T02:24:05.148Z",
    "createdAt": "2025-10-02T00:11:30.335Z",
    "updatedAt": "2025-10-05T00:38:25.848Z",
    "lastAccessedByApiKey": "pk_f1d9f6dec8c94899802e9fd5078e543c",
    "lastModifiedBy": "api-pk_f254946ca4db459898f83c3b65d80216"
}`,
      code: {
        curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/wlt_abc123 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const wallet = await hasa.wallets.get('wlt_abc123');`,
        python: `wallet = hasa.wallets.get('wlt_abc123')`,
        postman: `# Postman: Replace :id. No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/wlt_abc123`,
      },
    },
    "wallets-user": {
      title: "Get User Wallets",
      description: "Retrieve all wallets for a specific user",
      method: "GET",
      endpoint: "/api/v1/wallets/users/:userId",
      response: `[
    {
        "id": "36c49dae-8124-4894-9798-f362debde84e",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
        "type": "USER",
        "aptosAddress": "0x86127bc5ae07aa0457a64c327737e22b940b6c008e0bee5f161dcc74019677f3",
        "privateKey": "bc6ff06cb27862639b3ea16d92d7f807:5ff0931d8d0fcf4b8e4154b9ef6e504e5e25499ced9a8694bcf5890f272553f48ecbfe4d3365e9183514c7f61fcf46b7dff066e8a442ace4c8f397cdf6f45a4eeae110ae194317dd175080b18750f476",
        "publicKey": "0xb6fa72c19819cd37a4f338106e6486e68df8dfdb8f56f097c25e5c112f17febb",
        "assets": [],
        "status": "ACTIVE",
        "lastAccessedAt": "2025-10-05T00:38:25.848Z",
        "lastSyncedAt": "2025-10-02T02:24:05.148Z",
        "createdAt": "2025-10-02T00:11:30.335Z",
        "updatedAt": "2025-10-05T00:38:25.848Z",
        "lastAccessedByApiKey": "pk_f1d9f6dec8c94899802e9fd5078e543c",
        "lastModifiedBy": "api-pk_f254946ca4db459898f83c3b65d80216"
    },
    {
        "id": "492d2cfb-2ec9-49e3-8e24-a4d31f9dd74b",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
        "type": "USER",
        "aptosAddress": "0xc924c18ebf753209d316bce4ec39873db68c3d12dd991c4eb6e5f169036ec2fc",
        "privateKey": "6b9f96cf812e2d2b664c14c88cd23505:c8e3e25dd08be778bcb0e301a974fe5ae2d7b17d0621c0d650810fa1fe68906718b8b938c46e305200dcf9408fbbb16a4afdb5e72ac4db56d4236855c83375f9a3dd5c5b9f0f3fb95e630878f9eb844a",
        "publicKey": "0xe58475fa9e0f27191bcd1a61d23b7e40dcade4719dc8382c39170a9533411b7f",
        "assets": [],
        "status": "ACTIVE",
        "lastAccessedAt": "2025-10-02T00:06:15.677Z",
        "lastSyncedAt": "2025-10-02T00:06:17.218Z",
        "createdAt": "2025-10-02T00:06:15.666Z",
        "updatedAt": "2025-10-02T00:06:17.224Z"
    },
    {
        "id": "caf3f7e1-a311-4057-9e93-02ef5d9aed1f",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
        "type": "USER",
        "aptosAddress": "0x463a7016937d427ad4453240d3c8e094ecbc110b920e8bf4332c1521bda45e6b",
        "privateKey": "8494b032a33ad54724a67aa1d9d1ac1c:a786fcf13eb3732515b0018102516121b0abcc52958a44d22e0a87b3edc628c131eaaf5257aae5abd3c4fe71ec10a893120500efe7b221729b846a0943a9ffe95473b40e487f1731b8af0a1da4670847",
        "publicKey": "0xd06a9b2657b85481903c9460a23fe43e4304b2223091dce7cc843dcec3d6678d",
        "assets": [],
        "status": "ACTIVE",
        "lastAccessedAt": "2025-10-01T21:29:53.069Z",
        "lastSyncedAt": "2025-10-01T21:29:54.549Z",
        "createdAt": "2025-10-01T21:29:53.061Z",
        "updatedAt": "2025-10-01T21:29:54.549Z"
    }
]`,
      code: {
        curl: `# Stub.
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/users/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
const userWallets = await hasa.wallets.getByUser('usr_9876543210');`,
        python: `// Stub
user_wallets = hasa.wallets.get_by_user('usr_9876543210')`,
        postman: `# Postman: Replace :userId. No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/users/usr_9876543210`,
      },
    },
    "wallet-assets": {
      title: "Get Wallet Balance",
      description: "Retrieve supported assets balance of an address for a specific user",
      method: "GET",
      endpoint: "/api/v1/wallets/address/:walletAddress/balances",
      response: `{
    "walletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
    "aptosAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
    "assets": [
        {
            "symbol": "USDC",
            "balance": "0.9",
            "decimal": 6,
            "lastUpdated": "2025-10-04T23:08:59.000Z"
        }
    ],
    "totalAssets": 1,
    "lastSynced": "2025-10-05T00:53:34.664Z"
}`,
      code: {
        curl: `# Stub.
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/address/:walletAddress/balances \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
const userWallets = await hasa.wallets.getWalletBalance(':address');`,
        python: `// Stub
user_wallets = hasa.wallets.getWalletBalance(':address')`,
        postman: `# Postman: Replace :userId. No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/address/:walletAddress/balances`,
      },
    },
    "wallets-sync": {
      title: "Sync Wallet Balance",
      description: "Synchronize wallet balance with blockchain",
      method: "POST",
      endpoint: "/api/v1/wallets/:id/sync",
      response: `{
    "id": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
    "type": "USER",
    "aptosAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
    "privateKey": "38f945dbe3f2013782d49b0252f38d32:58f9fb5e2af69a9590c5af0f1943379e67ccf7887e5d20485d5fca9a0ba8d2deda0a4342bf0e6033a2de75747ffac92155b4dd37ecc5cc017d2956736703e0d86b5a0b3b5d5c1d6adf148c1b16de0a27",
    "publicKey": "0x0d5049218b89c114abe56e3bf178350aa488214d0ad4869b1b67e9b12dc04ebf",
    "assets": [
        {
            "symbol": "USDC",
            "balance": "0.9",
            "decimal": 6,
            "lastUpdated": "2025-10-04T23:08:59.000Z",
        }
    ],
    "status": "ACTIVE",
    "lastAccessedAt": "2025-10-05T00:42:07.358Z",
    "lastSyncedAt": "2025-10-05T00:42:07.705Z",
    "createdAt": "2025-10-01T16:08:36.703Z",
    "updatedAt": "2025-10-05T00:42:07.706Z",
    "lastAccessedByApiKey": "pk_f1d9f6dec8c94899802e9fd5078e543c"
}`,
      code: {
        curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/wallets/wlt_abc123/sync \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const result = await hasa.wallets.sync('wlt_abc123');`,
        python: `result = hasa.wallets.sync('wlt_abc123')`,
        postman: `# Postman: No body.
# URL: POST https://aptos-wallet-infa.onrender.com/api/v1/wallets/wlt_abc123/sync`,
      },
    },
    "wallet-create": {
      title: "Create User Wallet",
      description: "Create new wallets for users",
      method: "POST",
      endpoint: "/api/v1/wallets/:userId/wallet",
      request: `{
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
}`,
      response: `{
    "id": "3eb70a09-8bd9-4e90-8d95-ca65794c1bef",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "0fefc209-8a63-4d66-b824-4204bea261e0",
    "type": "USER",
    "aptosAddress": "0x4b518c316b628749f31ec3de8b64cf749cf12d3e671e8a4dd3a35c39725e676a",
    "assets": [],
    "status": "ACTIVE",
    "lastSyncedAt": "2025-10-05T00:47:02.387Z",
    "createdAt": "2025-10-05T00:47:02.387Z",
    "updatedAt": "2025-10-05T00:47:02.387Z"
}`,
      code: {
        curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/wallets/transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d '{
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
}'`,
        javascript: `const tx = await hasa.wallets.transfer({
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
});`,
        python: `tx = hasa.wallets.transfer({
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
})`,
        postman: `# Postman: Body JSON.
{
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
}`,
      },
    },
    "wallet-status": {
      title: "Update Status",
      description: "Update wallet status (e.g., freeze)",
      method: "PATCH",
      endpoint: "/api/v1/wallets/:id/status",
      request: `{ "status": "FROZEN" }`,
      response: `{
    "id": "36c49dae-8124-4894-9798-f362debde84e",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
    "type": "USER",
    "aptosAddress": "0x86127bc5ae07aa0457a64c327737e22b940b6c008e0bee5f161dcc74019677f3",
    "privateKey": "bc6ff06cb27862639b3ea16d92d7f807:5ff0931d8d0fcf4b8e4154b9ef6e504e5e25499ced9a8694bcf5890f272553f48ecbfe4d3365e9183514c7f61fcf46b7dff066e8a442ace4c8f397cdf6f45a4eeae110ae194317dd175080b18750f476",
    "publicKey": "0xb6fa72c19819cd37a4f338106e6486e68df8dfdb8f56f097c25e5c112f17febb",
    "assets": [],
    "status": "FROZEN",
    "lastAccessedAt": "2025-10-05T00:45:12.240Z",
    "lastSyncedAt": "2025-10-05T00:41:16.233Z",
    "createdAt": "2025-10-02T00:11:30.335Z",
    "updatedAt": "2025-10-05T00:45:12.241Z",
    "lastAccessedByApiKey": "pk_f1d9f6dec8c94899802e9fd5078e543c",
    "lastModifiedBy": "api-pk_f1d9f6dec8c94899802e9fd5078e543c"
}`,
      code: {
        curl: `# Stub.
curl -X PATCH https://aptos-wallet-infa.onrender.com/api/v1/wallets/wlt_abc123/status \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d '{"status": "FROZEN"}'`,
        javascript: `// Stub
await hasa.wallets.updateStatus('wlt_abc123', 'FROZEN');`,
        python: `// Stub
hasa.wallets.update_status('wlt_abc123', 'FROZEN')`,
        postman: `# Postman: Body.
{ "status": "FROZEN" }`,
      },
    },
    "tx-org-transfer": {
      title: "Get Organization Transfers",
      description: "Get all Organizaiton owned wallet transactions",
      method: "GET",
      endpoint: "/api/v1/transactions/?page=1&limit=3",
      request: `Leave empty`,
      response: `{
    "success": true,
    "data": [
        {
            "_id": "68e1b4bd11a2664022f6d590",
            "id": "0d1ca434-5a47-4aec-a0a0-fc9c81b8678f",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "type": "WITHDRAWAL",
            "direction": "OUTBOUND",
            "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
            "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
            "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
            "asset": {
                "symbol": "USDC",
                "amount": "0.5",
                "usdValue": 0,
                "_id": "68e1b4bd11a2664022f6d591"
            },
            "status": "FAILED",
            "metadata": {
                "description": "Internal wallet transfer",
                "_id": "68e1b4bd11a2664022f6d592"
            },
            "compliance": {
                "riskScore": 0,
                "flagged": false,
                "flags": [],
                "reviewRequired": false,
                "_id": "68e1b4bd11a2664022f6d593"
            },
            "fees": {
                "networkFee": "0",
                "platformFee": "0",
                "totalFee": "0",
                "_id": "68e1b4bd11a2664022f6d594"
            },
            "lastCheckedAt": "2025-10-04T23:58:53.814Z",
            "createdAt": "2025-10-04T23:58:53.815Z",
            "updatedAt": "2025-10-04T23:58:54.877Z",
            "__v": 0
        },
        {
            "_id": "68ddf12a5721ea210b5c9ccc",
            "id": "fdf793c1-da42-4c2e-9ed5-7b8130da332c",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "type": "WITHDRAWAL",
            "direction": "OUTBOUND",
            "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
            "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
            "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
            "asset": {
                "symbol": "USDC",
                "amount": "0.5",
                "usdValue": 0,
                "_id": "68ddf12a5721ea210b5c9ccd"
            },
            "status": "PENDING",
            "metadata": {
                "description": "Internal wallet transfer",
                "_id": "68ddf12a5721ea210b5c9cce"
            },
            "compliance": {
                "riskScore": 0,
                "flagged": false,
                "flags": [],
                "reviewRequired": false,
                "_id": "68ddf12a5721ea210b5c9ccf"
            },
            "fees": {
                "networkFee": "0",
                "platformFee": "0",
                "totalFee": "0",
                "_id": "68ddf12a5721ea210b5c9cd0"
            },
            "lastCheckedAt": "2025-10-02T03:27:40.577Z",
            "createdAt": "2025-10-02T03:27:38.981Z",
            "updatedAt": "2025-10-02T03:27:40.578Z",
            "__v": 0,
            "blockchain": {
                "hash": "0xbd29210434469d73eb746c19d6ae3c4667d58f7a189f72416fd7a1588d0dfd45",
                "confirmations": 0,
                "_id": "68ddf12c5721ea210b5c9cd8"
            }
        },
        {
            "_id": "68ddecb70ce0dab3fc8985bd",
            "id": "d3f3fd65-f15a-459b-8f02-eae54edb1c52",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "type": "WITHDRAWAL",
            "direction": "OUTBOUND",
            "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
            "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
            "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
            "asset": {
                "symbol": "USDC",
                "amount": "0.5",
                "usdValue": 0,
                "_id": "68ddecb70ce0dab3fc8985be"
            },
            "status": "PENDING",
            "metadata": {
                "description": "Internal wallet transfer",
                "_id": "68ddecb70ce0dab3fc8985bf"
            },
            "compliance": {
                "riskScore": 0,
                "flagged": false,
                "flags": [],
                "reviewRequired": false,
                "_id": "68ddecb70ce0dab3fc8985c0"
            },
            "fees": {
                "networkFee": "0",
                "platformFee": "0",
                "totalFee": "0",
                "_id": "68ddecb70ce0dab3fc8985c1"
            },
            "lastCheckedAt": "2025-10-02T03:08:40.882Z",
            "createdAt": "2025-10-02T03:08:39.415Z",
            "updatedAt": "2025-10-02T03:08:40.883Z",
            "__v": 0,
            "blockchain": {
                "hash": "0x805980bfffaa9853e4fb4d647099a2d81d7854d05353269951e2d3fdac2288bd",
                "confirmations": 0,
                "_id": "68ddecb80ce0dab3fc8985c9"
            }
        }
    ],
    "pagination": {
        "page": 2,
        "limit": 3,
        "total": 8,
        "totalPages": 3
    }
}`,
      code: {
        curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/transactions/process-transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  `,
        javascript: `const tx = await hasa.transactions.getOrgTransactions();`,
        python: `tx = hasa.transactions.getOrgTransactions()`,
        postman: `# Postman: Leave empty.`,
      },
    },
    "tx-get": {
      title: "Get Transaction",
      description: "Get transaction data",
      method: "GET",
      endpoint: "/api/v1/transactions/:txn-ID",
      response: `{
    "success": true,
    "data": {
        "_id": "68dde72e42f1cc8892cb1dd6",
        "id": "8fa1d786-587c-4963-aaf2-e895be63f3d9",
        "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
        "type": "WITHDRAWAL",
        "direction": "OUTBOUND",
        "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
        "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
        "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
        "asset": {
            "symbol": "USDC",
            "amount": "0.5",
            "usdValue": 0,
            "_id": "68dde72e42f1cc8892cb1dd7"
        },
        "status": "PENDING",
        "metadata": {
            "description": "Internal wallet transfer",
            "_id": "68dde72e42f1cc8892cb1dd8"
        },
        "compliance": {
            "riskScore": 0,
            "flagged": false,
            "flags": [],
            "reviewRequired": false,
            "_id": "68dde72e42f1cc8892cb1dd9"
        },
        "fees": {
            "networkFee": "0",
            "platformFee": "0",
            "totalFee": "0",
            "_id": "68dde72e42f1cc8892cb1dda"
        },
        "lastCheckedAt": "2025-10-02T02:45:04.149Z",
        "createdAt": "2025-10-02T02:45:02.466Z",
        "updatedAt": "2025-10-02T02:45:04.149Z",
        "__v": 0,
        "blockchain": {
            "hash": "0xfa89147fb9acac82498acc6103bfdd879b7c87a894014e8c7f0f8103367bc97e",
            "confirmations": 0,
            "_id": "68dde73042f1cc8892cb1de2"
        }
    }
}`,
      code: {
        curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/:txn-ID \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const transactions = await hasa.transaction(":txn-ID");`,
        python: `transactions = hasa.transaction(":txn-ID")`,
        postman: `# Postman: No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/:txn-ID`,
      },
    },
    "tx-wallet": {
      title: "Wallet Transactions",
      description: "Get transactions for a specific wallet",
      method: "GET",
      endpoint: "/api/v1/transactions/wallets/:walletId",
      response: `{
    "success": true,
    "data": [
        {
            "_id": "68e1b71a11a2664022f6d608",
            "id": "ef69eebf-88e5-4fa8-a05a-1a8a5b277db9",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "type": "WITHDRAWAL",
            "direction": "OUTBOUND",
            "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
            "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
            "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
            "asset": {
                "symbol": "USDC",
                "amount": "0.1",
                "usdValue": 0,
                "_id": "68e1b71a11a2664022f6d609"
            },
            "status": "PENDING",
            "metadata": {
                "description": "Internal wallet transfer",
                "_id": "68e1b71a11a2664022f6d60a"
            },
            "compliance": {
                "riskScore": 0,
                "flagged": false,
                "flags": [],
                "reviewRequired": false,
                "_id": "68e1b71a11a2664022f6d60b"
            },
            "fees": {
                "networkFee": "0",
                "platformFee": "0",
                "totalFee": "0",
                "_id": "68e1b71a11a2664022f6d60c"
            },
            "lastCheckedAt": "2025-10-05T00:08:59.996Z",
            "createdAt": "2025-10-05T00:08:58.504Z",
            "updatedAt": "2025-10-05T00:08:59.997Z",
            "__v": 0,
            "blockchain": {
                "hash": "0x99d6475217dce954f02e01b0e9225dceae7ab599e7bfc87f4f5682be36df7de8",
                "confirmations": 0,
                "_id": "68e1b71b11a2664022f6d614"
            }
        },
        {
            "_id": "68e1b5b111a2664022f6d5e0",
            "id": "62eacc8d-af1e-41ea-8bbe-074ede47204d",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "type": "WITHDRAWAL",
            "direction": "OUTBOUND",
            "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
            "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
            "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
            "asset": {
                "symbol": "USDC",
                "amount": "0.1",
                "usdValue": 0,
                "_id": "68e1b5b111a2664022f6d5e1"
            },
            "status": "FAILED",
            "metadata": {
                "description": "Internal wallet transfer",
                "_id": "68e1b5b111a2664022f6d5e2"
            },
            "compliance": {
                "riskScore": 0,
                "flagged": false,
                "flags": [],
                "reviewRequired": false,
                "_id": "68e1b5b111a2664022f6d5e3"
            },
            "fees": {
                "networkFee": "0",
                "platformFee": "0",
                "totalFee": "0",
                "_id": "68e1b5b111a2664022f6d5e4"
            },
            "lastCheckedAt": "2025-10-05T00:02:57.535Z",
            "createdAt": "2025-10-05T00:02:57.536Z",
            "updatedAt": "2025-10-05T00:02:58.376Z",
            "__v": 0
        },
        {
            "_id": "68e1b55c11a2664022f6d5b8",
            "id": "7943097a-5941-4ea5-986b-f131a08a9193",
            "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
            "type": "WITHDRAWAL",
            "direction": "OUTBOUND",
            "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
            "fromAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
            "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
            "asset": {
                "symbol": "USDC",
                "amount": "0.5",
                "usdValue": 0,
                "_id": "68e1b55c11a2664022f6d5b9"
            },
            "status": "FAILED",
            "metadata": {
                "description": "Internal wallet transfer",
                "_id": "68e1b55c11a2664022f6d5ba"
            },
            "compliance": {
                "riskScore": 0,
                "flagged": false,
                "flags": [],
                "reviewRequired": false,
                "_id": "68e1b55c11a2664022f6d5bb"
            },
            "fees": {
                "networkFee": "0",
                "platformFee": "0",
                "totalFee": "0",
                "_id": "68e1b55c11a2664022f6d5bc"
            },
            "lastCheckedAt": "2025-10-05T00:01:32.458Z",
            "createdAt": "2025-10-05T00:01:32.459Z",
            "updatedAt": "2025-10-05T00:01:33.392Z",
            "__v": 0
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 3,
        "total": 8,
        "totalPages": 3
    }
}`,
      code: {
        curl: `# Stub.
curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/wallets/wlt_abc123 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
const walletTxs = await hasa.transactions.getByWallet('wlt_abc123');`,
        python: `// Stub
wallet_txs = hasa.transactions.get_by_wallet('wlt_abc123')`,
        postman: `# Postman: Replace :walletId. No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/wallet/wlt_abc123`,
      },
    },
    "tx-stats": {
      title: "Transaction Stats",
      description: "Get Organization transaction statistics and summary",
      method: "GET",
      endpoint: "/api/v1/transactions/stats/summary",
      response: `{
    "success": true,
    "data": [
        {
            "_id": {
                "status": "PENDING",
                "direction": "OUTBOUND",
                "asset": "USDC"
            },
            "count": 5,
            "totalAmount": 2.1,
            "totalUsdValue": 0
        },
        {
            "_id": {
                "status": "FAILED",
                "direction": "OUTBOUND",
                "asset": "USDC"
            },
            "count": 3,
            "totalAmount": 1.1,
            "totalUsdValue": 0
        }
    ]
}`,
      code: {
        curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/stats/summary \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const stats = await hasa.transactions.getStats();`,
        python: `stats = hasa.transactions.get_stats()`,
        postman: `# Postman: No body.
# URL: GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/stats/summary`,
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

  const renderContent = () => {
    if (!currentEndpoint.content || typeof currentEndpoint.content !== "string")
      return null;
    const lines = currentEndpoint.content.split("\n");
    const elements: React.ReactNode[] = [];
    let idx = 0;
    while (idx < lines.length) {
      let line = lines[idx];
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={elements.length}
            className="text-2xl font-bold text-white mt-8 mb-4"
          >
            {line.replace("## ", "")}
          </h2>,
        );
        idx++;
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={elements.length}
            className="text-xl font-semibold text-white mt-6 mb-3"
          >
            {line.replace("### ", "")}
          </h3>,
        );
        idx++;
      } else if (line.startsWith("```")) {
        const langMatch = line.match(/```(\w+)?/);
        const lang = langMatch ? langMatch[1] : "";
        const codeLines: string[] = [];
        idx++; // skip opening ```
        while (idx < lines.length && !lines[idx].startsWith("```")) {
          codeLines.push(lines[idx]);
          idx++;
        }
        if (idx < lines.length) idx++; // skip closing ```
        elements.push(
          <pre
            key={elements.length}
            className="bg-gray-900 border border-[#007acc]/20 rounded-lg p-4 mt-4 overflow-x-auto"
          >
            <code
              className={`text-sm block ${lang === "javascript" ? "text-[#66a3ff]" : "text-gray-300"}`}
            >
              {codeLines.join("\n")}
            </code>
          </pre>,
        );
      } else if (line.startsWith("- ")) {
        const content = line.replace("- ", "");
        let bulletContent = content;
        if (content.includes("`")) {
          const parts = content.split("`");
          bulletContent = parts.map((part: string, j: number) =>
            j % 2 === 1 ? (
              <code
                key={j}
                className="px-2 py-1 bg-gray-900 border border-[#007acc]/20 rounded text-[#66a3ff] text-sm font-mono"
              >
                {part}
              </code>
            ) : (
              part
            ),
          );
        }
        elements.push(
          <li key={elements.length} className="text-gray-300 leading-relaxed">
            {bulletContent}
          </li>,
        );
        idx++;
      } else if (line.includes("**")) {
        const parts = line.split("**");
        const boldContent = parts.map((part: string, j: number) =>
          j % 2 === 1 ? (
            <strong key={j} className="text-white font-semibold">
              {part}
            </strong>
          ) : (
            part
          ),
        );
        elements.push(
          <p key={elements.length} className="text-gray-300 leading-relaxed">
            {boldContent}
          </p>,
        );
        idx++;
      } else if (line.includes("`")) {
        const parts = line.split("`");
        const inlineContent = parts.map((part: string, j: number) =>
          j % 2 === 1 ? (
            <code
              key={j}
              className="px-2 py-1 bg-gray-900 border border-[#007acc]/20 rounded text-[#66a3ff] text-sm font-mono"
            >
              {part}
            </code>
          ) : (
            part
          ),
        );
        elements.push(
          <p key={elements.length} className="text-gray-300 leading-relaxed">
            {inlineContent}
          </p>,
        );
        idx++;
      } else if (line.trim() === "") {
        elements.push(<div key={elements.length} className="h-2" />);
        idx++;
      } else {
        elements.push(
          <p key={elements.length} className="text-gray-300 leading-relaxed">
            {line}
          </p>,
        );
        idx++;
      }
    }
    return elements;
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
        <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-[#007acc]/20 overflow-y-auto">
          <div className="p-4">
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
                                const url = new URL(window.location.href);
                                url.hash = item.id;
                                window.history.replaceState(null, "", url);
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
        <main className="flex-1 p-8">
          {currentEndpoint ? (
            <div className="max-w-4xl">
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
                                : currentEndpoint.method === "DELETE"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {currentEndpoint.method}
                    </span>
                    <code className="text-[#66a3ff] font-mono">
                      {currentEndpoint.endpoint
                        .replace(":userId", "usr_9876543210")
                        .replace(":id", "wlt_abc123")
                        .replace(":walletId", "wlt_abc123")}
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
              {renderContent()}
              {currentEndpoint.request && !currentEndpoint.code?.postman && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Request Body</h3>
                  <div className="bg-gray-900 border border-[#007acc]/20 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{currentEndpoint.request}</code>
                    </pre>
                  </div>
                </div>
              )}
              {currentEndpoint.code && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Code Examples</h3>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {["curl", "postman", "javascript", "python"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setActiveTab(lang);
                          const url = new URL(window.location.href);
                          url.searchParams.set("tab", lang);
                          window.history.replaceState(null, "", url);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          activeTab === lang
                            ? "bg-[#007acc] text-white"
                            : "bg-gray-900 text-gray-400 hover:text-white"
                        }`}
                      >
                        {lang === "curl"
                          ? "cURL"
                          : lang === "postman"
                            ? "Postman"
                            : lang === "javascript"
                              ? "JavaScript"
                              : "Python"}
                      </button>
                    ))}
                  </div>
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
              {currentEndpoint.response && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Response Example</h3>
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
          ) : (
            <div className="text-gray-400 text-center py-12">
              Endpoint not found—check the sidebar!
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
