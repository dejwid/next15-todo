'use client';
import {newTodoItem} from "@/actions/todoItemActions";
import NewItemFormInner from "@/components/NewItemFormInner";
import {useRouter} from "next/navigation";
import {useActionState, useState} from "react";

type State = {
  id?:string;
  error?:string;
};

export default function NewItem(){
  const defaultState:State = {id:undefined,error:undefined};
  const [formState, newTodoItemAction] = useActionState(newTodoItem, defaultState);
  const [newItemTitle, setNewItemTitle] = useState('');
  const router = useRouter();
  return (
    <form action={async () => {
      newTodoItemAction(newItemTitle);
      setNewItemTitle('');
      router.refresh();
    }}>
      {formState?.error && (
        <div className="border mb-2 p-2 border-red-700 rounded-md bg-red-900/20 text-red-500">
          {formState.error}!<br />
          Please try again.
        </div>
      )}
      <NewItemFormInner
        value={newItemTitle}
        onChange={setNewItemTitle}
      />
    </form>
  );
}