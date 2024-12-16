
import {  PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "..";
import { authMiddleware } from "../middlewares/auth-middleware";

 const router = Router();
 const primaClient = new PrismaClient();
 const s3Client = new S3Client();
 
 router.get("/presignedUrl", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        
        // Generate a unique filename
        const filename = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
        
        const command = new PutObjectCommand({
            Bucket: "decenralized-saas-images",
            Key: filename,
            // Optional: Add ACL or metadata
            ACL: 'private', // or 'public-read' depending on your use case
            Metadata: {
                userId: userId
            }
        });
        
        const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600, // 1 hour expiration
        });
        
        res.status(200).json({
            presignedUrl,
            filename // Return filename so client can reference the uploaded file
        });
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).json({
            message: "Failed to generate presigned URL",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

 router.post("/signin", async(req,res)=> {
    //Todo: Add sigin verifcation logic here
    //Signin With wallet
//Sigining  a message
    const hardcodewalletAddress = "5pPGmKND86fpkoSVvbexX8MEnBvKsbUXD2VhFEg8aREF";

    const existingUser = await primaClient.user.findFirst({
        where:{
            address: hardcodewalletAddress
        }
   })

   if(existingUser){

    const token = jwt.sign({
        userId: existingUser.id,
    }, JWT_SECRET);

    res.json({
        token
    })

    }else {
        const user = await primaClient.user.create({
            data:{
                address: hardcodewalletAddress
            }
        })
        const token = jwt.sign({
            userId: user.id,
        }, JWT_SECRET);

        res.json({
            token
        })
    }


})

export default router;