"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Youtube, Languages, Loader2, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function TranscribePage() {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isEnglishOpen, setIsEnglishOpen] = useState(true);
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem("vd_user_openai_api_key");
    if (!apiKey) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/transcribe",
        {
          url,
          source_language: language === "auto" ? null : language,
          api_key: localStorage.getItem("vd_user_openai_api_key"),
        }
      );
      setResult(response.data);
      toast.success("Transcription completed successfully");
    } catch (error) {
      toast.error(error.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column - Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Youtube className="w-6 h-6 text-red-600" />
              <h1 className="text-xl font-bold">YouTube Transcriber</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://youtube.com/..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Language (Optional)
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="nl">Dutch</option>
                    <option value="pl">Polish</option>
                    <option value="ru">Russian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                  </select>
                  <Languages className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Transcribe Video</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Transcription Results</h2>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : result ? (
              <div className="space-y-4 flex-1 overflow-hidden">
                {/* English Translation Dropdown */}
                {result.english_text && (
                  <div className="border rounded-lg">
                    <button
                      onClick={() => setIsEnglishOpen(!isEnglishOpen)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                    >
                      <h3 className="text-lg font-semibold">
                        English Translation
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isEnglishOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isEnglishOpen && (
                      <div className="p-4 max-h-[300px] overflow-y-auto">
                        <p className="whitespace-pre-wrap">
                          {result.english_text}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Original Text Dropdown */}
                <div className="border rounded-lg">
                  <button
                    onClick={() => setIsOriginalOpen(!isOriginalOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                  >
                    <h3 className="text-lg font-semibold">Original Text</h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isOriginalOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOriginalOpen && (
                    <div className="p-4 max-h-[300px] overflow-y-auto">
                      <p className="whitespace-pre-wrap">
                        {result.original_text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <Youtube className="w-12 h-12 mb-4 opacity-50" />
                <p>Enter a YouTube URL to see the transcription results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
