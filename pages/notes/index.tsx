import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";

export default function NotesPage({ notes }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <h1>This is page to list all your notes</h1>
            {notes.map(note => (
                <li key={note.id}>
                    <Link href={`/notes/${note.id}`}><a>{note.title}</a></Link>
                </li>
            ))}
        </Layout>
    )
}

export async function getServerSideProps() {
    const notes : Note[] = await fetch("http://localhost:3000/api/notes").then(res => res.json())
    return {
        props: { notes }
    }
}