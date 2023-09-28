import { useState } from 'react';
import Item from './item'
import Link from 'next/link'

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
  const basicInfo =
  {
    level : 1,
    fort : 5,
    will : 4,
    ref : 6,
    AC : 17,
    HP : 14,
    race : "elf",
    gender : "Female"
  }
//);
/*
    const basicInfo = {
      charClass: 'sorcerer'
    }
*/
    const data = await getData();

    const listItems = data.map((character : any) =>
      <Link href={"subtest/" + character.id}>
        <Item key={character.id} name={character.name} image={character.image} colour={character.colour} basicInfo={basicInfo}/>
      </Link>
    );

//    <main className="flex min-h-screen flex-col items-center justify-between p-3"> {/*} p-24"> */} 


    return (
      <main className="flex min-h-screen flex-col items-stretch justify-between p-3"> {/*} p-24"> */} 
        <div className="">

          { listItems }
        </div>
        <div>
          Just some data
        </div>

      </main>
    );
}