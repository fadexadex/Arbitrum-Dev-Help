"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Terminal,
  ArrowRight,
  Code,
  Search,
  Droplet,
  Settings,
} from "lucide-react";

interface Tool {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    name: "Arbitrum Node CLI",
    description:
      "Run and interact with your own Arbitrum node for development and testing.",
    url: "https://docs.arbitrum.io/run-arbitrum-node/overview",
    icon: <Terminal className="h-8 w-8 text-primary" />,
  },
  {
    name: "Arbitrum SDK",
    description:
      "Integrate Arbitrum functionality seamlessly into your applications with it's SDK.",
    url: "https://github.com/OffchainLabs/arbitrum-sdk",
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    name: "Block Explorer",
    description:
      "Inspect transactions, contracts, and account balances using the Arbitrum Block Explorer.",
    url: "https://arbiscan.io/",
    icon: <Search className="h-8 w-8 text-primary" />,
  },
  {
    name: "Faucet",
    description:
      "Access test tokens for development on Arbitrum testnets with our Faucet.",
    url: "https://www.alchemy.com/faucets/arbitrum-sepolia",
    icon: <Droplet className="h-8 w-8 text-primary" />,
  },
  {
    name: "Arbitrum Developer Portal",
    description:
      "Access comprehensive guides, tools, and resources for deploying and managing smart contracts on Arbitrum.",
    url: "https://developer.arbitrum.io/",
    icon: <Settings className="h-8 w-8 text-primary" />,
  },
  {
    name: "Arbitrum Nitro Performance Dashboard",
    description:
      "Monitor the performance and metrics of the Arbitrum Nitro chain in real-time, including transaction data and network status.",
    url: "https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro",
    icon: <Code className="h-8 w-8 text-primary" />,
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href={tool.url}
        className="block h-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">{tool.icon}</div>
            <CardTitle className="mt-4 text-xl font-bold">
              {tool.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-gray-600">
              {tool.description}
            </CardDescription>
            <div className="mt-4">
              <span className="group flex items-center text-sm text-primary hover:text-primary-600 transition-colors">
                <span className="flex-1">Learn More</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default function Tools() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800">Developer Tools</h1>
          <p className="text-gray-600 mt-4">
            Discover powerful tools to accelerate your Arbitrum development
            workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
