import CreatePostCaption from "@/components/create-post-caption";
import MediaUpload from "@/components/media-upload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  caption: yup.string().required("Caption is required"),
  tags: yup.array().required("Tags are required"),
  media: yup.mixed().required("Media is required"),
});

export default function UploadPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <main className="flex w-screen relative h-screen gap-6 items-center justify-center">
      <form className="flex flex-col gap-6">
        <MediaUpload register={register} error={errors.media} />
        <CreatePostCaption
          register={register}
          setValue={setValue}
          captionError={errors.caption}
          tagError={errors.tags}
        />
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form>
    </main>
  );
}
