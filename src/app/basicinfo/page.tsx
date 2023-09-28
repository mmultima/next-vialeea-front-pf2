import Item from '../subtest/item'
import { useRouter } from 'next/navigation'

export default async function Page() {
    //const router = useRouter();
    //const {id} = router.query;
    //"flex min-h-screen flex-col items-center justify-between p-24">

    //.map((item, index) => <MenuItem key={index} primaryText={item.text} value={item.route} />);

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

    const basicInfo = {
      charClass: 'sorcerer'
    }

    const listItems = data.map((character : any) =>
      <Item name={character.name} image={character.image} colour={character.colour} basicInfo={basicInfo}/>
    );


    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-3"> {/*} p-24"> */} 
        <div className="">

          { listItems }
        </div>
        <div>
          Just some data
        </div>

      </main>
    );
}