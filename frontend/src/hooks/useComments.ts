import { getComments } from "@/api/posts"
import { useQuery } from "react-query"

export const useComments = (post_id: number) => {
    const { data: comments, isLoading } = useQuery(
        ["comments", post_id],
        () => getComments(post_id),
    )
    return { comments, isLoading }
}