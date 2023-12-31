import { useEffect, useState } from 'react';
import Select from 'react-select';
import avatar from '../../../public/images/avatar.png';
import { api } from '../../shared/api';

export default function ParticipantsComponent({ setSelectedUsers }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        api.user
            .all({ flag: false })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => console.log(error));
    };

    const selectOptions = users.map((user) => ({
        value: user.username,
        id: user.id,
        label: (
            <div className="modal-create-event__select__option">
                <img
                    className="modal-create-event__select__option-avatar"
                    src={avatar}
                    alt={user.username}
                    width={40}
                    height={40}
                />
                <p className="modal-create-event__select__option-username">{user.username}</p>
            </div>
        ),
    }));

    return (
        <Select
            className="modal-create-event__select-container"
            classNamePrefix="modal-create-event__select"
            options={selectOptions}
            isMulti
            placeholder="Начните вводить имя"
            onChange={(selectedUsers) => setSelectedUsers(selectedUsers)}
        />
    );
}
