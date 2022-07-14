import dynamic from "next/dynamic";

const RichMarkdownEditor = dynamic(() => import("../components/RichMarkdownEditor"), { ssr: false })

const Home = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			<RichMarkdownEditor />
		</div>
	)
};

export default Home
