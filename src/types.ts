interface Image {
	url: string;
	caption?: string;
	data?: string;
}

// Define an interface for the post document
export interface Post extends Document {
	_id: string;
	user: User;
	title: string;
	content: string;
	image: Image;
	tags: string[];
	createdAt: Date;
}

export interface User extends Document {
	_id: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
}
