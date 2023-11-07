import { Fragment, useState } from "react";
import axios from "axios";

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from "next/image";
import Head from "next/head";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
};

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // Opção: Conectar com uma ferramenta de observabilidade(DataDog / Sentry)
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!');
    }
  };

  return (
    <Fragment>
      <Head>
        <title>{product.name} | Next Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="imagem do produto" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_OsWS4KqDndDPZm' } },
    ],
    fallback: 'blocking',
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount as number / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
};