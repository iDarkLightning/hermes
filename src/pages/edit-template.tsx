import { EditTemplateForm } from "@components/edit-template-form";
import { Select } from "@components/input";
import Layout from "@components/layout";
import { api } from "@utils/api";
import { type NextPage } from "next";
import { useState } from "react";

const EditTemplatePage: NextPage = () => {
  const [selection, setSelection] = useState("Select a template..");
  const getTemplatesQuery = api.getTemplates.useQuery();
  const getSelectedTemplateQuery = api.getTemplateByName.useQuery(
    {
      name: selection,
    },
    { enabled: selection !== "Select a template.." }
  );

  const selectedTemplate = getSelectedTemplateQuery.data;

  return (
    <Layout>
      <div className="w-[36rem]">
        <Select
          label="Select thou template"
          onChange={(e) => setSelection(e.target.value)}
          value={selection}
          errors={{}}
        >
          <option>Select a template..</option>
          {getTemplatesQuery.data?.map((template, i) => (
            <option key={i}>{template.name}</option>
          ))}
        </Select>

        <hr className="mb-8" />

        {selectedTemplate && <EditTemplateForm template={selectedTemplate} />}
      </div>
    </Layout>
  );
};

export default EditTemplatePage;
