"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { createCategory } from "@/services/category"; // agora usando o service correto
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

export default function CreateCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [storeId, setStoreId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");

    if (!stored) {
      setError("No logged user found");
      setLoading(false);
      return;
    }
    const user = JSON.parse(stored);

    if (!user.storeId) {
      setError("User is not linked to any store");
      setLoading(false);
      return;
    }

    setStoreId(user.storeId);
    setLoading(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!storeId) {
      setError("User store not found");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createCategory(name, description, storeId);

      alert("Category created successfully!");
      router.push("/category");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating category");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <>
      <Container className="center" style={{ maxWidth: "600px" }}>
        <Card className="form">
        <div className="form-two">
          <Card.Title>Create Category</Card.Title>
          <Button variant="outline-primary" size="lg" onClick={() => router.back()}><TbArrowBackUp /></Button>
        </div>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
