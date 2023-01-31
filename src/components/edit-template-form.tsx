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
      className="pb-20 "
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
        className="mt-5 w-full rounded-md  bg-zinc-300 py-1 text-lg text-zinc-800"
      >
        Save
      </button>
    </form>
  );
};
