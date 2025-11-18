import { logout } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

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
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} href="#">{pagina}</Navbar.Brand>
          <Nav className="me-auto">
            {pagina != 'User' && <Nav.Link as={Link} href="/user">User</Nav.Link>}
            {pagina != 'Store' && <Nav.Link as={Link} href="/store">Store</Nav.Link>}
            {pagina != 'Category' && <Nav.Link as={Link} href="/category">Category</Nav.Link>}
            {pagina != 'Product' && <Nav.Link as={Link} href="/product">Product</Nav.Link>}
          </Nav>
           <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
            >
              Logoff
            </Button>
        </Container>
      </Navbar>
    </>
  )
}