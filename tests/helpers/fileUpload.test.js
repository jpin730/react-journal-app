import { fileUpload } from "../../src/helpers/fileUpload";

jest.mock("../../src/helpers/env", () => {
  const { VITE_CLOUDINARY_UPLOAD_PRESET, VITE_CLOUDINARY_URL } = process.env;
  return {
    VITE_CLOUDINARY_URL,
    VITE_CLOUDINARY_UPLOAD_PRESET,
  };
});

describe("fileUpload", () => {
  test("should upload file successfully", async () => {
    const imageUrl = "https://placehold.co/400";
    const imageBlob = await (await fetch(imageUrl)).blob();
    const imageFile = new File([imageBlob], "test-image.svg");

    const url = await fileUpload(imageFile, "test-uid", "test-id");

    expect(typeof url).toBe("string");
    expect(url.startsWith("https://")).toBe(true);
  });
});
