import { getUserInfoById } from '@/_actions/user-actions';
import UserBasicDetails from './_components/user-basic-details';
import PendingFollowRequests from './_components/peding-follow-requests';
import UserRelatedPosts from './_components/users-related-posts';


const Profile = async (
    { params }: { params: { id: string; } }) => {
    const userInfoResponse = await getUserInfoById(params.id);
    const userInfo = userInfoResponse.data;
    return (
        <div>
            <UserBasicDetails user={userInfo} />
            <PendingFollowRequests user={userInfo} />
            <UserRelatedPosts user={userInfo} />
        </div>
    )
}

export default Profile;