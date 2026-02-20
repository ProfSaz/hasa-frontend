"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  Book,
  ChevronDown,
  Users,
  Wallet,
  ArrowLeftRight,
  Settings,
  X,
  Menu,
  AlertCircle,
  Key
} from "lucide-react";
import Link from "next/link";

type SectionId = 'getting-started' | 'organization' | 'users' | 'wallets' | 'transactions';

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const [activeEndpoint, setActiveEndpoint] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [activeTab, setActiveTab] = useState("curl");
  const [expandedSections, setExpandedSections] = useState({
    'getting-started': true,
    'organization': true,
    'users': true,
    'wallets': true,
    'transactions': true
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Map section categories to their first endpoint
      const sectionMapping: Record<string, string> = {
        "getting-started": "introduction",
        "organization": "org-profile",
        "users": "users-create",
        "wallets": "org-wallet",
        "transactions": "tx-org-transfer",
      };
      const targetId = sectionMapping[hash] || hash;
      if (endpoints[targetId]) {
        setActiveSection(targetId);
        setActiveEndpoint(targetId);
      }
    }
  }, []);

  useEffect(() => {
    if (activeEndpoint || activeSection) {
      const activeId = activeEndpoint || activeSection;
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const activeButton = document.querySelector(`button[data-page-id="${activeId}"]`);
        if (activeButton) {
          activeButton.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [activeEndpoint, activeSection]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleSection = (section: SectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const highlightCode = (code: string, language: string) => {
    // Escape HTML to prevent XSS
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&quot;')
    };

    let highlighted = escapeHtml(code);

    if (language === 'json') {
      // Property names/keys
      highlighted = highlighted.replace(/(&quot;[^&"]+&quot;)(\s*:)/g, '<span style="color: #9CDCFE;">$1</span>$2');
      // String values
      highlighted = highlighted.replace(/:\s*(&quot;[^&"]*&quot;)/g, ': <span style="color: #CE9178;">$1</span>');
      // Numbers
      highlighted = highlighted.replace(/:\s*(\d+\.?\d*)/g, ': <span style="color: #B5CEA8;">$1</span>');
      // Booleans
      highlighted = highlighted.replace(/:\s*(true|false)/g, ': <span style="color: #569CD6;">$1</span>');
      // Null
      highlighted = highlighted.replace(/:\s*(null)/g, ': <span style="color: #569CD6;">$1</span>');
      // Brackets and braces
      highlighted = highlighted.replace(/([{}\[\]])/g, '<span style="color: #FFD700;">$1</span>');
    } else if (language === 'curl' || language === 'postman') {
      // URLs
      // highlighted = highlighted.replace(/(https?:\/\/[^\s]+)/g, '<span style="color: #4EC9B0;">$1</span>');
      // Comments
      highlighted = highlighted.replace(/(#.*$)/gm, '<span style="color: #6A9955;">$1</span>');
      // Strings
      highlighted = highlighted.replace(/(&quot;[^&"]*&quot;)/g, '<span style="color: #CE9178;">$1</span>');
      highlighted = highlighted.replace(/(&#039;[^&#]*&#039;)/g, '<span style="color: #CE9178;">$1</span>');
      // Commands and keywords
      highlighted = highlighted.replace(/\b(curl|POST|GET|PATCH|DELETE|PUT|HMAC_PUBLIC_KEY|HMAC_SECRET_KEY|Step)\b/g, '<span style="color: #569CD6;">$1</span>');
      // Options/flags
      highlighted = highlighted.replace(/(\s|^)(-[A-Za-z]|\-\-[a-z-]+)/g, '$1<span style="color: #9CDCFE;">$2</span>');
      // Variables
      highlighted = highlighted.replace(/(\$[A-Za-z_][A-Za-z0-9_]*|\$\{[A-Za-z_][A-Za-z0-9_]*\})/g, '<span style="color: #4FC1FF;">$1</span>');
      // Assignment values
      highlighted = highlighted.replace(/([A-Z_]+)=/g, '<span style="color: #9CDCFE;">$1</span>=');
    } else if (language === 'javascript') {
      // Comments (do first)
      highlighted = highlighted.replace(/(\/\/\s.*$)/gm, '<span style="color: #6A9955;">$1</span>');
      
      // Strings (do before keywords to avoid matching keywords in strings)
      highlighted = highlighted.replace(/(&quot;(?:[^&]|&(?!quot;))*&quot;)/g, '<span style="color: #CE9178;">$1</span>');
      highlighted = highlighted.replace(/(&#039;(?:[^&]|&(?!#039;))*&#039;)/g, '<span style="color: #CE9178;">$1</span>');
      highlighted = highlighted.replace(/(`[^`]*`)/g, '<span style="color: #CE9178;">$1</span>');
      
      // Keywords - use negative lookahead to avoid matching inside existing spans
      highlighted = highlighted.replace(/\b(const|let|var|function|if|else|return|import|export|from|require|await|async|new|class)(?![^<]*>)\b/g, '<span style="color: #C586C0;">$1</span>');
      
      // Numbers
      highlighted = highlighted.replace(/\b(\d+\.?\d*)(?![^<]*>)\b/g, '<span style="color: #B5CEA8;">$1</span>');
      
      // Functions and methods
      highlighted = highlighted.replace(/\b([a-z_][a-zA-Z0-9_]*)(?=\s*\()/g, '<span style="color: #DCDCAA;">$1</span>');
      // highlighted = highlighted.replace(/(\w)\.([a-z_][a-zA-Z0-9_]*)/g, '$1.<span style="color: #DCDCAA;">$2</span>');
      
      // Classes/Objects
      highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9_]*)(?![^<]*>)\b/g, '<span style="color: #4EC9B0;">$1</span>');
    } else if (language === 'python') {
      // Comments
      highlighted = highlighted.replace(/(#.*$)/gm, '<span style="color: #6A9955;">$1</span>');
      // Strings
      highlighted = highlighted.replace(/(&quot;[^&"]*&quot;)/g, '<span style="color: #CE9178;">$1</span>');
      highlighted = highlighted.replace(/(&#039;[^&#]*&#039;)/g, '<span style="color: #CE9178;">$1</span>');
      // Keywords
      highlighted = highlighted.replace(/\b(import|from|def|class|if|else|elif|return|for|in|while|try|except|with|as|pass|break|continue)\b/g, '<span style="color: #C586C0;">$1</span>');
      // Functions
      highlighted = highlighted.replace(/\bdef\s+([a-z_][a-zA-Z0-9_]*)/g, 'def <span style="color: #DCDCAA;">$1</span>');
      highlighted = highlighted.replace(/\b([a-z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #DCDCAA;">$1</span>(');
      // Methods
      // highlighted = highlighted.replace(/\.([a-z_][a-zA-Z0-9_]*)/g, '.<span style="color: #DCDCAA;">$1</span>');
      // Numbers
      highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #B5CEA8;">$1</span>');
      // Built-in functions
      highlighted = highlighted.replace(/\b(print|len|range|str|int|float|list|dict|set|tuple)\b/g, '<span style="color: #4EC9B0;">$1</span>');
    }

    return highlighted;
  };

  const navigation = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book size={16} />,
      pages: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'authentication', title: 'Authentication' }
      ]
    },
    {
      id: 'organization',
      title: 'Organization API',
      icon: <Settings size={16} />,
      pages: [
        { id: 'org-profile', title: 'Get Profile' },
        { id: 'org-settings', title: 'Update Settings' },
        { id: 'org-limits', title: 'Get Limits' },
        { id: 'org-api-keys', title: 'Manage API Keys' },
        { id: 'org-metrics', title: 'Get Metrics' }
      ]
    },
    {
      id: 'users',
      title: 'Users API',
      icon: <Users size={16} />,
      pages: [
        { id: 'users-create', title: 'Create User' },
        { id: 'users-list', title: 'List Users' },
        { id: 'users-get', title: 'Get User' },
        { id: 'users-update', title: 'Update User' },
        { id: 'users-delete', title: 'Delete User' },
        { id: 'users-transfer', title: 'User Transfer' },
        { id: 'users-wallet', title: 'Get User Wallet' }
      ]
    },
    {
      id: 'wallets',
      title: 'Wallets API',
      icon: <Wallet size={16} />,
      pages: [
        { id: 'org-wallet', title: 'Get All Org Wallets' },
        { id: 'wallet-create', title: 'Create Wallet For Users' },
        { id: 'wallets-get', title: 'Get Wallet by ID' },
        { id: 'wallets-user', title: 'Get User Wallets' },
        { id: 'wallets-sync', title: 'Sync Balance' },
        { id: 'wallet-assets', title: 'Get Wallet Assets Balance' },
        { id: 'wallet-status', title: 'Update Wallet Status' }
      ]
    },
    {
      id: 'transactions',
      title: 'Transactions API',
      icon: <ArrowLeftRight size={16} />,
      pages: [
        { id: 'tx-org-transfer', title: 'Get Org Transactions' },
        { id: 'tx-get', title: 'Get Transaction' },
        { id: 'tx-wallet', title: 'Wallet Transactions' },
        { id: 'tx-stats', title: 'Transaction Stats' }
      ]
    }
  ];

  const endpoints: Record<string, any> = {
    introduction: {
      title: "Introduction",
      description:
        "Welcome to HASA API documentation. Our API allows you to integrate Aptos wallet infrastructure into your application with ease.",
      content: (
        <div className="space-y-4">
          <p className="text-[14.5px] text-gray-300 leading-relaxed">
            HASA provides a comprehensive Wallet-as-a-Service platform built on Aptos blockchain. Our API enables you to:
          </p>

          <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-semibold text-[#F9F9F9] mb-3">Overview</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span>Create and manage user wallets</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span>Create and manage Organization treasury and payment wallets</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span>Process blockchain transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span>Monitor balances and transaction history</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span>Access real-time analytics</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F9F9F9]">Base URL</h3>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 md:p-4">
              <p className="text-sm text-[#FFFFFF90] mb-1">Sandbox</p>
              <div className="text-[15px] text-[#66a3ff] whitespace-nowrap">https://aptos-wallet-infa.onrender.com</div>
            </div>
          </div>

          <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
            <div className="flex gap-2">
              <AlertCircle size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#66a3ff] text-sm font-semibold mb-1">Need Help?</p>
                <p className="text-[#FFFFFF85] text-sm">Contact on X/Twitter at @prof_saz</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    authentication: {
      title: "Authentication",
      description:
        "Learn how to authenticate your API requests using API keys and HMAC signatures.",
      method: "",
      endpoint: "",
      content: (
        <div className="space-y-6">
          <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
            All API requests must be authenticated using your API key pair. We're still on testnet, so you can use the test organization API key pairs below.
          </p>

          <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-3 md:p-6">
            <h3 className="text-lg font-semibold text-[#F9F9F9] mb-4">Test Key Pairs (Sandbox)</h3>
            <div className="space-y-3">
              <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
                <p className="text-xs text-[#FFFFFF90] mb-2">Pair 1</p>
                <div className="space-y-1 text-sm w-full overflow-x-auto scrollbar-hide">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFFFFF85]">Public:</span>
                    <code className="text-[#66a3ff]">pk_5fb7588df8574cc1b357bc969aaaae43</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFFFFF85]">Secret:</span>
                    <code className="text-[#66a3ff]">sk_16c43ae06ff34558ae70557b5d81872a</code>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
                <p className="text-xs text-[#FFFFFF90] mb-2">Pair 2</p>
                <div className="space-y-1 text-sm w-full overflow-x-auto scrollbar-hide">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFFFFF85]">Public:</span>
                    <code className="text-[#66a3ff]">pk_3db45bb9cac949dab1fb7bc0b53943a6</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFFFFF85]">Secret:</span>
                    <code className="text-[#66a3ff]">sk_ba9b8245b2d744719a6e759d4c8f2c29</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F9F9F9]">Request Headers</h3>
            <p className="text-gray-300 text-sm">Every request must include:</p>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 md:p-4">
              <pre className="text-sm text-gray-300">
                <div>x-api-key: your_public_key</div>
                <div>x-timestamp: 1640995200</div>
                <div>x-signature: hmac_signature</div>
              </pre>
            </div>
          </div>

          <div className="border-l-4 border-[#007acc]/50 pl-2 md:pl-6 py-2">
            <h3 className="text-base font-semibold text-[#F9F9F9] mb-2">HMAC Signature Generation</h3>
            <p className="text-gray-300 text-sm mb-3">
              Generate signature using:
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 md:p-4">
              <code className="text-sm text-[#66a3ff]">
                HMAC-SHA256(timestamp + method + fullPath + canonicalBody)
              </code>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[#FFFFFF85]">timestamp:</span>
                  <span className="text-gray-300 text-[13px] md:text-sm">Unix seconds (e.g., Math.floor(Date.now() / 1000))</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FFFFFF85]">method:</span>
                  <span className="text-gray-300 text-[13px] md:text-sm">Uppercase HTTP method (e.g., POST)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FFFFFF85]">fullPath:</span>
                  <span className="text-gray-300 text-[13px] md:text-sm">Path + query string if present</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FFFFFF85]">canonicalBody:</span>
                  <span className="text-gray-300 text-[13px] md:text-sm">Sorted JSON string (keys alphabetically)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
            <div className="flex gap-2">
              <Key size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#66a3ff] text-sm font-semibold mb-1">Postman Setup Recommended</p>
                <p className="text-[#FFFFFF85] text-sm">For easier testing, use the Postman pre-request script provided in the code examples below to automatically handle HMAC signature generation.</p>
              </div>
            </div>
          </div>
        </div>
      ),
      code: {
        curl: `# Note: Curl requires manual HMAC generation (use Postman for auto-handling)
# Set variables
PK=pk_f1d9f6dec8c94899802e9fd5078e543c
SK=sk_bbd5c516a60f43eab535ea7d5c59c930
TIMESTAMP=$(date +%s)

# Create signature string (add sorted body if present)
STRING_TO_SIGN="\${TIMESTAMP}POST/api/v1/users{}"

# Generate HMAC signature
SIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha256 -hmac "$SK" -binary | xxd -p)

# Make the request
curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/users \\
  -H "x-api-key: $PK" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -H "Content-Type: application/json" \\
  -d {}`,
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

// Your request body
const body = {};
const canonicalBody = JSON.stringify(sortKeys(body)) || {};

// Add ?query if needed
const fullPath = '/api/v1/users';

// Create signature
const stringToSign = timestamp + 'POST' + fullPath + canonicalBody;
const signature = crypto
  .createHmac('sha256', apiSecret)
  .update(stringToSign)
  .digest('hex');

// Make the request
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
);

console.log(response.data);`,
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

# Your request body
body = {}
canonical_body = json.dumps(sort_keys(body)) or {}

# Add ?query if needed
full_path = '/api/v1/users'

# Create signature
string_to_sign = timestamp + 'POST' + full_path + canonical_body
signature = hmac.new(
    api_secret.encode(),
    string_to_sign.encode(),
    hashlib.sha256
).hexdigest()

# Make the request
response = requests.post(
    'https://aptos-wallet-infa.onrender.com/api/v1/users',
    json=body,
    headers={
        'x-api-key': api_key,
        'x-timestamp': timestamp,
        'x-signature': signature
    }
)

print(response.json())`,
        postman: `# Postman: Auto-handled by pre-request script!

# Step 1: Set environment variables
HMAC_PUBLIC_KEY=pk_f1d9f6dec8c94899802e9fd5078e543c
HMAC_SECRET_KEY=sk_bbd5c516a60f43eab535ea7d5c59c930

# Step 2: URL
POST https://aptos-wallet-infa.onrender.com/api/v1/users

# Step 3: Body (raw JSON) - Paste below into Postman body tab
{
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
        curl: `# Note: Generate HMAC sig manually or use Postman
# STRING_TO_SIGN="\${TIMESTAMP}GET/api/v1/organization/profile{}"

curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/profile
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
        javascript: `const response = await hasa.organization.getProfile();
console.log(response.data);`,
        python: `response = hasa.organization.get_profile()
print(response)`,
        postman: `# Postman: No body needed—script handles headers.
GET https://aptos-wallet-infa.onrender.com/api/v1/organization/profile
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
  -d {
    "allowedAssets": ["APT", "USDC"],
    "autoConversion": true,
    "webhookUrl": "https://yourapp.com/webhooks"
  }`,
        javascript: `const response = await hasa.organization.updateSettings({
  webhookUrl: 'https://yourapp.com/webhooks',
  autoConversion: true,
  allowedAssets: ['APT', 'USDC']
});

console.log(response.data);`,
        python: `response = hasa.organization.update_settings({
    'webhook_url': 'https://yourapp.com/webhooks',
    'auto_conversion': True,
    'allowed_assets': ['APT', 'USDC']
})

print(response)`,
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
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Retrieve comprehensive information about your organization's transaction limits, asset restrictions, and current usage metrics.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-4">Response Structure</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-2">Transaction Limits</p>
              <ul className="space-y-1 text-gray-300 text-xs">
                <li>Daily transaction limit</li>
                <li>Monthly transaction volume</li>
                <li>Per-transaction maximum</li>
                <li>Transaction velocity limits</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-2">Asset Limits</p>
              <ul className="space-y-1 text-gray-300 text-xs">
                <li>Per-asset daily/monthly limits</li>
                <li>Maximum holding limits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
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
                "holdingLimit": 500000
            }
        ]
    },
    "usage": {
        "transactionsToday": 0,
        "transactionsThisMonth": 0,
        "currentUsers": 6
    }
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/limits \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const limits = await hasa.organization.getLimits();
console.log(limits);`,
      python: `limits = hasa.organization.get_limits()
print(limits)`,
      postman: `# Postman: No body needed
 GET https://aptos-wallet-infa.onrender.com/api/v1/organization/limits`
    }
  },

  "org-api-keys": {
    title: "Get API Keys",
    description: "Retrieve your API keys information",
    method: "GET",
    endpoint: "/api/v1/organization/api-keys",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Retrieve information about your API key configuration, including permissions, rate limits, and last rotation date.
        </p>

        <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#66a3ff] text-sm font-semibold mb-1">Security Note</p>
              <p className="text-[#FFFFFF85] text-sm">This endpoint only returns the public key. Secret keys are never exposed via API.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{
    "publicKey": "pk_f1d9f6dec8c94899802e9fd5078e543c",
    "permissions": ["READ_WALLETS", "CREATE_TRANSACTIONS"],
    "environment": "SANDBOX",
    "rateLimit": 1000,
    "lastRotation": "2025-10-02T03:49:52.540Z"
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/api-keys \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const keys = await hasa.organization.getApiKeys();
console.log(keys);`,
      python: `keys = hasa.organization.get_api_keys()
print(keys)`,
      postman: `# Postman: No body needed
 GET https://aptos-wallet-infa.onrender.com/api/v1/organization/api-keys`
    }
  },

  "org-metrics": {
    title: "Get Organization Metrics",
    description: "Retrieve organization metrics and analytics",
    method: "GET",
    endpoint: "/api/v1/organization/metrics",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Access real-time analytics about your organization's activity, including transaction volumes, active wallets, and growth metrics.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-3">Metrics Overview</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Total transaction count and volume</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Active wallet statistics</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>30-day performance period</span>
            </li>
          </ul>
        </div>
      </div>
    ),
    response: `{
    "totalTransactions": 0,
    "totalVolume": 0,
    "activeWallets": 6,
    "period": "30d",
    "generatedAt": "2025-10-04T09:11:56.925Z"
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/organization/metrics \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const metrics = await hasa.organization.getMetrics();
console.log(metrics);`,
      python: `metrics = hasa.organization.get_metrics()
print(metrics)`,
      postman: `# Postman: No body needed
 GET https://aptos-wallet-infa.onrender.com/api/v1/organization/metrics`
    }
  },

  "users-create": {
    title: "Create User",
    description: "Create a new user in your organization",
    method: "POST",
    endpoint: "/api/v1/users",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Create a new user within your organization. This automatically generates a primary wallet for the user on the Aptos blockchain.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-3">Required Fields</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[#007acc]">externalUserId:</span>
              <span className="text-gray-300">Your internal user identifier</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#007acc]">profile:</span>
              <span className="text-gray-300">User profile information (optional but recommended)</span>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-[#007acc]/50 pl-6 py-2">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-2">Optional Parameters</h3>
          <p className="text-gray-300 text-sm mb-2">You can also set:</p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Transaction limits (daily, monthly, per-transaction)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Tags for organization and filtering</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Internal notes</span>
            </li>
          </ul>
        </div>
      </div>
    ),
    request: `{
  "externalUserId": "ORG-USER-12026",
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
  "notes": "High-value customer"
}`,
    response: `{
    "id": "0c1a8ac1-4b5a-46e0-8d55-c27d8dd78485",
    "externalUserId": "ORG-USER-12026",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
    },
    "status": "ACTIVE",
    "walletIds": ["06fab897-74f5-4242-8489-23d66235f661"],
    "createdAt": "2025-10-04T23:48:23.832Z"
}`,
    code: {
      curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/users \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d {
    "externalUserId": "ORG-USER-12026",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }`,
      javascript: `const user = await hasa.users.create({
  externalUserId: 'ORG-USER-12026',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  }
});
console.log(user);`,
      python: `user = hasa.users.create({
    'external_user_id': 'ORG-USER-12026',
    'profile': {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com'
    }
})
print(user)`,
      postman: `# Postman: Paste into raw JSON body
{
  "externalUserId": "ORG-USER-12026",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US"
  },
  "limits": {
    "dailyLimit": 10000,
    "perTransactionLimit": 5000,
    "monthlyLimit": 100000
  }
}`
    }
  },

  "users-list": {
    title: "List Users",
    description: "Get a paginated list of all users",
    method: "GET",
    endpoint: "/api/v1/users?page=1&limit=20",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Retrieve a paginated list of all users in your organization with their profile information, wallet IDs, and activity metrics.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-3">Query Parameters</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">page</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Page number (default: 1)</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">limit</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Results per page (default: 20, max: 100)</span>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{
    "users": [
        {
            "id": "0c1a8ac1-4b5a-46e0-8d55-c27d8dd78485",
            "externalUserId": "ORG-USER-12026",
            "profile": {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com"
            },
            "status": "ACTIVE",
            "walletIds": ["06fab897-74f5-4242-8489-23d66235f661"]
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 20,
        "total": 6,
        "totalPages": 1
    }
}`,
    code: {
      curl: `curl -X GET "https://aptos-wallet-infa.onrender.com/api/v1/users?page=1&limit=20" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const users = await hasa.users.list({ page: 1, limit: 20 });
console.log(users);`,
      python: `users = hasa.users.list(page=1, limit=20)
print(users)`,
      postman: `# Postman: Add query parameters to URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/users?page=1&limit=20`
    }
  },

  "users-get": {
    title: "Get User",
    description: "Retrieve details of a specific user",
    method: "GET",
    endpoint: "/api/v1/users/:userId",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Fetch complete details for a specific user, including profile information, limits, restrictions, and associated wallet IDs.
        </p>
      </div>
    ),
    response: `{
    "id": "0fefc209-8a63-4d66-b824-4204bea261e0",
    "externalUserId": "ORG-USER-12W26",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "profile": {
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@example.com"
    },
    "status": "ACTIVE",
    "walletIds": ["6f9e75a0-cc2f-4726-9c34-a8e9924c9038"],
    "createdAt": "2025-10-02T01:25:26.977Z"
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/users/:userId \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const user = await hasa.users.get('userId');
console.log(user);`,
      python: `user = hasa.users.get('userId')
print(user)`,
      postman: `# Postman: Replace :userId in URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/users/:userId`
    }
  },

  "users-update": {
    title: "Update User",
    description: "Update user details and settings",
    method: "PATCH",
    endpoint: "/api/v1/users/:userId",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Update user profile information, limits, tags, or status. Only include fields you want to modify.
        </p>

        <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#66a3ff] text-sm font-semibold mb-1">Partial Updates</p>
              <p className="text-[#FFFFFF85] text-sm">This endpoint supports partial updates. Only send the fields you want to change.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    request: `{
  "profile": {
    "firstName": "Jane",
    "email": "jane.doe@example.com"
  },
  "limits": {
    "dailyLimit": 15000
  },
  "tags": ["premium", "verified", "vip"]
}`,
    response: `{
    "success": true,
    "updatedAt": "2025-10-02T02:54:13.209Z"
}`,
    code: {
      curl: `curl -X PATCH https://aptos-wallet-infa.onrender.com/api/v1/users/:userId \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d {
    "profile": {
      "firstName": "Jane"
    }
  }`,
      javascript: `const updated = await hasa.users.update('userId', {
  profile: { firstName: 'Jane' }
});
console.log(updated);`,
      python: `updated = hasa.users.update('userId', {
    'profile': {'first_name': 'Jane'}
})
print(updated)`,
      postman: `# Postman: Paste into raw JSON body
{
  "profile": {
    "firstName": "Jane",
    "email": "jane.doe@example.com"
  },
  "tags": ["premium", "vip"]
}`
    }
  },

  "users-delete": {
    title: "Delete User",
    description: "Delete a user from your organization",
    method: "DELETE",
    endpoint: "/api/v1/users/:userId",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Permanently delete a user and their associated wallets from your organization.
        </p>

        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 text-sm font-semibold mb-1">Warning: Irreversible Action</p>
              <p className="text-[#FFFFFF85] text-sm">This action cannot be undone. Ensure wallets are empty before deletion.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{ "success": true }`,
    code: {
      curl: `curl -X DELETE https://aptos-wallet-infa.onrender.com/api/v1/users/:userId \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `await hasa.users.delete('userId');`,
      python: `hasa.users.delete('userId')`,
      postman: `# Postman: No body needed
 DELETE https://aptos-wallet-infa.onrender.com/api/v1/users/:userId`
    }
  },

  "users-transfer": {
    title: "User Transfer",
    description: "Initiate asset transfer for a user",
    method: "POST",
    endpoint: "/api/v1/users/:userId/transfer",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Transfer assets from a user's primary wallet to any Aptos address. This endpoint handles the complete transaction lifecycle.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-3">Transfer Process</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">1.</span>
              <span>Balance verification</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">2.</span>
              <span>Compliance checks</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">3.</span>
              <span>Transaction submission to blockchain</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">4.</span>
              <span>Confirmation monitoring</span>
            </li>
          </ul>
        </div>
      </div>
    ),
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
        "type": "WITHDRAWAL",
        "status": "PENDING",
        "fromAddress": "0xee7f...",
        "toAddress": "0x8040...",
        "asset": {
            "symbol": "USDC",
            "amount": "0.5"
        },
        "blockchain": {
            "hash": "0x99d6..."
        }
    }
}`,
    code: {
      curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/users/:userId/transfer \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d {
    "toAddress": "0x8040...",
    "asset": {"symbol": "USDC", "amount": "0.5"}
  }`,
      javascript: `const tx = await hasa.users.transfer('userId', {
  toAddress: '0x8040...',
  asset: { symbol: 'USDC', amount: '0.5' }
});`,
      python: `tx = hasa.users.transfer('userId', {
    'to_address': '0x8040...',
    'asset': {'symbol': 'USDC', 'amount': '0.5'}
})`,
      postman: `# Postman: Paste into raw JSON body
{
  "toAddress": "0x8040cbdc59266504fa3a77ca364572ae35b867a42d083a17c412a44f455e8a09",
  "asset": {
    "symbol": "USDC",
    "amount": "0.5"
  }
}`
    }
  },

  "users-wallet": {
    title: "Get User Primary Wallet",
    description: "Retrieve wallet information for a user",
    method: "GET",
    endpoint: "/api/v1/users/:userId/wallet",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Get the primary wallet details for a user, including address, balances, and transaction history.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-3">Wallet Information Includes</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Aptos blockchain address</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Asset balances with decimals</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Wallet status and sync information</span>
            </li>
          </ul>
        </div>
      </div>
    ),
    response: `{
    "id": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
    "aptosAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
    "assets": [
        {
            "symbol": "USDC",
            "balance": "0.9",
            "decimal": 6
        }
    ],
    "status": "ACTIVE"
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/users/:userId/wallet \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const wallet = await hasa.users.getWallet('userId');
console.log(wallet);`,
      python: `wallet = hasa.users.get_wallet('userId')
print(wallet)`,
      postman: `# Postman: Replace :userId in URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/users/:userId/wallet`
    }
  },
  "org-wallet": {
    title: "Get Organization Wallets",
    description: "Retrieve all wallets associated with your organization",
    method: "GET",
    endpoint: "/api/v1/wallets",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Get a comprehensive list of all wallets created under your organization, including user wallets, treasury wallets, and payment wallets.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-4">Wallet Information Includes</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Wallet ID and Aptos blockchain address</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Associated user ID and wallet type</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Current status and asset balances</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Last sync and access timestamps</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#66a3ff] text-sm font-semibold mb-1">Security Note</p>
              <p className="text-[#FFFFFF85] text-sm">Private keys are encrypted and should be handled with extreme care.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `[
  {
    "id": "06fab897-74f5-4242-8489-23d66235f661",
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "0c1a8ac1-4b5a-46e0-8d55-c27d8dd78485",
    "type": "USER",
    "aptosAddress": "0x2cbbb358250699c18247cd88159a70128f602d49ac8a7d11190722eb56003089",
    "assets": [],
    "status": "ACTIVE"
  }
]`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const wallets = await hasa.wallets.getOrgWallets();
console.log(wallets);`,
      python: `wallets = hasa.wallets.get_org_wallets()
print(wallets)`,
      postman: `# Postman: No body needed
 GET https://aptos-wallet-infa.onrender.com/api/v1/wallets`
    }
  },

  "wallets-get": {
    title: "Get Wallet Details",
    description: "Retrieve comprehensive details for a specific wallet",
    method: "GET",
    endpoint: "/api/v1/wallets/:id",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Fetch detailed information about a specific wallet including its blockchain address, asset holdings, status, and access history.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-3">Returned Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-1">Identifiers</p>
              <p className="text-[#FFFFFF85] text-xs">Wallet ID, Aptos address, user association</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-1">Security</p>
              <p className="text-[#FFFFFF85] text-xs">Encrypted keys, access logs</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-1">Assets</p>
              <p className="text-[#FFFFFF85] text-xs">Token balances and decimals</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-1">Activity</p>
              <p className="text-[#FFFFFF85] text-xs">Last accessed and synced timestamps</p>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{
  "id": "36c49dae-8124-4894-9798-f362debde84e",
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
  "type": "USER",
  "aptosAddress": "0x86127bc5ae07aa0457a64c327737e22b940b6c008e0bee5f161dcc74019677f3",
  "assets": [],
  "status": "ACTIVE",
  "lastAccessedAt": "2025-10-05T00:38:25.848Z",
  "lastSyncedAt": "2025-10-02T02:24:05.148Z"
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/:id \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const wallet = await hasa.wallets.get('walletId');
console.log(wallet);`,
      python: `wallet = hasa.wallets.get('walletId')
print(wallet)`,
      postman: `# Postman: Replace :id in URL with actual wallet ID
 GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/:id`
    }
  },

  "wallets-user": {
    title: "Get User Wallets",
    description: "Retrieve all wallets belonging to a specific user",
    method: "GET",
    endpoint: "/api/v1/wallets/users/:userId",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Get a complete list of all wallet addresses associated with a specific user. Users can have multiple wallets for different purposes or assets.
        </p>

        <div className="border-l-4 border-[#007acc]/50 pl-6 py-2">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-2">Use Cases</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>View all wallet addresses for a user</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Aggregate user balance across wallets</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Track wallet creation history</span>
            </li>
          </ul>
        </div>
      </div>
    ),
    response: `[
  {
    "id": "36c49dae-8124-4894-9798-f362debde84e",
    "userId": "c93498f1-e6b2-47a8-841e-b253180b5f07",
    "type": "USER",
    "aptosAddress": "0x86127bc5ae07aa0457a64c327737e22b940b6c008e0bee5f161dcc74019677f3",
    "status": "ACTIVE"
  }
]`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/users/:userId \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const userWallets = await hasa.wallets.getByUser('userId');
console.log(userWallets);`,
      python: `user_wallets = hasa.wallets.get_by_user('userId')
print(user_wallets)`,
      postman: `# Postman: Replace :userId in URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/users/:userId`
    }
  },

  "wallet-assets": {
    title: "Get Wallet Balance",
    description: "Retrieve asset balances for a specific wallet address",
    method: "GET",
    endpoint: "/api/v1/wallets/address/:walletAddress/balances",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Query the current balance of all supported assets for a given Aptos wallet address. This endpoint provides real-time balance information directly from the blockchain.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-4">Balance Information</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Asset symbol and balance</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Decimal precision for accurate calculations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Last update timestamp</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Total asset count</span>
            </li>
          </ul>
        </div>
      </div>
    ),
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
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/address/:walletAddress/balances \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const balance = await hasa.wallets.getBalance('walletAddress');
console.log(balance);`,
      python: `balance = hasa.wallets.get_balance('walletAddress')
print(balance)`,
      postman: `# Postman: Replace :walletAddress in URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/wallets/address/:walletAddress/balances`
    }
  },

  "wallets-sync": {
    title: "Sync Wallet Balance",
    description: "Manually trigger a balance synchronization with the blockchain",
    method: "POST",
    endpoint: "/api/v1/wallets/:id/sync",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Force an immediate synchronization of wallet balances with the Aptos blockchain. This ensures you have the most up-to-date balance information.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-3">Sync Process</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-[#007acc] font-semibold">1.</span>
              <span>Query blockchain for latest balances</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#007acc] font-semibold">2.</span>
              <span>Update internal database records</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#007acc] font-semibold">3.</span>
              <span>Return updated wallet information</span>
            </div>
          </div>
        </div>

        <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#66a3ff] text-sm font-semibold mb-1">Rate Limiting</p>
              <p className="text-[#FFFFFF85] text-sm">Sync operations are rate-limited to prevent excessive blockchain queries.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{
  "id": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
  "aptosAddress": "0xee7f2113b3a7cfcffb10dad9732af56a90b411269562d5aa9d17c04e51ff142f",
  "assets": [
    {
      "symbol": "USDC",
      "balance": "0.9",
      "decimal": 6
    }
  ],
  "status": "ACTIVE",
  "lastSyncedAt": "2025-10-05T00:42:07.705Z"
}`,
    code: {
      curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/wallets/:id/sync \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const result = await hasa.wallets.sync('walletId');
console.log(result);`,
      python: `result = hasa.wallets.sync('walletId')
print(result)`,
      postman: `# Postman: No body needed
 POST https://aptos-wallet-infa.onrender.com/api/v1/wallets/:id/sync`
    }
  },

  "wallet-create": {
    title: "Create User Wallet",
    description: "Generate a new wallet for an existing user",
    method: "POST",
    endpoint: "/api/v1/wallets/:userId/wallet",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Create an additional wallet for a user. This allows users to have multiple wallets for different purposes, such as separating personal and business funds.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-3">What Happens</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>New Aptos address generated on-chain</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Secure key pair created and encrypted</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Wallet associated with user account</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Ready to receive and send assets immediately</span>
            </li>
          </ul>
        </div>

        <div className="border-l-4 border-[#007acc]/50 pl-6 py-2">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-2">Required Fields</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">organizationId</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Your organization identifier</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">userId</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Target user's ID</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">type</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Wallet type (USER, TREASURY, etc.)</span>
            </div>
          </div>
        </div>
      </div>
    ),
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
  "createdAt": "2025-10-05T00:47:02.387Z"
}`,
    code: {
      curl: `curl -X POST https://aptos-wallet-infa.onrender.com/api/v1/wallets/:userId/wallet \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d {
    "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
    "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
    "type": "USER"
  }`,
      javascript: `const wallet = await hasa.wallets.create({
  organizationId: 'orgId',
  userId: 'userId',
  type: 'USER'
});
console.log(wallet);`,
      python: `wallet = hasa.wallets.create({
    'organization_id': 'orgId',
    'user_id': 'userId',
    'type': 'USER'
})
print(wallet)`,
      postman: `# Postman: Paste into raw JSON body
{
  "organizationId": "d265d447-a7e5-4e52-8c43-5f3e1f761134",
  "userId": "638c431a-cee8-4c72-b438-2af83ef7005e",
  "type": "USER"
}`
    }
  },

  "wallet-status": {
    title: "Update Wallet Status",
    description: "Change wallet status (active, frozen, suspended)",
    method: "PATCH",
    endpoint: "/api/v1/wallets/:id/status",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Update the operational status of a wallet. This can be used to temporarily freeze wallets for security reasons or to prevent unauthorized transactions.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-3">Available Status Values</h3>
          <div className="space-y-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#66a3ff50]"></span>
                <code className="text-[#F9F9F9] text-sm">ACTIVE</code>
              </div>
              <p className="text-[#FFFFFF85] text-xs">Wallet can send and receive transactions</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#66a3ff50]"></span>
                <code className="text-[#F9F9F9] text-sm">FROZEN</code>
              </div>
              <p className="text-[#FFFFFF85] text-xs">Wallet is temporarily locked, no transactions allowed</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#66a3ff50]"></span>
                <code className="text-[#F9F9F9] text-sm">SUSPENDED</code>
              </div>
              <p className="text-[#FFFFFF85] text-xs">Wallet under review or compliance hold</p>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 text-sm font-semibold mb-1">Important</p>
              <p className="text-[#FFFFFF85] text-sm">Freezing a wallet immediately prevents all outgoing transactions. Use with caution.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    request: `{
  "status": "FROZEN"
}`,
    response: `{
  "id": "36c49dae-8124-4894-9798-f362debde84e",
  "aptosAddress": "0x86127bc5ae07aa0457a64c327737e22b940b6c008e0bee5f161dcc74019677f3",
  "status": "FROZEN",
  "updatedAt": "2025-10-05T00:45:12.241Z",
  "lastModifiedBy": "api-pk_f1d9f6dec8c94899802e9fd5078e543c"
}`,
    code: {
      curl: `curl -X PATCH https://aptos-wallet-infa.onrender.com/api/v1/wallets/:id/status \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE" \\
  -d {"status": "FROZEN"}`,
      javascript: `const result = await hasa.wallets.updateStatus('walletId', 'FROZEN');
console.log(result);`,
      python: `result = hasa.wallets.update_status('walletId', 'FROZEN')
print(result)`,
      postman: `# Postman: Paste into raw JSON body
{
  "status": "FROZEN"
}`
    }
  },

  "tx-org-transfer": {
    title: "Get Organization Transactions",
    description: "Retrieve all transactions for your organization",
    method: "GET",
    endpoint: "/api/v1/transactions/?page=1&limit=3",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Get a paginated list of all transactions across all wallets in your organization. This provides a comprehensive view of all blockchain activity.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-4">Transaction Data Includes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span className="text-gray-300">Transaction ID and type</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span className="text-gray-300">From/To addresses</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span className="text-gray-300">Asset and amount</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span className="text-gray-300">Status and timestamps</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span className="text-gray-300">Blockchain hash</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#007acc] mr-2">•</span>
                <span className="text-gray-300">Fees and compliance data</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-[#007acc]/50 pl-6 py-2">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-2">Query Parameters</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">page</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Page number (default: 1)</span>
            </div>
            <div className="flex items-start gap-2">
              <code className="text-[#66a3ff]">limit</code>
              <span className="text-[#FFFFFF85]">-</span>
              <span className="text-gray-300">Results per page (default: 20, max: 100)</span>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{
  "success": true,
  "data": [
    {
      "id": "0d1ca434-5a47-4aec-a0a0-fc9c81b8678f",
      "type": "WITHDRAWAL",
      "direction": "OUTBOUND",
      "fromAddress": "0xee7f...",
      "toAddress": "0x8040...",
      "asset": {
        "symbol": "USDC",
        "amount": "0.5"
      },
      "status": "PENDING",
      "blockchain": {
        "hash": "0xbd292..."
      }
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
      curl: `curl -X GET "https://aptos-wallet-infa.onrender.com/api/v1/transactions?page=1&limit=3" \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const transactions = await hasa.transactions.list({ page: 1, limit: 3 });
console.log(transactions);`,
      python: `transactions = hasa.transactions.list(page=1, limit=3)
print(transactions)`,
      postman: `# Postman: Add query parameters to URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/transactions?page=1&limit=3`
    }
  },

  "tx-get": {
    title: "Get Transaction Details",
    description: "Retrieve detailed information about a specific transaction",
    method: "GET",
    endpoint: "/api/v1/transactions/:txnId",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Fetch complete details for a specific transaction including its current status, blockchain confirmation data, and compliance information.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-3">Transaction Details</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Real-time status updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Blockchain hash and confirmations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Fee breakdown (network + platform)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Compliance and risk assessment</span>
            </li>
          </ul>
        </div>
      </div>
    ),
    response: `{
  "success": true,
  "data": {
    "id": "8fa1d786-587c-4963-aaf2-e895be63f3d9",
    "type": "WITHDRAWAL",
    "direction": "OUTBOUND",
    "fromAddress": "0xee7f...",
    "toAddress": "0x8040...",
    "asset": {
      "symbol": "USDC",
      "amount": "0.5"
    },
    "status": "PENDING",
    "blockchain": {
      "hash": "0xfa8914...",
      "confirmations": 0
    },
    "fees": {
      "networkFee": "0",
      "platformFee": "0"
    }
  }
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/:txnId \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const transaction = await hasa.transactions.get('txnId');
console.log(transaction);`,
      python: `transaction = hasa.transactions.get('txnId')
print(transaction)`,
      postman: `# Postman: Replace :txnId in URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/:txnId`
    }
  },

  "tx-wallet": {
    title: "Get Wallet Transactions",
    description: "Retrieve all transactions for a specific wallet",
    method: "GET",
    endpoint: "/api/v1/transactions/wallets/:walletId",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Get a paginated history of all transactions associated with a specific wallet, including both incoming and outgoing transfers.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-3">Transaction Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-1">Inbound</p>
              <p className="text-[#FFFFFF85] text-xs">Deposits and incoming transfers to the wallet</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-3">
              <p className="text-[#66a3ff] font-semibold mb-1">Outbound</p>
              <p className="text-[#FFFFFF85] text-xs">Withdrawals and outgoing transfers from the wallet</p>
            </div>
          </div>
        </div>

        <div className="bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-[#007acc] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#66a3ff] text-sm font-semibold mb-1">Historical Data</p>
              <p className="text-[#FFFFFF85] text-sm">Transactions are retained indefinitely for audit and compliance purposes.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    response: `{
  "success": true,
  "data": [
    {
      "id": "ef69eebf-88e5-4fa8-a05a-1a8a5b277db9",
      "type": "WITHDRAWAL",
      "direction": "OUTBOUND",
      "fromWalletId": "5cbf7b34-086a-428d-a428-d7d03a1ace29",
      "toAddress": "0x8040...",
      "asset": {
        "symbol": "USDC",
        "amount": "0.1"
      },
      "status": "PENDING",
      "blockchain": {
        "hash": "0x99d647..."
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 3,
    "total": 8
  }
}`,
    code: {
      curl: `curl -X GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/wallets/:walletId \\
  -H "x-api-key: pk_f1d9f6dec8c94899802e9fd5078e543c" \\
  -H "x-timestamp: $TIMESTAMP" \\
  -H "x-signature: $SIGNATURE"`,
      javascript: `const walletTxs = await hasa.transactions.getByWallet('walletId');
console.log(walletTxs);`,
      python: `wallet_txs = hasa.transactions.get_by_wallet('walletId')
print(wallet_txs)`,
      postman: `# Postman: Replace :walletId in URL
 GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/wallets/:walletId`
    }
  },

  "tx-stats": {
    title: "Get Transaction Statistics",
    description: "Retrieve aggregated transaction statistics for your organization",
    method: "GET",
    endpoint: "/api/v1/transactions/stats/summary",
    content: (
      <div className="space-y-6">
        <p className="text-[#F9F9F9] text-[14px] md:text-[14.5px] leading-relaxed">
          Access comprehensive analytics and statistics about your organization's transaction activity, broken down by status, direction, and asset type.
        </p>

        <div className="bg-gradient-to-br from-[#66a3ff20] to-[#007acc]/10 border border-gray-800 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-[#F9F9F9] mb-4">Statistics Include</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Transaction count by status (pending, completed, failed)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Total volume by asset type</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>USD value aggregation</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Directional breakdown (inbound vs outbound)</span>
            </li>
          </ul>
        </div>

        <div className="border-l-4 border-[#007acc]/50 pl-6 py-2">
          <h3 className="text-base font-semibold text-[#F9F9F9] mb-2">Use Cases</h3>
          <p className="text-gray-300 text-sm mb-2">Perfect for:</p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Building dashboard analytics</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Monitoring transaction health</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Generating financial reports</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#007acc] mr-2">•</span>
              <span>Tracking asset flow</span>
            </li>
          </ul>
        </div>
      </div>
    ),
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
      javascript: `const stats = await hasa.transactions.getStats();
console.log(stats);`,
      python: `stats = hasa.transactions.get_stats()
print(stats)`,
      postman: `# Postman: No body needed
 GET https://aptos-wallet-infa.onrender.com/api/v1/transactions/stats/summary`
    }
  }
};

  const currentContent = endpoints[activeEndpoint || activeSection];
  const allPages = navigation.flatMap(section => section.pages);
  const currentPageIndex = allPages.findIndex(page => page.id === (activeEndpoint || activeSection));
  const previousPage = currentPageIndex > 0 ? allPages[currentPageIndex - 1] : null;
  const nextPage = currentPageIndex < allPages.length - 1 ? allPages[currentPageIndex + 1] : null;

return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F9F9F9]">
      <header className="bg-[#0a0a0a] border-b border-[#A1A1A120] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/"><h1 className="text-2xl font-bold text-[#007acc]">HasaPay</h1></Link>
              <span className="ml-2 text-[10px] md:text-xs text-[#FFFFFF90] bg-gray-900 px-2 py-1 rounded">API Docs</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="px-3 py-1 bg-[#007acc]/10 border border-[#007acc]/30 rounded text-[#66a3ff] text-sm">
                v1.0
              </span>
              <a href="/" className="text-[#FFFFFF85] hover:text-[#66a3ff]">
                Back to Home
              </a>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      <div className="flex max-w-7xl mx-auto">
        <aside
          ref={dropdownRef}
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block min-w-64 lg:w-72 border-r border-[#A1A1A120] bg-[#0a0a0a] p-4 lg:p-6 fixed md:sticky top-16 left-0 z-40 overflow-y-auto h-[calc(100vh-4rem)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#0a0a0a] [&::-webkit-scrollbar-thumb]:bg-[#007acc]/30 [&::-webkit-scrollbar-thumb]:rounded-full`}
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFFFFF90]" size={18} />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-[#A1A1A120] rounded-lg text-sm focus:outline-none focus:border-[#007acc]/50"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id as SectionId)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-900"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[#007acc]">{section.icon}</span>
                    <span className="font-medium text-sm">{section.title}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      expandedSections[section.id as SectionId] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections[section.id as SectionId] && (
                  <div className="mt-1 space-y-1 ml-2">
                    {section.pages.map((page) => (
                      <button
                        key={page.id}
                        data-page-id={page.id}
                        onClick={() => {
                          setActiveSection(page.id);
                          setActiveEndpoint(page.id);
                          setMobileMenuOpen(false);
                          // Update URL hash
                          const url = new URL(window.location.href);
                          url.hash = page.id;
                          window.history.pushState(null, '', url);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          (activeEndpoint || activeSection) === page.id
                            ? 'bg-[#007acc]/20 text-[#66a3ff]'
                            : 'text-[#FFFFFF85] hover:bg-gray-900 hover:text-[#F9F9F9]'
                        }`}
                      >
                        {page.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8 md:px-10 lg:px-20 mb-10 overflow-x-hidden">
          <div className="max-w-4xl w-full">
            {currentContent && (
              <>
                <div className="mb-6 md:mb-8">
                  <p className="text-xs md:text-sm text-[#007acc] font-semibold mb-2 uppercase tracking-wide">{currentContent.subtitle}</p>
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#FFFFFF85] bg-clip-text text-transparent">{currentContent.title}</h1>
                  {currentContent.method && (
                    <div className="flex items-center gap-2 sm:gap-3 my-4 bg-black/50">
                      <span className={`w-fit px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-md text-xs font-bold uppercase tracking-wide ${
                        currentContent.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                        currentContent.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                        currentContent.method === 'PATCH' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {currentContent.method}
                      </span>
                      <div className="text-xs md:text-sm text-[#F9F9F9] font-mono bg-black/40 px-2.5 py-1.5 md:py-1 md:px-3 rounded-lg break-all border border-[#007acc]/30 whitespace-nowrap w-auto overflow-x-auto scrollbar-hide">
                        {currentContent.endpoint}
                      </div>
                      <button
                        onClick={() => copyToClipboard(currentContent.endpoint, 'endpoint')}
                        className="p-2 md:p-1.5 bg-gray-800 hover:bg-[#007acc] rounded-lg transition-all duration-200 md:group-hover:opacity-100 z-10 shadow-lg"
                        title="Copy to clipboard"
                      >
                        {copiedCode === 'endpoint' ? 
                          <Check size={14} className="md:w-4 md:h-4 text-green-400" /> : 
                          <Copy size={14} className="md:w-4 md:h-4 text-[#FFFFFF85]" />
                        }
                      </button>
                    </div>
                  )}
                  <p className="text-[#FFFFFF85] mt-3 md:mt-4 leading-relaxed text-sm md:text-[15px]">{currentContent.description}</p>
                </div>

                {currentContent.content && (
                  <div className="prose prose-invert max-w-none mb-6 md:mb-8">
                    <div className='text-xs md:text-sm'>{currentContent?.content}</div>
                  </div>
                )}

                {currentContent.request && (
                  <div className="mb-8 w-full overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-1 bg-[#007acc] rounded-full"></div>
                      <h3 className="text-base md:text-lg font-semibold text-[#F9F9F9]">Request Body</h3>
                    </div>
                    <div className="w-full overflow-hidden">
                      <div className="relative group">
                        <button
                          onClick={() => copyToClipboard(currentContent.request, 'request')}
                          className="absolute top-2 right-2 md:top-3 md:right-3 p-2 md:p-2.5 bg-gray-800 hover:bg-[#007acc] rounded-lg transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 z-10 shadow-lg"
                          title="Copy to clipboard"
                        >
                          {copiedCode === 'request' ? 
                            <Check size={14} className="md:w-4 md:h-4 text-green-400" /> : 
                            <Copy size={14} className="md:w-4 md:h-4 text-[#FFFFFF85]" />
                          }
                        </button>
                        <div className="border border-[#007acc]/30 rounded-lg md:rounded-xl overflow-hidden shadow-lg shadow-[#007acc]/5">
                          <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-950 [&::-webkit-scrollbar-thumb]:bg-[#007acc]/40 [&::-webkit-scrollbar-thumb]:rounded-full">
                            <pre className="p-3 md:p-5 min-w-0">
                              <code 
                                className="text-[12px] md:text-sm leading-relaxed font-mono block"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightCode(currentContent.request, 'json') 
                                }}
                              />
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentContent.code && (
                  <div className="mb-8 w-full overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-6 w-1 bg-[#007acc] rounded-full"></div>
                      <h3 className="text-base md:text-lg font-semibold text-[#F9F9F9]">Code Examples</h3>
                    </div>
                    
                    <div className="mb-4 w-full overflow-hidden">
                      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#007acc]/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {Object.keys(currentContent.code).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setActiveTab(lang)}
                            className={`flex-shrink-0 px-3 py-2 md:px-4 md:py-2.5 rounded-md font-semibold text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                              activeTab === lang
                                ? 'bg-[#007acc70] text-[#F9F9F9]'
                                : ' text-[#FFFFFF90] hover:text-[#F9F9F9] border border-[#007acc]/30 md:border-0'
                            }`}
                          >
                            {lang === 'curl' ? 'cURL' : 
                             lang === 'javascript' ? 'JavaScript' :
                             lang === 'python' ? 'Python' :
                             lang === 'postman' ? 'Postman' :
                             lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full overflow-hidden">
                      <div className="relative group">
                        <button
                          onClick={() => copyToClipboard(currentContent.code[activeTab], activeTab)}
                          className="absolute top-2 right-2 md:top-12 md:right-3 p-2 md:p-2.5 bg-gray-800 hover:bg-[#007acc] rounded-lg transition-all duration-200 md:group-hover:opacity-100 z-10 shadow-lg"
                          title="Copy to clipboard"
                        >
                          {copiedCode === activeTab ? 
                            <Check size={14} className="md:w-4 md:h-4 text-green-400" /> : 
                            <Copy size={14} className="md:w-4 md:h-4 text-[#FFFFFF85]" />
                          }
                        </button>
                        
                        <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg md:rounded-xl overflow-hidden shadow-2xl">
                          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-gray-800">
                            {/* <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div> */}
                            <span className="text-xs text-[#FFFFFF90] font-mono ml-2">{activeTab}.{activeTab === 'curl' ? 'sh' : activeTab === 'javascript' ? 'js' : activeTab === 'python' ? 'py' : 'txt'}</span>
                          </div>
                          
                          <div className="w-full min-h-[100px] max-h-[400px] overflow-auto scrollbar-hide ">
                            <pre className="p-3 md:p-5 bg-[#0a0a0a] min-w-0">
                              <code 
                                className="text-[12px] md:text-sm leading-relaxed font-mono block whitespace-pre"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightCode(
                                    currentContent.code[activeTab], 
                                    activeTab === 'postman' ? 'curl' : activeTab
                                  ) 
                                }}
                              />
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentContent.response && (
                  <div className="mb-8 w-full overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-base md:text-lg font-semibold text-[#F9F9F9]">Response</h3>
                    </div>
                    <div className="w-full overflow-hidden">
                      <div className="relative group">
                        <button
                          onClick={() => copyToClipboard(currentContent.response, 'response')}
                          className="absolute top-2 right-2 md:top-3 md:right-3 p-2 md:p-2.5 bg-gray-800 hover:bg-emerald-500 rounded-lg transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 z-10 shadow-lg"
                          title="Copy to clipboard"
                        >
                          {copiedCode === 'response' ? 
                            <Check size={14} className="md:w-4 md:h-4 text-green-400" /> : 
                            <Copy size={14} className="md:w-4 md:h-4 text-[#FFFFFF85]" />
                          }
                        </button>
                        <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg md:rounded-xl overflow-hidden shadow-2xl">
                          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-gray-800">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-xs text-[#FFFFFF90] font-mono ml-2">response.json</span>
                          </div>
                          <div className="w-full min-h-[100px] max-h-[400px] overflow-auto scrollbar-hide">
                            <pre className="p-3 md:p-5 bg-[#0a0a0a] min-w-0">
                              <code 
                                className="text-[13px] md:text-sm leading-relaxed font-mono block whitespace-pre"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightCode(currentContent.response, 'json') 
                                }}
                              />
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#A1A1A120]">
                  {previousPage ? (
                    <button
                      onClick={() => {
                        setActiveSection(previousPage.id);
                        setActiveEndpoint(previousPage.id);
                        // Update URL hash
                        const url = new URL(window.location.href);
                        url.hash = previousPage.id;
                        window.history.pushState(null, '', url);
                      }}
                      className="flex items-center space-x-1 text-[#FFFFFF85] hover:text-[#66a3ff] transition-colors cursor-pointer"
                    >
                      <ChevronRight size={20} className="rotate-180" />
                      <div className="text-left">
                        <div className="text-xs text-[#FFFFFF90]">Previous</div>
                        <div className="font-medium text-[#F9F9F9] text-[12px] md:text-sm">{previousPage.title}</div>
                      </div>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {nextPage ? (
                    <button
                      onClick={() => {
                        setActiveSection(nextPage.id);
                        setActiveEndpoint(nextPage.id);
                        // Update URL hash
                        const url = new URL(window.location.href);
                        url.hash = nextPage.id;
                        window.history.pushState(null, '', url);
                      }}
                      className="flex items-center space-x-1 text-[#FFFFFF85] hover:text-[#66a3ff] transition-colors ml-auto cursor-pointer"
                    >
                      <div className="text-right">
                        <div className="text-xs text-[#FFFFFF90]">Next</div>
                        <div className="font-medium text-[#F9F9F9] text-[12px] md:text-sm">{nextPage.title}</div>
                      </div>
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}