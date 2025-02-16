import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiWarningCircle } from "react-icons/pi";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[80%] rounded-lg">
        <DialogHeader>
          <div className="text-red-500 text-center flex justify-center">
            <div className="rounded-full bg-[#fff1f1] p-5">
              <div className="bg-[#ffe2e3] rounded-full p-2">
                <PiWarningCircle size={44} />
              </div>
            </div>
          </div>
          <div className="text-3xl font-medium text-center mt-5">{title}</div>
          <div className="text-center text-gray-500 mt-2">{message}</div>
        </DialogHeader>
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="outline" className="lg:w-48" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="lg:w-48 hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm Deletion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
