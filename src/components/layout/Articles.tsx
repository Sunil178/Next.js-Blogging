"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Typography } from "antd";
const { Title } = Typography;

interface Article {
    slug: string;
    title: string;
    titleDescription: string;
}

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((response) => setArticles(response.data));
    }, []);

    return (
        <div style={{ padding: "60px 20px" }}>
            <Title level={2} style={{ textAlign: "center" }}>
                Latest Articles
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                {articles.map((a) => (
                    <Col xs={24} sm={12} md={8} key={a.slug}>
                        <Card hoverable title={a.title} variant="outlined">
                            <p>{a.titleDescription}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
