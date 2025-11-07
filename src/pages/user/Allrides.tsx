/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllRidesQuery } from "@/redux/features/rider/rider.api";

export default function Allrides() {
  const { data, isLoading, isError, error } = useAllRidesQuery(null);
  const rideList = data?.data;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh] bg-gray-50">
        <p className="text-lg text-gray-600">Loading your ride history...</p>
      </div>
    );
  }
  if (isError) {
    console.error("Error fetching rides:", error);
    return (
      <div className="text-center p-8 bg-red-50 border border-red-300 rounded-lg mx-auto max-w-lg mt-10 shadow-md">
        <h3 className="font-bold text-xl text-red-700 mb-2">
          Error Loading Rides
        </h3>
        <p className="text-sm text-red-600">
          We could not retrieve your ride requests. Please try refreshing the
          page.
        </p>
      </div>
    );
  }
  return (
    <div className="p-4 sm:p-6 md:p-10 bg-green-800 min-h-screen">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>
            You have made total
            <span className="ml-2 text-green-500">{rideList?.length}</span>
            {" Ride Requests"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of current projects.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead>Pick Up</TableHead>
                <TableHead>Drop Off</TableHead>
                <TableHead>Driver ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Fare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rideList.map((ride: any, index: any) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{ride._id}</TableCell>
                  <TableCell className="font-medium">
                    {ride.createdAt}
                  </TableCell>

                  <TableCell>{ride.pickupLocation.address}</TableCell>
                  <TableCell>{ride.destinationLocation.address}</TableCell>
                  <TableCell>
                    {ride.driverId ? ride.driverId : "null"}
                  </TableCell>
                  <TableCell>{ride.status}</TableCell>
                  <TableCell className="text-right">
                    {ride.fare}
                    {" tk"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
