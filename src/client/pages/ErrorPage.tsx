import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1 className="text-error">404: Page Not Found</h1>
      <Link to="/">Return back to home</Link>
    </div>
  );
}

export default ErrorPage;
