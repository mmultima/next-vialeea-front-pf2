import Image from 'next/image'

interface Props {
  name: string;
  image: string;
  colour: string;
  basicInfo: any;
}

export default function Item({ name, image, colour, basicInfo } : Props) {

    //console.log("Name: " + name);
    // React / Next doesn't like 'null' as data, but "" gives an empty element.

    if (!colour) {
      colour = "";
    }

    if (!image) {
      image = "";
    }

    const charClass = basicInfo.charClass;
    
    const level = basicInfo.level;
    const fort = basicInfo.fort;
    const will = basicInfo.will;
    const ref = basicInfo.ref;
    const AC = basicInfo.AC;
    const HP = basicInfo.HP;
    const race = basicInfo.race;
    const gender = basicInfo.gender;

    /*
    const charClass = "sorcerer";
    
    const level = 1;
    const fort = 5;
    const will = 4;
    const ref = 6;
    const AC = 17;
    const HP = 14;
    const race = "elf";
    const gender = "Female";
    */

    const classText = "m-1 border-solid border-4 hover:border-red-600 rounded-full " + colour;

    //console.log(classText);

    /*<div className="border-solid border-4 border-indigo-600 hover:border-red-600 rounded-lg flex items-center">*/ 
/*   <div className="m-3 bg-white hover:bg-sky-100 rounded-lg shadow-lg flex items-center">*/

    return (

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
    );
}