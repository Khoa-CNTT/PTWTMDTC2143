import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as cloudinary from 'cloudinary';
import { extractPublicIdFromUrl } from 'src/utils/cloudinary.utils';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder, resource_type: 'image' }, (error, result) => {
          if (error) reject(new Error('Image upload failed: ' + error.message));
          else resolve(result.secure_url);
        })
        .end(file.buffer);
    });
  }

  async deleteImageByUrl(imageUrl: string): Promise<void> {
    const publicId = extractPublicIdFromUrl(imageUrl);
    await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  }
}
