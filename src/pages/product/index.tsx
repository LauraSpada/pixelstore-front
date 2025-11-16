import NavBar from "@/components/NavBar";
{/*import { Card } from "react-bootstrap";*/}
import { listProducts, Product } from "@/services/product";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

import { getProductsByStore } from "@/services/store";

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
                        products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.stock}</td>
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