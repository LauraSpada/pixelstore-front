import NavBar from "@/components/NavBar";
import { listProducts } from "@/services/product";
import { listStores, Store } from "@/services/store";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

export default function StorePage() {

    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
    async function fetchData() {
        try {
        const data = await listStores();
        setStores(data);
        } catch (err) {
        setError("Erro searching Stores.");
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
            <NavBar pagina='Store'/>
            <p>page list stores</p>

            <Container className="mt-4">
            <h2>List of Stores</h2>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {stores.length > 0 ? (
                    stores.map((store) => (
                    <tr key={store.id}>
                        <td>{store.id}</td>
                        <td>{store.name}</td>
                        <td>{store.location}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={4} className="text-center">
                        No stores were found
                    </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </Container>

        </>
    )
}