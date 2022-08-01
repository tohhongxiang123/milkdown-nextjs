import FlashCard from "../components/Flashcard";
import Layout from "../components/Layout";

const cards = [
    {
        title: "Test flashcard",
        content: "I love flashcards"
    },
    {
        title: "Mitochondria is the powerhouse of the?",
        content: "Cell"
    },
    {
        title: "What is lorem ipsum?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    },
    {
        title: "Proin condimentum egestas ipsum",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed nisi ut velit consequat gravida. Fusce a urna augue. Sed gravida eu odio at euismod. Suspendisse nec pharetra leo, sed tempor nisl. Donec semper, sapien sed aliquet placerat, sem est elementum libero, id laoreet massa lectus et dui. "
    },
    {
        title: "Vivamus a dapibus erat",
        content: "In aliquam lorem vitae libero pulvinar, eu luctus nunc interdum"
    },
    {
        title: "Nunc eu ex id leo sodales commodo",
        content: "Nunc at sem ultrices metus semper laoreet eu ut lacus. Sed volutpat arcu porttitor mi fermentum, non rhoncus ligula varius"
    },
]

export default function Cards() {
    return (
        <Layout title="Cards">
            <div className="p-8">
                <h1 className="text-2xl font-semibold">Cards</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cards.map(card => (
                        <li id={card.title}>
                            <FlashCard title={card.title} content={card.content} />
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}