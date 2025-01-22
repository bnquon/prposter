export type Profile = {
    user_id: string;
    username: string;
    weight: string;
    age: string;
}

export type PostTags = {
    id: string;
    name: string;
}

export const tags: PostTags[] = [
    { id: "weights", name: "Weights" },
    { id: "cardio", name: "Cardio" },
    { id: "yoga", name: "Yoga" },
    { id: "other", name: "Other" },
];