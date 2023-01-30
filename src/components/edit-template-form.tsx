import type { Template } from "@prisma/client";
import { api } from "@utils/api";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "./input";

export const EditTemplateForm: React.FC<{ template: Template }> = ({
  template,
}) => {
  const editTemplate = api.editTemplate.useMutation();
  const form = useForm<{
    subject: string;
    fstring: string;
  }>({
    defaultValues: template,
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        editTemplate.mutate({
          name: template.name,
          ...data,
        });
      })}
    >
      <Input
        label="Subject Line"
        errors={form.formState.errors}
        {...form.register("subject")}
      />

      <Textarea
        label="Template"
        errors={form.formState.errors}
        {...form.register("fstring")}
      />

      <p>{editTemplate.error?.message}</p>

      <button
        type="submit"
        className="absolute mb-32 w-full rounded bg-green-700 py-8 px-20 text-9xl hover:bg-green-800"
      >
        Save
      </button>
    </form>
  );
};
