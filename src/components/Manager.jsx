import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ url: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    
    const showPassword = () => {
       
    if (ref.current.src.includes("show.png")) {
        ref.current.src = "public/hide.png";    
        passwordRef.current.type = "password";      
    } else {
        ref.current.src = "public/show.png";     
        passwordRef.current.type = "text"; 
    }  
}

    const savePassword = () => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedArray = [...passwordArray, newPassword];
            setpasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            setform({ url: "", username: "", password: "" });
            toast('Password Saved!');
        } else {
            toast('Error! Please fill all fields with more than 3 characters.');
        }
    }

    const deletePass = (id) => {
        const c = confirm("Are you sure you want to delete this password?");
        if (c) {
            const updatedArray = passwordArray.filter((item) => item.id !== id);
            setpasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            toast('Password Deleted!');
        }
    }

    const editPass = (id) => {
        const itemToEdit = passwordArray.filter(i => i.id === id)[0];
        setform(itemToEdit);
        const updatedArray = passwordArray.filter(item => item.id !== id);
        setpasswordArray(updatedArray);
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to Clipboard!');
    }

    return (
        <>
             <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="absolute inset-0 -z-10 h-screen w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
            
            {/* Reduced padding on mobile (p-2) */}
            <div className="p-2 md:p-5 bg-green-100 md:px-20 md:mycontainer min-h-[88vh]">
                <h1 className="font-bold text-4xl text-center">
                    <span className='text-green-600'>&lt;</span>
                    <span className='text-black'>Pass</span>
                    <span className='text-green-600'>MG/&gt;</span>
                </h1>
                <p className='text-center text-lg text-black'>Your Own Password Manager</p>

                <div className="flex flex-col w-full justify-between p-4 gap-4">
                    <input value={form.url} onChange={handleChange} placeholder="Enter Website URL" className="border border-green-500 bg-white rounded-md w-full p-4 py-1" type="text" name="url" id="url" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-4 ">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="border border-green-500 bg-white rounded-md w-full p-4 py-1" type="text" name="username" id="username" />
                        <div className="relative w-full ">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" title="password" className="border border-green-500 bg-white rounded-md w-full p-4 py-1" type="password" name="password" id="password" />
                            <span className='absolute right-1 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="public/hide.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                </div>

                <button onClick={savePassword} className='font-bold cursor-pointer bg-green-600 flex gap-2 items-center border rounded-full px-4 py-2 border-green-800 justify-center mx-auto text-white hover:bg-green-500 '>
                    <lord-icon className="invert" src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
                    SAVE
                </button>

                <div className="passwords mb-10 mt-10 w-full">
                    <h2 className='text-2xl font-bold text-center m-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center'>No passwords saved yet.</div>}
                    {passwordArray.length !== 0 && (
                        /* Fixed: Added no-scrollbar and removed container margins for more space */
                        <div className="overflow-x-auto no-scrollbar w-full border border-white rounded-md">
                            <table className="table-auto w-full min-w-[600px]">
                                <thead className='bg-green-600 text-white'>
                                    <tr>
                                        <th className='py-2 border'>WEBSITE</th>
                                        <th className='py-2 border'>USERNAME</th>
                                        <th className='py-2 border'>PASSWORD</th>
                                        <th className='py-2 border'>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='border border-white py-2 text-center break-all'>
                                                <a href={item.url} target='_blank' rel="noreferrer">{item.url}</a>
                                            </td>
                                            <td className='border border-white py-2 text-center'>
                                                <div className='flex items-center justify-center gap-2'>
                                                    {item.username}
                                                    <lord-icon className="cursor-pointer" onClick={() => copyText(item.username)} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "20px", height: "20px" }}></lord-icon>
                                                </div>
                                            </td>
                                            <td className='border border-white py-2 text-center'>
                                                <div className='flex items-center justify-center gap-2'>
                                                    {item.password}
                                                    <lord-icon className="cursor-pointer" onClick={() => copyText(item.password)} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "20px", height: "20px" }}></lord-icon>
                                                </div>
                                            </td>
                                          <td className='border border-white py-2 text-center'>
                                                <button className='edit cursor-pointer mx-2' onClick={() => editPass(item.id)}>
                                                    <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                </button>
                                                <button className='delete cursor-pointer mx-2' onClick={() => deletePass(item.id)}>
                                                    <lord-icon src="https://cdn.lordicon.com/xyfswyxf.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager;
