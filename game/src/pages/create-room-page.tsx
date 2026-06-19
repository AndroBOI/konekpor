import { Link, useParams } from "react-router-dom";

const CreateRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="p-20 shadow-md flex flex-col justify-center items-center gap-y-5">
      <div>id - {id}</div>
      <div className="bg-blue-300 text-white inline px-10 py-5 rounded-md">
        Waiting... (1/0)
      </div>
      <Link to={"/"} className="text-red-300 hover:underline">
        Cancel
      </Link>
    </div>
  );
};

export default CreateRoomPage;
