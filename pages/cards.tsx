import { InferGetServerSidePropsType } from "next";
import FlashCard from "../components/Flashcard";
import Layout from "../components/Layout";

export default function Cards({ flashCards } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout title="Cards">
            <div className="p-8">
                <h1 className="text-2xl font-semibold">Cards</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {flashCards.map(card => (
                        <li id={card.title} key={card.id}>
                            <FlashCard title={card.title} content={card.content} />
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const flashCards : FlashCard[] = await fetch("http://localhost:3000/api/cards").then(res => res.json())
    return {
        props: { flashCards }
    }
}