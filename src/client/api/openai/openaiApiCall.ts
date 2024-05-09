// apiCalls.ts
export async function sendImageToOpenAI(image: string) {
	try {
		console.log("Sending image to OpenAI in apiCall function");
		const response = await fetch("/api/openai", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ image }),
		});

		if (!response.ok) {
			throw new Error("Failed to send image to OpenAI");
		}
		console.log("apiCall success");
		const data = await response.json();
		console.log("data parsed as JSON");
		return data;
	} catch (error) {
		console.error("Error sending image to OpenAI:", error);
		throw error;
	}
}
