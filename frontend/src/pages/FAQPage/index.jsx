import { Search, MessageCircle, Package, HelpCircle, ChevronDown } from "lucide-react";
const faqCategories = [
    { title: "Answer Question", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", icon: MessageCircle },
    { title: "Product Stock", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", icon: Package },
    { title: "Manual Guide", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", icon: HelpCircle }
];

const faqItems = [
    { question: "How to Shopping at Elextra?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..." },
    { question: "How to return product in Elextra?" },
    { question: "How to pay in Elextra?" }
];
export default function FAQPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-orange-500 h-[200px] text-white text-center py-10">
                <h1 className="text-3xl font-bold">FAQ</h1>
                <p className="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e</p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mt-6">
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center w-3/4">
                    <input type="text" placeholder="Haven’t found anything? Try find here" className="flex-1 p-2 border rounded-md outline-none" />
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-md ml-4 flex items-center">
                        <Search size={16} className="mr-2" /> SEARCH
                    </button>
                </div>
            </div>

            {/* FAQ Categories */}
            <div className="flex justify-center space-x-6 mt-6">
                {faqCategories.map((category, index) => (
                    <div key={index} className="bg-gray-100 text-black hover:bg-orange-100 p-6 rounded-lg shadow-md w-64 flex flex-col items-center">
                        <category.icon size={32} className="mb-2" />
                        <h3 className="font-bold">{category.title}</h3>
                        <p className="text-sm text-center mt-2">{category.description}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <div className="container px-10">
                    <h2 className="text-xl font-bold">Basic Guide</h2>
                    <div className="mt-4 space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{item.question}</h3>
                                    {item.answer && <p className="text-sm text-gray-600 mt-2">{item.answer}</p>}
                                </div>
                                <ChevronDown size={24} className="text-orange-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

