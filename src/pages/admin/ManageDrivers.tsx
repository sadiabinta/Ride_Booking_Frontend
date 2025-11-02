/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetDriverQuery,
  useUpdateDriverMutation,
} from "@/redux/features/admin/admin.api";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ManageDrivers() {
  const { data, isLoading, error } = useGetDriverQuery(null);
  const [updateDriver] = useUpdateDriverMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading Drivers...");
    }

    if (error) {
      toast.error("Error loading drivers");
    }
  }, [isLoading, error]);

  console.log(data);

  const handleApproval = async (_id: string, status: boolean) => {
    const driverInfo = {
      isApproved: !status,
      _id,
    };
    try {
      await updateDriver(driverInfo).unwrap();
      toast.success("Driver Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating driver");
    }
  };
  const drivers = data?.data || [];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full"
                    src={item.driverId.picture}
                    width={40}
                    height={40}
                    alt={item.name}
                  />
                  <div>
                    <div className="font-medium">{item.driverId.name}</div>
                    {/* <span className="mt-0.5 text-xs text-muted-foreground">
                      {item.username}
                    </span> */}
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.driverId.email}</TableCell>
              <TableCell>{item.driverId.address}</TableCell>
              <TableCell>{item.isApproved ? "Approved" : "Pending"}</TableCell>
              <TableCell>{item.isOnline ? "Active" : "Offline"}</TableCell>
              <TableCell className="text-right">{item.earnings}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={item.isApproved ? "destructive" : "default"}
                  onClick={() => handleApproval(item._id, item.isApproved)}
                >
                  {item.isApproved ? "Disapprove" : "Approve"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
