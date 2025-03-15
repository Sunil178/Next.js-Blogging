'use client'
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import { Button, Flex } from 'antd';
import Link from 'next/link';
import { _ } from 'gridjs-react';
import { useState } from 'react';
import { Image } from '@/libs/helpers'

export default function Posts() {
    const [ version, setVersion ] = useState(0);
    const deletePost = async (slug) => {
        const res = await fetch(`/api/posts/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            setVersion(version + 1);
        }
    }

    const columns = [
        { id: 'sr_no', name: 'Sr. No.' },
        { id: 'title', name: 'Title' },
        { id: 'bannerImage', name: 'Banner', formatter: (cell) => (cell && _(<Image src={cell} alt="Banner Image" />)) },
        { id: 'upvoteCount', name: 'Upvote' },
        { id: 'downvoteCount', name: 'Downvote' },
        { id: 'commentCount', name: 'Comments' },
        { id: 'visitorCount', name: 'Visitors' },
        { id: 'createdAt', name: 'Created On' },
        { id: 'published', name: 'Published' },
        { id: 'approval', name: 'Approved' },
        { id: 'action', name: 'Action' },
    ]

    const server = {
        url: '/api/posts',
        then: data => data.data.map((post, index) => ({
                ...post,
                'sr_no': index + 1,
                action: _(
                <Flex gap="small" wrap>
                    <Button type="primary"><Link href={`/posts/${post.slug}`}>View</Link></Button>
                    <Button type="primary"><Link href={`/posts/edit/${post.slug}`}>Edit</Link></Button>
                    <Button type="primary" danger onClick={() => deletePost(post.slug)}>Delete</Button>
                </Flex>
                )
            })),
        total: data => data.count
    }

    return <Grid
        version={version}
        server={server}
        columns={columns}
        search={true}
        sort={true}
        fixedHeader={true}
        pagination={{
            limit: 4,
            server: {
                url: (prev, page, limit) => `${prev}?limit=${limit}&offset=${page * limit}`
            }
        }}
    />
}
