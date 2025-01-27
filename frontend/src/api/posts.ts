import { api } from "../../utils/axios";

export async function uploadPost (data: FormData) {
    const { data: uploadPost } = await api.post("/posts/upload", data);
    return uploadPost;
}

export async function getAllPosts () {
    const { data: posts } = await api.get("/posts");
    return posts;
}

export async function getComments (post_id: number) {
    const { data: comments } = await api.get(`/comments?post_id=${post_id}`);
    return comments;
}

export async function addComment (comment: string, user_id: string, post_id: number) {
    const { data } = await api.post("/comments", { comment, user_id, post_id });
    return data;
}