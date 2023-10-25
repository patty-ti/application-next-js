import Image from "next/image";
import { GetServerSideProps } from "next";
import Link from 'next/link'

import { useKeenSlider } from "keen-slider/react";
import 'keen-slider/keen-slider.min.css';

import Stripe from "stripe";
import { stripe } from "@/lib/stripe"

import { HomeContainer, Product } from "@/styles/pages/home";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
      
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>            
          </Link>
        )
      })}
    </HomeContainer>
  )
}

//GetStaticProps => deve ser usado em páginas que serão estáticas, 
//por exemplo uma Home ou LadingPage, onde não sofrem alterações constantes
//(não funciona em ambiente de desenvolvimento e não acesso a cookies, infos do user, acesso a nada de requisição)
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount as number / 100),
    }
  })

  return {
    props: {
      products
    },
    // revalidate: 60 * 60 * 2, //2hours
  }
}