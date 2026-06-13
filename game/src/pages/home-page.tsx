const HomePage = () => {
  return (
    <div className="shadow-md rouned-lg gap-x-10 h-75 flex items-center justify-between p-20">
      <button className="bg-blue-300 text-white p-5 font-medium rounded-md hover:bg-blue-200 cursor-pointer">
        Create Room
      </button>
      <button className="bg-red-300 text-white p-5 font-medium rounded-md hover:bg-red-200 cursor-pointer">
        Join Room
      </button>
    </div>
  );
};

export default HomePage;
