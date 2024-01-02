import { useEffect, useState } from 'react';
import avatar from '../../../public/images/avatar.png';
import { api } from '../../shared/api';

export default function UserInfo() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        api.user
            .me({ flag: true })
            .then((res) => setUsername(res.data.username))
            .catch((error) => console.log(error));
    });

    return (
        <div className="modal-create-event__info">
            <img className="modal-create-event__avatar" src={avatar} alt="avatar" />
            <div className="">
                <p className="modal-create-event__username">{username}</p>
                <p className="modal-create-event__role">Организатор</p>
            </div>
        </div>
    );
}
