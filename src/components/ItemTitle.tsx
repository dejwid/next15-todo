import ItemDetails from "@/components/ItemDetails";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {Item} from "@prisma/client";

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