import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCompleteRideMutation,
  usePickedupMutation,
  useRequestedSingleRideQuery,
} from "@/redux/features/driver/driver.api";
import { Clock, Frown, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export interface IRide {
  _id: string;
  riderId: {
    _id: string;
    name: string;
    phone: string;
  };
  driverId: string;
  offeredDriver: string | null;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  destinationLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  distance: number;
  fare: number;
  status: "REQUESTED" | "ACCEPTED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";

  requestedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  canceledBy?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ActiveRide() {
  const { id } = useParams();
  const { data, isError } = useRequestedSingleRideQuery(id);
  const [pickedup] = usePickedupMutation();
  const [completeRide] = useCompleteRideMutation();
  const [ride, setRide] = useState<IRide | null>(null);

  useEffect(() => {
    if (data?.data) {
      setRide(data?.data);
    }
  }, [data]);
  const handlePickup = async () => {
    try {
      const result = await pickedup(id).unwrap();
      if (result?.data) {
        setRide(result?.data);
        toast.success("Rider picked up");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async () => {
    try {
      const result = await completeRide(id).unwrap();
      if (result?.data) {
        setRide(result?.data);
        toast.success("Rider Completed!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const ride = data?.data;
  console.log(ride);
  if (isError || !ride) {
    return (
      <div className="p-6 flex flex-col justify-center items-center h-48 space-y-3">
        <Frown className="h-10 w-10 text-gray-400" />
        <Card className="w-[350px] text-center p-6 shadow-lg border-dashed">
          <CardTitle className="text-xl text-gray-600">
            No Active Ride Found
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            It looks like there is currently no ride assigned or in progress.
          </p>
        </Card>
      </div>
    );
  }
  return (
    <div className="p-6">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-primary" /> {ride?.riderId?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-semibold">Pickup</p>
              <p className="text-muted-foreground">
                {ride?.pickupLocation?.address}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-600 mt-1" />
            <div>
              <p className="font-semibold">Destination</p>
              <p className="text-muted-foreground">
                {ride?.destinationLocation?.address}
              </p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <p>
              <Clock className="inline-block h-4 w-4 mr-1 text-primary" />
              {ride?.requestedAt}
            </p>
            <p className="font-semibold">{ride?.distance?.toFixed(2)}</p>
          </div>
          <div className="text-lg font-semibold text-right text-primary">
            {ride?.fare}
          </div>
          <div className="text-lg font-semibold text-right text-primary">
            {ride?.status}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 mt-4">
        <Button
          disabled={ride?.status !== "ACCEPTED"}
          onClick={() => handlePickup()}
        >
          Picked Up
        </Button>

        <Button
          disabled={ride?.status !== "IN_TRANSIT"}
          onClick={() => handleComplete()}
        >
          Completed
        </Button>
      </div>

      <Button
        className="mt-6"
        //  onClick={handleLocationUpdate}
      >
        Update Location
      </Button>
    </div>
  );
}
