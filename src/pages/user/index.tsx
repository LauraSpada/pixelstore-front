import NavBar from "@/components/NavBar";
import { listUsers, User } from "@/services/user";
import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner, Table } from "react-bootstrap";

import { getUsersByStore } from "@/services/store";
import Link from "next/link";

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

        {users.length > 0 ? (
      <div className="d-flex flex-wrap gap-3 mt-3">
        {users.map((u) => (
        <Link href={`/user/update?id=${u.id}`} style={{ textDecoration: "none" }}>
        <Card border="danger" bg="dark" text="white" style={{ width: "18rem" }} key={u.id}>
              <Card.Header>{u.id}</Card.Header>
            <Card.Body>
              <Card.Title>{u.name}</Card.Title>
            </Card.Body>
        </Card>
        </Link>
        ))}
      </div>
    ) : (
      <p className="text-center mt-3">No Users were found</p>
    )}
        </>
    )
}