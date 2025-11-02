import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SearchRideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideDetails?: {
    distance: number;
    duration: number;
    fare: number;
  } | null;
  onConfirm: () => void;
  isLoading: boolean;
};

export function SearchRideModal({
  open,
  onOpenChange,
  rideDetails,
  onConfirm,
  isLoading,
}: SearchRideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto sm:max-w-l z-[9999] bg-gray-900">
        <DialogHeader>
          <DialogTitle>Confirm Your Ride</DialogTitle>
          <DialogDescription>
            Please review your ride details before confirming.
          </DialogDescription>
        </DialogHeader>

        {rideDetails ? (
          <div className="space-y-4 text-sm">
            <p>
              <strong>Distance:</strong> {rideDetails.distance} km
            </p>
            <p>
              <strong>Duration:</strong> {rideDetails.duration} min
            </p>
            <p>
              <strong>Fare:</strong> {rideDetails.fare} taka
            </p>
          </div>
        ) : (
          <p>Calculating route details...</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Confirming..." : "Confirm Ride"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
