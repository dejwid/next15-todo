import {Input} from "@/components/ui/input";
import {Dispatch, SetStateAction} from "react";
import {useFormStatus} from "react-dom";

export default function NewItemFormInner({
  value,
  onChange,
}: {
  value:string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  const formStatus = useFormStatus();
  return (
    <Input
      value={value}
      onChange={ev => onChange(ev.target.value)}
      name="newItemTitle"
      disabled={formStatus.pending}
      placeholder="New todo task..."/>
  );
}