"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Row, Col, Typography } from "antd";
import { fetchRequest } from "@/libs/helpers";
const { Title } = Typography;

interface Article {
    slug: string;
    title: string;
    titleDescription: string;
}

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetchRequest("/api/posts")
            .then((res) => res?.json())
            .then((response) => setArticles(response.data || []));
    }, []);

    return (
        <div style={{ padding: "60px 20px" }}>
            <Title level={2} style={{ textAlign: "center" }}>
                Latest Articles
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                {articles.map((a) => (
                    <Col xs={24} sm={12} md={8} key={a.slug}>
                        <Link href={`/posts/${a.slug}`} passHref>
                            <Card hoverable title={a.title} variant="outlined">
                                <p>{a.titleDescription}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
