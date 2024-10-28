import { Html, Head, Main, NextScript } from "next/document";
import { unstable_noStore } from "next/cache";
const get_public_env_1 = require("next-runtime-env/build/helpers/get-public-env");

export default function Document() {
  console.log('PublicEnvScript')

  return (
    <Html>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        {/* not working */}
        {/* <PublicEnvScript /> */}
        {/* it works */}
        <PublicEnvScript2 />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <PublicEnvScript2 />
    </Html>
  );
}

const PublicEnvScript2 = () => {
  unstable_noStore(); // Opt into dynamic rendering
  // This value will be evaluated at runtime
  const publicEnv = (0, get_public_env_1.getPublicEnv)();
  return <EnvScript2 env={publicEnv} nonce={undefined} />;
};

const PUBLIC_ENV_KEY = "__ENV";
const EnvScript2 = ({ env, nonce }: {env: Record<string, string>, nonce?: string}) => {
  let nonceString;
  // XXX: Blocked by https://github.com/vercel/next.js/pull/58129
  // if (typeof nonce === 'object' && nonce !== null) {
  //   // It's strongly recommended to set a nonce on your script tags.
  //   nonceString = headers().get(nonce.headerKey) ?? undefined;
  // }
  if (typeof nonce === 'string') {
      nonceString = nonce;
  }
  return <script
    // strategy="beforeInteractive"
    // strategy="afterInteractive"
    // strategy="lazyOnload"
    // strategy="worker"
    nonce={nonceString}
    dangerouslySetInnerHTML={{
          __html: `window['${PUBLIC_ENV_KEY}'] = ${JSON.stringify(env)}`,
      }} />;
};
