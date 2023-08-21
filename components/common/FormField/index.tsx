import { ChangeEvent, memo, useId } from "react";

type FormFieldProps = {
  type?: string;
  title: string;
  value: string;
  placeholder: string;
  isTextArea?: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const FormField = ({
  title,
  value,
  placeholder,
  onChange,
  isTextArea,
  type,
  name,
}: FormFieldProps) => {
  const idPrefix = useId();

  return (
    <div className="flexStart w-full flex-col gap-4">
      <label
        htmlFor={idPrefix + "formField"}
        className="w-full capitalize text-gray-100 flexCol gap-2"
      >
        {title}
        {isTextArea ? (
          <textarea
            id={idPrefix + "formField"}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            className="form_field-input"
          />
        ) : (
          <input
            id={idPrefix + "formField"}
            placeholder={placeholder}
            value={value}
            type={type || "text"}
            name={name}
            onChange={onChange}
            className="form_field-input"
          />
        )}
      </label>
    </div>
  );
};

export default memo(FormField);
