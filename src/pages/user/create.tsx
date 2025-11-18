"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import api from "@/services/api"; // ajuste se necessário
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [storeId, setStoreId] = useState<number | null>(null);

  const [stores, setStores] = useState<any[]>([]);

  const [loadingStores, setLoadingStores] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStores() {
      try {
        const res = await api.get("/store"); 
        setStores(res.data.data || res.data); 
      } catch (err) {
        console.error(err);
        setError("Error loading stores.");
      } finally {
        setLoadingStores(false);
      }
    }

    loadStores();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!storeId) {
      setError("Select a valid store.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await api.post(`/user/store/${storeId}`, {
        name,
        password,
      });

      alert("User created successfully!");
      router.push("/login"); 
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating user.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingStores)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <>
      <Container className="mt-4" style={{ maxWidth: "600px" }}>
        <Button href="/login" >Back</Button>
      <Card bg="dark" text="white" className="p-4">
          <Card.Title>Create User</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter the username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Enter the password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Select Store</Form.Label>
              <Form.Select
              value={storeId ?? ""}
              onChange={(e) => setStoreId(Number(e.target.value))}
              required
              >
              <option value="">Select a store...</option>

              {stores.map((s: any) => (
                  <option key={s.id} value={s.id}>
                  {s.name} — {s.location}
                  </option>
              ))}
              </Form.Select>
          </Form.Group>

          <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create User"}
          </Button>
          </Form>
      </Card>
      </Container>
    </>
  );
}
