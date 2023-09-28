import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  name: string;
  image: string;
  colour: string;
  basicInfo: any;
  handleChangeInfo: Function;
}


async function  putData(id: string, data: string) {
  const res = await fetch('/api/character/basicinfo/' + id, { 
    cache: 'no-store',
    method: 'PUT',
    body: JSON.stringify(data)
  });

  const resdata = await  res.json()

  console.log("P Response: ", resdata);
}

export default function BasicInfoEdit({ name, image, colour, basicInfo, handleChangeInfo } : Props) {
    console.log("Class: ", basicInfo.charClass);


    //console.log("Name: " + name);
    // React / Next doesn't like 'null' as data, but "" gives an empty element.
    const [charClass, setCharClass] = useState(basicInfo.charClass);
    const [level, setLevel] = useState(basicInfo.level);
    const [fort, setFort] = useState(basicInfo.fort);
    const [will, setWill] = useState(basicInfo.will);
    const [ref, setRef] = useState(basicInfo.ref);
    const [AC, setAc] = useState(basicInfo.AC);
    const [HP, setHp] = useState(basicInfo.HP);
    const [race, setRace] = useState(basicInfo.race);
    const [gender, setGender] = useState(basicInfo.gender);


    if (!colour) {
      colour = "";
    }

    if (!image) {
      image = "";
    }

    //const charClass = "sorcerer";
    /*

    const level = 1;
    const fort = 5;
    const will = 4;
    const ref = 6;
    const AC = 17;
    const HP = 14;
    const race = "elf";
    const gender = "Female";
*/


    const handleCharClassChange = (event: any) => {
        setCharClass(event.target.value);
        const changedInfo = {
          ...basicInfo,
          charClass: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleLevelChange = (event: any) => {
        setLevel(event.target.value);

        const changedInfo = {
          ...basicInfo,
          level: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleFortChange = (event: any) => {
        setFort(event.target.value);
        const changedInfo = {
          ...basicInfo,
          fort: event.target.value
        };

        handleChangeInfo(changedInfo);

    }
    const handleWillChange = (event: any) => {
        setWill(event.target.value);
        const changedInfo = {
          ...basicInfo,
          will: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleRefChange = (event: any) => {
        setRef(event.target.value);
        const changedInfo = {
          ...basicInfo,
          ref: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleAcChange = (event: any) => {
        setAc(event.target.value);
        const changedInfo = {
          ...basicInfo,
          AC: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleHpChange = (event: any) => {
        setHp(event.target.value);
        const changedInfo = {
          ...basicInfo,
          HP: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleRaceChange = (event: any) => {
        setRace(event.target.value);
        const changedInfo = {
          ...basicInfo,
          race: event.target.value
        };

        handleChangeInfo(changedInfo);
    }
    const handleGenderChange = (event: any) => {
        setGender(event.target.value);
        const changedInfo = {
          ...basicInfo,
          gender: event.target.value
        };

        handleChangeInfo(changedInfo);
    }

    const classText = "m-1 border-solid border-4 hover:border-red-600 rounded-full " + colour;


    const buttonClick = (event: any) => {
      event.preventDefault();
      console.log("BasicInfo: ", basicInfo);

      //putData(newCharacter.id, JSON.stringify(newCharacter));
    };
    

    //console.log(classText);

    /*<div className="border-solid border-4 border-indigo-600 hover:border-red-600 rounded-lg flex items-center">*/ 
/*   <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-center">*/

    return (
        <div>
      <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-stretch">
        <div> {/*  className="border-solid border-4 border-indigo-600 hover:border-red-600"> */ }
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
                  <form>
                  <div className="p-3">
                    Class
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={charClass} onChange={ handleCharClassChange }></input>
                  </div>
                  <div className="p-3">
                    Level
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={level} onChange={ handleLevelChange }></input>
                  </div>
                  <div className="p-3">
                    Fort
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={fort} onChange={ handleFortChange }></input>
                  </div>
                  <div className="p-3">
                    Will
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={will} onChange={ handleWillChange }></input>
                  </div>
                  <div className="p-3">
                    Ref
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={ref} onChange={ handleRefChange }></input>
                  </div>
                  <div className="p-3">
                    AC
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={AC} onChange={ handleAcChange }></input>
                  </div>
                  <div className="p-3">
                    HP
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={HP} onChange={ handleHpChange }></input>
                  </div>
                  <div className="p-3">
                    Race
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={race} onChange={ handleRaceChange }></input>
                  </div>
                  <div className="p-3">
                    Gender
                    <input className="h-full w-full rounded-[7px] px-3 py-2.5 border border-gray-300" value={gender} onChange={ handleGenderChange }></input>
                  </div>

                  <div className="p-3 flex justify-end">
                <button onClick={buttonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Button
                </button>
              </div>


                  </form>
        </div>
    );
}
