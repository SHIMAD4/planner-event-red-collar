import { useEffect, useState } from 'react'
import { api } from '../../shared/api/index.js'
import avatar from '../../shared/ui/atoms/icons/avatar.png'

export default function UserInfo() {
    const [username, setUsername] = useState('')

    useEffect(() => {
        api.user
            .me({ flag: true })
            .then((res) => setUsername(res.data.username))
            .catch((err) => console.log(err))
    })
    return (
        <div className="modal-create-event__info">
            <img className="modal-create-event__avatar" src={avatar} alt="avatar" />
            <div className="">
                <p className="modal-create-event__username">{username}</p>
                <p className="modal-create-event__role">Организатор</p>
            </div>
        </div>
    )
}
