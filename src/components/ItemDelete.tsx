'use client';
import {deleteItem} from "@/actions/todoItemActions";
import {Item} from "@prisma/client";
import {TrashIcon} from "lucide-react";
import {useRouter} from "next/navigation";

export default function ItemDelete({item}:{item:Item}) {
  const router = useRouter();
  return (
    <form
      className="flex items-center"
      action={async () => {
        await deleteItem(item.id);
        router.refresh();
      }}>
      <button className="opacity-40 hover:opacity-100 transition">
        <TrashIcon className="size-5"/>
      </button>
    </form>
  );
}