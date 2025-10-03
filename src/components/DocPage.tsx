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
curl -X POST https://sandbox-api.hasa.io/api/v1/users \\
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
  'https://sandbox-api.hasa.io/api/v1/users',
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
    'https://sandbox-api.hasa.io/api/v1/users',
    json=body,
    headers={
        'x-api-key': api_key,
        'x-timestamp': timestamp,
        'x-signature': signature
    }
)`,
        postman: `# Postman: Auto-handled by pre-request script!
# 1. Set env: HMAC_PUBLIC_KEY=pk_f1d9f6dec8c94899802e9fd5078e543c, HMAC_SECRET_KEY=sk_bbd5c516a60f43eab535ea7d5c59c930
# 2. URL: POST https://sandbox-api.hasa.io/api/v1/users
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
  "id": "org_1234567890",
  "legalName": "Acme Corporation",
  "displayName": "Acme",
  "type": "ENTERPRISE",
  "status": "ACTIVE",
  "email": "contact@acme.com",
  "createdAt": "2025-01-15T10:30:00Z"
}`,
      code: {
        curl: `# Note: Generate HMAC sig manually or use Postman.
# STRING_TO_SIGN="${"TIMESTAMP"}GET/api/v1/organization/profile{}"
curl -X GET https://sandbox-api.hasa.io/api/v1/organization/profile \\
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
curl -X PATCH https://sandbox-api.hasa.io/api/v1/organization/settings \\
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
        curl: `# Use Postman for easy sig gen.
curl -X GET https://sandbox-api.hasa.io/api/v1/organization/limits \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const limits = await hasa.organization.getLimits();`,
        python: `limits = hasa.organization.get_limits()`,
        postman: `# Postman: No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/organization/limits`,
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
        curl: `# Sig via Postman recommended.
curl -X GET https://sandbox-api.hasa.io/api/v1/organization/api-keys \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const keys = await hasa.organization.getApiKeys();`,
        python: `keys = hasa.organization.get_api_keys()`,
        postman: `# Postman: No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/organization/api-keys`,
      },
    },
    "org-metrics": {
      title: "Get Metrics",
      description: "Retrieve organization metrics and analytics",
      method: "GET",
      endpoint: "/api/v1/organization/metrics",
      response: `{ "totalUsers": 3542, "totalVolume": "50000 APT" }`,
      code: {
        curl: `# TODO: Full example incoming.
curl -X GET https://sandbox-api.hasa.io/api/v1/organization/metrics \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// TODO
const metrics = await hasa.organization.getMetrics();`,
        python: `// TODO
metrics = hasa.organization.get_metrics()`,
        postman: `# Postman: No body yet.
# URL: GET https://sandbox-api.hasa.io/api/v1/organization/metrics`,
      },
    },
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
        curl: `# Postman handles sig + body sorting.
curl -X POST https://sandbox-api.hasa.io/api/v1/users \\
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
  "externalUserId": "user_abc123",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US"
  }
}`,
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
        curl: `# Query in path; sig via Postman.
curl -X GET "https://sandbox-api.hasa.io/api/v1/users?page=1&limit=20" \\
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
        curl: `curl -X GET https://sandbox-api.hasa.io/api/v1/users/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const user = await hasa.users.get('usr_9876543210');`,
        python: `user = hasa.users.get('usr_9876543210')`,
        postman: `# Postman: Replace :userId in URL. No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/users/usr_9876543210`,
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
curl -X PATCH https://sandbox-api.hasa.io/api/v1/users/usr_9876543210 \\
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
    "firstName": "Jane",
    "email": "jane.doe@example.com"
  }
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
curl -X DELETE https://sandbox-api.hasa.io/api/v1/users/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
await hasa.users.delete('usr_9876543210');`,
        python: `// Stub
hasa.users.delete('usr_9876543210')`,
        postman: `# Postman: No body.
# URL: DELETE https://sandbox-api.hasa.io/api/v1/users/usr_9876543210`,
      },
    },
    "users-freeze": {
      title: "Freeze/Unfreeze User",
      description: "Freeze or unfreeze a user account",
      method: "PATCH",
      endpoint: "/api/v1/users/:userId/freeze",
      request: `{ "freeze": true }`,
      response: `{ "success": true }`,
      code: {
        curl: `# Stub.
curl -X PATCH https://sandbox-api.hasa.io/api/v1/users/usr_9876543210/freeze \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d '{"freeze": true}'`,
        javascript: `// Stub
await hasa.users.freeze('usr_9876543210', true);`,
        python: `// Stub
hasa.users.freeze('usr_9876543210', True)`,
        postman: `# Postman: Body.
{ "freeze": true }`,
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
        curl: `curl -X GET https://sandbox-api.hasa.io/api/v1/users/usr_9876543210/wallet \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const wallet = await hasa.users.getWallet('usr_9876543210');`,
        python: `wallet = hasa.users.get_wallet('usr_9876543210')`,
        postman: `# Postman: Replace :userId. No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/users/usr_9876543210/wallet`,
      },
    },
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
        curl: `curl -X POST https://sandbox-api.hasa.io/api/v1/wallets \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
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
        postman: `# Postman: Paste into body.
{
  "type": "USER",
  "userId": "usr_9876543210",
  "label": "Main Wallet"
}`,
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
        curl: `# Use Postman for sig.
curl -X GET https://sandbox-api.hasa.io/api/v1/wallets \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const wallets = await hasa.wallets.list();`,
        python: `wallets = hasa.wallets.list()`,
        postman: `# Postman: No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/wallets`,
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
        curl: `curl -X GET https://sandbox-api.hasa.io/api/v1/wallets/wlt_abc123 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const wallet = await hasa.wallets.get('wlt_abc123');`,
        python: `wallet = hasa.wallets.get('wlt_abc123')`,
        postman: `# Postman: Replace :id. No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/wallets/wlt_abc123`,
      },
    },
    "wallets-user": {
      title: "Get User Wallets",
      description: "Retrieve all wallets for a specific user",
      method: "GET",
      endpoint: "/api/v1/wallets/user/:userId",
      response: `{ "wallets": ["wlt_abc123", "wlt_def456"] }`,
      code: {
        curl: `# Stub.
curl -X GET https://sandbox-api.hasa.io/api/v1/wallets/user/usr_9876543210 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
const userWallets = await hasa.wallets.getByUser('usr_9876543210');`,
        python: `// Stub
user_wallets = hasa.wallets.get_by_user('usr_9876543210')`,
        postman: `# Postman: Replace :userId. No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/wallets/user/usr_9876543210`,
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
        curl: `curl -X POST https://sandbox-api.hasa.io/api/v1/wallets/wlt_abc123/sync \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const result = await hasa.wallets.sync('wlt_abc123');`,
        python: `result = hasa.wallets.sync('wlt_abc123')`,
        postman: `# Postman: No body.
# URL: POST https://sandbox-api.hasa.io/api/v1/wallets/wlt_abc123/sync`,
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
        curl: `curl -X POST https://sandbox-api.hasa.io/api/v1/wallets/transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
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
        postman: `# Postman: Body JSON.
{
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef1234567890...",
  "asset": "APT",
  "amount": "100.50",
  "description": "Payment for services"
}`,
      },
    },
    "wallets-status": {
      title: "Update Status",
      description: "Update wallet status (e.g., freeze)",
      method: "PATCH",
      endpoint: "/api/v1/wallets/:id/status",
      request: `{ "status": "FROZEN" }`,
      response: `{ "success": true }`,
      code: {
        curl: `# Stub.
curl -X PATCH https://sandbox-api.hasa.io/api/v1/wallets/wlt_abc123/status \\
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
        curl: `curl -X POST https://sandbox-api.hasa.io/api/v1/transactions/process-transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
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
        postman: `# Postman: Body JSON.
{
  "fromWalletId": "wlt_abc123",
  "toAddress": "0xabcdef1234567890...",
  "asset": "APT",
  "amount": "50.25",
  "externalReference": "order_12345"
}`,
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
        curl: `curl -X GET https://sandbox-api.hasa.io/api/v1/transactions \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const transactions = await hasa.transactions.list();`,
        python: `transactions = hasa.transactions.list()`,
        postman: `# Postman: No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/transactions`,
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
        curl: `curl -X GET https://sandbox-api.hasa.io/api/v1/transactions/tx_xyz789 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const tx = await hasa.transactions.get('tx_xyz789');`,
        python: `tx = hasa.transactions.get('tx_xyz789')`,
        postman: `# Postman: Replace :id. No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/transactions/tx_xyz789`,
      },
    },
    "tx-wallet": {
      title: "Wallet Transactions",
      description: "Get transactions for a specific wallet",
      method: "GET",
      endpoint: "/api/v1/transactions/wallet/:walletId",
      response: `{ "data": [] }`,
      code: {
        curl: `# Stub.
curl -X GET https://sandbox-api.hasa.io/api/v1/transactions/wallet/wlt_abc123 \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `// Stub
const walletTxs = await hasa.transactions.getByWallet('wlt_abc123');`,
        python: `// Stub
wallet_txs = hasa.transactions.get_by_wallet('wlt_abc123')`,
        postman: `# Postman: Replace :walletId. No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/transactions/wallet/wlt_abc123`,
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
        curl: `curl -X GET https://sandbox-api.hasa.io/api/v1/transactions/stats/summary \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const stats = await hasa.transactions.getStats();`,
        python: `stats = hasa.transactions.get_stats()`,
        postman: `# Postman: No body.
# URL: GET https://sandbox-api.hasa.io/api/v1/transactions/stats/summary`,
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
  if (!currentEndpoint.content || typeof currentEndpoint.content !== 'string') return null;
  const lines = currentEndpoint.content.split('\n');
  const elements: React.ReactNode[] = [];
  let idx = 0;
  while (idx < lines.length) {
    let line = lines[idx];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={elements.length} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>);
      idx++;
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={elements.length} className="text-xl font-semibold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>);
      idx++;
    } else if (line.startsWith('```')) {
      const langMatch = line.match(/```(\w+)?/);
      const lang = langMatch ? langMatch[1] : '';
      const codeLines: string[] = [];
      idx++; // skip opening ```
      while (idx < lines.length && !lines[idx].startsWith('```')) {
        codeLines.push(lines[idx]);
        idx++;
      }
      if (idx < lines.length) idx++; // skip closing ```
      elements.push(
        <pre key={elements.length} className="bg-gray-900 border border-[#007acc]/20 rounded-lg p-4 mt-4 overflow-x-auto">
          <code className={`text-sm block ${lang === 'javascript' ? 'text-[#66a3ff]' : 'text-gray-300'}`}>
            {codeLines.join('\n')}
          </code>
        </pre>
      );
    } else if (line.startsWith('- ')) {
      const content = line.replace('- ', '');
      let bulletContent = content;
      if (content.includes('`')) {
        const parts = content.split('`');
        bulletContent = parts.map((part: string, j: number) =>
          j % 2 === 1 ? (
            <code key={j} className="px-2 py-1 bg-gray-900 border border-[#007acc]/20 rounded text-[#66a3ff] text-sm font-mono">
              {part}
            </code>
          ) : (
            part
          )
        );
      }
      elements.push(<li key={elements.length} className="text-gray-300 leading-relaxed">{bulletContent}</li>);
      idx++;
    } else if (line.includes('**')) {
      const parts = line.split('**');
      const boldContent = parts.map((part: string, j: number) =>
        j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
      );
      elements.push(<p key={elements.length} className="text-gray-300 leading-relaxed">{boldContent}</p>);
      idx++;
    } else if (line.includes('`')) {
      const parts = line.split('`');
      const inlineContent = parts.map((part: string, j: number) =>
        j % 2 === 1 ? (
          <code key={j} className="px-2 py-1 bg-gray-900 border border-[#007acc]/20 rounded text-[#66a3ff] text-sm font-mono">
            {part}
          </code>
        ) : (
          part
        )
      );
      elements.push(<p key={elements.length} className="text-gray-300 leading-relaxed">{inlineContent}</p>);
      idx++;
    } else if (line.trim() === '') {
      elements.push(<div key={elements.length} className="h-2" />);
      idx++;
    } else {
      elements.push(<p key={elements.length} className="text-gray-300 leading-relaxed">{line}</p>);
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
                                window.history.replaceState(null, '', url);
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
                        .replace(':userId', 'usr_9876543210')
                        .replace(':id', 'wlt_abc123')
                        .replace(':walletId', 'wlt_abc123')}
                    </code>
                  </div>
                )}
                <h1 className="text-4xl font-bold mb-4">{currentEndpoint.title}</h1>
                <p className="text-xl text-gray-400">{currentEndpoint.description}</p>
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
                          url.searchParams.set('tab', lang);
                          window.history.replaceState(null, '', url);
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
              <div className="flex items-center justify-between pt-8 border-t border-[#007acc]/20">
                <a href="#" className="text-[#66a3ff] hover:text-[#007acc] flex items-center gap-2">
                  Need help? Contact Support
                </a>
                <a href="#" className="text-[#66a3ff] hover:text-[#007acc] flex items-center gap-2">
                  Report an Issue
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-12">Endpoint not found—check the sidebar!</div>
          )}
        </main>
      </div>
    </div>
  );
}