'use client';
import {updateItem} from "@/actions/todoItemActions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Item} from "@prisma/client";
import {LoaderCircleIcon, UploadIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {isEqual} from 'lodash';

export default function ItemDetails({item}:{item:Item}) {
  const router = useRouter();
  const fileInRef = useRef<HTMLInputElement>(null);
  const [files,setFiles] = useState<undefined|string[]>(item.files || undefined);
  const [isUploading,setIsUploading] = useState(false);

  useEffect(() => {
    if (files === undefined) {
      return;
    }
    if (!isEqual(files, item.files)) {
      updateItem(item.id, {
        files,
      });
    }
  }, [files]);
  return (
    <>
      <form action={async (formData: FormData) => {
        await updateItem(item.id, {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
        });
        router.refresh();
      }}>
        <label htmlFor="descIn" className="block">
          Title
          <Input
            defaultValue={item.title}
            name="title"
            placeholder="Your todo Item title"/>
        </label>
        <label htmlFor="descIn" className="block mt-2">
          Description
        </label>
        <Textarea
          defaultValue={item.description || ''}
          name="description"
          placeholder="Add some description about your task..."
          className="block" id="descIn"/>
        <div className="flex mt-2 justify-end">
          <Button>
            Save task
          </Button>
        </div>
      </form>
      <label htmlFor="descIn" className="block mt-2">
        Uploads
      </label>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <Button
            type="button"
            disabled={isUploading}
            onClick={() => {
              fileInRef?.current?.click();
            }}
            variant="secondary" className="h-24 w-full">
            {isUploading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <UploadIcon/>
            )}
          </Button>
        </div>
        {files && files?.length > 0 && files.map(url => (
          <div key={url} className="flex h-24 items-center justify-center bg-gray-900 p-2 rounded-md">
            <img src={url} className="rounded-md max-h-20" />
          </div>
        ))}
      </div>
      <input
        multiple
        onChange={async (ev) => {
          const files = ev.target.files;
          if (files?.length) {
            const formData = new FormData;
            formData.set('id', item.id);
            for (const file of files) {
              formData.append('files', file);
            }
            setIsUploading(true);
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });
            setIsUploading(false);
            const fileUrls = await response.json();
            setFiles(prev => [...(prev || []), ...fileUrls]);
          }
        }}
        className="hidden"
        ref={fileInRef} type="file"/>
    </>
  );
}