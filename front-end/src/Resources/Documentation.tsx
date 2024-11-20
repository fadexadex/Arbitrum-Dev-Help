"use client";

import { Book, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface DocumentationResource {
  title: string;
  description: string;
  url: string;
}

const documentationResources: DocumentationResource[] = [
  {
    title: "Arbitrum Deployment Guide",
    description:
      "Comprehensive instructions for deploying contracts on the Arbitrum network.",
    url: "https://www.quicknode.com/guides/other-chains/arbitrum-nova/how-to-deploy-a-contract-on-arbitrum-nova",
  },
  {
    title: "Solidity Best Practices",
    description:
      "Learn industry-standard techniques to write secure and efficient Solidity code.",
    url: "https://www.alchemy.com/overviews/smart-contract-security-best-practices",
  },
  {
    title: "Arbitrum SDK",
    description:
      "Detailed documentation on the Arbitrum SDK and its various modules and functions.",
    url: "https://docs.arbitrum.io/sdk/introduction",
  },
  {
    title: "Optimizing Gas Usage",
    description:
      "Strategies and tools to minimize gas costs for your Arbitrum smart contracts.",
    url: "https://hacken.io/discover/solidity-gas-optimization/",
  },
  {
    title: "Interacting with Arbitrum",
    description:
      "Guides on how to interact with the Arbitrum network using various client libraries.",
    url: "https://docs.arbitrum.io/welcome/get-started",
  },
  {
    title: "Arbitrum Upgrades and Migrations",
    description:
      "Best practices and recommendations for upgrading and migrating your Arbitrum contracts.",
    url: "https://docs.arbitrum.io/launch-orbit-chain/how-tos/arbos-upgrade",
  },
];

const DocumentationCard = ({
  resource,
}: {
  resource: DocumentationResource;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a href={resource.url} className="block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <Book className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-xl font-bold">
              {resource.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-gray-600">
              {resource.description}
            </CardDescription>
            <div className="mt-4">
              <span className="group flex items-center text-sm text-primary hover:text-primary-600 transition-colors">
                <span className="flex-1">Read More</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default function Documentation() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore in-depth guides and technical documentation to master
            Arbitrum development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentationResources.map((resource, index) => (
            <DocumentationCard key={index} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}
