"use client";

import { Button, Typography } from "antd";
const { Title, Paragraph } = Typography;

export default function Hero() {
    return (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "#fafafa" }}>
            <Title level={1}>Welcome to ArticleHub</Title>
            <Paragraph style={{ fontSize: "18px", maxWidth: 600, margin: "0 auto" }}>Discover insightful articles, blogs, opinions, and the latest in technology.</Paragraph>
            <Button type="primary" size="large" style={{ marginTop: 20 }}>
                Explore Now
            </Button>
        </div>
    );
}
