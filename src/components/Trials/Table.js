"use client"
import { Table as AntTable } from "antd";

export default function Table({ dataSource }) {
    const columns = [
        { key: 'title', dataIndex: 'title', title: 'Title', sorter: (a, b) => a.title.localeCompare(b.title) },
        { key: 'bannerImage', dataIndex: 'bannerImage', title: 'Banner' },
        { key: 'upvoteCount', dataIndex: 'upvoteCount', title: 'Upvote' },
        { key: 'downvoteCount', dataIndex: 'downvoteCount', title: 'Downvote' },
        { key: 'commentCount', dataIndex: 'commentCount', title: 'Comments' },
        { key: 'visitorCount', dataIndex: 'visitorCount', title: 'Visitors' },
        { key: 'createdAt', dataIndex: 'createdAt', title: 'Created On' },
        { key: 'published', dataIndex: 'published', title: 'Published' },
        { key: 'approval', dataIndex: 'approval', title: 'Approved' },
        { key: 'action', dataIndex: 'action', title: 'Action' },
    ]
    return <AntTable
        dataSource={dataSource}
        columns={columns}
        search={true}
        sort={true}
        fixedHeader={true}
        pagination={{
            limit: 10,
        }}
    />
}
