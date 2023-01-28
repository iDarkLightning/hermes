import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@utils/api";
import { Input, Select } from "./input";

enum Position {
  DIRECTOR = "the Director of Sponsorships",
  REP = "a sponsorship representative",
}

type Inputs = {
  writer: string; // Formatting
  position: Position; // Formatting
  companyName: string; // Formatting
  personName?: string; // Formatting
  email: string; // Email Send
  template: string; // To be formatted
};

const Compose: React.FC = () => {
  const submit = api.sendEmail.useMutation();
  const getTemplatesQuery = api.getTemplates.useQuery();
  const templateQuery = api.getTemplateByName.useMutation();

  const templates = getTemplatesQuery.data;

  const { data: sessionData } = useSession();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const template = await templateQuery.mutateAsync({ name: data.template });

    if (template?.fstring) {
      const message = template?.fstring
        .replace("{personName}", data.personName ?? data.companyName)
        .replaceAll(
          /{(.+?)}/g,
          (_, key: string) => data[key.trim() as keyof Inputs] ?? ""
        );

      submit.mutateAsync({
        to: data.email,
        // cc: "team@techcodes.org",
        subject: template?.subject ?? "TechCodes Inquiry",
        text: "",
        html: message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-60vw flex w-3/5 flex-col items-end gap-3 text-zinc-300"
    >
      <h2 className="w-full text-left text-2xl">Compose an email:</h2>
      <hr className="w-full border" />
      <Input
        label="Your Name: "
        defaultValue={sessionData?.user?.name ?? ""}
        {...register("writer", { required: true })}
      />
      <Select
        label="Your Position:"
        defaultValue={Position.REP}
        {...register("position", { required: true })}
      >
        <option value={Position.REP}>Representative</option>
        <option value={Position.DIRECTOR}>Director</option>
      </Select>
      <Input
        label="Company Name:"
        {...register("companyName", { required: true })}
      />
      <Input
        label="Email:"
        {...register("email", {
          required: true,
          pattern:
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        })}
      />
      <Input
        label="Person's name (if applicable:"
        {...register("personName")}
      />
      <Select
        label="Template:"
        defaultValue={"sponsorship"}
        {...register("template", { required: true })}
      >
        {templates?.map((template, i) => (
          <option value={template.name} key={i}>
            {template.name}
          </option>
        ))}
      </Select>

      <input type="submit" />
    </form>
  );
};

export default Compose;
