import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import { type GenerateRFPInput } from "~/validators/rfp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export function InvestmentStep() {
  const form = useFormContext<GenerateRFPInput>();

  const options = [
    { value: "below50k", label: "Below $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "100k-500k", label: "$100,000 - $500,000" },
    { value: "above500k", label: "Above $500,000" },
  ];

  return (
    <div className="space-y-20">
      <FormField
        control={form.control}
        name="investmentRange"
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <h2 className="mb-4 text-2xl font-bold">
                What is the investment range?
              </h2>
              <p className="text-muted-foreground">
                Provide an estimate of your investment range for this project
              </p>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
