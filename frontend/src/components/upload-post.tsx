import CreatePostCaption from "@/components/create-post-caption";
import MediaUpload from "@/components/media-upload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  caption: yup.string().required("Caption is required"),
  tags: yup
    .array()
    .test(
      "at-least-one",
      "At least one tag is required",
      (value) => value && value.length > 0
    ),
});

export default function UploadDialog() {
  const [media, setMedia] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <main className="flex w-screen relative h-screen gap-6 items-center justify-center">
      <AlertDialog>
        {/* Trigger Button */}
        <AlertDialogTrigger asChild>
          <Button variant="outline">Create Post</Button>
        </AlertDialogTrigger>

        {/* Modal Content */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Your Post</AlertDialogTitle>
            <AlertDialogDescription>
              Add your media and caption for the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Media Upload Section */}
            <MediaUpload selectedFile={media} setSelectedFile={setMedia} />

            {/* Caption and Tags Section */}
            <CreatePostCaption
              register={register}
              setValue={setValue}
              captionError={errors.caption}
              tagError={errors.tags}
            />

            {/* Footer with Action Buttons */}
            <AlertDialogFooter>
              <AlertDialogCancel
                style={{ marginRight: "auto" }}
                onClick={() => reset()}
              >
                Cancel
              </AlertDialogCancel>
              <Button>Upload</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
