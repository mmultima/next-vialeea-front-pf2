'use client';

import { use, useEffect, useState } from "react";

async function getData( id: string ) {
    const res = await fetch('http://localhost:3000/api/user/' + id , { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    console.log("Data: " , data);

    return data;
}

async function putData(data: any) {
    console.log("Putting data: ", data);    

    const res = await fetch('http://localhost:3000/api/user/' + data.id, { 
        cache: 'no-store',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const resdata = await  res.json();

    console.log("Response: ", resdata);
    return resdata;
}

export default function Page({ params }: { params: { par: string } }) {
    const [ myUser, setMyUser ] = useState({ id: 1, name: "Bob", pfs: "123456789" });

    useEffect(() => {
        getData(params.par).then((data) => {
            console.log("Data before set: " , data);
            setMyUser(data);
        });

    }, []);

    const handleNameChange = (event: any) => {
        console.log("Changing name to: ", event.target.value);
        setMyUser({ ...myUser, name: event.target.value });
    }

    const handlePfsChange = (event: any) => {
        console.log("Changing PFS to: ", event.target.value);
        setMyUser({ ...myUser, pfs: event.target.value });
    }
    
    const handleSave = () => {
        console.log("Saving: ", myUser);
        putData(myUser);
    }

    return (

        <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="p-1">
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex flex-col items-stretch">
                <div className="p-2">
                    Name: { myUser.name }
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={ myUser.name } onChange={(event) => handleNameChange(event)}></input>
                </div>
                <div className="p-2">
                    Id: { myUser.id }
                </div>
                <div className="p-2">
                    PFS: { myUser.pfs }
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={ myUser.pfs } onChange={(event) => handlePfsChange(event)}></input>
                </div>
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ handleSave }>Save</button>
            </div>
        </div>

        <div>
          Footer?
        </div>

      </main>
    );
}