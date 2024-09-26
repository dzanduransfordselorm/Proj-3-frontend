import NebulaPic from "../assets/nebula_pic.png";
import Bapic from "./Bapic";
import Card from "./Card";

const MainPage = () => {
  return (
    <div className="bg-[#F3F3F3] max-w-screen-xl mx-auto">
      <div className="  grid grid-cols-2 px-16 py-8 pb-32">
        <div className="flex justify-center">
          <img src={NebulaPic} className="h-auto w-2/3" />
        </div>
        <div className=" py-16 px-2">
          <Card />
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0" />
      <h2 className="text-center font-bold text-3xl underline p-10">
        Your Role in Shaping the Future
      </h2>
      <p className="text-center mx-20 p-8">
        As aspiring cloud engineers and tech enthusiasts, you have the
        opportunity to dive deep into the practical aspects of cloud computing
        and development. Here's how you can contribute:
      </p>
      <Bapic />
      <hr className="h-px mx-12 bg-gray-200 border-0" />
      <h2 className="text-center italic text-sm px-16 pt-8">
        Your contribution is vital in building a comprehensive platform that not
        only serves as a learning tool but also as a showcase of your skills to
        potential employers.
      </h2>
      <hr className="h-px mx-12 my-16 bg-gray-200 border-0" />
      <h1 className="text-center pb-8">
        <strong>Azubi Africa ©2024</strong> - Ernest Thompson
      </h1>
    </div>
  );
};

export default MainPage;
