import { getAllPosts } from "@/api/posts";
import { useQuery } from "react-query";

export const usePosts = () => {
    const { data: posts, isLoading } = useQuery(
        ["posts"],
        () => getAllPosts(),
    )
    return { posts, isLoading };
}
