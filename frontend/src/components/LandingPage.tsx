import { FaGithub, FaXTwitter } from "react-icons/fa6";
import FileUpload from "./FileUpload";

export default function LandingPage() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-grn2">
        <div className="flex flex-col justify-between w-2/4 h-5/6 shadow-2xl rounded-2xl text-black bg-grn1">
          <div>
            <h1 className="font-extrabold text-grn4 text-center text-3xl mt-10">
              WebKee
            </h1>
            <h3 className="font-medium text-grn3 text-center text-xl">
              KeePass DB on the web
            </h3>

            <FileUpload />
          </div>

          <div className="text-center font-bold  text-grn4 mb-8">
            <p>Find Me</p>
            <div className="flex justify-center mt-2">
              <a
                href="https://github.com/yudin101/webkee"
                target="_blank"
                className="mr-2"
              >
                <FaGithub size={22} />
              </a>
              <a href="https://x.com/yudin101" target="_blank" className="ml-2">
                <FaXTwitter size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
