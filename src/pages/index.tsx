import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getToken, isValidJwt, logout } from "@/services/auth";

export default function Home() {
   const router = useRouter();
   const [token, setToken] = useState<string | null>(null);

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
    <p>página inicial</p>

    
    </>
  );
}
