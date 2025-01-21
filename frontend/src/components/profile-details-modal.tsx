import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

type formValues = {
  username: string;
  weight: string;
  age: string;
  email: string;
};

interface ProfileDetailsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  email: string;
}

export default function ProfileDetailsModal({
  open,
  setOpen,
  email,
}: ProfileDetailsModalProps) {
  const handleSave = (form: formValues) => {
    const data = { ...form, email };
    console.log(data);
    setOpen(false);
  };

  const { register, handleSubmit } = useForm<formValues>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <Label>Weight</Label>
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
  );
}
