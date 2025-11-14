import NavBar from "@/components/NavBar";
import { listUsers, User } from "@/services/user";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

export default function UserPage() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await listUsers();
        setUsers(data);
      } catch (err) {
        setError("Erro searching Users.");
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
            <NavBar pagina='User'/>
            <p>page list users</p>

        <Container className="mt-4">
            <h2>List of Users</h2>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={4} className="text-center">
                        No Users were found
                    </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
            
        </>
    )
}