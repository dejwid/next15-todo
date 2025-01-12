'use server';

import {auth} from "@/auth";
import {PrismaClient} from "@prisma/client";

export async function newTodoItem(prevState:{id?:string,error?:string}, title:string) {
  const session = await auth();
  if (!session?.user?.email) {
    return {error:'not logged in'};
  }
  if (!title) {
    return {error:'title is empty'};
  }
  const client = new PrismaClient();
  const todoItem = await client.item.create({
    data: {
      userEmail: session.user.email,
      title,
    },
  });
  return {id:todoItem.id};
}

function getDb() {
  return new PrismaClient();
}

async function getUserEmail() {
  const session = await auth();
  if (!session?.user?.email) {
    throw 'not logged in';
  }
  return session.user.email;
}

export async function markItemAsDone(id:string) {
  const email = await getUserEmail();
  await getDb().item.update({
    where:{
      id:id,
      userEmail:email,
    },
    data:{
      doneAt: new Date,
    },
  });
}

export async function markItemAsNotDone(id:string) {
  const email = await getUserEmail();
  await getDb().item.update({
    where:{
      id:id,
      userEmail:email,
    },
    data:{
      doneAt: null,
    },
  });
}

export async function deleteItem(id:string) {
  const email = await getUserEmail();

  await getDb().item.delete({
    where: {
      id,
      userEmail: email,
    },
  });
}










