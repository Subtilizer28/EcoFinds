export interface UserProfile {
    id: string;
    profilePicture?: string;
    username: string;
    email: string;
    phone?: string;
    image?: string;
    bio?: string;
}

export interface ProfilePageProps {
    user: UserProfile;
    onEditProfile: () => void;
    onViewListings: () => void;
    onViewPurchases: () => void;
    onUpdateProfilePicture: (file: File) => void;
}

export type Purchase = {
    id: number;
    name: string;
    price: string;
    category: string;
    seller: string;
    imageUrl?: string;
};