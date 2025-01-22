import { api } from "../../utils/axios";
import { Profile } from "../../utils/types";

export async function checkIfProfileCreated(user_id: string): Promise<boolean> {
    const { data: isCreated } = await api.get(`/profile?user_id=${user_id}`);
    return isCreated;
}

export async function updateProfile(ProfileInfo: Profile) {
    const { data: updateProfile } = await api.patch("/profile", ProfileInfo);
    return updateProfile;
}