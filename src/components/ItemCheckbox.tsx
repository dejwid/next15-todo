'use client';
import {markItemAsDone, markItemAsNotDone} from "@/actions/todoItemActions";
import {Checkbox} from "@/components/ui/checkbox";
import {Item} from "@prisma/client";

export default function ItemCheckbox({item}:{item:Item}) {
  return (
    <Checkbox
      onCheckedChange={async isChecked => {
        if (isChecked) {
          await markItemAsDone(item.id);
        } else {
          await markItemAsNotDone(item.id);
        }
      }}
      defaultChecked={!!item.doneAt} />
  );
}