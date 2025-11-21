import { getProduct, updateProduct, deleteProduct } from "@/services/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";

export default function ProductUpdatePage() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        const product = await getProduct(Number(id));

        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar o produto.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleUpdate(e: any) {
    e.preventDefault();

    try {
      await updateProduct(Number(id), name, Number(price), Number(stock));

      alert("Product updated successfully!");
      router.push("/product");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar o produto.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this Product?")) return;

    try {
      await deleteProduct(Number(id));

      alert("Product deleted!");
      router.push("/product");
    } catch (err) {
      console.error(err);
      setError("Error deleting Product");
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
        <Button href="/product">Back</Button>
        <h3 className="mt-3">Update Product</h3>

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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              placeholder="Enter the new price"
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              placeholder="Enter the new stock"
              onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
              required
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
