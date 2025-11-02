import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";
import { toast } from "sonner";

interface ProfileCardProps {
  name: string;
  email: string;
  location?: string;
  image?: string;
  isApproved?: boolean;
  isOnline?: boolean;
  balance?: string | number;
  onActionClick?: () => void;
  actionLabel?: string;
}

export default function Profile({
  name,
  email,
  location,
  image,
  isApproved,
  isOnline,
  balance,
  onActionClick,
  actionLabel,
}: ProfileCardProps) {
  const { data, isLoading, error } = useUserInfoQuery(null);
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading User...");
    }

    if (error) {
      toast.error("Error loading user");
    }
  }, [isLoading, error]);
  console.log(data);
  const user = data?.data || [];
  return (
    <Card className="shadow-lg">
      {image && (
        <img
          src={user.picture}
          alt={name}
          className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
        />
      )}
      <CardHeader className="text-center mt-4">
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-center">
        {user.address && <p>Location: {user.address}</p>}
        {balance !== undefined && <p>Balance: ${balance}</p>}
        {user.is !== undefined && (
          <p>Status: {isApproved ? "Approved ✅" : "Pending ⚠️"}</p>
        )}
        {isOnline !== undefined && (
          <p>Online: {isOnline ? "Active 🟢" : "Offline 🔴"}</p>
        )}

        {onActionClick && actionLabel && (
          <Button
            size="sm"
            variant={isApproved ? "destructive" : "default"}
            onClick={onActionClick}
            className="mt-4"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
