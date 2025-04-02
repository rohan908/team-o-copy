import { useParams } from 'react-router-dom';
import { Patriot20, Patriot22 } from './directorydata';

export function DirectoryLocation() {
    const { topic } = useParams<{ topic: string }>();

    const allTopics = [...Patriot20, ...Patriot22];
    const match = allTopics.find(item => item.slug === topic);
    const title = match?.title ?? 'Unknown Topic';

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Directory Page</h1>
            <p className="mt-4">You selected: <strong>{title}</strong></p>
        </div>
    );
}

export default DirectoryLocation;
