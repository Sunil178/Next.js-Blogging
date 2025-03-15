import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/db-connect";
import Post from "@/models/Post";

export async function GET(request: NextRequest) {
    const limit: number = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const offset: number = parseInt(request.nextUrl.searchParams.get('offset') || '0');

    await dbConnect();
    const posts = await Post.find({}, [
        '-_id',
        'slug',
        'title',
        'bannerImage',
        'upvoteCount',
        'downvoteCount',
        'commentCount',
        'visitorCount',
        'published',
        'approval',
        'visibility',
        'createdAt'
    ], { limit, skip: offset, sort: { 'createdAt' : -1 } }).lean();

    const totalPosts = await Post.countDocuments();

    return NextResponse.json({ data: posts, count: totalPosts, message: "Success" });
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.formData();
        if (!body.has('post_data')) {
            return NextResponse.json({ data: null, message: 'Post page data is required' }, { status: 400 });
        }
        await dbConnect();
        await Post.create({
            'slug': body.get('slug'),
            'title': body.get('title'),
            'titleDescription': body.get('titleDescription'),
            'tags': (body.get('tags') as string)?.split(','),
            'bannerImage': body.get('postBannerPath'),
            'content': body.get('post_data'),
        })
        return NextResponse.redirect(new URL('/posts', request.url))
    } catch (error) {
        return NextResponse.json({ data: error, message: 'Something went wrong' }, { status: 500 });
    }
}
