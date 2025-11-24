import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getUser, updateUser, deleteUser } from "@/services/user";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineDeleteForever, MdOutlineSaveAs } from "react-icons/md";

export default function UpdateUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadUser() {
      try {
        const user = await getUser(Number(id));
        setName(user.name);
      } catch (err) {
        console.error(err);
        setError("Error loading User");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleUpdate(e: any) {
    e.preventDefault();
    try {
      await updateUser(Number(id), name, password);

      alert("User updated successfully!");
      router.push("/user");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar usuário.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this User?")) return;

    try {
      await deleteUser(Number(id));

      alert("User deleted!");
      router.push("/user");
    } catch (err) {
      console.error(err);
      setError("Error deleting User.");
    }
  }

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <>
      <Container className="center" style={{ maxWidth: "600px" }}>
        <Card className="form">
          <div className="form-two">
            <Card.Title>Update User</Card.Title>
            <Button variant="outline-primary" size="lg" onClick={() => router.back()}><TbArrowBackUp /></Button>
          </div>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Tap the new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="form-two">
            <Button variant="outline-danger" size="lg" onClick={handleDelete}><MdOutlineDeleteForever /></Button>
            <Button type="submit" variant="outline-success" size="lg"><MdOutlineSaveAs /></Button>
          </div>
        </Form>
        </Card>
      </Container>
    </>
  );
}