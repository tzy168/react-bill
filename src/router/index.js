import Year from "@/pages/Year"
import Month from "@/pages/Month"
import Layout from "@/pages/Layout"
import New from "@/pages/New"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                Component: Month
            },
            {
                path: "year",
                Component: Year
            },
            {
                path: "/new",
                Component: New
            }
        ]
    }
])

export default router