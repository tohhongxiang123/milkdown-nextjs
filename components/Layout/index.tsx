import TopNavBar from "../TopNavBar"

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

const links = [{
    name: 'Notes',
    path: '/notes'
}, {
    name: 'Cards',
    path: '/cards'
}]

export default function Layout({ children } : LayoutProps) {
    return (
        <div>
            <TopNavBar links={links} />
            <main>
                {children}
            </main>
        </div>
    )
}