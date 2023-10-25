import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter(); //Hook para pegar o parâmetro da rota

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>T-shirt X</h1>
        <span>R$200,00</span>

        <p>Blusa T-Shirt, apresenta manga curta, decote redondo, toque suave ao corpo, estampa frontal com detalhe em metal. Hoje em dia, uma blusinha básica não é sinônimo de um look básico. As camisetas, ou t-shirts, são indispensáveis para qualquer mulher moderna. Apesar de ser uma peça inicialmente descontraída, ela pode ser usada para transformar seu visual, de casual para fashion. Por ser uma peça que combina com tudo, use a sua criatividade para criar looks incríveis com uma t-shirt.</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
};