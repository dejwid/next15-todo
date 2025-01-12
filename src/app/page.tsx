import ItemsList from "@/components/ItemsList";
import NewItem from "@/components/NewItem";
import {Suspense} from "react";

export default function Home() {
  return (
    <div>
      <NewItem />
      <Suspense key={Date.now()} fallback="Loading...">
        <ItemsList />
      </Suspense>
    </div>
  );
}
