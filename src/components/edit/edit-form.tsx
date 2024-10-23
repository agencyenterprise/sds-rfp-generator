"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TagInput } from "emblor";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import {
  UpdateRFPInput as FormSchema,
  type UpdateRFPInput,
} from "~/validators/rfp";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import categories from "./categories.json";
import { DeleteButton } from "./delete-button";

export function EditForm({ id, title, data }: UpdateRFPInput) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editMutation = api.rfp.update.useMutation();
  const form = useForm<UpdateRFPInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id, title, data },
  });

  const handleSubmit = async (values: UpdateRFPInput) => {
    setIsSubmitting(true);
    try {
      await editMutation.mutateAsync(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="data.category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { value: "0-50k", label: "$0 - $50,000" },
                        { value: "50k-100k", label: "$50,000 - $100,000" },
                        { value: "100k-250k", label: "$100,000 - $250,000" },
                        { value: "250k-500k", label: "$250,000 - $500,000" },
                        { value: "500k-1m", label: "$500,000 - $1 million" },
                        { value: "1m+", label: "$1 million+" },
                      ].map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="data.company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data.contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data.deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value ? field.value.split("T")[0] : ""}
                  onChange={(e) =>
                    field.onChange(new Date(e.target.value).toISOString())
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data.location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data.tags"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Tags</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  activeTagIndex={0}
                  setActiveTagIndex={() => null}
                  placeholder="Enter tags separated by commas"
                  tags={
                    field.value?.map((tag) => ({
                      id: tag,
                      text: tag,
                    })) ?? []
                  }
                  setTags={(newTags) => {
                    const tags = Array.isArray(newTags)
                      ? newTags.map((tag) => tag.text)
                      : [];
                    if (tags) field.onChange(tags);
                  }}
                  styleClasses={{
                    tag: {
                      body: "pl-2",
                      closeButton: "px-2",
                    },
                    inlineTagsContainer:
                      "dark:border-[#393f58] dark:bg-[#141828]",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between">
          <DeleteButton id={id} />
          <Button type="submit" disabled={isSubmitting} className="ml-auto">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
