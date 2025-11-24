import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getToken, isValidJwt, logout } from "@/services/auth";
import { Button, Container, Offcanvas, Row } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(() => {
    const t = getToken();
    if (!t || !isValidJwt(t)) {
      logout();
      router.replace("/login");
    } else {
      setToken(t);
    }
  }, [router]);

  if (!token) return null;

  return (
    <>
      <NavBar pagina='Home'/>
      <Container className="mt-4">
        <Row>
          <div className="form-two">
          <h3>Welcome!</h3>
          <Button variant="outline-light" onClick={handleShow} size="lg">Developer</Button>
          </div>
          <Offcanvas placement="end" show={show} onHide={handleClose} backdrop="static" style={{ backgroundColor: "#122e2d", color: "white"}} >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Developer</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column align-items-center mt-3">
            <div className="foto-perfil"></div>
            <br></br>
            <p>Laura Portela Spada</p>
            <p>200921</p>
            <p>Análise e Desenvolvimento de Sistemas</p>
            </div>
          </Offcanvas.Body>
          </Offcanvas>
          <div className="photo-logoh"></div>
        </Row>
      </Container>
    </>
  );
}
