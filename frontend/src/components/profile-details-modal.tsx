import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { toast } from "sonner"
import { Profile } from "utils/types";
import { updateProfile } from "@/api/profile";
import { QueryClient } from "react-query";

type formValues = {
  username: string;
  weight: string;
  age: string;
};

interface ProfileDetailsModalProps {
  user_id: string;
  showModal: boolean;
}

export default function ProfileDetailsModal({
  user_id,
  showModal,
}: ProfileDetailsModalProps) {
  const queryClient = new QueryClient();
  const handleSave = async (formData: formValues) => {
    const data: Profile = { ...formData, user_id };
    try {
      await updateProfile(data);
      queryClient.invalidateQueries(["profileCreated", user_id]);
      toast("Profile has been updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const { register, handleSubmit } = useForm<formValues>();

  return (
    <>
      <Dialog open={showModal}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input
                  placeholder="athleticdude3"
                  required
                  {...register("username")}
                />
              </div>
              <div className="grid gap-2">
                <Label>Age</Label>
                <Input
                  placeholder="19"
                  required
                  type="number"
                  {...register("age")}
                />
              </div>
              <div className="grid gap-2">
                <Label>Weight (kg)</Label>
                <Input
                  placeholder="athleticdude3"
                  required
                  type="number"
                  {...register("weight")}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit(handleSave)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
