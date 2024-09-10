import { useState } from 'react';
import Item from './item'
import Link from 'next/link'
import { get } from 'http';

async function getData() {
  //const res = await fetch('https://vialeea-test.azurewebsites.net/api/char/load', { cache: 'no-store' })
  const res = await fetch('http://localhost:8080/api/pfcharacters', { cache: 'no-store' })

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

async function getOneBasicInfo(id: string) {
  const res = await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + id, { cache: 'no-store' })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  console.log("Data: ", data);

  return [id, data];
}

async function getBasicInfo(chardata: any) {
  //const id = chardata.basicInfoId;
  //temp = Object.fromEntries(
  //  myArr.map(element => 
  //      [element.name, element.value]
  //  )
  //)
  //console.log("Chardata: ", chardata);  

//  const asdf = await Promise.all(
//    chardata.map(async (element:any) => 
//      getOneBasicInfo(element.basicInfoId)
//    ));

  //console.log("This: "  , asdf);
  
  //const basicInfos = Object.fromEntries(asdf);

//  const basicInfos = Object.fromEntries(await Promise.all(
//    chardata.map(async (element:any) => {
//      getOneBasicInfo(element.basicInfoId);
//    })
//  ));

  //const basicInfos = Object.fromEntries(Promise.all(chardata.map(async (element : any) => await getOneBasicInfo(element.basicInfoId)));
      
  
//  const basicInfos = Object.fromEntries(Promise.all(chardata.map(async (element : any) => 
//      {
//          return [element.basicInfoId, await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + element.basicInfoId, { cache: 'no-store' })];
//      }
//    )  ));

  //const res = await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + id, { cache: 'no-store' })

  //if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data')
  //}

  //const data = res.json();
  //return data;

  return Object.fromEntries(await Promise.all(
    chardata.map(async (element:any) => {
      //getOneBasicInfo(element.basicInfoId)
        if (element.basicInfoId) {
            return [element.basicInfoId, await (await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + element.basicInfoId, { cache: 'no-store' })).json()]
        }
        else {
            return [element.basicInfoId, {}]
        }
      }
    )));


    //[element.basicInfoId, (await fetch('http://localhost:8080/api/pfcharacters/basicinfo/' + element.basicInfoId, { cache: 'no-store' })).json()]

//  return Object.fromEntries(await Promise.all(
//    chardata.map(async (element:any) => 
//      getOneBasicInfo(element.basicInfoId)
//    )));

  //return basicInfos;
}

export default async function Page() {
    //const res = await fetch('http://localhost:8080/api/pfcharacters', { cache: 'no-store' })

    //"flex min-h-screen flex-col items-center justify-between p-24">

    //.map((item, index) => <MenuItem key={index} primaryText={item.text} value={item.route} />);
/*
    const data = [
      {
        name: "Lindevaile Tindome",
        image: "https://cdn.paizo.com/image/avatar/PZO9249-Riftwarden_90.jpeg",
        colour: "border-sky-300"
      }, 
      {
        name: "Zenobia Arsinoe Thea",
        image: "https://cdn.paizo.com/image/avatar/PZO9268-Monk1.jpg",
        colour: "border-gray-950"
      }];
*/
    

//const [basicInfo, setBasicInfo] = useState(
//  const basicInfo =
//  {
//    level : 1,
//    fort : 5,
//    will : 4,
//    ref : 6,
//    ac : 17,
//    hp : 14,
//    race : "elf",
//    gender : "Female",
//    charClass: "sorcerer"
//  }
//);
/*
    const basicInfo = {
      charClass: 'sorcerer'
    }
*/
    const data = await getData();



    const basicInfos = await getBasicInfo(data);

    const listItems = data.map((character : any) =>
      <Link href={"subtest/" + character.id}>
        <Item key={character.id} name={character.name} image={character.image} colour={character.colour} basicInfo={basicInfos[character.basicInfoId]} id={character.id}/>
      </Link>
    );

//    <main className="flex min-h-screen flex-col items-center justify-between p-3"> {/*} p-24"> */} 

// <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
// "m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-stretch"

    return (
      <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
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

      </main>
    );
}