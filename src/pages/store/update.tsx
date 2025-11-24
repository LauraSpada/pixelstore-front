import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getStore, updateStore, deleteStore } from "@/services/store";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineDeleteForever, MdOutlineSaveAs } from "react-icons/md";

export default function UpdateStorePage() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadStore() {
      try {
        const store = await getStore(Number(id));
        setName(store.name);
        setLocation(store.location);
      } catch (err) {
        console.error(err);
        setError("Error loading Store");
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [id]);

  async function handleUpdate(e: any) {
    e.preventDefault();

    try {
      await updateStore(Number(id), name, location);

      alert("Store updated successfully!");
      router.push("/store"); 
    } catch (err) {
      console.error(err);
      setError("Error updating Store");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this Store?")) return;

    try {
      await deleteStore(Number(id));

      alert("Store deleted!");
      router.push("/store");
    } catch (err) {
      console.error(err);
      setError("Error deleting Store. It is not possible to delete this Store when there are Users, categories and Products registered in it!");
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
            <Card.Title>Update Store</Card.Title>
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
            <Form.Label>Location</Form.Label>
            <Form.Control
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
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