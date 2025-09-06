// pages/profile.tsx or app/profile/page.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProfilePage from '../../components/ProfilePage';

interface UserProfile {
  id: string;
  profilePicture?: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  joinDate: string;
}

const Profile: React.FC = () => {
  const router = useRouter();

  // Mock user data - replace with your data fetching logic
  const user: UserProfile = {
    id: '1',
    username: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about technology and innovation',
    joinDate: 'March 2023',
    profilePicture: '/default-avatar.png', // Optional
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleViewListings = () => {
    router.push('/profile/listings');
  };

  const handleViewPurchases = () => {
    router.push('/profile/purchases');
  };

  const handleUpdateProfilePicture = async (file: File) => {
    // Implement your file upload logic here
    console.log('Updating profile picture:', file);
    
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
