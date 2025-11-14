import NavBar from "@/components/NavBar";
{/*import { Card } from "react-bootstrap";*/}
import { listProducts, Product } from "@/services/product";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

export default function ProductPage() {

    const [products, setproducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
        try {
            const data = await listProducts();
            setproducts(data);
        } catch (err) {
            setError("Error searching Products.");
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
            <NavBar pagina='Product'/>
            <p>page list products</p>

            <Container className="mt-4">
                <h2>List of Products</h2>
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={4} className="text-center">
                            No Products were found
                        </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>


{/*
            <br/>

            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header><Card.Title>Teste</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text>teste</Card.Text>
                    <Card.Text>teste2</Card.Text>
                    <Card.Text>teste3</Card.Text>
                </Card.Body>
            </Card>

            <br/>
*/}
        </>
    )
}