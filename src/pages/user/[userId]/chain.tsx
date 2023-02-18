import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const HomeContents = () => {
	const [inputUrl, setInputUrl] = useState("");
	const [notes, setNotes] = useState("");
	const { data: session, status } = useSession();
	const router = useRouter();
	let { userId } = router.query as { userId: string };
	if (userId === "me") {
		if (!session?.user?.id) router.push("/login");
		else userId = session?.user?.id;
	}
	const { data: chain } = trpc.useQuery(["example.getChain", { userId }]);

	const ctx = trpc.useContext();
	const { mutate: addToChain } = trpc.useMutation("question.addToChain", {
		onSuccess: () => ctx.invalidateQueries("example.getChain"),
	});
	const addUrl = () => {
		addToChain({ url: inputUrl, notes });
	};

	if (status === "loading") return <div>Loading...</div>;

	return (
		<div className="flex h-full flex-col items-center justify-start gap-8 bg-blue-300">
			{session && (
				<>
					<header className="flex w-full items-center justify-end p-8">
						<div className="align-center m-2 flex h-12 w-36 justify-center bg-slate-600 text-white">
							<p>Hello {session?.user?.name}</p>
						</div>
						<button
							className="h-12 w-36 bg-slate-600 text-white"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
					</header>
					<div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
						<input
							type="text"
							placeholder="url"
							id="url"
							value={inputUrl}
							onChange={(e) => setInputUrl(e.target.value)}
						></input>
						<input
							type="text"
							placeholder="notes"
							id="notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						></input>
						<button onClick={addUrl}>Add Url</button>
					</div>
				</>
			)}
			<div className="flex flex-col items-center justify-start">
				{chain?.map((link) => {
					return (
						<div
							className="m-2 flex w-96 flex-col items-center justify-center rounded-lg border-2 border-black p-4"
							key={link.id}
						>
							<p>url: {link.url}</p>
							<p>notes: {link.notes}</p>
							<p>userId: {link.userId}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>ChainLinkk</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<HomeContents />
		</>
	);
};

export default Home;