"use client";

import NavBar from "@/components/NavBar";
import { useState } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { createStore } from "@/services/store";
import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

export default function CreateStorePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
      <Container className="center" style={{ maxWidth: "500px" }}>
        <Card className="form">
          <div className="form-two">
            <Card.Title>Create Store</Card.Title>
            <Button variant="outline-primary" size="lg" onClick={() => router.back()}><TbArrowBackUp /></Button>
          </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex.: City | State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <div className="button-create">
            <Button variant="outline-success" type="submit" disabled={loading} size="lg"><MdOutlineSave /></Button>
          </div>
        </Form>
        </Card>
      </Container>
    </>
  );
}
