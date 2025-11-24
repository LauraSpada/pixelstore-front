import NavBar from "@/components/NavBar";
import { getToken, isValidJwt, logout } from "@/services/auth";
import { listStores, Store, getStore} from "@/services/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner, Table } from "react-bootstrap";

export default function StorePage() {

  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
    async function load() {

      const t = getToken();

      if (!t || !isValidJwt(t)) {
        logout();
        router.replace("/login");
        return;
      }

      setToken(t); 

      try {
        const stored = localStorage.getItem("auth_user");

        if (!stored) {
          setError("No user");
          return;
        }

        const user = JSON.parse(stored);

        if (!user.storeId) {
          setError("Logged user don't have storeId");
          return;
        }

        const data = await getStore(user.storeId);
        setStore(data);
      } catch (err) {
        console.error(err);
        setError("Erro while searching Store.");
      } finally {
        setLoading(false);
      }
    }
    load();
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
        <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return(
        <>
          <NavBar pagina="Store" />

          <Link href={`/store/update?id=${store?.id}`} style={{ textDecoration: "none" }}>
          <Card style={{ maxWidth: "700px", margin: "20px auto", padding: "6px"}} className="center-card" bg="dark" text="white" border="success">
          <Card.Img variant="top"  src={`https://picsum.photos/350/200`}  style={{ objectFit: "cover"}}/>
          <Card.Body>
            <Card.Title><strong>{store?.name}</strong></Card.Title>
            <Card.Text><strong>{store?.location}</strong></Card.Text>
          </Card.Body>
          </Card>
          </Link>
        </>
    )
}