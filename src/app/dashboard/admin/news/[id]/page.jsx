import { getAllCategory } from '@/lib/api/category';
import EditNewsForm from './EditNewsForm';
import { getNewsById } from '@/lib/api/news';

export default async function NewsDetailPage({ params }) {

    const { id } = await params;

    const [newsRes, catRes] = await Promise.all([
        getNewsById(id),
        getAllCategory()
    ]);

    // Normalize responses
    const newsData = newsRes?.data || newsRes;
    const categories = Array.isArray(catRes) ? catRes : (catRes?.data || []);

    if (!newsData) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-zinc-400">
                <p className="text-sm font-medium">News article not found.</p>
            </div>
        );
    }

    return (
        <EditNewsForm
            id={id}
            initialData={newsData}
            categories={categories}
        />
    );
}