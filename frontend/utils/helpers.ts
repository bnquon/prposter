export const weightText = (weight: string) => `${weight} kgs`;
export const ageText = (age: string) => `${age} yrs`;

export const isImage = (file_type: string): boolean => {
    if (file_type.startsWith("image")) return true;
    return false;
};