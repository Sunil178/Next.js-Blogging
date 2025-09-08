"use client";

import { Row, Col, Card } from "antd";
import { BulbOutlined, BookOutlined, GlobalOutlined } from "@ant-design/icons";

export default function Features() {
    const features = [
        { icon: <BulbOutlined />, title: "Innovative Ideas", desc: "Get the latest opinions & creative insights." },
        { icon: <BookOutlined />, title: "In-Depth Articles", desc: "Well-researched blogs and technology deep dives." },
        { icon: <GlobalOutlined />, title: "Global Reach", desc: "Content that connects with audiences worldwide." },
    ];

    return (
        <div style={{ padding: "60px 20px" }}>
            <Row gutter={[16, 16]} justify="center">
                {features.map((f, i) => (
                    <Col xs={24} sm={12} md={8} key={i}>
                        <Card hoverable style={{ textAlign: "center", minHeight: 180 }}>
                            <div style={{ fontSize: "32px", marginBottom: "10px" }}>{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
