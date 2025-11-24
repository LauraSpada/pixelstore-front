"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductsByCategory, getCategory } from "@/services/category";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiAddToQueue } from "react-icons/bi";
import { TbArrowBackUp } from "react-icons/tb";

export default function CategoryDetailsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const categoryId = Number(params.get("id"));

  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setError("Invalid category");
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
        setError("Error loading category details");
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
      <NavBar pagina='Category'/>
      <Container className="mt-4 mb-5">
        <div className="form-two">
        <h3>Details:</h3>
        <Button variant="outline-primary" size="lg" href="/category"><TbArrowBackUp /></Button>
        </div>

       <Link href={`/category/update?id=${categoryId}`} style={{ textDecoration: "none" }}>
               <Card border="warning" bg="dark" text="white" style={{ width: "18rem" }}>
                  <Card.Header>{category.id}</Card.Header>
                <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                    {category.description}
                </Card.Text>
                </Card.Body>
               </Card>
               </Link>

        <div className="form-two">
        <h3>Products:</h3>
         <Link href={`/product/create?categoryId=${categoryId}`}>
          <Button variant="outline-info" size="lg"><BiAddToQueue /></Button>
        </Link>
        </div>

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
                  border="info"
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
