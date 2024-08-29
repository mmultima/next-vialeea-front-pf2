'use client';

import Link from "next/link";
import { use, useEffect, useState } from "react";

async function getData() {
    const res = await fetch('http://localhost:3000/api/user', { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();

    console.log("Data: " , data);

    return data;
}

async function postData(data: string) {
    console.log("Posting data: ", data);    

    const res = await fetch('http://localhost:3000/api/user', { 
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const resdata = await  res.json();

    console.log("Response: ", resdata);
    return resdata;
}

export default function Page() {
    const emptyArray: any[]  = [];

    const [newOpen, setNewOpen] = useState(false);
    const [userData, setUserData] = useState([  { id: 1, name: "Bob" }, { id: 2, name: "Alice" } ]);
    const [newName, setNewName] = useState("No Name");

    /*
    useEffect(() => {
        // This is how you can update the data every 5 seconds
        const interval = setInterval(async () => {
            const data = await getData();
            setData(data);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    */
    useEffect(() => {
        //setUserData( [  { id: 1, name: "Bob2" }, { id: 2, name: "Alice2" } ]);

        getData().then((data) => {
            console.log("Data before set: " , data);
            setUserData(data);
        });
/*
        const fetchData = async () => {
            const data = await getData();

            console.log("Data set; " , data);

            setData(data);
        };
        fetchData();
        */
    }, []);

    //const data = await getData();
    //data = [  { id: 1, name: "Bob" }, { id: 2, name: "Alice" } ];
/*
    const listItems = data.map((user : any) =>
        <Link href={"user/" + user.id} key={user.id}>
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-stretch">
            { user.name }
            </div>
        </Link>
      );
*/
/*
      <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-stretch">
        <div> 
        <Image
        className={ classText }
        src={ image }
        alt="char picture"
        //className="dark:invert"
        width={90}
        height={90}
        priority
      />
    </div>
    <div className="p-1">
      <div>
        <strong>{ name }</strong>
      </div>
      <div>
        {gender} {race} {charClass} {level}
      </div>
      <div>
        <strong>HP</strong> {HP} 
        <strong> AC</strong> {AC} 
        <strong> Fort</strong> +{fort} 
        <strong> Ref</strong> +{ref} 
        <strong> Will</strong> +{will} 
      </div>
    </div>
  </div>

*/
    const handleOpenNew = (event : any) => {
        console.log("Opening new", event);
        setNewName("No Name");
        setNewOpen(true);
    }

    const handleOKNew = (event: any) => {
        console.log("Closing new", event);
        setNewOpen(false);
//{ 'id': '1234', 'name': newName }

        //OK WHY do i have to stringify this?
        postData(JSON.stringify({ 'name': newName })).then((data) => {
            setUserData([...userData,  data ]);
        });
    }   

    const handleChangeNew = (event: any) => {
        console.log("Changing new", event);
        setNewName(event.target.value);
    }

    const handleCancelNew = (event: any) => {
        console.log("Cancelling new", event);
        setNewOpen(false);
    }
/*
    return (
        <main className="flex min-h-screen flex-col items-stretch justify-between p-3">
<div className="">
        { userData?.map((user : any) => 
        <div key={user.id}>
            { user.name }
            </div>
        )
    }
        </div>
        </main>
    );
    */

    return (

        <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="">
        { userData?.map((user : any) => 
        <Link href={"user/" + user.id} key={user.id}>
            <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-stretch">
            { user.name }
            </div>
        </Link>
        )
    }
        </div>

<div>
        <button onClick={(event) => handleOpenNew(event)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            New
                          </button>
                          <button onClick={(event) => handleOpenNew(event)} className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Save
                          </button>

                          <dialog open={ newOpen }>
Name : <input type="text" value={ newName } onChange={(event) => handleChangeNew(event)}></input>
  <form method="dialog">
    <button onClick={(event) => handleOKNew(event)}>OK</button>
    <button onClick={(event) => handleCancelNew(event)}>Cancel</button>
  </form>
</dialog>
</div>

        <div>
          Footer?
        </div>

      </main>
    );


    /*
            <div className="">

          { listItems }

          <Link href="subtest/0">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-stretch mt-4">
              Go to Target Page
            </button>
          </Link>          
        </div>
        <div>
          Just some data
        </div>
    */
}