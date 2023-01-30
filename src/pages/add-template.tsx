import type { NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@utils/api";
import Layout from "@components/layout";
import { Input, TextField } from "@components/input";
import { useState } from "react";

type Inputs = {
  fstring: string;
  subject: string;
  name: string;
};

enum ButtonState {
  NORM = "Create",
  ERR = "Error! Check console for more info!",
  SUCCESS = "Created Successfully!",
}

const AddTemplate: NextPage = () => {
  const create = api.makeTemplate.useMutation({
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
  const templates = getTemplatesQuery.data;

  const [buttonState, setButtonState] = useState(ButtonState.NORM);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!templates?.map((t) => t.name).includes(data.name)) {
      await create.mutateAsync({
        fstring: data.fstring,
        name: data.name,
        subject: data.subject,
      });

      setValue("name", "");
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-end  gap-3 pb-20 text-zinc-300"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <Input
          label="Template Name:"
          errors={errors}
          {...register("name", { required: true })}
        />
        <Input
          label="Subject Line:"
          errors={errors}
          {...register("subject", { required: true })}
        />
        <TextField
          label="Template:"
          errors={errors}
          {...register("fstring", { required: true })}
        />

        <div className="flex flex-col gap-3 rounded-lg border-2 p-5 pb-8">
          <h3 className="text-lg font-bold">Template Key: </h3>
          <p>
            <strong>{"{writer}: "}</strong>The name of the writer
          </p>
          <p>
            <strong>{"{position}: "}</strong>
            The position of the writer, Sponsorship representative or director
          </p>
          <p>
            <strong>{"{companyName}: "}</strong>The name of the company being
            emailed
          </p>
          <p>
            <strong>{"{personName}: "}</strong>Optional, if there is a specific
            person&apos;s name
          </p>
          <p>Make sure it&apos;s in html!</p>
        </div>

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

export default AddTemplate;
