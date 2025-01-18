import ItemDetails from "@/components/ItemDetails";
import {Button} from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Item} from "@prisma/client";
import {UploadIcon} from "lucide-react";

export default function ItemTitle({item}:{item:Item}) {
  return (
    <div className="grow">
      <Drawer>
        <DrawerTrigger>
          <span>{item.title || '(no title)'}</span>
        </DrawerTrigger>
        <DrawerContent className="p-8">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Task: {item.title}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-2">
            <div className="w-full max-w-sm mx-auto text-left">
              <ItemDetails item={item} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}