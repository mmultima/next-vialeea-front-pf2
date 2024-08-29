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

export default function Page({ params }: { params: { par: string } }) {
    const [ myUser, setMyUser ] = useState({ id: 1, name: "Bob" });

    useEffect(() => {
        getData(params.par).then((data) => {
            console.log("Data before set: " , data);
            setMyUser(data);
        });

    }, []);

    return (

        <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="p-1">
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex flex-col items-stretch">
                <div className="p-2">
                    Name: { myUser.name }
                </div>
                <div className="p-2">
                    Id: { myUser.id }
                </div>
            </div>
        </div>

        <div>
          Footer?
        </div>

      </main>
    );
}