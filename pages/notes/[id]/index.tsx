import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "../../../components/Layout";

const RichMarkdownEditor = dynamic(() => import("../../../components/RichMarkdownEditor"), { ssr: false })

export default function NoteIdPage({ note }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <h1>{note.title}</h1>
            <Link href={`/notes/${note.id}/edit`}><button>Edit</button></Link>
            <RichMarkdownEditor initialContentJSON={note.content} enableMenu={false} editable={false} />
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