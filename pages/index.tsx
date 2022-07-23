import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const RichMarkdownEditor = dynamic(() => import("../components/RichMarkdownEditor"), { ssr: false })

const Home = () => {
	return (
		<Layout>
			<div className="flex flex-col justify-center items-center">
				<RichMarkdownEditor />
			</div>
		</Layout>
	)
};

export default Home
