import React from 'react'
import { useParams} from 'react-router-dom'


export default function UserPage() {
    let {userId} = useParams()
    return (
        <div>
            User page {userId}
        </div>
    )
}