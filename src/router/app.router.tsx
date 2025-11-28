import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HomePage } from "@/heroes/home/HomePage";
import { HerosLayout } from "@/heroes/layouts/HerosLayout";
import { HeroPage } from "@/heroes/pages/HeroPage";
import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";

const SearchPage = lazy(() => import('@/heroes/search/SearchPage'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'))

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([

    {
        path: '/',
        element: <HerosLayout />,
        children: [
            {
                index: true,
                element: <HomePage />

            },
            {
                path: 'heros/:idSlug',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                // element: <h1>Page not found</h1>
                element: <Navigate to="/" />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }

])