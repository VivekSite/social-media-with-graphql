'use client'

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { supabase } from "@/lib/supabaseClient";
import { useStoreState } from "@/store/store";
import { useState } from "react";
import axios from "axios";


const CreatePostDialog = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    tags: "",
  });
  const { user } = useStoreState();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;
    setIsUploading(true);
    const { data, error }: { data: any | null; error: Error | null } =
      await supabase.storage
        .from("memories_project")
        .upload(`images/${file.name}`, file);

    setIsUploading(false);

    if (!error || error?.message.includes("The resource already exists")) {
      console.log("Image uploaded successfully:", data?.path);
      const fullPath: string =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        `/storage/v1/object/public/memories_project/images/${file.name}`;
      console.log(fullPath);

      try {
        await axios.post("http://localhost:3000/api/post/create", {
          ...formData,
          image: fullPath,
          authorId: user?.id,
        });

        setFormData({
          title: "",
          message: "",
          tags: "",
        });

        toast({
          title: "Post Created Successfully",
        });
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Create Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>

          {/* Form for entering post data */}
          <form className="flex flex-col gap-3">
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleOnChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleOnChange}
              required
            />
            <p className=" font-thin text-primary ">
              Add comma separated tags:
            </p>
            <Input
              type="text"
              name="tags"
              placeholder="Tags"
              value={formData.tags}
              onChange={handleOnChange}
              required
            />
            {isUploading ? (
              <Input placeholder="Uploading..." disabled />
            ) : (
              <Input
                type="file"
                required
                className="hover:cursor-pointer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFile(e.target.files && e.target.files[0])
                }
              />
            )}
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostDialog;
