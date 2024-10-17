import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { type GenerateRFPInput } from "~/validators/rfp";

export function RequirementsStep() {
  const form = useFormContext<GenerateRFPInput>();

  return (
    <div className="space-y-20">
      <FormField
        control={form.control}
        name="hardRequirements"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                What are the hard requirements?
              </h2>
              <p className="text-muted-foreground">
                List any essential features or functionalities that you know you
                need
              </p>
              <Textarea rows={4} placeholder="It must have..." {...field} />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="softRequirements"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                What are the softer requirements?
              </h2>
              <p className="text-muted-foreground">
                Share any additional features or improvements you think you need
              </p>
              <Textarea
                rows={4}
                placeholder="It would be nice to have..."
                {...field}
              />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
