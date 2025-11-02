import { Link } from "react-router";

export default function HeroSection() {
  return (
    <div className="border-b px-4 py-3 container mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-left text-xl">
          <span className="mr-1">
            <Link to="/register">📫</Link>
          </span>
          Earn at least 100000 taka when you complete your first 140 trips in 30
          days
        </p>
        <span className="text-muted-foreground text-sm whitespace-nowrap">
          See the terms below*
        </span>
      </div>
    </div>
  );
}
