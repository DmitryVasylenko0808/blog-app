"use client";

import { useModal } from "@/hooks/useModal";
import { Button } from "@/shared/ui";
import { PencilLine } from "lucide-react";
import { UserDetails } from "@/services/users/dto/get.one.user.dto";
import EditProfileFormModal from "./edit.profile.form.modal";

type EditProfileProps = {
  user: UserDetails;
};

const EditProfile = ({ user }: EditProfileProps) => {
  const modal = useModal();

  return (
    <div className="flex justify-end">
      <Button variant="tertiary" onClick={modal.onOpen}>
        <PencilLine /> Edit Profile
      </Button>
      <EditProfileFormModal
        open={modal.open}
        onClose={modal.onClose}
        user={user}
      />
    </div>
  );
};

export default EditProfile;
