/*
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUser, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect } from "react";

const Login: NextPage = () => {
	const router = useRouter();
	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (isLoaded && user) {
			router.push(`/${user.username}`);
		}
	}, [isLoaded, user, router]);

	return (
		<>
			<Head>
				<title>ChainLinkk - Login</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex h-screen w-screen items-center justify-center bg-slate-600">
				<SignIn
					routing="path"
					path="/login"
					redirectUrl="/me"
					appearance={{
						baseTheme: dark,
						elements: {
							rootBox:
								"flex items-center justify-center h-screen w-screen bg-gradient-to-br from-gradient-start to-gradient-end",
							card: "bg-slate-800",
							footer: {
								display: "none",
							},
						},
					}}
				/>
			</div>
		</>
	);
};
export default Login;
*/
