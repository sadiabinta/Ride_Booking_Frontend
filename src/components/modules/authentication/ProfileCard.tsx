import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { data, isLoading, error } = useUserInfoQuery(null);
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading User...");
    }

    if (error) {
      toast.error("Error loading user");
    }
  }, [isLoading, error]);
  const userData = data?.data;
  console.log(userData);
  if (!userData) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading User Info....</p>
    );
  }
  const user = userData.user;
  const driver = userData.driver;
  return (
    <Card className="w-full shadow-lg text-center">
      <CardHeader>
        <CardTitle>{userData.user.name}</CardTitle>
        <p className="text-sm text-gray-500">{userData.user.email}</p>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Phone:</strong> {userData.user.phone}
        </p>
        <p>
          <strong>Address:</strong> {userData.user.address}
        </p>
        <p>
          <strong>Role:</strong> {userData.user.role}
        </p>
        <p>
          <strong>Status:</strong> {userData.user.isActive}
        </p>
        {user.role === "DRIVER" && (
          <div className="mt-4 border-t pt-3">
            <h3 className="font-semibold text-lg mb-2">Driver Information</h3>
            <p>
              <strong>License:</strong> {driver.licenseNumber || "N/A"}
            </p>
            <p>
              <strong>Vehicle Type:</strong> {driver.vehicleType || "N/A"}
            </p>
            <p>
              <strong>Vehicle Number:</strong> {driver.vehicleNumber || "N/A"}
            </p>
            <p>
              <strong>Earnings:</strong> $
              {driver.earnings?.toFixed(2) || "0.00"}
            </p>
            <p>
              <strong>Approved:</strong>{" "}
              {driver.isApproved ? "✅ Yes" : "⚠️ Pending"}
            </p>
            <p>
              <strong>Online Status:</strong>{" "}
              {driver.isOnline ? "🟢 Active" : "🔴 Offline"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
