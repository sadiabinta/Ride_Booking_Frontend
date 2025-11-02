import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="my-32 text-center">
      <h1 className="text-bold text-5xl text-red-500 mb-16">
        YOU ARE NOT AUTHORIZED TO VISIT THIS ROUTE
      </h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
