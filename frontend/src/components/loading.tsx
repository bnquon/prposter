import ClipLoader from "react-spinners/ClipLoader";

export const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div className="w-screen h-screen bg-black bg-opacity-20 flex items-center justify-center z-10">
      <ClipLoader color="#000000" loading={loading} size={120} />
    </div>
  );
};
