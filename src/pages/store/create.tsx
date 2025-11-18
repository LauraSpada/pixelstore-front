"use client";

import NavBar from "@/components/NavBar";
import { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { createStore } from "@/services/store";
import { useRouter } from "next/navigation";

export default function CreateStorePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !location) {
      setError("Name and Location are required.");
      return;
    }

    try {
      setLoading(true);

      await createStore({ name, location });

      setSuccess("Store successfully created!");

      setTimeout(() => {
        router.push("/login"); 
      }, 1500);

    } catch (err: any) {
      console.error(err);
      setError("Error while creating store.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container className="mt-4" style={{ maxWidth: "500px" }}>
        <Button href="/login" >Back</Button>
        <h3 className="mb-3">Create a new Store</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex.: PixelRost"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex.: Passo Fundo | RS"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Create Store"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
