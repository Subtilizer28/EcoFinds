// pages/profile.tsx or app/profile/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "../../components/ProfilePage";
import { useSession } from "next-auth/react";
import type { UserProfile } from "../../types";

const Profile: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession();

  React.useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const user: UserProfile = {
    id: session?.user.id ?? "",
    username: session?.user.name ?? "",
    email: session?.user.email ?? "",
    phone: session?.user.phone ?? "Not provided",
    bio: session?.user.description ?? "This user has no bio.",
    profilePicture: session?.user.image ?? undefined,
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleViewListings = () => {
    router.push("/profile/listings");
  };

  const handleViewPurchases = () => {
    router.push("/profile/purchases");
  };

  const handleUpdateProfilePicture = async (file: File) => {
    // Implement your file upload logic here
    console.log("Updating profile picture:", file);

    // Example: Upload to your backend
    // const formData = new FormData();
    // formData.append('profilePicture', file);
    // await fetch('/api/upload-profile-picture', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <ProfilePage
      user={user}
      onEditProfile={handleEditProfile}
      onViewListings={handleViewListings}
      onViewPurchases={handleViewPurchases}
      onUpdateProfilePicture={handleUpdateProfilePicture}
    />
  );
};

export default Profile;
