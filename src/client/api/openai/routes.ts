import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionContentPart } from "openai/resources/index.mjs";

//api handler function
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const images: string[] = req.body.images;
        if (!images || images.length === 0) {
            return res.status(400).json({ error: "No images provided" });
        }
        //initalizes openAI client
        const openai = new OpenAI();

        //convert image to base64 strings for backend
        const imageMessages: ChatCompletionContentPart[] = images.map(
            (base64Image) => ({
                type: "image_url",
                image_url: {
                    url: base64Image,
                },
            })
        );

        //CREATE A CHAT COMPLETION request

        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            stream: false,
            messages: [
                //user promt
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Explain the meme to me",
                        },
                        //Image conents parts
                        ...imageMessages,
                    ],
                },
            ],
            max_tokens: 300,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}