import Head from "next/head"
import TopNavBar from "../TopNavBar"

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[],
    title?: string
}

const links = [
    {
    name: 'Notes',
    path: '/notes'
}, {
    name: 'Cards',
    path: '/cards'
}, {
    name: 'Edit',
    path: '/edit'
}
]

export default function Layout({ children, title = '' } : LayoutProps) {
    return (
        <div>
            <Head>
                <title>{title.length > 0 ? title : 'Home'}</title>
            </Head>
            <TopNavBar links={links} />
            <main>
                {children}
            </main>
        </div>
    )
}