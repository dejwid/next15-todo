import {auth} from "@/auth";
import ItemCheckbox from "@/components/ItemCheckbox";
import ItemDelete from "@/components/ItemDelete";
import ItemTitle from "@/components/ItemTitle";
import {PrismaClient} from '@prisma/client';

export default async function ItemsList() {
  const session = await auth();
  if (!session?.user?.email) {
    return 'Login to see your tasks...';
  }
  const client = new PrismaClient();
  const items = await client.item.findMany({
    where: {
      userEmail: session.user.email,
    },
    orderBy: {createdAt:'desc'}
  })
  return (
    <div className="mt-2 grid gap-2">
      {items.length > 0 && items.map(item => (
        <div
          className="bg-gray-700/50 p-2 rounded-md flex gap-2 items-center"
          key={item.id}>
          <ItemCheckbox item={item} />
          <ItemTitle item={item} />
          <ItemDelete item={item}/>
        </div>
        ))}
    </div>
  );
}