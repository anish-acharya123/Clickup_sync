import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const Sidebar = () => {
  return (
    <div className="w-1/4 border px-2 py-2 flex justify-between flex-col bg-gray-50 ">
      <div className=" items-center  border-b-2 py-2 ">
        <Button className="flex items-center  gap-2 hover:bg-gray-200 pr-2 rounded-lg">
          <p className="p-2 px-4 bg-green-400 rounded-lg">A</p>
          <h2 className="font-medium">
            Anish Acharya <span className="text-sm text-gray-400">▼</span>
          </h2>
        </Button>
      </div>

      <div className=" py-2">
          <form>
            <input type="search" className="border w-full p-2 rounded-md focus:outline-none" placeholder="search your task" />
          </form>
      </div>
      <div className="flex justify-between  ">
        <p className="space-x-2">
          <Icon icon="mdi:people-add" className="inline" />
          <span>Invite</span>
        </p>
        <p className="space-x-2">
          <Icon icon="material-symbols:help" className="inline-flex" />
          <span>Help</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
