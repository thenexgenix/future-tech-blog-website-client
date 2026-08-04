// app/dashboard/admin/news/page.js
import { getAllNews } from '@/lib/api/news';
import { getAllCategory } from '@/lib/api/category';
import NewsClient from './NewsClient';

export const revalidate = 0;

export default async function NewsPage() {
    const [newsRes, catRes] = await Promise.all([
        getAllNews(),
        getAllCategory(),
    ]);

    const newsData = Array.isArray(newsRes) ? newsRes : newsRes?.data || [];
    const catData = Array.isArray(catRes) ? catRes : catRes?.data || [];

    return <NewsClient initialNews={newsData} initialCategories={catData} />;
}