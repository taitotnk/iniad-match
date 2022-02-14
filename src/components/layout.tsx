import Head from "next/head";
import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <link
        rel="icon"
        href="https://iniad-match.vercel.app/iniad-match-ogp.jpg"
      />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        property="og:image"
        content="https://iniad-match.vercel.app/iniad-match-ogp.jpg"
      />
      <meta
        property="og:description"
        content="Twitter IDやInstagram IDを設定することで、INIAD生の間でSNSでつながることができるWebアプリ"
      />
      <meta property="og:title" content={title} />
      <meta
        property="twitter:image"
        content="https://iniad-match.vercel.app/iniad-match-ogp.jpg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@taito_1211" />
      <meta name="twitter:title" content={title} />
    </Head>
    <header>
      <div className="container mx-auto">
        <Link href="/">
          <a>
            <h1 className="text-white pl-10">INIAD-MATCH 👋</h1>
          </a>
        </Link>
      </div>
    </header>
    <div>{children}</div>
    <footer>
      <div className="text-white text-center pl-10">
        © 2021 Copyright INIAD-MATCH
      </div>
    </footer>
  </>
);

export default Layout;
