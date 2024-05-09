import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import type { Post } from "../../types";
import sendMessage from "../api/openai/openAIhandler";
import { sendImageToOpenAI } from "../api/openai/openaiApiCall";

const OpenAiBtn = ({ post }: { post: Post }) => {
	const [isLocked, setIsLocked] = useState(false);
	const handleClick = async () => {
		try {
			setIsLocked(true);
			console.log("starting btn click");
			const response = await sendImageToOpenAI(post.image.data as string);
			console.log(response);
			// Handle the response as needed
			setIsLocked(false);
		} catch (error) {
			console.error("Error sending image to OpenAI:", error);
		} finally {
			setIsLocked(false);
		}
	};

	return (
		<div className="grid min-h-[200px] place-content-center  p-4">
			<EncryptButton post={post} loading={isLocked} handleClick={handleClick} />
			<div className="text-center text-neutral-400 text-sm mt-2">
				powered by{" "}
				<a
					href="https://openai.com"
					target="_blank"
					rel="noreferrer"
					className="text-indigo-400 hover:underline"
				>
					OPENAI
				</a>
			</div>
		</div>
	);
};

const TARGET_TEXT = "Explain This Meme";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

//passing down post prop to EncryptButton to use in OpenAiBtn
const EncryptButton = ({
	post,
	loading,
	handleClick,
}: { post: Post; loading: boolean; handleClick: () => void }) => {
	const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);

	const [text, setText] = useState(TARGET_TEXT);

	const scramble = () => {
		let pos = 0;

		intervalRef.current = setInterval(() => {
			const scrambled = TARGET_TEXT.split("")
				.map((char, index) => {
					if (pos / CYCLES_PER_LETTER > index) {
						return char;
					}

					const randomCharIndex = Math.floor(Math.random() * CHARS.length);
					const randomChar = CHARS[randomCharIndex];

					return randomChar;
				})
				.join("");

			setText(scrambled);
			pos++;

			if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
				stopScramble();
			}
		}, SHUFFLE_TIME);
	};

	const stopScramble = () => {
		clearInterval(intervalRef.current || undefined);

		setText(TARGET_TEXT);
	};

	return (
		<motion.button
			onClick={handleClick}
			whileHover={{
				scale: 1.025,
			}}
			whileTap={{
				scale: 0.975,
			}}
			disabled={loading}
			onMouseEnter={scramble}
			onMouseLeave={stopScramble}
			className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300"
		>
			<div className="relative z-10 flex items-center gap-2">
				<FiLock />
				<span>{loading ? "loading..." : text}</span>
			</div>
			{!loading && (
				<motion.span
					initial={{
						y: "100%",
					}}
					animate={{
						y: "-100%",
					}}
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "mirror",
						duration: 1,
						ease: "linear",
					}}
					className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
				/>
			)}
		</motion.button>
	);
};

export default OpenAiBtn;
