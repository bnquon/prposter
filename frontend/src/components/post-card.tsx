interface PostCardProps {
  user_id: string;
  caption: string;
  media: string;
  tags: string[];
  file_type: string;
}

export default function PostCard({
  user_id,
  caption,
  media,
  tags,
  file_type,
}: PostCardProps) {
  console.log(file_type);
  return (
    <div className="w-[825px] max-h-[425px] p-6 bg-[#F5F5F5] rounded-xl shadow flex box-border gap-4">
      <div className="w-[250px] h-auto overflow-hidden rounded-xl">
        <img src={media} alt="media" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <div>{user_id} username, weight, age</div>
        <div>{caption} caption</div>
        <div>{tags}, change tag to enum</div>
      </div>
    </div>
  );
}
