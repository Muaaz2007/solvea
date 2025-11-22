
export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  age: string;
  rolePreference1: string;
  rolePreference2: string;
  skills: string[];
  pastExperience: string;
  awards: string;
  whyJoin: string;
  cvFile: File | null;
  agreeToTerms: boolean;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  school: string;
  age: string;
  role_preference_1: string;
  role_preference_2: string;
  skills: string[];
  past_experience: string;
  awards: string;
  motivation: string;
  cv_url: string | null;
  application_status: string;
  created_at: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
