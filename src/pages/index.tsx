import { type NextPage } from "next";
import Layout from "@components/layout";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@utils/api";
import { Input, Select } from "@components/input";
import { useEffect, useState } from "react";
import { useTitleCase } from "@utils/useTitleCase";

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

enum ButtonState {
  NORM = "Send",
  ERR = "Error! Check console for more info!",
  SUCCESS = "Sent Successfully!!",
}

const Home: NextPage = () => {
  const submit = api.sendEmail.useMutation({
    onError() {
      setButtonState(ButtonState.ERR);
      setTimeout(() => setButtonState(ButtonState.NORM), 3000);
    },
    onSuccess() {
      setButtonState(ButtonState.SUCCESS);
      setTimeout(() => setButtonState(ButtonState.NORM), 3000);
    },
  });
  const getTemplatesQuery = api.getTemplates.useQuery();
  const templateQuery = api.getTemplateByName.useMutation();

  const templates = getTemplatesQuery.data;

  const { data: sessionData } = useSession();
  const [buttonState, setButtonState] = useState(ButtonState.NORM);
  const { titlify } = useTitleCase();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      position: Position.REP,
      template: "sponsor",
    },
  });

  useEffect(() => {
    setValue("writer", titlify(sessionData?.user?.name) ?? "");
  }, [sessionData?.user, setValue, titlify]);

  console.log(watch("companyName"));

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(errors);
    const template = await templateQuery.mutateAsync({ name: data.template });

    if (template?.fstring) {
      const message = template?.fstring
        .replace("{personName}", titlify(data.personName) ?? data.companyName)
        .replaceAll(
          /{(.+?)}/g,
          (_, key: string) => data[key.trim() as keyof Inputs] ?? ""
        );

      setValue("email", "");

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
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex w-3/5  flex-col items-start gap-3 pb-20 text-zinc-300"
        autoComplete="off"
      >
        <h2 className="w-full text-left text-2xl">Compose an email:</h2>
        <hr className="w-full border border-zinc-300/20" />

        <Input
          label="Email:"
          errors={errors}
          {...register("email", {
            required: true,
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: "Must be a valid email address.",
            },
          })}
        />

        <Input
          label="Company Name:"
          errors={errors}
          {...register("companyName", {
            required: "Must provide a company name",
          })}
        />
        <Input
          label="Person's name (if applicable:"
          errors={errors}
          optional
          {...register("personName")}
        />

        <hr className="w-full border border-zinc-300/20" />

        <Input
          label="Your Name: "
          errors={errors}
          {...register("writer", { required: "What's your name?" })}
        />
        <Select
          label="Your Position:"
          errors={errors}
          defaultValue={Position.REP}
          {...register("position", { required: true })}
        >
          <option value={Position.REP}>Representative</option>
          <option value={Position.DIRECTOR}>Director</option>
        </Select>

        <Select
          label="Template:"
          errors={errors}
          defaultValue={"sponsor"}
          {...register("template", { required: true })}
        >
          {templates?.map((template, i) => (
            <option value={template.name} key={i}>
              {template.name}
            </option>
          ))}
        </Select>
        <hr className="w-full border border-zinc-300/20" />

        <input
          type="submit"
          className={`mt-5 w-full rounded-md  py-1 text-lg text-zinc-800 ${
            buttonState === ButtonState.NORM
              ? "bg-zinc-300"
              : buttonState === ButtonState.SUCCESS
              ? "bg-green-500"
              : "bg-red-500"
          }`}
          disabled={buttonState !== ButtonState.NORM}
          value={buttonState}
        />
      </form>
    </Layout>
  );
};

export default Home;
