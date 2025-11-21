"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductsByCategory, getCategory } from "@/services/category";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function CategoryDetailsPage() {
  const params = useSearchParams();
  const categoryId = Number(params.get("id"));

  const [category, setCategory] = useState<any>(null);
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
        const catInfo = await getCategory(categoryId);
        setCategory(catInfo);

        const list = await getProductsByCategory(categoryId);
        setProducts(list);
      } catch (err) {
        console.error(err);
        setError("Error loading category details.");
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
      <NavBar pagina="Category" />

      <Container className="mt-4">
        <Button href="/category" className="me-2">
          Back
        </Button>

        <Link href={`/product/create?categoryId=${categoryId}`}>
          <Button variant="success" className="me-2">
            Add Product
          </Button>
        </Link>

        <Link href={`/category/update?id=${categoryId}`}>
          <Button variant="warning">Update Category</Button>
        </Link>

        <h2 className="mt-4">{category.name}</h2>
        <p className="text-light">{category.description}</p>

        <h4 className="mt-4">Products:</h4>

        {products.length > 0 ? (
          <div className="d-flex flex-wrap gap-3 mt-3">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/product/update?id=${p.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
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
