interface Image {
  url: string;
  caption?: string;
}

// Define an interface for the post document
export interface Post extends Document {
  _id: string;
  title: string;
  content: string;
  image: Image;
  tags: string[];
  createdAt: Date;
}
