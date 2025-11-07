/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { User, Clock } from "lucide-react";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  useEstimateFareMutation,
  useRequestRideMutation,
} from "@/redux/features/rider/rider.api";
import { toast } from "sonner";
import { MapBoundsUpdater } from "@/components/modules/rider/MapBoundUpdater";
import { SearchRideModal } from "@/components/modules/rider/SearchRideModal";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

type RideFormValues = {
  pickup: string;
  dropoff: string;
  time: string;
  forWhom: string;
};

type Coords = [number, number];

export default function RequestRide() {
  const [pickupCoords, setPickupCoords] = useState<Coords>([27.974, -82.454]);
  const [dropoffCoords, setDropoffCoords] = useState<Coords | null>(null);
  const [routeCoords, setRouteCoords] = useState<Coords[]>([]);
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rideSummary, setRideSummary] = useState<{
    distance: number;
    duration: number;
    fare: number;
  } | null>(null);

  const [requestRide] = useRequestRideMutation();
  const [estimateFare] = useEstimateFareMutation();
  const form = useForm<RideFormValues>({
    defaultValues: {
      pickup: "",
      dropoff: "",
      time: "now",
      forWhom: "me",
    },
  });

  const fetchSuggestions = async (
    query: string,
    type: "pickup" | "dropoff"
  ) => {
    if (!query || query.length < 3) {
      type === "pickup" ? setPickupSuggestions([]) : setDropoffSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        }
      );
      if (type === "pickup") setPickupSuggestions(res.data);
      else setDropoffSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const fetchRoute = async (start: Coords, end: Coords | null) => {
    if (!end || (end[0] === 0 && end[1] === 0)) {
      setRouteCoords([]);
      return;
    }

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?geometries=geojson`;

    try {
      const response = await axios.get(osrmUrl);
      const route = response.data.routes[0];

      if (route) {
        const geojsonCoords: [number, number][] = route.geometry.coordinates;
        const leafletCoords: Coords[] = geojsonCoords.map(([lon, lat]) => [
          lat,
          lon,
        ]);
        setRouteCoords(leafletCoords);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      setRouteCoords([]);
    }
  };

  const handleSelectSuggestion = (
    suggestion: any,
    type: "pickup" | "dropoff"
  ) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    const displayName = suggestion.display_name;

    if (type === "pickup") {
      const newCoords: Coords = [lat, lon];
      form.setValue("pickup", displayName);
      setPickupCoords(newCoords);
      setPickupSuggestions([]);

      fetchRoute(newCoords, dropoffCoords);
    } else {
      const newCoords: Coords = [lat, lon];
      form.setValue("dropoff", displayName);
      setDropoffCoords(newCoords);
      setDropoffSuggestions([]);

      fetchRoute(pickupCoords, newCoords);
    }
  };

  const onSubmit = async (values: RideFormValues) => {
    if (!dropoffCoords) {
      toast.error(
        "Please select a valid dropoff location from the suggestions."
      );
      return;
    }
    const rideInfo = {
      pickupLocation: {
        address: values.pickup,
        latitude: pickupCoords[0],
        longitude: pickupCoords[1],
      },
      destinationLocation: {
        address: values.dropoff,
        latitude: dropoffCoords![0],
        longitude: dropoffCoords![1],
      },
    };

    try {
      setLoading(true);
      const res = await estimateFare(rideInfo).unwrap();

      console.log(res);
      if (res?.data) {
        setRideSummary({
          distance: res.data.distance,
          duration: res.data.duration,
          fare: res.data.fare,
        });
      }

      setIsDialogOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Error estimating fare");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    const values = form.getValues();

    const rideInfo = {
      pickupLocation: {
        address: values.pickup,
        latitude: pickupCoords[0],
        longitude: pickupCoords[1],
      },
      destinationLocation: {
        address: values.dropoff,
        latitude: dropoffCoords![0],
        longitude: dropoffCoords![1],
      },
    };
    try {
      setLoading(true);
      const res = await requestRide(rideInfo).unwrap();
      console.log(res.data);
      toast.success("Ride requested....Searching Driver....");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to request ride");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[90dvh] lg:h-[90vh] container mx-auto relative">
      <div className="w-[360px] p-6 bg-transparent shadow-md rounded-xl m-4 relative">
        <h2 className="text-xl font-semibold mb-6">Get a ride</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pickup"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Pickup location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pickup location"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        fetchSuggestions(e.target.value, "pickup");
                      }}
                    />
                  </FormControl>

                  {pickupSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-green-500 border rounded-md w-full max-h-full overflow-y-auto">
                      {pickupSuggestions.map((sug) => (
                        <li
                          key={sug.place_id}
                          className="px-3 py-2 hover:bg-green-900 cursor-pointer text-sm"
                          onClick={() => handleSelectSuggestion(sug, "pickup")}
                        >
                          {sug.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dropoff"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Dropoff location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter dropoff location"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        fetchSuggestions(e.target.value, "dropoff");
                      }}
                    />
                  </FormControl>

                  {dropoffSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-green-500 border rounded-md w-full max-h-40 overflow-y-auto">
                      {dropoffSuggestions.map((sug) => (
                        <li
                          key={sug.place_id}
                          className="px-3 py-2 hover:bg-green-900 cursor-pointer text-sm"
                          onClick={() => handleSelectSuggestion(sug, "dropoff")}
                        >
                          {sug.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 ">
                    <Clock size={16} /> Pickup time
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Pickup now</SelectItem>
                        <SelectItem value="later">
                          Schedule for later
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="forWhom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User size={16} /> Ride for
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="me">For me</SelectItem>
                        <SelectItem value="someone">
                          For someone else
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white hover:bg-green-500 mt-4"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </Form>
      </div>

      {/* MAP PANEL */}
      <div className="flex-1 rounded-lg overflow-hidden m-4">
        <MapContainer center={pickupCoords} zoom={13} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBoundsUpdater routeCoords={routeCoords} />

          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="blue" weight={5} />
          )}

          <Marker position={pickupCoords}>
            <Popup>Pickup Location</Popup>
          </Marker>
          {dropoffCoords && (
            <Marker position={dropoffCoords}>
              <Popup>Dropoff Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <SearchRideModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        rideDetails={rideSummary}
        onConfirm={handleConfirmBooking}
        isLoading={loading}
      />
    </div>
  );
}
