import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { type GenerateRFPInput } from "~/validators/rfp";

export function EvaluationCriteriaStep() {
  const form = useFormContext<GenerateRFPInput>();

  return (
    <div className="space-y-20">
      <FormField
        control={form.control}
        name="evaluationCriteria"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                What do you need to make a decision?
              </h2>
              <p className="text-muted-foreground">
                Describe any information or criteria that will help you decide
                to move forward with this project
              </p>
              <Textarea rows={4} placeholder="I need to know..." {...field} />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
