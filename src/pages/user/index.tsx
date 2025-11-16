import NavBar from "@/components/NavBar";
import { listUsers, User } from "@/services/user";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

import { getUsersByStore } from "@/services/store";

export default function UserPage() {

  const [users, setUsers] = useState<any[]>([]);
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
        const list = await getUsersByStore(user.storeId);
        setUsers(list);
      } catch (err) {
        console.error("Error while searching users:", err);
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
            <NavBar pagina='User'/>

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
                        users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
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