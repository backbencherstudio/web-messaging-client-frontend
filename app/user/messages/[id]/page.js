import { notFound } from "next/navigation";

const messagesData = [
    {
        "id": 120,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.90",
        "date": "April 28, 2024"
    },
    {
        "id": 121,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 122,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 123,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 124,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 125,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 126,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 127,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...ibjogjtojgkfgtkgjj erijgeg erjkgnerikgje erjkggiok erkgjherlgjer erjhergjreg erjkgherkiger ergtergtngl;rmgreg,mger ermgergtm erjgtergt erjger erjer ererg erklermf;;er'g,erpgkerl rlm;gerl;g lk;jrgfre ni",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 128,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 129,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 130,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 131,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 132,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 133,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    },
    {
        "id": 134,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "views": 20000,
        "cost": "0.95",
        "date": "April 28, 2024"
    }
];

export default async function MessageDetail({ params }) {
    const { id } = await  params;
    // console.log(id);
    const message = messagesData.find((msg) => msg.id.toString() === id);

    if (!message) return notFound();

    return (
        <div className="flex justify-center pt-[121px] md:pt-[156px] lg:pt-[188px] bg-cover bg-no-repeat dark:bg-[url('/bg.png')]  pb-[500px]">
            <div className="m-4 border dark:border-[#545460] bg-white dark:bg-[#1E1E1E] text-[#070707] dark:text-[#FDFEFF] rounded-lg shadow-lg max-w-[1080px] w-full px-6 py-6 md:px-10 md:py-8 leading-[130%]">

                {/* Message Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Message</h1>
                    <button className="bg-red-100 text-red-600  dark:bg-[#FFF4F70F] font-bold opacity-200  px-4 py-2 rounded-full text-sm hover:bg-red-200">
                        Delete
                    </button>
                </div>

                {/* Message Content */}
                <p className="text-gray-700 dark:text-gray-300 mt-6">{message.content}</p>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex gap-24 text-sm text-gray-500 dark:text-gray-400">
                    <p>Time Posted: <br /> {message.date}</p>
                    <p>Views: <br />{message.views.toLocaleString()}</p>
                </div>

            </div>
        </div>
    );
}
