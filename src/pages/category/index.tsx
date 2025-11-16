import NavBar from "@/components/NavBar";
import { listCategories, Category } from "@/services/category";
import { getCategoriesByStore } from "@/services/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner, Table } from "react-bootstrap";

export default function CategoryPage() {
    
    const [categories, setCategories] = useState<any[]>([]);
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
               const list = await getCategoriesByStore(user.storeId);
               setCategories(list);
             } catch (err) {
               console.error("Error while searching categories:", err);
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
            <NavBar pagina='Category'/>
           
           {categories.length > 0 ? (
             <div className="d-flex flex-wrap gap-3 mt-3">
               {categories.map((c) => (
               <Link href={`/category/${c.id}`} style={{ textDecoration: "none" }}>
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
             <p className="text-center mt-3">No Products were found</p>
           )}

        </>
    )
}