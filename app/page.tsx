"use client";
import JSONData from "../data.json";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import FormField from "./components/FormField/FormField";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="mx-auto w-[60vw] flex gap-10 h-screen items-center">
      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {JSONData.map((field, index) => {
          if (field.type === "dropdown" && field.default_value) {
            setValue(`field-${index}`, field.default_value);
          }
          return (
            <FormField
              key={index}
              field={field}
              index={index}
              register={register}
              error={errors[`field-${index}`]?.message as string}
              onSelect={(value) => setValue(`field-${index}`, value)}
            />
          );
        })}
        <Button variant="outline">Submit</Button>
      </form>
      <div className="w-full">
        <pre>{JSON.stringify(submittedData, null, 2)}</pre>
      </div>
    </div>
  );
}
