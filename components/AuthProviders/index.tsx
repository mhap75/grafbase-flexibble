"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    (async (done) => {
      const res = await getProviders();

      setProviders(res);
    })();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button
            onClick={() => signIn(provider?.id)}
            key={i}
            className="rounded-lg bg-purple-500 p-2 text-white hover:opacity-70"
          >
            {provider.id === "google" && "Sign in with Google"}
          </button>
        ))}
      </div>
    );
  }

  return <div>AuthProviders</div>;
};

export default AuthProviders;
