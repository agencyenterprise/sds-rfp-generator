"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { saveAs } from "file-saver";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarFoldIcon,
  CheckIcon,
  CircleDollarSignIcon,
  FileText,
  GoalIcon,
  VoteIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { EvaluationCriteriaStep } from "~/components/generate/steps/evaluation-criteria";
import { GoalStep } from "~/components/generate/steps/goal";
import { InvestmentStep } from "~/components/generate/steps/investment";
import { RequirementsStep } from "~/components/generate/steps/requirements";
import { TimelineStep } from "~/components/generate/steps/timeline";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  type GenerateRFPInput as FormSchema,
  GenerateRFPInput,
} from "~/validators/rfp";

const steps = [
  {
    label: "Goal",
    icon: GoalIcon,
    form: <GoalStep />,
  },
  { label: "Timeline", icon: CalendarFoldIcon, form: <TimelineStep /> },
  { label: "Investment", icon: CircleDollarSignIcon, form: <InvestmentStep /> },
  { label: "Requirements", icon: FileText, form: <RequirementsStep /> },
  {
    label: "Evaluation Criteria",
    icon: VoteIcon,
    form: <EvaluationCriteriaStep />,
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const generate = api.rfp.generate.useMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(GenerateRFPInput),
    defaultValues: {
      problemToSolve: "",
      startDate: new Date(),
      endDate: new Date(),
      investmentRange: "",
      hardRequirements: "",
      softRequirements: "",
      evaluationCriteria: "",
      mostImportantCriteria: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    try {
      const result = await generate.mutateAsync(values);
      if (result) {
        saveAs(result, "generated-rfp.md");
      }
    } catch (error) {
      console.error("Error generating RFP:", error);
    }
  }

  function handlePrevious() {
    setCurrentStep(currentStep - 1);
  }

  function handleNext() {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep === steps.length - 1) {
      void form.handleSubmit(onSubmit)();
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className="space-y-8">
      <Button variant="secondary" asChild>
        <Link href="/">
          <ArrowLeftIcon className="mr-2 size-4 text-primary" />
          Back to RFP List
        </Link>
      </Button>
      <header className="space-y-1.5">
        <h1 className="text-5xl font-medium text-white">Generate RFP File</h1>
        <p className="text-xl font-normal text-slate-400">
          Fill out the form to generate your RFP file
        </p>
      </header>
      <hr />
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:mb-0 md:w-64">
          <nav className="hidden md:block">
            <ul className="space-y-4">
              {steps.map((item, index) => (
                <li key={index} className="mb-2">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-muted-foreground hover:text-primary",
                      currentStep === index && "bg-secondary/80 text-primary",
                    )}
                    onClick={() => setCurrentStep(index)}
                    disabled={generate.isPending}
                  >
                    <item.icon className="mr-3 size-4" />
                    <span>
                      {index + 1}. {item.label}
                    </span>
                    {completedSteps.includes(index) && (
                      <div className="ml-auto rounded-full bg-black p-1">
                        <CheckIcon className="size-3 text-white" />
                      </div>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <h2 className="mb-2 text-xl font-semibold">
              Step {currentStep + 1} of {steps.length}
            </h2>
            <p className="text-muted-foreground">{steps[currentStep]?.label}</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Card className="flex flex-col justify-between">
            <div className="flex-1 p-6 md:px-20 md:py-10">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground md:mb-10">
                {steps[currentStep]?.label}
              </h3>
              <Form {...form}>
                <form>{steps[currentStep]?.form}</form>
              </Form>
            </div>
            <div className="border-t border-border px-6 py-4 md:px-20">
              <div className="flex justify-between">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={generate.isPending}
                  >
                    <ArrowLeftIcon className="mr-2 size-4" />
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className={currentStep === 0 ? "ml-auto" : ""}
                  disabled={generate.isPending}
                >
                  {currentStep === steps.length - 1 ? "Generate RFP" : "Next"}
                  <ArrowRightIcon className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
