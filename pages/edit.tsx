import Layout from "../components/Layout";
import dynamic from 'next/dynamic'

const RichMarkdownEditor = dynamic(() => import("../components/RichMarkdownEditor"), { ssr: false })

export default function EditPage() {
    return (
        <Layout title={"Edit"}>
            <RichMarkdownEditor />
        </Layout>
    )
}