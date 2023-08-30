import { VITE_CLOUDINARY_UPLOAD_PRESET, VITE_CLOUDINARY_URL } from "./env";

export const fileUpload = async (file, uid, id) => {
  if (!file) throw new Error("File is missing");

  const formData = new FormData();
  formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("file", file);
  formData.append("public_id_prefix", `react-journal-app/${uid}/${id}`);

  try {
    const response = await fetch(VITE_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to upload image");

    const { secure_url } = await response.json();

    return secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
