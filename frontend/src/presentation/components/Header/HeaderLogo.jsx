import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <div className="flex items-center h-20">
      <Link to="/">
        <h1 className="text-2xl font-bold text-black">DMManga</h1>
      </Link>
    </div>
  );
}
