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
import { toast } from "sonner";
import { uploadPost } from "@/api/posts";
import { useUser } from "@/hooks/useUser";
import { PostTags } from "utils/types";

const schema = yup.object().shape({
  caption: yup.string().required("Caption is required"),
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one tag is required")
    .required("Tags are required"),
});

type FormData = {
  caption: string;
  tags: string[];
};

export default function UploadDialog() {
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [media, setMedia] = useState<File | null>(null);

  const handleTagClick = (tag: PostTags) => {
    const isSelected = selectedTags.includes(tag.id);

    const updatedTags = isSelected
      ? selectedTags.filter((t) => t !== tag.id)
      : [...selectedTags, tag.id];

    setSelectedTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const closeDialog = () => {
    setMedia(null);
    setOpen(false);
    setSelectedTags([]);
    setValue("caption", "");
  };

  const onSubmit = async (data: FormData) => {
    if (!media) {
      toast.error("No media selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", media);
    formData.append("file_type", media.type);
    formData.append("caption", data.caption);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("user_id", user?.id ?? "");

    try {
      await uploadPost(formData);
      toast.success("Post uploaded successfully");
      closeDialog();
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload post");
    }
  };

  return (
    <main className="flex relative gap-6 items-center justify-center">
      <AlertDialog open={open} onOpenChange={setOpen}>
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
              selectedTags={selectedTags}
              handleTagClick={handleTagClick}
              captionError={errors.caption}
              tagError={errors.tags}
            />

            {/* Footer with Action Buttons */}
            <AlertDialogFooter>
              <AlertDialogCancel
                className="focus:outline-none"
                style={{ marginRight: "auto" }}
                onClick={closeDialog}
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
