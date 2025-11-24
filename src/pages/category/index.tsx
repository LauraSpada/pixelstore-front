import NavBar from "@/components/NavBar";
import { getToken, isValidJwt, logout } from "@/services/auth";
import { listCategories, Category } from "@/services/category";
import { getCategoriesByStore } from "@/services/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";

export default function CategoryPage() {
    
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
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
        console.error("No user");
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
        const list = await getCategoriesByStore(user.storeId);
        setCategories(list);
      } catch (err) {
        console.error("Error while searching categories", err);
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
          <NavBar pagina='Category'/>
          <Container className="mt-4">
            <div className="d-flex justify-content-end">
            <Button href="/category/create" variant="outline-warning" size="lg"><BiAddToQueue /></Button>
            </div>
           {categories.length > 0 ? (
             <div className="d-flex flex-wrap gap-3 mt-3">
               {categories.map((c) => (
               <Link href={`/category/details?id=${c.id}`} style={{ textDecoration: "none" }}>
               <Card border="warning" bg="dark" text="white" style={{ width: "18rem" }} key={c.id}>
                  <Card.Header>{c.id}</Card.Header>
                <Card.Body>
                <Card.Title>{c.name}</Card.Title>
                <Card.Text>
                    {c.description}
                </Card.Text>
                </Card.Body>
               </Card>
               </Link>
               ))}
             </div>
           ) : (
             <p className="text-center mt-3">No Categories were found</p>
           )}
        </Container>
      </>
    )
}