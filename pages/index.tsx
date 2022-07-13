import dynamic from "next/dynamic";

const RichMarkdownEditor = dynamic(() => import("../components/RichMarkdownEditor"), { ssr: false })

const Home = () => {
	return (
		<div>
			<h1>Rich markdown nonsense</h1>
			<RichMarkdownEditor />
		</div>
	)
};

export default Home
