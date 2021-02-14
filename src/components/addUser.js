import React,{useState, useContext} from 'react';
import {Prompt} from 'react-router-dom';
import { StoreContext } from '../App';
import { post } from '../utils/api';
import { SAVE_USER } from '../utils/constants';

export default function AddUser({setLoading}) {

    const { state, dispatch } = useContext(StoreContext);
    const [formData,setFormData] = useState({});
    const [success, setSuccess] = useState(false);
    const form = React.useRef(null);

    const onFieldChange = e => {
        let form_data = {...formData};
        form_data[e.target.name] = e.target.value;
        setFormData(form_data);
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = JSON.stringify(formData);
        const resp = await post('https://eduvanzmeetup.free.beeceptor.com/add-user',data);
        setLoading(false);
        if(resp){
            setSuccess(true);
            setFormData({});
            form.current.reset();
            dispatch({type: SAVE_USER, payload: formData});
            setTimeout(() => {
                setSuccess(success => !success)}
            ,2000);
        }
    }

    return (
        <div className="add-user">
            <Prompt when={true} message={"Are you sure you want to navigate?"} />
            <div className="form-wrapper">
                <h1>Add User</h1>
                <form method="post" ref={form}  onSubmit={onFormSubmit}>
                    <p className='field required'>
                        <label className='label required' htmlFor='name'>Full Name</label>
                        <input className='text-input' id='name' onChange={onFieldChange} name='name' required type='text' />
                    </p>
                    <p className='field required'>
                        <label className='label required' htmlFor='age'>Age</label>
                        <input className='text-input' id='age' name='age' min={10} required type='number' onChange={onFieldChange} />
                    </p>
                    <p className='field required'>
                        <label className='label required' htmlFor='dob'>Date Of Birth</label>
                        <input className='text-input' id='dob' name='dob' required type='date' onChange={onFieldChange} />
                    </p>
                    <div className="field required">
                        <label className='label required'>Profession</label>
                        <ul className="radios">
                            <li className="radio">
                                <input className="radio-input" checked={formData.profession == "Employed"} id="radio-employed" name="profession" required type="radio" value="Employed" onChange={onFieldChange} />
                                <label className="radio-label" htmlFor="radio-employed">Employed</label>
                            </li>
                            <li className="radio">
                                <input className="radio-input" checked={formData.profession == "Student"} id="radio-student" name="profession" required type="radio" value="Student" onChange={onFieldChange} />
                                <label className="radio-label" htmlFor="radio-student">Student</label>
                            </li>
                        </ul>
                    </div>
                    <p className='field required'>
                        <label className='label required' htmlFor='locality'>Locality</label>
                        <input className='text-input' id='locality' name='locality' required type='text' onChange={onFieldChange} />
                    </p>
                    <p className='field required'>
                        <label className='label required' htmlFor='nguests'>Number of Guests</label>
                        <input className='text-input' id='nguests' name='nguests' min={0} max={2} required type='number' onChange={onFieldChange} />
                    </p>
                    <p className='field required'>
                        <label className='label required' htmlFor='address'>Address</label>
                        <textarea className='text-area' maxLength='50' id='address' name='address' required onChange={onFieldChange} />
                    </p>
                    {success && <p>User added succesfully</p>}
                    <p className="field">
                        <input className="button" type="submit" value="Submit" />
                    </p>
                </form>
            </div>
        </div>
    )
}
