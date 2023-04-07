
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
        path:'#stats',
        text:'Stats'
    },
    {
        path:'/tasks',
        text:'Tasks'
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