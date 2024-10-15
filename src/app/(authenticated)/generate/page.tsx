"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useState } from "react";
import {
  GenerateRFPInput,
  type GenerateRFPInput as FormSchema,
} from "~/validators/rfp";
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
import { GoalStep } from "~/components/generate/steps/goal";
import { Form } from "~/components/ui/form";
import { TimelineStep } from "~/components/generate/steps/timeline";
import { InvestmentStep } from "~/components/generate/steps/investment";
import { RequirementsStep } from "~/components/generate/steps/requirements";
import { cn } from "~/lib/utils";
import { EvaluationCriteriaStep } from "~/components/generate/steps/evaluation-criteria";
import saveAs from "file-saver";
import { api } from "~/trpc/react";

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
      const blob = new Blob([result.rfp], { type: "text/markdown" });
      saveAs(blob, "rfp.md");
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
    <div className="flex p-10">
      {/* Navigation Sidebar */}
      <aside className="w-64">
        <nav>
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8">
        <Card className="flex flex-col justify-between">
          <div className="flex-1 px-20 py-10">
            <h3 className="mb-10 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {steps[currentStep]?.label}
            </h3>
            <Form {...form}>
              <form>{steps[currentStep]?.form}</form>
            </Form>
          </div>
          <div className="border-t border-border px-20 py-4">
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
  );
}
