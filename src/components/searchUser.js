import React,{useState,useContext} from 'react';
import { StoreContext } from '../App';

export default function SearchUser() {
    const { state, dispatch } = useContext(StoreContext);
    const [searchTerm,setSearchTerm] = useState('');

    const renderUsers = () => {
        let search_term = searchTerm.toLowerCase();
        let filtered_users = state.users ? state.users.filter((user) => {
            return (user.name.toLowerCase().includes(search_term) || user.locality.toLowerCase().includes(search_term));
        }) : [];
        return filtered_users.map((user) => (
            <div key={user.id} className="user">
                <h2>{user.name}</h2>
                <p>{user.locality}</p>
            </div>
        ))
    }

    return (
        <div className="search-user">
            <div className="form-wrapper">
                <h1>Search User</h1>
                <form method="post">
                    <p className='field'>
                        <label className='label' htmlFor='search'>Search by name or locality</label>
                        <input className='text-input' onChange={e => setSearchTerm(e.target.value)} id='search' name='search' type='text' />
                    </p>
                </form>
                <div className="users-wrapper">
                    {searchTerm && renderUsers()    }
                </div>
            </div>
        </div>
    )
}