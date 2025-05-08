"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Upload,
  ExternalLink,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleFileDeploy() {
  const [selectedContract, setSelectedContract] = useState<File | null>(null);
  const [contractCode, setContractCode] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string>("");
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isTokenInfoOpen, setIsTokenInfoOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code) {
      const decodedCode = decodeURIComponent(code);
      setContractCode(decodedCode);
      setSelectedContract(
        new File([decodedCode], "contract.sol", { type: "text/plain" })
      );
    }
  }, [location]);

  const handleContractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].name.endsWith(".sol")) {
      setSelectedContract(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setContractCode(event.target.result as string);
        }
      };
      reader.readAsText(e.target.files[0]);
    } else {
      toast.error("Please select a .sol file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDeploy = async () => {
    if (!selectedContract || !privateKey) {
      toast.error("Please select a contract file and enter your private key", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsDeploying(true);
    const formData = new FormData();
    formData.append("contract", selectedContract);
    formData.append("privateKey", privateKey);

    try {
      const response = await fetch("https://arbitrum-e5h8dmbsd4aaaxcy.southafricanorth-01.azurewebsites.net/api/deploy", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setDeployedAddress(data.address);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(data.message || "An error occurred during deployment", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("An error occurred during deployment", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsDeploying(false);
    }
  };

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

      <main className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">
              Deploy Your Solidity Contract
            </CardTitle>
            <CardDescription>
              Deploy single file Solidity contracts on Arbitrum Sepolia Testnet
              with ease
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Testnet Only</AlertTitle>
              <AlertDescription>
                This dashboard is configured for testnet deployments only.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="contract">Contract File (.sol)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="file"
                  id="contract"
                  accept=".sol"
                  onChange={handleContractFileChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("contract")?.click()}
                  className="w-full justify-start text-left font-normal"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {selectedContract
                    ? selectedContract.name
                    : "Select .sol file"}
                </Button>
              </div>
            </div>

            {contractCode && (
              <div className="space-y-2">
                <Label htmlFor="contractCode">Contract Code</Label>
                <textarea
                  id="contractCode"
                  value={contractCode}
                  readOnly
                  className="w-full h-40 p-2 border rounded-md font-mono text-sm"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input
                type="password"
                id="privateKey"
                placeholder="Enter your private key"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              />
              <Collapsible
                open={isTokenInfoOpen}
                onOpenChange={setIsTokenInfoOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal text-blue-500 hover:text-blue-700"
                  >
                    {isTokenInfoOpen ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide testnet token info
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Insufficient balance? Get testnet tokens
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    You can obtain Arbitrum Sepolia testnet tokens from these
                    faucets:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-500 space-y-1">
                    <li>
                      <a
                        href="https://faucets.chain.link/arbitrum-sepolia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Chainlink Faucet
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.alchemy.com/faucets/arbitrum-sepolia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Alchemy Faucet
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://faucet.quicknode.com/arbitrum/sepolia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        QuickNode Faucet
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://getblock.io/faucet/arb-sepolia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        GetBlock Faucet
                      </a>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Button
              onClick={handleDeploy}
              className="w-full"
              disabled={isDeploying}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy Contract"
              )}
            </Button>
          </CardContent>
        </Card>

        {deployedAddress && (
          <Card className="mt-8 max-w-2xl mx-auto bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">
                Deployment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-green-700">
                Your contract has been deployed to:
              </p>
              <p className="font-mono text-green-600 break-all bg-green-100 p-3 rounded-md">
                {deployedAddress}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-blue-500" />
                <a
                  href={`https://sepolia.arbiscan.io/address/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on Arbiscan
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
