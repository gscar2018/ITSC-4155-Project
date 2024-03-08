import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-error">404: Page Not Found</h1>
      <Link to="/" className="btn btn-ghost ">
        Return back to home
      </Link>
    </div>
  );
}

export default ErrorPage;
