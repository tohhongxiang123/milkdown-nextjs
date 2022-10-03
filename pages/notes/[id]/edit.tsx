import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const RichMarkdownEditor = dynamic(() => import("../../../components/RichMarkdownEditor"), { ssr: false })

export default function NoteIdPage({ note }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()

    const handleSave = () => {
        router.push(`/notes/${note.id}`)
    }

    return (
        <Layout>
            <h1>{note.title}</h1>
            <button onClick={handleSave}>Save</button>
            <RichMarkdownEditor initialContentJSON={note.content} enableMenu={true} editable={true} />
        </Layout>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { params } = ctx
    const { id } = params as any
    
    const note : Note = await fetch(`http://localhost:3000/api/notes/${id}`).then(res => res.json())
    return {
        props: { note }
    }
}