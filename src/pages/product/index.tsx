import NavBar from "@/components/NavBar";
import { listProducts, Product } from "@/services/product";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { getProductsByStore } from "@/services/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { getToken, isValidJwt, logout } from "@/services/auth";

export default function ProductPage() {

  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const t = getToken();
      if (!t || !isValidJwt(t)) {
        logout();
        router.replace("/login");
        return;
      }
      setToken(t); 

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

      try {
        const list = await getProductsByStore(user.storeId);
        setProducts(list);
      } catch (err) {
        console.error("Error while searching Products", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

if (!token) return null;

    if (loading)
        return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status" />
        </Container>
        );

    if (error)
        return (
        <Container className="mt-5 mb-5">
            <Alert variant="danger">{error}</Alert>
        </Container>
        );

    return(
        <>
          <NavBar pagina='Product'/>
          <Container className="mt-4">
            {products.length > 0 ? (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {products.map((p) => (
            <Link href={`/product/update?id=${p.id}`} style={{ textDecoration: "none" }}>
            <Card border="info" bg="dark" text="white" style={{ width: "18rem", cursor: "pointer"}} key={p.id}>
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
          </Container>
        
      </>
    )
}