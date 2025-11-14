import NavBar from "@/components/NavBar";
import { listCategories, Category } from "@/services/category";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

export default function CategoryPage() {
    
    const [categories, setcategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
        try {
            const data = await listCategories();
            setcategories(data);
        } catch (err) {
            setError("Error searching Categories.");
        } finally {
            setLoading(false);
        }
        }

        fetchData();
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
                    categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
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