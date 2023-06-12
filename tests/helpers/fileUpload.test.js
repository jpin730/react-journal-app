import { v2 as cloudinary } from "cloudinary";

import { fileUpload } from "../../src/helpers/fileUpload";

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

    expect(typeof url).toBe("string");
    expect(url.startsWith("https://")).toBe(true);

    const { resources } = await cloudinary.api.resources({
      prefix: testUid,
      type: "upload",
    });
    const public_ids = resources.map(({ public_id }) => public_id);
    if (!public_ids.length) return;
    await cloudinary.api.delete_resources(public_ids);
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
