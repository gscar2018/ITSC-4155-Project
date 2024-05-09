import { OpenAI } from "openai";
import type { ChatCompletionContentPart } from "openai/resources/index.mjs";
import type { Request, Response } from "express";
import "dotenv/config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//api handler function
export default async function handler(req: Request, res: Response) {
	try {
		//if req doesn't exist
		if (!req.body) {
			return res.status(400).json({ error: "No request body provided" });
		}
		const image: string = req.body.image;

		//checks for images
		if (!image || image.length === 0) {
			return res.status(400).json({ error: "No images provided" });
		}
		//initalizes openAI client
		const openai = new OpenAI({
			apiKey: OPENAI_API_KEY,
		});
		//CREATE A CHAT COMPLETION request
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
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
						{
							type: "image_url",
							image_url: {
								url: image,
								detail: "low",
							},
						},
					],
				},
			],
			max_tokens: 4096,
		});
		//return the response with headers
		console.log(response);
		return res.status(200).json(response.choices[0].message);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
