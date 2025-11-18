"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductsByCategory } from "@/services/category";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function CategoryDetailsPage() {
  const params = useSearchParams();
  const categoryId = Number(params.get("id"));

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setError("Invalid category.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const list = await getProductsByCategory(categoryId);
        setProducts(list);
      } catch (err) {
        console.error(err);
        setError("Error loading products from category.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [categoryId]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <>
      <NavBar pagina="Category Details" />

      <Container className="mt-4">
        <Button href="/category">Back</Button>
        <Link href={`/product/create?categoryId=${categoryId}`}>
        <Button variant="success">Add Product</Button>
        </Link>
        <Button href="/category/update" >Update</Button>

        <h3>Products in {categoryId} </h3>

        {products.length > 0 ? (
          <div className="d-flex flex-wrap gap-3 mt-3">
            {products.map((p) => (
              <Link href={`/product/update?id=${p.id}`} style={{ textDecoration: "none" }}>
              <Card
                key={p.id}
                bg="dark"
                text="white"
                border="success"
                style={{ width: "18rem" }}
              >
                <Card.Header>{p.id}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>Price: {p.price}</Card.Text>
                  <Card.Text>Stock: {p.stock}</Card.Text>
                </Card.Body>
              </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center mt-3">No products found for this category.</p>
        )}
      </Container>
    </>
  );
}
