import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormSelect({
  options,
  defaultValue,
  onSelect,
}: {
  options?: string[] | number[];
  defaultValue?: string | number;
  onSelect?: (value: string) => void;
}) {
  return (
    <Select
      defaultValue={defaultValue?.toString()}
      onValueChange={(value) => {
        onSelect?.(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select option:" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option} value={option.toString()}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FormSelect;
