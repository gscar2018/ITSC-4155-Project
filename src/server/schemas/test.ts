// this file is purely to test the functionality of the schemas
import mongoose from 'mongoose';
import PostModel from './images.ts';

export async function testSchema() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://khoder23:ITSC-4155@cluster0.tcdyzkj.mongodb.net/ImgTag');

        // Create a new post
        const newPost = new PostModel({
            title: 'Test Post',
            content: 'This is a test post content',
            images: [
                { url: 'https://example.com/image1.jpg', caption: 'Image 1' },
                { url: 'https://example.com/image2.jpg', caption: 'Image 2' }
            ],
            tags: ['tag1', 'tag2', 'tag3']
        });

        // Save the new post to the database
        await newPost.save();

        // Find the saved post
        const savedPost = await PostModel.findOne({ title: 'Test Post' });

        // Log the saved post
        console.log('Saved Post:', savedPost);

        // Disconnect from MongoDB
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}
