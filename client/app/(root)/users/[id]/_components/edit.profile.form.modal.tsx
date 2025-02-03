"use client";

import { useActionState, useEffect } from "react";
import { UserDetails } from "@/services/users/dto/get.one.user.dto";
import Modal, { ModalProps } from "@/shared/ui/modal";
import { Button, Loader, TextArea, TextField } from "@/shared/ui";
import { updateUser } from "../_actions/update.user";
import SelectProfilePhoto from "./select.profile.photo";

type EditProfileFormModalProps = ModalProps & { user: UserDetails };

const EditProfileFormModal = ({
  user,
  ...modalProps
}: EditProfileFormModalProps) => {
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, formAction, pending] = useActionState(updateUserWithId, null);

  useEffect(() => {
    if (state?.message) {
      modalProps.onClose();
    }
  }, [state]);

  return (
    <Modal open={modalProps.open} onClose={modalProps.onClose}>
      <div className="w-[420px]">
        <form action={formAction}>
          <h3 className="mb-8">Editing Profile</h3>

          <SelectProfilePhoto defaultImage={user.avatarUrl} />

          <TextField
            label="Full Name"
            className="mb-6"
            defaultValue={user.fullname}
            error={state?.errors?.fullname}
            name="fullname"
            id="fullname"
          />
          <TextArea
            label="About"
            className="mb-8"
            rows={5}
            defaultValue={user.about}
            error={state?.errors?.about}
            name="about"
            id="about"
          />
          <p className="my-4 text-center text-text-error">
            {state?.errors?.root}
          </p>
          <Button
            variant="primary"
            size="md"
            className="w-full"
            type="submit"
            disabled={pending}
          >
            {pending ? <Loader color="white" size="sm" /> : "Edit Profile"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileFormModal;
