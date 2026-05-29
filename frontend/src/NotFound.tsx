import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  // Check if it's a 404 or an internal server code crash
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grn1 text-grn4 p-6">
      <h1 className="text-9xl font-extrabold tracking-widest">
        {is404 ? "404" : "500"}
      </h1>
      <div className="bg-white px-2 text-sm rounded absolute font-medium border border-grn4">
        {is404 ? "Page Not Found" : "Application Error"}
      </div>
      <p className="text-xl mt-8 text-center max-w-md">
        {is404
          ? "The page you are looking for doesn't exist or has been moved."
          : "Something went wrong on our end. Please try again later."}
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-grn4 text-white rounded-md font-medium shadow hover:bg-grn4hvr transition"
      >
        Go Home
      </Link>
    </div>
  );
}
