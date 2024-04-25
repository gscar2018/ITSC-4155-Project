import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// Defing the structure of the message 

type Message = {
    role: "assistant" | "system" | "user";
    content: MessageContent[];
};

type MessageContent = TextContent | ImageContent;

type TextContent = {
    type: "text";
    text: string;
};

type ImageContent = {
    type: "image_url";
    image_url: {
        url: string;
    };
};

// Defining the component
function OpenAiHandler() {
    const [images, setImages] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSending, setIsSending] = useState(false);

    const sendMessage = async () => {
        setIsSending(true);

        // create an array for the openai api
        const openaiMessages: MessageContent[] = [
            {
                type: "text",
                text: message,
            },
            ...images.map((url) => ({
                type: "image_url" as const,
                image_url: { url },
            })),
        ];

        // send the message to the server
        const newUserMessage: (TextContent | ImageContent)[];

        //convert image to base64 strings for backend 
        const imagePromises = images.map((url) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(url);
            });
        });

    const imageBase64Strings = await Promise.all(imagePromises);

    const payload = {
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text", text: message,
                        ...imageBase64Strings.map((base64) => ({
                            type: "image_url" as const,
                            image_url: { url: base64},
                        })),
                    },
                ],
            },
        ],
    };
    
    try {
        const response = await axios.post("/api/openai", payload);
        if (!response.data.success) {
            toast.error(response.data.error);
        }

        const newMessage = { ...response.data.message};
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
        toast.error("An error occurred");
    } finally {
        setMessage("");
        setImages([]);
        setIsSending(false);
    }

};