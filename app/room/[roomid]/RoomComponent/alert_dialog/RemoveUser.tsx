import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserRoundMinus } from "lucide-react";
import { Member, useMember } from "../Members/MemberProvider";

interface RemoveUserProps {
  member: Member;
}

const RemoveUser = ({ member }: RemoveUserProps) => {
  const { removeMember } = useMember();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <UserRoundMinus className="w-4 h-4 md:w-6 lg-w-8 text-red-700" />
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg bg-[#3B3B3B] p-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Notice</AlertDialogTitle>
          <AlertDialogDescription className="  py-5 text-[#C2C2C2] text-sm lg:text-base">
            Are your sure to remove{" "}
            <span className="text-red-600 font-semibold ">
              {member.userName}
            </span>{" "}
            from this room ??
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => removeMember(member.id, member.userName)}
            className="bg-green-600"
          >
            Continue
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveUser;
