import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type GenerateRFPInput } from "~/validators/rfp";

export function TimelineStep() {
  const form = useFormContext<GenerateRFPInput>();

  return (
    <div className="space-y-20">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                When do you want to build it?
              </h2>
              <p className="text-muted-foreground">
                Specify your preferred start date
              </p>
              <Input
                type="date"
                {...field}
                value={
                  field.value ? field.value.toISOString().split("T")[0] : ""
                }
                onChange={(e) => {
                  field.onChange(new Date(e.target.value));
                }}
              />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                When do you need it by?
              </h2>
              <p className="text-muted-foreground">
                Specify your desired completion date
              </p>
              <Input
                type="date"
                {...field}
                value={
                  field.value ? field.value.toISOString().split("T")[0] : ""
                }
                onChange={(e) => {
                  field.onChange(new Date(e.target.value));
                }}
              />
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
