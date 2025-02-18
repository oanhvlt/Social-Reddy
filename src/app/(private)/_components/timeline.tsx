import PostItem from './post-item';
import { getTimelinePostsOfLoggedInUser } from '@/_actions/post-actions';

const Timeline = async () => {
    const postsResponse = await getTimelinePostsOfLoggedInUser();

    if (!postsResponse.success) {
        return (
            <div className='mt-10 text-gray-500 text-sm'>
                Failed to load timeline posts
            </div>
        );
    }

    if (postsResponse.data.length === 0) {
        return <div className='mt-10 text-gray-500 text-sm'>No posts to show</div>;
    }

    return (
        <div className='flex flex-col gap-7 mt-7'>
            {postsResponse.data.map((post: any) => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    );
}

export default Timeline;
