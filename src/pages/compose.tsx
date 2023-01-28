import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";
import Layout from "../components/layout";

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

const Compose: NextPage = () => {
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

  console.log("{name} hi");

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-end  gap-3 text-white"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-row">
          <p className="">Your Name:</p>
          <input
            className="ml-2 border-2 border-solid border-white bg-transparent"
            defaultValue={sessionData?.user?.name ?? ""}
            {...register("writer", { required: true })}
          />
        </div>
        <div className="flex flex-row">
          <p>Your Position:</p>
          <select
            className="ml-2 border-2 border-solid border-white bg-transparent"
            defaultValue={Position.REP}
            {...register("position", { required: true })}
          >
            <option value={Position.REP}>Representative</option>
            <option value={Position.DIRECTOR}>Director</option>
          </select>
        </div>
        <div className="flex flex-row">
          <p>Company Name:</p>
          <input
            className="ml-2 border-2 border-solid border-white bg-transparent"
            {...register("companyName", { required: true })}
          />
        </div>
        <div className="flex flex-row">
          <p>Email:</p>
          <input
            className="ml-2 border-2 border-solid border-white bg-transparent"
            {...register("email", {
              required: true,
              pattern:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            })}
          />
        </div>
        <div className="flex flex-row">
          <p>Person&apos;s name (if applicable):</p>
          <input
            className="ml-2 border-2 border-solid border-white bg-transparent"
            {...register("personName")}
          />
        </div>
        <div className="flex flex-row">
          <p>Template:</p>
          <select
            className="ml-2 border-2 border-solid border-white bg-transparent"
            defaultValue={"sponsorship"}
            {...register("template", { required: true })}
          >
            {templates?.map((template, i) => (
              <option value={template.name} key={i}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" />
      </form>
    </Layout>
  );
};

export default Compose;
