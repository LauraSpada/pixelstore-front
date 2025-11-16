import NavBar from "@/components/NavBar";
import { listStores, Store, getStore} from "@/services/store";
import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";

export default function StorePage() {

    const [store, setStore] = useState<Store | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
    async function load() {
      try {
        const stored = localStorage.getItem("auth_user");

        if (!stored) {
          setError("No user");
          return;
        }

        const user = JSON.parse(stored);

        if (!user.storeId) {
          setError("Logged user don't have storeId");
          return;
        }

        const data = await getStore(user.storeId);
        setStore(data);
      } catch (err) {
        console.error(err);
        setError("Erro while searching Store.");
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
            <NavBar pagina='Store'/>

            <Container className="mt-4">
            <h2>{store?.name}</h2>
            <p>location:{store?.location}</p>
            <p>id:{store?.id}</p>
            </Container>

        </>
    )
}