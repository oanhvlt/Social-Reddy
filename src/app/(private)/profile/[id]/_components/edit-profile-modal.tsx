import { updateUserProfile } from '@/_actions/user-actions';
import { uploadImageToFirebase } from '@/helpers/uploads';
import { Modal, Input, Switch, Upload, message } from 'antd';
import { useState } from 'react';

interface IProps {
    user: UserType;
    showEditProfileModal: boolean;
    setShowEditProfileModal: (value: boolean) => void;
}

const EditProfileModal = (props: IProps) => {
    const { user, showEditProfileModal, setShowEditProfileModal } = props;
    const [bio = '', setBio] = useState(user.bio);
    const [newProfilePicFile = null, setNewProfilePicFile] = useState(null);
    const [isPrivateAccount, setIsPrivateAccount] = useState(user.isPrivateAccount);
    const [loading = false, setLoading] = useState<boolean>(false);

    const updateHandler = async () => {
        try {
            setLoading(true);
            const payload: any = {
                bio,
                isPrivateAccount,
            };
            if (newProfilePicFile) {
                payload.profilePic = await uploadImageToFirebase(newProfilePicFile);
            }
            const response = await updateUserProfile({
                payload,
                userId: user._id,
            });
            if (response.success) {
                message.success(response.message);
                setShowEditProfileModal(false);
            } else {
                message.error(response.message);
            }
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title='EDIT PROFILE'
            open={showEditProfileModal}
            onCancel={() => setShowEditProfileModal(false)}
            centered
            okText='Save'
            onOk={updateHandler}
            okButtonProps={{ loading }}
            cancelButtonProps={{ disabled: loading }}
        >
            <hr className='border-solid border-gray-300 my-3' />
            <div className='flex flex-col gap-5'>
                <div>
                    <span className='text-gray-700 text-sm'>Bio</span>
                    <Input.TextArea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder='Add your bio here...'
                    />
                </div>
                <div className='flex gap-5'>
                    {!newProfilePicFile && (
                        <img
                            src={user.profilePic}
                            alt={user.name}
                            className='w-[102px] h-[102px] object-cover'
                        />
                    )}

                    <Upload
                        listType='picture-card'
                        beforeUpload={(file: any) => {
                            setNewProfilePicFile(file);
                            return false;
                        }}
                        onRemove={() => setNewProfilePicFile(null)}
                    >
                        <span className='text-gray-700 text-xs'>Change</span>
                    </Upload>
                </div>
                <div className='flex gap-3'>
                    <span className='text-gray-700'>Is Private Account</span>
                    <Switch checked={isPrivateAccount} onChange={setIsPrivateAccount} />
                </div>
            </div>

        </Modal>
    )
}

export default EditProfileModal;