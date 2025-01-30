"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
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
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to YouTube Transcriber
          </h1>
          <p className="text-gray-500 text-center mt-2">
            Enter your OpenAI API key to get started with transcription
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="sk-..."
              required
            />
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
