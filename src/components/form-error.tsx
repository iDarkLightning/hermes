import { ErrorMessage } from "@hookform/error-message";
import type { FieldErrors } from "react-hook-form";

const FormError: React.FC<{ errors: FieldErrors; name: string }> = ({
  errors,
  name,
}) => {
  return (
    <p className="ml-1.5 mt-1 mb-6 text-red-700">
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) => {
          console.log(name, "messages", messages);
          return messages
            ? Object.entries(messages).map(([, message], i) => (
                <span key={i}>
                  {message}
                  <br />
                </span>
              ))
            : null;
        }}
      />
    </p>
  );
};

export default FormError;
