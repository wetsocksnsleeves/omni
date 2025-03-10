"use server";
import fs from "fs/promises";
import path from "path";

interface File {
    name: string;
    path: string;
    thumbnail?: string;
}

export async function DeleteFiles(files: File[]) {
    for (const file of files) {
        const fullPath = path.join(process.cwd(), "public/", file.path);
        // Remove the file
        await fs.unlink(fullPath);
        if (file.thumbnail) {
            const thumbnailPath = path.join(
                process.cwd(),
                "public",
                path.dirname(file.path),
                "thumbnails",
                path
                    .basename(file.path)
                    .substring(0, path.basename(file.path).lastIndexOf(".")),
            );

            // Remove the jpg thumbnail
            await fs.unlink(thumbnailPath + ".jpg");
            // Remove the gif thumbnail
            await fs.unlink(thumbnailPath + ".gif");
        }
    }
}
