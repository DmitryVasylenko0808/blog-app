"use client";

import { useModal } from "@/hooks/useModal";
import { Button } from "@/shared/ui";
import Modal from "@/shared/ui/modal";
import { PencilLine } from "lucide-react";

const EditProfile = () => {
  const modal = useModal();

  return (
    <div className="flex justify-end">
      <Button variant="tertiary" onClick={modal.onOpen}>
        <PencilLine /> Edit Profile
      </Button>
      <Modal open={modal.open} onClose={modal.onClose}>
        Modal
      </Modal>
    </div>
  );
};

export default EditProfile;
