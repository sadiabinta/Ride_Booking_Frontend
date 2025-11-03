import { Card, CardContent } from "@/components/ui/card";

export default function CountSec() {
  return (
    <Card className="container mx-auto w-[50%]">
      <CardContent>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="sm:border-r-4">
            <h2 className="text-3xl font-bold text-primary">5M+</h2>
            <p className="text-sm text-gray-500">App Downloads</p>
          </div>
          <div className="sm:border-r-4">
            <h2 className="text-3xl font-bold text-primary">50M+</h2>
            <p className="text-sm text-gray-500">Trips/Orders Served</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary">1M+</h2>
            <p className="text-sm text-gray-500">Lives Impacted</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
