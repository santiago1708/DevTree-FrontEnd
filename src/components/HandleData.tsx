import type { handleUser } from "../types"

type handleDataProps = {
    data: handleUser
}

export default function HandleData({ data }: handleDataProps) {
    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center font-black">{data.handle}</p>
            {data.image && <img src={data.image} className="max-w-[250px] mx-auto rounded-3xl"/>}
            <p className="text-lg text-center font-bold">{data.description}</p>

            
        </div>
    )
}
