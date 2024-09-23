"use client";
import { FieldValues, Form, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormSelect from "../FormSelect/FormSelect";
import { Textarea } from "@/components/ui/textarea";

const FormField = ({
  field,
  index,
  register,
  error,
  onSelect,
}: {
  field: {
    default_value?: string | number;
    validation?: string;
    min_value?: number;
    max_value?: number;
    options?: string[];
    type: string;
  };
  index: number;
  register: UseFormRegister<FieldValues>;
  error?: string;
  onSelect?: (value: string) => void;
}) => {
  const { default_value, validation, min_value, max_value, options, type } =
    field;

  const validationRules = {
    required: {
      value: !!max_value || !!min_value || !!validation,
      message: "This field is required",
    },
    min: { value: Number(min_value), message: "Value is too low" },
    max: { value: Number(max_value), message: "Value is too high" },
    pattern: validation
      ? {
          value: new RegExp(validation),
          message: "Invalid format",
        }
      : undefined,
  };

  return (
    <>
      {(type === "text" || type === "number") && (
        <Input
          defaultValue={default_value}
          type={type}
          {...register(`field-${index}`, validationRules)}
        />
      )}

      {type === "dropdown" && (
        <FormSelect defaultValue={default_value} onSelect={onSelect} options={options} />
      )}
      {type === "longtext" && (
        <Textarea defaultValue={default_value} {...register(`field-${index}`, validationRules)} />
      )}
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default FormField;
