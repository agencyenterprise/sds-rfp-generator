import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { type GenerateRFPInput } from "~/validators/rfp";

export function GoalStep() {
  const form = useFormContext<GenerateRFPInput>();

  return (
    <div className="space-y-20">
      <FormField
        control={form.control}
        name="problemToSolve"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                What problem do you want to solve?
              </h2>
              <p className="text-muted-foreground">
                Describe what you want to build
              </p>
              <Textarea rows={4} placeholder="I want to solve..." {...field} />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
