/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEarningQuery } from "@/redux/features/driver/driver.api";
import { Calendar, DollarSign } from "lucide-react";

export default function Income() {
  const { data } = useEarningQuery(null);
  console.log(data);
  const rides = data?.data?.rides || [];
  const total = data?.data?.totalEarnings || 0;
  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <DollarSign className="text-green-600" />
            Total Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-700">
            ${total.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Ride History Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="text-primary" />
            Earnings History
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rider</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Completed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.map((ride: any) => (
                <TableRow key={ride._id}>
                  <TableCell>{ride?.riderId?.name}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ${ride?.fare.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(ride?.completedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}

              {rides?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No earnings yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
