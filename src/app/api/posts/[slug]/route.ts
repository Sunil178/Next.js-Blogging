import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/db-connect";
import Post from "@/models/Post";

interface DeletePost {
    params: Promise<{
        slug: string;
    }>;
}

export async function DELETE(request: NextRequest, props: DeletePost) {
    const params = await props.params;
    try {
        const { slug } = params;
        if (!slug) {
            return NextResponse.json({ data: null, message: 'Slug is required' }, { status: 400 });
        }
    
        await dbConnect();
        await Post.deleteOne({ slug })

        return NextResponse.json({ data: null, message: 'Success' });
    } catch (error) {
        return NextResponse.json({ data: null, message: 'Something went wrong' }, { status: 500 });
    }
}
