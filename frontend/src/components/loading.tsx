import ClipLoader from "react-spinners/ClipLoader";

export const Loading = ({ loading }: { loading: boolean }) => {
    return <ClipLoader color="#36d7b7" loading={loading} size={30} />;
};