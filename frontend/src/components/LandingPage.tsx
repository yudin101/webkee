import FileUpload from "./FileUpload";

export default function LandingPage() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-white">
        <div className="flex flex-col justitems-center w-2/4 h-5/6 shadow-2xl rounded-2xl text-black">
          <h1 className="font-extrabold text-grn4 text-center text-3xl mt-5">WebKee</h1>
          <h3 className="font-medium text-grn3 text-center text-xl">KeePass DB on the web</h3>

          <FileUpload />
        </div>
      </div>
    </>
  );
}
