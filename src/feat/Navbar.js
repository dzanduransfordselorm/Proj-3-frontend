const Navbar = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-3 pt-6">
        <div className="p-4 text-center">
          <a href="/">🚀 Nebula - dock</a>
        </div>
        <div className="p-4 text-center flex justify-center">
          <div className=" mx-8">
            <a href="/config"> Configurations</a>
          </div>
          <div className="">
            <a href="/student-dashboard">Student Dashboard</a>
          </div>
        </div>
        <div className="p-4">
          <a href="/unlock-hint">Unlock A Hint</a>
        </div>
      </div>
      <hr className=" h-px bg-gray-200 mb-3 border-0" />
    </div>
  );
};

export default Navbar;
