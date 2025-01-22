import { api } from "../../utils/axios";

export async function checkIfProfileCreated(user_id: string): Promise<boolean> {
    const { data: isCreated } = await api.get(`/profile?user_id=${user_id}`);
    return isCreated;
}