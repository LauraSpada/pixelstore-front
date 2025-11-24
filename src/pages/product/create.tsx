"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import api from "@/services/api";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

export default function CreateProductPage() {
  const params = useSearchParams();
  const router = useRouter();

  const categoryId = Number(params.get("categoryId"));

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [stock, setStock] = useState<number | string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!categoryId) {
      setError("Invalid category.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("auth_token");

      await api.post(
        `/product/category/${categoryId}`,
        {
          name,
          price: Number(price),
          stock: Number(stock),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product created!");
      router.push(`/category/details?id=${categoryId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Container className="center" style={{ maxWidth: "600px" }}>
        <Card className="form">
          <div className="form-two">
            <Card.Title>Create Product</Card.Title>
            <Button variant="outline-primary" size="lg" onClick={() => router.back()}><TbArrowBackUp /></Button>
          </div>
          <p>Category ID: <strong>{categoryId}</strong></p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter stock amount"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                />
            </Form.Group>

            <div className="button-create">
              <Button type="submit" variant="outline-success" disabled={submitting} size="lg"><MdOutlineSave /></Button>
            </div>
            </Form>
        </Card>
      </Container>
    </>
  );
}
