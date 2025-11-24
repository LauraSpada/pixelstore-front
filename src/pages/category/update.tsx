import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategory, updateCategory, deleteCategory } from "@/services/category";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineDeleteForever, MdOutlineSaveAs } from "react-icons/md";

export default function UpdateCategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadCategory() {
      try {
        const category = await getCategory(Number(id));
        setName(category.name);
        setDescription(category.description);
      } catch (err) {
        console.error(err);
        setError("Loading Error.");
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [id]);

  async function handleUpdate(e: any) {
    e.preventDefault();
    try {
      await updateCategory(Number(id), name, description);
      alert("Category updated!");
      router.push("/category"); 
    } catch (err) {
      console.error(err);
      setError("Update Error.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this Category?")) return;

    try {
      await deleteCategory(Number(id));

      alert("Category deleted!");
      router.push("/category");
    } catch (err) {
      console.error(err);
      setError("Error deleting Category. It is not possible to delete this Category when there are Products registered in it!");
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
            <Card.Title>Update Category</Card.Title>
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
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
