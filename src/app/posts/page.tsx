"use client";

import { Table, Tag, Input, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { SorterResult, FilterValue } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

interface Post {
  _id: string;
  title: string;
  categoryId?: { title: string };
  userId?: { email: string; username?: string; name?: string };
  approval: number;
  published: boolean;
  publishedAt?: string;
  visitorCount: number;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  createdAt: string;
}

const approvalMap: Record<string, string> = {
  "Pending": "orange",
  "Approved": "green",
  "Rejected": "red",
  "Inactive": "gray",
};

export default function PostsTable() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState<{ field?: string; order?: string }>({});
  const [filters, setFilters] = useState<{ approval?: string; published?: string }>({});
  const [searchText, setSearchText] = useState("");

  const fetchData = async (
    page = 1,
    pageSize = 10,
    sortField?: string,
    sortOrder?: string,
    approval?: string,
    published?: string,
    search?: string
  ) => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    if (sortField) params.append("sortField", sortField);
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (approval) params.append("approval", approval);
    if (published) params.append("published", published);
    if (search) params.append("search", search);

    const res = await fetch(`/api/posts?${params.toString()}`);
    const json = await res.json();
    setData(json.data);
    setPagination({ current: page, pageSize, total: json.total });
    setLoading(false);
  };

  useEffect(() => {
    fetchData(
      pagination.current,
      pagination.pageSize,
      sorter.field,
      sorter.order,
      filters.approval,
      filters.published,
      searchText
    );
  }, [pagination.current, pagination.pageSize, sorter, filters, searchText]);

  const columns: ColumnsType<Post> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: ["categoryId", "title"],
      key: "category",
    },
    {
      title: "Author",
      key: "author",
      render: (_, record) => record.userId?.email || record.userId?.username,
    },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      filters: Object.keys(approvalMap).map((item) => ({
        text: item,
        value: item,
      })),
      render: (val) => {
        return <Tag color={approvalMap[val]}>{val}</Tag>;
      },
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      filters: [
        { text: "Yes", value: "true" },
        { text: "No", value: "false" },
      ],
      render: (val) => (val ? "✅ Yes" : "❌ No"),
    },
    {
      title: "Published At",
      dataIndex: "publishedAt",
      key: "publishedAt",
      sorter: true,
      render: (val) => (val ? new Date(val).toLocaleDateString() : "—"),
    },
    {
      title: "Visitors",
      dataIndex: "visitorCount",
      key: "visitorCount",
      sorter: true,
    },
    {
      title: "Votes",
      key: "votes",
      render: (_, record) => (
        <span>
          👍 {record.upvoteCount} / 👎 {record.downvoteCount}
        </span>
      ),
    },
    {
      title: "Comments",
      dataIndex: "commentCount",
      key: "commentCount",
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (val) => new Date(val).toLocaleDateString(),
    },
  ];

  const handleTableChange = (
    newPagination: TablePaginationConfig,
    newFilters: Record<string, FilterValue | null>,
    newSorter: SorterResult<Post> | SorterResult<Post>[]
  ) => {
    setPagination(newPagination);
    if (!Array.isArray(newSorter)) {
      setSorter({ field: newSorter.field as string, order: newSorter.order || undefined });
    }
    setFilters({
      approval: (newFilters.approval?.[0] as string) || undefined,
      published: (newFilters.published?.[0] as string) || undefined,
    });
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Title"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        rowKey="_id"
        bordered
      />
    </div>
  );
}
