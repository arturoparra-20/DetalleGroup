import Link from "next/link";
import Login from "./login/Login";

export default function Home() {
  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-3xl font-bold mb-4">Lista de Grupos</h1>
    //   <ul className="space-y-2">
    //     <li>
    //       <Link href="/grupo/1" className="text-blue-500 hover:underline">
    //         Grupo de Next.js
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/grupo/2" className="text-blue-500 hover:underline">
    //         Grupo de JavaScript
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
    <Login/>
  );
}
