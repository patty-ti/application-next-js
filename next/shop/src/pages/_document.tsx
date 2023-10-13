//o <Main /> serve como o <div id=root></div>
//o <NextScript /> tem que ficar no final da tag body e ele serve como o script
//após alterar esse arquivo devemos parar e subir a aplicação novamente
//se não aplicar as alterações devemos excluir a pasta next, que serve como um cache e só subir a aplicação novamente
//Atenção: aqui fica tudo que vai ser aplicado em toda a aplicação, deixar ele mais simples, sem css e demais coisas
//ao importar <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} /> conseguimos garantir que teremos o css mesmo com o JS desabilitado

import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from '../styles';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

				<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
			</Head>

			<body> 
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

