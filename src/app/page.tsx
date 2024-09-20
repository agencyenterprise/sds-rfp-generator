"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "~/trpc/react";
import { saveAs } from "file-saver";
import { type GenerateRFPInput } from "~/server/api/routers/rfp";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import { questions } from "./questions";
import TextareaInput from "./_components/TextareaInput";
import SelectInput from "./_components/SelectInput";
import RadioInput from "./_components/RadioInput";

const RFPGeneratorPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedRFP, setGeneratedRFP] = useState<string | null>(null);
  const generateRFPMutation = api.rfp.generate.useMutation();
  const inputRef = useRef<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (
      ["radio", "select"].includes(
        questions[currentQuestionIndex]?.type as string,
      )
    ) {
      setTimeout(handleNext, 500);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = useCallback(async () => {
    if (generateRFPMutation.isPending) return;
    try {
      const result = await generateRFPMutation.mutateAsync(
        formData as GenerateRFPInput,
      );
      setGeneratedRFP(result.rfp);
    } catch (error) {
      console.error("Error generating RFP:", error);
    }
  }, [formData, generateRFPMutation]);

  const handlePrevious = useCallback(() => {
    if (generateRFPMutation.isPending) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, generateRFPMutation.isPending]);

  const handleNext = useCallback(() => {
    if (generateRFPMutation.isPending) return;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      void handleSubmit();
    }
  }, [currentQuestionIndex, generateRFPMutation.isPending, handleSubmit]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (generateRFPMutation.isPending) return;
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentQuestionIndex,
    generateRFPMutation.isPending,
    handleNext,
    handlePrevious,
  ]);

  const handleDownload = () => {
    if (!generatedRFP) return;
    const blob = new Blob([generatedRFP], { type: "text/markdown" });
    saveAs(blob, "rfp.md");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-2xl text-gray-800">
          {generatedRFP ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm"
            >
              <div>
                <h2 className="mb-4 text-3xl font-bold text-purple-600">
                  RFP Generated
                </h2>
                <p className="mb-4">
                  Your RFP has been generated successfully.
                </p>
              </div>
              <ReactMarkdown className="prose">{generatedRFP}</ReactMarkdown>
              <motion.button
                className="w-full rounded-lg bg-purple-600 p-4 text-xl font-bold text-white shadow-md hover:bg-purple-700"
                onClick={handleDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download RFP
              </motion.button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
                onAnimationComplete={() => inputRef.current?.focus()}
              >
                <h1 className="mb-12 text-3xl font-semibold text-purple-600">
                  {currentQuestion?.label}
                </h1>
                {currentQuestion?.type === "textarea" && (
                  <TextareaInput
                    id={currentQuestion.id}
                    value={formData[currentQuestion.id]! || ""}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    inputRef={inputRef as React.RefObject<HTMLTextAreaElement>}
                  />
                )}
                {currentQuestion?.type === "select" && (
                  <SelectInput
                    id={currentQuestion.id}
                    value={formData[currentQuestion.id]! || ""}
                    onChange={handleInputChange}
                    options={currentQuestion.options ?? []}
                    inputRef={inputRef as React.RefObject<HTMLSelectElement>}
                  />
                )}
                {currentQuestion?.type === "radio" && (
                  <RadioInput
                    id={currentQuestion.id}
                    name={currentQuestion.id}
                    value={formData[currentQuestion.id]! || ""}
                    onChange={handleInputChange}
                    options={currentQuestion.options ?? []}
                    inputRef={inputRef as React.RefObject<HTMLInputElement>}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      {!generatedRFP && (
        <div className="p-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <div className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="flex space-x-4">
              <motion.button
                className="rounded-full bg-purple-600 px-8 py-3 text-xl font-bold text-white shadow-md hover:bg-purple-700 disabled:opacity-50"
                onClick={handlePrevious}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={
                  currentQuestionIndex === 0 || generateRFPMutation.isPending
                }
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </motion.button>
              <motion.button
                className="rounded-full bg-purple-600 px-8 py-3 text-xl font-bold text-white shadow-md hover:bg-purple-700 disabled:opacity-50"
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={generateRFPMutation.isPending}
              >
                {generateRFPMutation.isPending ? (
                  "Generating..."
                ) : currentQuestionIndex < questions.length - 1 ? (
                  <ArrowRightIcon className="h-5 w-5" />
                ) : (
                  "Generate RFP"
                )}
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFPGeneratorPage;
