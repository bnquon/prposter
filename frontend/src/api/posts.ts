import { api } from "../../utils/axios";

export async function uploadPost (data: FormData) {
    const { data: uploadPost } = await api.post("/post/upload", data);
    return uploadPost;
}