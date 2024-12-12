import { CandidateData } from "@/app/form/[roleId]/page";
import supabase from "@/config/supabase";
import { ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadFileToSupabase(
  file: File | undefined,
  bucketName: string
): Promise<string> {
  try {
    if (!file) {
      window.alert("file not found")
      throw new Error("No file provided")
    };

    const extension = file.name.split(".").pop();
    const filename = `${nanoid()}.${extension}`;
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filename, file);

    if (error) throw new Error(`Upload failed: ${error.message}`);

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadFileToSupabase:", (error as Error).message);
    throw error;
  }
}

export function validateCandidate(data: CandidateData): boolean {
  if (
    data.name.trim() == "" ||
    data.email.trim() == "" ||
    data.phoneNo.trim() == "" ||
    data.photo.trim() == "" ||
    data.country.trim() == "" ||
    data.cv.trim() == "" ||
    data.gender.trim() == "" ||
    data.dob.trim() == "" ||
    data.highestDegree.trim() == "" ||
    data.yog.trim() == ""
  ) {
    return false;
  }
  return true;
}
