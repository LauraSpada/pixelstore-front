import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar } from "react-bootstrap";

type NavBarProps = {
  pagina: String
}

export default function NavBar({pagina}: NavBarProps) {

const router = useRouter()

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} href="#">{pagina}</Navbar.Brand>
          <Nav className="me-auto">
            {pagina != 'Home' && <Nav.Link as={Link} href="/">Home</Nav.Link>}
            {pagina != 'User' && <Nav.Link as={Link} href="/user/listUser">Users</Nav.Link>}
            {pagina != 'Store' && <Nav.Link as={Link} href="/store/listStore">Store</Nav.Link>}
            {pagina != 'Product' && <Nav.Link as={Link} href="/product/listProduct">Products</Nav.Link>}
            {pagina != 'Category' && <Nav.Link as={Link} href="/category/listCategory">Categories</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}