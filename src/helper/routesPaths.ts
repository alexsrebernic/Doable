
interface Path {
    path: string,
    text: string,
}
const paths: Path[] = [
    {
        path:'/',
        text:'Home',
    },
    {
        path:'/#stats',
        text:'Stats'
    },
    {
        path:'/lists',
        text:'Lists'
    },
    {
        path:'/about',
        text:'About'
    },
    {
        path:'/settings',
        text:'Settings',
    }
]
export default paths