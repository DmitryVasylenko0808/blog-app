import { Container } from "@/shared/ui";
import React from "react";
import UserProfileSkeleton from "./_components/user.profile.skeleton";

const ProfilePageLoading = () => {
  return (
    <div className="bg-primary-100">
      <Container className="pt-20 pb-24">
        <UserProfileSkeleton />
      </Container>
    </div>
  );
};

export default ProfilePageLoading;
