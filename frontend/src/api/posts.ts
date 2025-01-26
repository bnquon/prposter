import { api } from "../../utils/axios";

export async function uploadPost (data: FormData) {
    const { data: uploadPost } = await api.post("/posts/upload", data);
    return uploadPost;
}

export async function getAllPosts () {
    const { data: posts } = await api.get("/posts");
    return posts;
}