"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";

import { getProduct, updateProduct, deleteProduct, Product } from "@/services/product";
import { getCategoriesByStore } from "@/services/store";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineDeleteForever, MdOutlineSaveAs } from "react-icons/md";

export default function ProductUpdatePage() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");

  const [categoryId, setCategoryId] = useState<number | "">(""); 
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (!stored) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    const user = JSON.parse(stored);

    if (!user.storeId) {
      setError("User has no storeId.");
      setLoading(false);
      return;
    }

    async function loadCategories() {
      try {
        const list = await getCategoriesByStore(user.storeId);
        setCategories(list);
      } catch {
        setError("Error loading categories.");
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        const product = await getProduct(Number(id));

        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);

        setCategoryId(product.id ?? "");
      } catch (err) {
        console.error(err);
        setError("Error loading product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleUpdate(e: any) {
    e.preventDefault();

    try {
      await updateProduct(
        Number(id),
        name,
        Number(price),
        Number(stock),
      );

      alert("Product updated successfully!");
      router.push("/product");
    } catch (err) {
      console.error(err);
      setError("Error updating product");
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
    <Container className="center" style={{ maxWidth: "600px" }}>
      <Card className="form">
        <div className="form-two">
          <Card.Title>Update Product</Card.Title>
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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value === "" ? "" : Number(e.target.value))
              }
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
  );
}
