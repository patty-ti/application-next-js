import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter(); //Hook para pegar o parâmetro da rota

  return (
    <h1>Product: {JSON.stringify(query)}</h1>
  );
};