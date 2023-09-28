'use client';

import { useEffect, useState } from 'react';
import Item from '../item';
import BasicInfoEdit from './basicinfoedit/basicinfoedit';
import { useRouter } from 'next/navigation';
//'use client';

import Image from 'next/image'

async function getData( id: string ) {
  //const res = await fetch('https://vialeea-test.azurewebsites.net/api/char/load', { cache: 'no-store' })

  //http://localhost:3000/api/character/649e06f7cca2d08fbc00abaa

  const res = await fetch('/api/character/' + id, { cache: 'no-store' })

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  console.log("Hello!");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = res.json();

  //console.log(data);

  return data;
}

async function postData(id: string, data: string) {
  const res = await fetch('/api/character/' + id, { 
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({mydata : data})
  });

  const resdata = await  res.json();

  console.log("Response: ", resdata);
}


async function  putData(id: string, data: string) {
  const res = await fetch('/api/character/' + id, { 
    cache: 'no-store',
    method: 'PUT',
    body: JSON.stringify(data)
  });

  const resdata = await  res.json()

  console.log("P Response: ", resdata);
}


/*
function handleChange(event: Event) {
  console.log("Change: ", event);
}
*/

export default function Page({ params }: { params: { par: string } }) {
    //TODO: Error handling on missing data completely broken.
    const [nameInput, setNameInput] = useState("no name");
    const [imageInput, setImageInput] = useState("");
    const [colourInput, setColourInput] = useState("no colour");
    const [character, setCharacter] = useState({id: '', name: 'no name', image: '', colour: 'no colour', user: ''});

    const handleNameChange = (event: any) => {
      setNameInput(event.target.value);


      console.log("Change name:  ", event);
    }
    const handleImageChange = (event: any) => {
      setImageInput(event.target.value);


      console.log("Change image: ", event);
    }
    const handleColourChange = (event: any) => {
      setColourInput(event.target.value); 


      console.log("Change colour: ", event);
    }        
    //const router = useRouter();
    //const {id} = router.query;
    //"flex min-h-screen flex-col items-center justify-between p-24">

    //.map((item, index) => <MenuItem key={index} primaryText={item.text} value={item.route} />);

    const [basicInfo, setBasicInfo] = useState(
      {
        charClass: 'sorcerer',
        level : 1,
        fort : 5,
        will : 4,
        ref : 6,
        AC : 17,
        HP : 14,
        race : "elf",
        gender : "Female"
      }
    );

    const handleChangeInfo = (basicInfo: any) => {
        setBasicInfo(basicInfo);
    };

    useEffect(() => {
      console.log('effect');
      getData(params.par)
      .then(character => {
          console.log('promise fulfilled ', character);
          //setNameInput("EFFECT");
          setNameInput(character.name);
          setImageInput(character.image);
          setColourInput(character.colour);
          setCharacter(character);
          console.log('All data should be set?');
        });
    }, []);

    //const character = await getData(params.par);

    /*

            <div>
              <Image
                className={ classText }
                src={ imageInput  }
                alt="char picture"
                //className="dark:invert"
                width={90}
                height={90}
                priority
              />
            </div>

    */

    const name = character ? character.name : "No name";

    //onChange={ handleChange }

    /* bg-transparent */

    const colour = "border-sky-300";
    const classText = "m-1 border-solid border-4 hover:border-red-600 rounded-full " + colour;
    const image = '';

    const buttonClick = (event: any) => {
      console.log("Character: ", character);

      const newCharacter = { 
        ...character, 
        name: nameInput,
        image: imageInput,
        colour: colourInput
      }

      console.log("New character: ", newCharacter);

      event.preventDefault();
      console.log("Button clicked", event);
      postData("myid", "mydata");
      putData(newCharacter.id, JSON.stringify(newCharacter));
    };
    
/*
    const basicInfo = {
        charClass: 'sorcerer'
    };
*/

    /*               <input className="m-3 peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" value={character.name}></input> */

    /* <Item name={character.name} image={character.image} colour={character.colour}/> */

    /*                 <button onClick={buttonClick} className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */

    /* https://stackoverflow.com/questions/56233184/float-right-button-without-going-outside-parent-div-tailwindcss */

    return (
      <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="">        
         <Item name={nameInput} image={imageInput} colour={colourInput} basicInfo={basicInfo}/> 
         <BasicInfoEdit name={nameInput} image={imageInput} colour={colourInput} basicInfo={basicInfo} handleChangeInfo={handleChangeInfo}/> 
         
          <div className="bg-white w-full hover:bg-sky-100 rounded-lg shadow-lg flex-col items-stretch">



            <form>
              <div className="p-3">
                Name
                <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={nameInput} onChange={ handleNameChange }></input>
              </div>
              <div className="p-3">
                Image
                <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={imageInput} onChange={ handleImageChange }></input>
              </div>
              <div className="p-3">
                Colour
                <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={colourInput} onChange={ handleColourChange }></input>
              </div>

              <div className="p-3 flex justify-end">
                <button onClick={buttonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Button
                </button>
              </div>

            </form>
          </div>
        </div>

        <div>
          Just some data {params.par} with name {nameInput}
        </div>

      </main>
    );
}