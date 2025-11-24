import { logout } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ImExit } from "react-icons/im";
import { IoHome } from "react-icons/io5";

type NavBarProps = {
  pagina: String
}

export default function NavBar({pagina}: NavBarProps) {

const router = useRouter()

const handleLogout = () => {
    logout?.();
    router.push("/login");
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#122e2d" }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} href="#">{pagina}</Navbar.Brand>
          <Nav className="me-auto">
            {pagina != 'User' && <Nav.Link as={Link} href="/user">User</Nav.Link>}
            {pagina != 'Store' && <Nav.Link as={Link} href="/store">Store</Nav.Link>}
            {pagina != 'Category' && <Nav.Link as={Link} href="/category">Category</Nav.Link>}
            {pagina != 'Product' && <Nav.Link as={Link} href="/product">Product</Nav.Link>}
          </Nav>
          <div className="d-flex gap-2">
          <Button variant="outline-success" href="/"><IoHome /></Button>
          <Button variant="outline-danger" onClick={handleLogout}><ImExit /></Button>
          </div>
        </Container>
      </Navbar>
    </>
  )
}