import { login } from "@/services/auth"
import { useState } from "react"
import { useRouter } from "next/router"
import { Button, ButtonGroup, Card, Col, Container, Dropdown, DropdownButton, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"

export default function LoginPage() {
  const router = useRouter()
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleUser(e: any) {
    setUsername(e.target.value)
  }

  function handlePassword(e: any) {
    setPassword(e.target.value)
  }

  async function submitLogin(e: any) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login({ name, password });
    setLoading(false);

    if (res.ok) {
      router.push("/");
    } else {
      setError(res.error || "Invalid Credentials");
    }
  }

  return (
    <>
      <Container className="center-login">
        <Row className="w-100 justify-content-center">
          <div className="photo-logoc"></div>
          <Col xs={12} md={6} lg={4} >
            <Card className="form" style={{padding: "0px", border:"1px solid white"}}>
              <Card.Title className="text-center mt-4">Login</Card.Title>
              <Card.Body>
                <Form onSubmit={submitLogin}>
                  <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                      type="text"
                      value={name}
                      placeholder="Enter the user name"
                      onChange={handleUser}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      type="password"
                      value={password}
                      placeholder="Enter the user password"
                      onChange={handlePassword}
                    ></FormControl>
                  </FormGroup>
                  <br></br>
                  <div className="d-flex justify-content-between mt-4">
                  <Button type="submit" variant="outline-success">Sign IN</Button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <ButtonGroup vertical>
                  <DropdownButton
                  variant="outline-success"
                    as={ButtonGroup}
                    title="Sign UP"
                    id="bg-vertical-dropdown-1"
                    >
                    <Dropdown.Item href="/user/create">User</Dropdown.Item>
                    <Dropdown.Item href="/store/create">Store</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}