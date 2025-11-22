
import { RegistrationFormData } from '../types';
import { supabase } from '../lib/supabase';

/**
 * Helper to upload CV to Supabase Storage
 */
const uploadCV = async (file: File, userId: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    // Sanitize filename to avoid issues with special characters
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const fileName = `${userId}/${Date.now()}_${safeFileName}`;
    
    // Upload to 'cv_attachments' bucket
    const { error: uploadError } = await supabase.storage
      .from('cv_attachments')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      // Gracefully handle missing bucket to allow registration to proceed
      if (uploadError.message.includes('Bucket not found') || (uploadError as any).statusCode === '404') {
        console.warn('CV Upload skipped: Storage bucket "cv_attachments" does not exist. Proceeding without file.');
        return null;
      }
      console.error('CV Upload Error:', uploadError);
      return null;
    }

    // Get Public URL
    const { data } = supabase.storage
      .from('cv_attachments')
      .getPublicUrl(fileName);
      
    return data.publicUrl;
  } catch (err) {
    console.warn('CV Upload Exception (Non-fatal):', err);
    return null;
  }
};

/**
 * Upserts user profile data into Supabase.
 */
export const submitRegistration = async (data: RegistrationFormData, userId?: string): Promise<boolean> => {
  if (!userId) {
    console.error("Cannot submit registration: No User ID provided.");
    return false;
  }

  try {
    console.log("Starting registration submission for:", userId);

    // STEP 1: File Upload (Compulsory logic handled in UI, but check here too)
    let cvUrl = null;
    if (data.cvFile) {
       cvUrl = await uploadCV(data.cvFile, userId);
    } else {
       console.warn("No CV file provided in submission.");
    }

    // STEP 2: Profile Update
    // FIX: Parse age to integer to prevent DB type errors (empty string vs int)
    const parsedAge = data.age ? parseInt(data.age, 10) : null;

    const profilePayload = {
        id: userId,
        full_name: data.fullName,
        // email: data.email, // REMOVED: The 'profiles' table schema does not have an 'email' column. Email is stored in auth.users.
        school: data.school,
        phone: data.phone,
        age: (parsedAge !== null && !isNaN(parsedAge)) ? parsedAge : null,
        role_preference_1: data.rolePreference1,
        role_preference_2: data.rolePreference2,
        skills: data.skills || [],
        past_experience: data.pastExperience,
        awards: data.awards,
        motivation: data.whyJoin,
        cv_url: cvUrl,
        application_status: 'under_review',
        updated_at: new Date().toISOString()
    };

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profilePayload);

    if (profileError) {
      // Stringify error object to see details in console
      console.error("Profile Update Error Details:", JSON.stringify(profileError, null, 2));
      return false;
    }

    // STEP 3: Insert Welcome Message
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        user_id: userId,
        title: 'Application Received',
        preview: `Welcome, ${data.fullName}. Your application for ${data.rolePreference1} has been successfully logged.`,
        is_unread: true,
        type: 'system',
        created_at: new Date().toISOString()
      });

    if (msgError) {
        console.warn("Message insert failed (non-critical):", JSON.stringify(msgError));
    }

    return true;
  } catch (error) {
    console.error("Critical Submission Error:", error);
    return false;
  }
};
