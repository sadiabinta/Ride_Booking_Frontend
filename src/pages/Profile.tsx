import ProfileCard from "@/components/modules/authentication/ProfileCard";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { data, isLoading, error } = useUserInfoQuery(null);
  useEffect(() => {
    let toastId;
    if (isLoading) {
      toastId = toast.loading("Loading User...");
    } else {
      toast.dismiss(toastId);
    }

    if (error) {
      toast.error("Error loading user");
    }
  }, [isLoading, error]);
  console.log(data);
  const user = data?.data || {};
  return (
    <div className="container my-auto mx-auto ">
      <ProfileCard {...user} />
    </div>
  );
}
