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

export type UploadPostObject = {
    file: File; 
    caption: string;
    tags: string[];
    user_id: string;
    file_type: string;
}

export type Post = {
    post_id: number;
    user_id: string;
    public_url: string;
    caption: string;
    file_type: string;
    tags: string[];
}