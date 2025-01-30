"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedKey = localStorage.getItem("vd_user_openai_api_key");
    if (storedKey) {
      router.push("/transcribe");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim().startsWith("sk-")) {
      toast.error("Please enter a valid OpenAI API key");
      return;
    }
    localStorage.setItem("vd_user_openai_api_key", apiKey);
    toast.success("API key saved successfully");
    router.push("/transcribe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl text-center font-bold text-gray-900">
            Welcome to YouTube Transcriber
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Enter your OpenAI API key to get started with transcription
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
            className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-t-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-sm text-blue-800">
                How to get your API key
              </span>
            </div>
            {isInstructionsOpen ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>

          <div
            className={`${
              isInstructionsOpen ? "block" : "hidden"
            } bg-blue-50 rounded-b-lg p-4 border-t border-blue-100`}
          >
            <ol className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>
                  Visit the{" "}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    OpenAI API Keys page{" "}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Sign in or create an OpenAI account</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Click on "Create new secret key"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Give your key a name (e.g., "YouTube Transcriber")</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">5.</span>
                <span>
                  Copy your API key immediately (it won't be shown again!)
                </span>
              </li>
            </ol>
            <p className="text-xs text-blue-600 mt-3 font-medium">
              Note: OpenAI API usage is not free. You'll need to add billing
              information to your account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OpenAI API Key
            </label>
            <div className="relative group">
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="sk-..."
                required
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                <div className="relative group">
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    Your API key starts with "sk-" and contains random letters
                    and numbers
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Continue
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Your API key is stored locally and never sent to our servers
        </p>
      </div>
    </div>
  );
}
