import { Button } from "./ui/button";
import { signOut } from "../../utils/features/auth";
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const navigate = useNavigate();
  const handleClick = async () => {
    await signOut();
    navigate("/");
  };
  return <Button onClick={handleClick}>Sign out</Button>;
}
