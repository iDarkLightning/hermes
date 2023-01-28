import type { NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@utils/api";
import Layout from "@components/layout";

type Inputs = {
  fstring: string;
  subject: string;
  name: string;
};

const AddTemplate: NextPage = () => {
  const create = api.makeTemplate.useMutation();
  const getTemplatesQuery = api.getTemplates.useQuery();
  const templates = getTemplatesQuery.data;

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!templates?.map((t) => t.name).includes(data.name))
      await create.mutateAsync({
        fstring: data.fstring,
        name: data.name,
        subject: data.subject,
      });
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-end  gap-3 text-white"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-row">
          <p className="">Template Name:</p>
          <input
            className="ml-2 border-2 border-solid border-white bg-transparent"
            {...register("name", { required: true })}
          />
        </div>
        <div className="flex flex-row">
          <p className="">Subject Line:</p>
          <input
            className="ml-2 border-2 border-solid border-white bg-transparent"
            {...register("subject", { required: true })}
          />
        </div>
        <div className="flex flex-row">
          <p className="">Template:</p>
          <textarea
            className="ml-2 border-2 border-solid border-white bg-transparent"
            {...register("fstring", { required: true })}
          />
        </div>
        <p>{`{writer}: Your name, the writer of this email`}</p>
        <p>
          {`{position}: Your position, Sponsorship representative or director`}
        </p>
        <p>{`{companyName}: Name of the company you are emailing`}</p>
        <p>{`{personName}: optional, if you have a specific person's name`}</p>
        <p>Make sure its in html</p>

        <input type="submit" />
      </form>
    </Layout>
  );
};

export default AddTemplate;
