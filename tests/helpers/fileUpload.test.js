import { v2 as cloudinary } from "cloudinary";

import { fileUpload } from "../../src/helpers/fileUpload";

jest.mock("../../src/helpers/env", () => {
  const { VITE_CLOUDINARY_UPLOAD_PRESET, VITE_CLOUDINARY_URL } = process.env;
  return {
    VITE_CLOUDINARY_URL,
    VITE_CLOUDINARY_UPLOAD_PRESET,
  };
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

describe("fileUpload", () => {
  test("should upload file successfully", async () => {
    const imageUrl = "https://placehold.co/400";
    const imageBlob = await (await fetch(imageUrl)).blob();
    const imageFile = new File([imageBlob], "test-image.svg");

    const testUid = "test-uid";
    const testId = "test-id";
    const url = await fileUpload(imageFile, testUid, testId);

    const imageName = url.split("/").pop();
    const imageId =
      imageName.substr(0, imageName.lastIndexOf(".")) || imageName;

    expect(typeof url).toBe("string");
    expect(url.startsWith("https://")).toBe(true);

    await cloudinary.api.delete_resources([`${testUid}/${testId}/${imageId}`]);
    await cloudinary.api.delete_folder(testUid);
  });

  test("should throw an error on missing file", async () => {
    try {
      await fileUpload();
    } catch (error) {
      expect(error.message).toBe("File is missing");
    }
  });
});
