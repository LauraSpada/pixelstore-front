import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getUser, updateUser, deleteUser } from "@/services/user";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";

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
        setError("Erro ao carregar o usuário.");
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
      <Container className="mt-4" style={{ maxWidth: "600px" }}>
        <Button href="/user" >Back</Button>
        <h3>Update User</h3>

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

          <div className="d-flex justify-content-between mt-4">
            <Button type="submit" variant="success">
              Update
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}