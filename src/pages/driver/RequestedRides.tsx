/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, User } from "lucide-react";
import {
  useAcceptdRideMutation,
  useCanceldRideMutation,
  useRequestedRideQuery,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function RequestedRides() {
  const { data } = useRequestedRideQuery(null);
  const [cancelRide] = useCanceldRideMutation();
  const [acceptRide] = useAcceptdRideMutation();
  const navigate = useNavigate();
  const [rideRequest, setRideRequest] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      setRideRequest(data?.data?.slice(0, 5));
    }
  }, [data]);
  console.log(rideRequest);
  const handleAccept = async (id: string) => {
    try {
      await acceptRide(id).unwrap();
      toast.success("Ride Accepted!");
      navigate(`/driver/active/${id}`);
    } catch (error) {
      console.log(error);
    }
    // ✅ You’ll later call your API here, e.g.:
    // acceptRideMutation(request.id)
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelRide(id).unwrap();
      setRideRequest((prev) => prev.filter((ride) => ride._id !== id));
      toast.success("Ride Cancelled!");
    } catch (error) {
      toast.error("Failed to cancel Ride");
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto container">
      {rideRequest?.length > 0 ? (
        rideRequest.map((request, index) => (
          <Card key={index} className="w-[350px] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="text-primary" /> {request?.riderId?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Pickup</p>
                  <p className="text-muted-foreground">
                    {request?.pickupLocation?.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">Destination</p>
                  <p className="text-muted-foreground">
                    {request?.destinationLocation?.address}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <p>
                  <Clock className="inline-block h-4 w-4 mr-1 text-primary" />
                  {request?.requestedAt}
                </p>
                <p className="font-semibold">{request?.distance?.toFixed(2)}</p>
              </div>
              <div className="text-lg font-semibold text-right text-primary">
                {request?.fare}
              </div>
              <div className="text-lg font-semibold text-right text-primary">
                {request?.status}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  className="w-[48%]"
                  onClick={() => handleCancel(request?._id)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-[48%]"
                  onClick={() => handleAccept(request._id)}
                >
                  Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-muted-foreground text-sm py-4">
          No new ride requests
        </div>
      )}
    </div>
  );
}
