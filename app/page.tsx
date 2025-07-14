"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, Loader2 } from "lucide-react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarise = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setSummary(data.summary);
      setUrdu(data.urduSummary);
    } catch (error) {
      console.error("Error summarizing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Newspaper className="w-16 h-16 text-green-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            Blog Summarizer
          </h1>
          <p className="text-gray-600 text-lg">
            Paste a blog URL and get a concise summary in English and Urdu
            instantly!
          </p>
        </div>

        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste blog URL here..."
              className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 text-lg focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleSummarise}
              disabled={isLoading || !url}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Summarizing...</span>
                </>
              ) : (
                <span>Summarize Now</span>
              )}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-green-700">
                      Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{summary}</p>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-blue-700">
                      Urdu Translation
                    </h2>
                    <p className="text-gray-700 leading-relaxed font-urdu">
                      {urdu}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        @font-face {
          font-family: "Urdu";
          src: url("https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap");
        }
        .font-urdu {
          font-family: "Noto Nastaliq Urdu", serif;
        }
      `}</style>
    </main>
  );
}
