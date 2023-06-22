import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/allDetails.module.css';

const initialValues = {
    profileImg: '',
    backgroundImg: '',
    instagram: '',
    bio: '',
    fullName: '',
    gender: '',
    state: '',
    city: '',

    LKG_y1: '', LKG_y2: '', LKG_school: '', LKG_placeID: '',
    UKG_y1: '', UKG_y2: '', UKG_school: '', UKG_placeID: '',
    I_y1: '', I_y2: '', I_school: '', I_placeID: '',
    II_y1: '', II_y2: '', II_school: '', II_placeID: '',
    III_y1: '', III_y2: '', III_school: '', III_placeID: '',
    IV_y1: '', IV_y2: '', IV_school: '', IV_placeID: '',
    V_y1: '', V_y2: '', V_school: '', V_placeID: '',
    VI_y1: '', VI_y2: '', VI_school: '', VI_placeID: '',
    VII_y1: '', VII_y2: '', VII_school: '', VII_placeID: '',
    VIII_y1: '', VIII_y2: '', VIII_school: '', VIII_placeID: '',
    IX_y1: '', IX_y2: '', IX_school: '', IX_placeID: '',
    X_y1: '', X_y2: '', X_school: '', X_placeID: '',
    XI_y1: '', XI_y2: '', XI_school: '', XI_placeID: '',
    XII_y1: '', XII_y2: '', XII_school: '', XII_placeID: '',
};

const AllDetails = () => {
    
    const navigate = useNavigate();

    const [profileImageStatus, setProfileImageStatus] = useState('');
    const [backgroundImageStatus, setBackgroundImageStatus] = useState('');

    //Form Values
    const [form, setForm] = useState(initialValues);
    //Profile Picture
    const [profileImg, setProfileImg] = useState('https://i.ibb.co/Dk6tD8k/user.png');
    //Background Picture
    const [backgroundImg, setBackgroundImg] = useState('https://i.ibb.co/2FC82LH/message.jpg');

    //Profile Image Changing Function
    function changeProfileImg(e) {
        const file = e.target.files[0];
        //Upload File to Azure Blob Storage
        const formData = new FormData();
        formData.append('image', file);

        //Uploading Image to Server
        setProfileImageStatus('Uploading...⏳');
        
        const url = "http://localhost:4000/upload/image";

        axios.post(url, formData, { withCredentials: true }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                console.log("Response (EditAllDetails): ", res.data);
                if (res.data.imageUrl) {
                    setProfileImg(res.data.imageUrl);
                    setProfileImageStatus('Uploaded!✅');
                }

            })
            .catch(err => {
                console.log("Error! Uploading Image\n", err);
                setProfileImageStatus('Error!❌');
            });
    }

    //Background Image Changing Function
    function changeBackgroundImg(e) {
        const file = e.target.files[0];
        //Upload File to Azure Blob Storage
        const formData = new FormData();
        formData.append('image', file);

        //Uploading Image to Server
        setBackgroundImageStatus('Uploading...⏳');
        
        const url = "http://localhost:4000/upload/image";

        axios.post(url, formData, { withCredentials: true }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                console.log("Response (EditAllDetails): ", res.data);
                if (res.data.imageUrl) {
                    setBackgroundImg(res.data.imageUrl);
                    setBackgroundImageStatus('Uploaded!✅');
                }

            })
            .catch(err => {
                console.log("Error! Uploading Image\n", err);
                setBackgroundImageStatus('Error!❌');
            });
    }

    function registerDetails(data) {

        const url = 'http://localhost:4000/user/allDetails';
        axios.post(url, data, { withCredentials: true })
            .then(res => {
                console.log("Response (Register): ", res.data);
                if (res.data.redirect) navigate('/');
            })
            .catch(err => {
                console.log("Error! REGISTERING Details\n", err);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const allValues = {
            profileImg: profileImg, 
            backgroundImg: backgroundImg,
            bio: form.bio.trim(),
            instagram: form.instagram.trim(),
            fullName: form.fullName.trim(),
            gender: form.gender,
            state: form.state,
            city: form.city,

            schoolDetails: {
                UKG: form.UKG_y1 + '#' + form.UKG_y2 + '#' + form.UKG_school.trim() + '#' + form.UKG_placeID.trim(),
                LKG: form.LKG_y1 + '#' + form.LKG_y2 + '#' + form.LKG_school.trim() + '#' + form.LKG_placeID.trim(),
                I: form.I_y1 + '#' + form.I_y2 + '#' + form.I_school.trim() + '#' + form.I_placeID.trim(),
                II: form.II_y1 + '#' + form.II_y2 + '#' + form.II_school.trim() + '#' + form.II_placeID.trim(),
                III: form.III_y1 + '#' + form.III_y2 + '#' + form.III_school.trim() + '#' + form.III_placeID.trim(),
                IV: form.IV_y1 + '#' + form.IV_y2 + '#' + form.IV_school.trim() + '#' + form.IV_placeID.trim(),
                V: form.V_y1 + '#' + form.V_y2 + '#' + form.V_school.trim() + '#' + form.V_placeID.trim(),
                VI: form.VI_y1 + '#' + form.VI_y2 + '#' + form.VI_school.trim() + '#' + form.VI_placeID.trim(),
                VII: form.VII_y1 + '#' + form.VII_y2 + '#' + form.VII_school.trim() + '#' + form.VII_placeID.trim(),
                VIII: form.VIII_y1 + '#' + form.VIII_y2 + '#' + form.VIII_school.trim() + '#' + form.VIII_placeID.trim(),
                IX: form.IX_y1 + '#' + form.IX_y2 + '#' + form.IX_school.trim() + '#' + form.IX_placeID.trim(),
                X: form.X_y1 + '#' + form.X_y2 + '#' + form.X_school.trim() + '#' + form.X_placeID.trim(),
                XI: form.XI_y1 + '#' + form.XI_y2 + '#' + form.XI_school.trim() + '#' + form.XI_placeID.trim(),
                XII: form.XII_y1 + '#' + form.XII_y2 + '#' + form.XII_school.trim() + '#' + form.XII_placeID.trim(),
            }
        }

        console.log("All Values: \n", allValues);

        // Registering Details----To Server
        registerDetails(allValues);
    }


    return (

        <div className={style.register_page}>

            <div className={style.maindiv}>

                <div className={style.heading}>
                    <h1>REGISTRATION</h1>
                </div>

                <form onSubmit={handleSubmit} className={style.html_form}>

                    <fieldset className={style.html_fieldset}>

                        <legend>Images: </legend>

                        <div className={style.images_div}>

                            <div>
                                <strong>Profile Image: </strong>
                                <img className={style.profile_img} src={profileImg} alt="" />
                                <input style={{maxWidth:"200px"}} onChange={changeProfileImg} type="file" name="profileImg" id="profileImg" />
                                <br />
                                <span>{profileImageStatus}</span>
                            </div>

                            <div>
                                <strong>Background Image: </strong>
                                <img className={style.background_img} src={backgroundImg} alt="" />
                                <input style={{maxWidth:"200px"}} onChange={changeBackgroundImg} type="file" name="backgroundImg" id="backgroundImg" />
                                <br />
                                <span>{backgroundImageStatus}</span>
                            </div>

                        </div>

                    </fieldset>

                    <fieldset>

                        <legend>Personal Details: </legend>

                        <table>

                            <tbody>

                                <tr>
                                    <td><label className={style.labeltext} htmlFor="">Full Name :</label></td>
                                    <td><input className={style.inputfield} type="text" name="fullName" value={form.fullName} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td><label className={style.labeltext} htmlFor="">Gender : </label></td>

                                    <td>
                                        <input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} />
                                        <label htmlFor="male">Male</label>

                                        <input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} />
                                        <label htmlFor="female">Female</label>

                                        <input type="radio" name="gender" value="other" checked={form.gender === 'other'} onChange={handleChange} />
                                        <label htmlFor="other">Other</label>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <label className={style.labeltext} htmlFor="">Instagram Username: </label> </td>
                                    <td> <input className={style.inputfield} onChange={handleChange} type="text" name="instagram" value={form.instagram} /> </td>
                                </tr>

                                <tr>
                                    <td> <label className={style.labeltext} htmlFor="">Enter your Bio:</label> </td>
                                    <td> <textarea style={{ padding: "7px" }} value={form.bio} name="bio" onChange={handleChange} rows="4" cols="37" maxLength="100" placeholder='Write your bio. . . . . Max (100) characters!' /> </td>
                                </tr>

                                <tr>
                                    <td><label className={style.labeltext} htmlFor="state">State : </label></td>

                                    <td>
                                        <select name='state' onChange={handleChange} defaultValue={'select'}>
                                            <option value="select" >Select...</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Orissa">Orissa</option>
                                            <option value="Pondicherry">Pondicherry</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttaranchal">Uttaranchal</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>
                                    </td>

                                </tr>


                                <tr>
                                    <td><label className={style.labeltext} htmlFor="">City: </label></td>
                                    <td><input className={style.inputfield} type="text" name="city" value={form.city} onChange={handleChange} /></td>
                                </tr>

                            </tbody>
                        </table>

                    </fieldset>


                    <fieldset>
                        <legend>School Details: </legend>

                        <table>

                            <tbody>

                                <tr>
                                    <th>Class</th>
                                    <th>Year 1</th>
                                    <th>Year 2</th>
                                    <th>School Name (Google Map)</th>
                                    <th>Place ID (Google Map)</th>
                                </tr>

                                <tr style={{ fontSize: "13px", color: "grey" }}>
                                    <td><strong>Eg:</strong></td>
                                    <td>2010</td>
                                    <td>2011</td>
                                    <td>Kendriya Vidyalaya Sector 12 Dwarka</td>
                                    <td>ChIJAQAAQMUaDTkR2Rh9YCDDYCs</td>
                                </tr>


                                <tr>
                                    <td><label htmlFor="LKG"> <strong> LKG  </strong> </label></td>

                                    <td><input type="number" name="LKG_y1" value={form.LKG_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="LKG_y2" value={form.LKG_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="LKG_school" value={form.LKG_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='LKG_placeID' value={form.LKG_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="UKG"> <strong> UKG  </strong> </label></td>

                                    <td><input type="number" name="UKG_y1" value={form.UKG_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="UKG_y2" value={form.UKG_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="UKG_school" value={form.UKG_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='UKG_placeID' value={form.UKG_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="I"> <strong> I  </strong> </label></td>

                                    <td><input type="number" name="I_y1" value={form.I_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="I_y2" value={form.I_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="I_school" value={form.I_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='I_placeID' value={form.I_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="II"> <strong> II  </strong> </label></td>

                                    <td><input type="number" name="II_y1" value={form.II_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="II_y2" value={form.II_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="II_school" value={form.II_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='II_placeID' value={form.II_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="III"> <strong> III  </strong> </label></td>

                                    <td><input type="number" name="III_y1" value={form.III_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="III_y2" value={form.III_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="III_school" value={form.III_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='III_placeID' value={form.III_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>


                                <tr>
                                    <td><label htmlFor="IV"> <strong> IV  </strong> </label></td>

                                    <td><input type="number" name="IV_y1" value={form.IV_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="IV_y2" value={form.IV_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="IV_school" value={form.IV_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='IV_placeID' value={form.IV_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="V"> <strong> V  </strong> </label></td>

                                    <td><input type="number" name="V_y1" value={form.V_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="V_y2" value={form.V_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="V_school" value={form.V_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='V_placeID' value={form.V_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="VI"> <strong> VI  </strong> </label></td>

                                    <td><input type="number" name="VI_y1" value={form.VI_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="VI_y2" value={form.VI_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="VI_school" value={form.VI_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='VI_placeID' value={form.VI_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="VII"> <strong> VII  </strong> </label></td>

                                    <td><input type="number" name="VII_y1" value={form.VII_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="VII_y2" value={form.VII_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="VII_school" value={form.VII_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='VII_placeID' value={form.VII_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="VIII"> <strong> VIII  </strong> </label></td>

                                    <td><input type="number" name="VIII_y1" value={form.VIII_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="VIII_y2" value={form.VIII_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="VIII_school" value={form.VIII_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='VIII_placeID' value={form.VIII_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="IX"> <strong> IX  </strong> </label></td>

                                    <td><input type="number" name="IX_y1" value={form.IX_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="IX_y2" value={form.IX_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="IX_school" value={form.IX_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='IX_placeID' value={form.IX_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>


                                <tr>
                                    <td><label htmlFor="X"> <strong> X  </strong> </label></td>

                                    <td><input type="number" name="X_y1" value={form.X_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="X_y2" value={form.X_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="X_school" value={form.X_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='X_placeID' value={form.X_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                                <tr>
                                    <td><label htmlFor="XI"> <strong> XI  </strong> </label></td>

                                    <td><input type="number" name="XI_y1" value={form.XI_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="XI_y2" value={form.XI_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="XI_school" value={form.XI_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='XI_placeID' value={form.XI_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>


                                <tr>
                                    <td><label htmlFor="XII"> <strong> XII  </strong> </label></td>

                                    <td><input type="number" name="XII_y1" value={form.XII_y1} onChange={handleChange} /></td>
                                    <td><input type="number" name="XII_y2" value={form.XII_y2} onChange={handleChange} /></td>

                                    <td><input className={style.inputfield} type="text" name="XII_school" value={form.XII_school} onChange={handleChange} autoComplete='on' /></td>
                                    <td><input className={style.inputfield} type="text" name='XII_placeID' value={form.XII_placeID} onChange={handleChange} autoComplete='on' /></td>

                                </tr>

                            </tbody>

                        </table>

                    </fieldset>

                    <div id="buttondiv">
                        <input className={style.register_button} type="submit" defaultValue="SAVE" />
                    </div>

                </form>


            </div>

        </div>
    )
}

export default AllDetails;