"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CopyIcon,
  DownloadIcon,
  RocketIcon,
  Search,
  X,
  Bell,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Template data
interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  code: string;
}

const templates: Template[] = [
  {
    id: "erc20",
    title: "ERC-20 Token",
    description:
      "Build a fully compliant fungible token with minting and burning functionality.",
    icon: "💰",
    code: `// SPDX-License-Identifier: MIT
          pragma solidity ^0.8.0;

          contract MyERC20Token {
              string public name;
              string public symbol;
              uint8 public decimals = 18;
              uint256 public totalSupply;

              mapping(address => uint256) public balanceOf;
              mapping(address => mapping(address => uint256)) public allowance;

              address public owner;

              event Transfer(address indexed from, address indexed to, uint256 value);
              event Approval(address indexed owner, address indexed spender, uint256 value);

              modifier onlyOwner() {
                  require(msg.sender == owner, "Caller is not the owner");
                  _;
              }

              constructor(
                  string memory _name,
                  string memory _symbol,
                  uint256 _initialSupply
              ) {
                  name = _name;
                  symbol = _symbol;
                  owner = msg.sender;
                  _mint(owner, _initialSupply * 10**decimals);
              }

              function transfer(address to, uint256 value) public returns (bool) {
                  require(balanceOf[msg.sender] >= value, "Insufficient balance");
                  _transfer(msg.sender, to, value);
                  return true;
              }

              function approve(address spender, uint256 value) public returns (bool) {
                  allowance[msg.sender][spender] = value;
                  emit Approval(msg.sender, spender, value);
                  return true;
              }

              function transferFrom(
                  address from,
                  address to,
                  uint256 value
              ) public returns (bool) {
                  require(balanceOf[from] >= value, "Insufficient balance");
                  require(allowance[from][msg.sender] >= value, "Allowance exceeded");
                  allowance[from][msg.sender] -= value;
                  _transfer(from, to, value);
                  return true;
              }

              function mint(address to, uint256 amount) public onlyOwner {
                  _mint(to, amount);
              }

              function burn(uint256 amount) public {
                  require(balanceOf[msg.sender] >= amount, "Insufficient balance");
                  balanceOf[msg.sender] -= amount;
                  totalSupply -= amount;
                  emit Transfer(msg.sender, address(0), amount);
              }

              function _transfer(
                  address from,
                  address to,
                  uint256 value
              ) internal {
                  require(to != address(0), "Transfer to the zero address");
                  balanceOf[from] -= value;
                  balanceOf[to] += value;
                  emit Transfer(from, to, value);
              }

              function _mint(address to, uint256 amount) internal {
                  require(to != address(0), "Mint to the zero address");
                  totalSupply += amount;
                  balanceOf[to] += amount;
                  emit Transfer(address(0), to, amount);
              }
          }
`,
  },
  {
    id: "erc721",
    title: "ERC-721 Token",
    description:
      "Design your unique NFT collection with metadata standards and ownership tracking.",
    icon: "🖼️",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyNFT {
    string public name;
    string public symbol;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;

    uint256 private _tokenIdCounter;

    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
    }

    function mint(address to) public onlyOwner {
        require(to != address(0), "Mint to the zero address");
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _owners[tokenId] = to;
        _balances[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _transfer(from, to, tokenId);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        require(_owners[tokenId] == from, "Transfer from incorrect owner");
        require(to != address(0), "Transfer to the zero address");

        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
        emit Approval(_owners[tokenId], to, tokenId);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = _owners[tokenId];
        return (spender == owner || _tokenApprovals[tokenId] == spender);
    }
}
`,
  },
  {
    id: "multisig",
    title: "Multisig Wallet",
    description:
      "Enable collaborative wallet management for secure, multi-party transactions.",
    icon: "🔐",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultisigWallet {
    address[] public owners;
    uint256 public requiredApprovals;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 approvals;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public approvals;
    uint256 public transactionCount;

    modifier onlyOwner() {
        require(isOwner(msg.sender), "Caller is not an owner");
        _;
    }

    constructor(address[] memory _owners, uint256 _requiredApprovals) {
        require(_owners.length > 0, "Owners required");
        require(_requiredApprovals > 0 && _requiredApprovals <= _owners.length, "Invalid approval count");

        owners = _owners;
        requiredApprovals = _requiredApprovals;
    }

    function isOwner(address account) public view returns (bool) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == account) {
                return true;
            }
        }
        return false;
    }

    function submitTransaction(address to, uint256 value, bytes memory data) external onlyOwner {
        transactions[transactionCount] = Transaction({
            to: to,
            value: value,
            data: data,
            executed: false,
            approvals: 0
        });
        transactionCount++;
    }

    function approveTransaction(uint256 txId) external onlyOwner {
        require(!transactions[txId].executed, "Transaction already executed");
        require(!approvals[txId][msg.sender], "Already approved");

        approvals[txId][msg.sender] = true;
        transactions[txId].approvals++;

        if (transactions[txId].approvals >= requiredApprovals) {
            executeTransaction(txId);
        }
    }

    function executeTransaction(uint256 txId) public {
        Transaction storage transaction = transactions[txId];
        require(transaction.approvals >= requiredApprovals, "Not enough approvals");
        require(!transaction.executed, "Transaction already executed");

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction failed");
    }

    receive() external payable {}
}
`,
  },
  {
    id: "governance",
    title: "Governance Contract",
    description: "Set up DAO-style governance for on-chain decision-making.",
    icon: "🗳️",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(address => bool) public voters;

    modifier onlyVoter() {
        require(voters[msg.sender], "Caller is not a voter");
        _;
    }

    constructor(address[] memory _voters) {
        for (uint256 i = 0; i < _voters.length; i++) {
            voters[_voters[i]] = true;
        }
    }

    function propose(string memory description) external onlyVoter {
        proposals.push(Proposal({
            description: description,
            voteCount: 0,
            executed: false
        }));
    }

    function vote(uint256 proposalId) external onlyVoter {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        proposal.voteCount++;
    }

    function execute(uint256 proposalId) external onlyVoter {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.voteCount > getTotalVoters() / 2, "Not enough votes");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;
    }

    function getTotalVoters() public view returns (uint256 count) {
        for (uint256 i = 0; i < proposals.length; i++) {
            count++;
        }
    }
}
`,
  },
  {
    id: "staking",
    title: "Staking Contract",
    description:
      "Introduce staking capabilities for earning rewards with your tokens.",
    icon: "📈",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    uint256 public rewardRate;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public lastUpdated;
    mapping(address => uint256) public rewards;

    address public stakingToken;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    event Stake(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 reward);

    constructor(uint256 _rewardRate) {
        rewardRate = _rewardRate;
        owner = msg.sender;
    }

    function stake(uint256 amount) external {
        _updateReward(msg.sender);
        balances[msg.sender] += amount;
        emit Stake(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        _updateReward(msg.sender);
        balances[msg.sender] -= amount;
        emit Withdraw(msg.sender, amount);
    }

    function claimRewards() external {
        _updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        emit Claim(msg.sender, reward);
    }

    function _updateReward(address account) internal {
        uint256 timeDiff = block.timestamp - lastUpdated[account];
        rewards[account] += balances[account] * timeDiff * rewardRate;
        lastUpdated[account] = block.timestamp;
    }
}
`,
  },
  {
    id: "dapp",
    title: "Custom dApp Starter Contract",
    description:
      "A prebuilt template for launching decentralized applications on Arbitrum.",
    icon: "🚀",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CustomDApp {
    mapping(address => uint256) public userBalances;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    function deposit() external payable {
        userBalances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        userBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }
}
`,
  },
];

interface TemplateCardProps {
  template: Template;
  onClick: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="h-full"
  >
    <Card
      className="h-full cursor-pointer transition-shadow hover:shadow-lg bg-white border border-gray-200"
      onClick={() => onClick(template)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <span className="text-2xl">{template.icon}</span>
          {template.title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {template.description}
        </CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
);

interface CodePreviewProps {
  template: Template;
  onClose: () => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({ template, onClose }) => {
  const [copyText, setCopyText] = useState("Copy Code");
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(template.code);
    setCopyText("Copied!");
    toast.success("Code copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => setCopyText("Copy Code"), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([template.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}.sol`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Contract downloaded successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDeploy = () => {
    const encodedCode = encodeURIComponent(template.code);
    navigate(`/deploy?code=${encodedCode}`);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-lg overflow-hidden flex flex-col z-50"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{template.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4">
          <SyntaxHighlighter language="solidity" style={tomorrow}>
            {template.code}
          </SyntaxHighlighter>
        </div>
      </ScrollArea>
      <div className="flex flex-wrap justify-end gap-4 p-4 border-t border-gray-200">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleCopy}>
                <CopyIcon className="h-4 w-4 mr-2" />
                {copyText}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleDownload}>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download .sol file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={handleDeploy}
              >
                <RocketIcon className="h-4 w-4 mr-2" />
                Deploy to Arbitrum
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Deploy contract to Arbitrum network</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

const Templates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabTemplates =
    activeTab === "all"
      ? filteredTemplates
      : filteredTemplates.filter((template) => template.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <header className="bg-white border-b px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            dApp Dashboard
          </Link>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">View notifications</span>
          </Button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Arbitrum Contract Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quickly access prebuilt, customizable templates to accelerate your
            smart contract development.
          </p>
        </motion.div>

        <div className="mb-8 relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full pl-10 border-gray-300 focus:border-black focus:ring-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="justify-center flex-wrap">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="erc20"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              ERC-20
            </TabsTrigger>
            <TabsTrigger
              value="erc721"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              ERC-721
            </TabsTrigger>
            <TabsTrigger
              value="multisig"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Multisig
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Governance
            </TabsTrigger>
            <TabsTrigger
              value="staking"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Staking
            </TabsTrigger>
            <TabsTrigger
              value="dapp"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              dApp
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={setSelectedTemplate}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedTemplate && (
            <CodePreview
              template={selectedTemplate}
              onClose={() => setSelectedTemplate(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Templates;
