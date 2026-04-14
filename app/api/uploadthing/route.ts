import { createUploadthing, type FileRouter } from "uploadthing/server";

import { createRouteHandler } from "uploadthing/next";
import { User } from "@/lib/models/schema";
import dbConnect from "@/lib/db";

const f = createUploadthing();

export const uploadRouter = {
  profileImg: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async ({ req }) => {
      return { userId: User._id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        try {
        await dbConnect();
       
      await User.findByIdAndUpdate(metadata.userId, {
        profileImg: file.ufsUrl,
      });

      return { uploadedBy: metadata.userId };
        }
    catch(error){
        console.error("ERROR IN ONUPLOADCOMPLETE:", error);
        throw new Error("Failed to update database");
    }
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});