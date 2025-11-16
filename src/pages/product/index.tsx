import NavBar from "@/components/NavBar";
{/*import { Card } from "react-bootstrap";*/}
import { listProducts, Product } from "@/services/product";
import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner, Table } from "react-bootstrap";

import { getProductsByStore } from "@/services/store";
import Link from "next/link";

export default function ProductPage() {

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("auth_user");
        if (!stored) {
          console.error("No user.");
          setLoading(false);
          return;
        }
    
        const user = JSON.parse(stored);
    
        if (!user.storeId) {
          console.error("Logged user don't have storeId");
          setLoading(false);
          return;
        }
    
        async function load() {
          try {
            const list = await getProductsByStore(user.storeId);
            setProducts(list);
          } catch (err) {
            console.error("Error while searching Products", err);
          } finally {
            setLoading(false);
          }
        }
    
        load();
      }, []);
    

    if (loading)
        return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status" />
        </Container>
        );

    if (error)
        return (
        <Container className="mt-5">
            <Alert variant="danger">{error}</Alert>
        </Container>
        );

    return(
        <>
            <NavBar pagina='Product'/>

        {products.length > 0 ? (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {products.map((p) => (
            <Link href={`/produto/${p.id}`} style={{ textDecoration: "none" }}>
            <Card border="success" bg="dark" text="white" style={{ width: "18rem" }} key={p.id}>
                    <Card.Header>{p.id}</Card.Header>
                <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                <Card.Text>
                    Price: {p.price}
                </Card.Text>
                <Card.Text>
                    Stock: {p.stock}
                </Card.Text>
                </Card.Body>
            </Card>
            </Link>
            ))}
        </div>
        ) : (
        <p className="text-center mt-3">No Products were found</p>
        )}

        </>
    )
}