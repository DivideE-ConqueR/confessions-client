import { DotsHorizontalIcon } from "@heroicons/react/outline";

export default function Card() {
  return (
    <>
      <div class="rounded overflow-hidden shadow-md bg-white">
        <div class="px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <img
                className="w-8"
                src="https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Heather&clotheType=GraphicShirt&eyeType=Cry&eyebrowType=UpDownNatural&facialHairColor=Brown&facialHairType=BeardMagestic&hairColor=PastelPink&hatColor=Blue02&mouthType=Grimace&skinColor=Tanned&topType=LongHairStraightStrand"
                alt="avatar"
              />
              <h2 class="font-semibold text-base">High Christye</h2>
              <p className="font-bold text-gray-300">·</p>
              <p className="text-gray-400/70">4m</p>
            </div>
            <DotsHorizontalIcon className="w-6 text-gray-500" />
          </div>
          <p class="text-gray-600 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </>
  );
}
