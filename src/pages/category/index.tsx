import NavBar from "@/components/NavBar";
import { listCategories, Category } from "@/services/category";
import { getCategoriesByStore } from "@/services/store";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

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
            <p>page list categories</p>

            <Container className="mt-4">
            <h2>List of Categories</h2>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 ? (
                    categories.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={4} className="text-center">
                        No Categories were found
                    </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </Container>

        </>
    )
}