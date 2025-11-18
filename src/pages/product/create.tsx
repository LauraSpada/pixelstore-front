"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import api from "@/services/api";
import Link from "next/link";

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
        <Container className="mt-4" style={{ maxWidth: "600px" }}>
        <Link href={`/category/details?id=${categoryId}`}>
        <Button variant="primary">Back</Button>
        </Link>
        <Card bg="dark" text="white" className="p-4">
            <Card.Title>Create Product</Card.Title>

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

            <Button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Product"}
            </Button>
            </Form>
        </Card>
        </Container>
    </>
  );
}
