/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import customUseQuery from "@/hooks/customUseQuery";
import { Calendar, Clipboard } from "lucide-react";

import { useParams } from "react-router-dom";

const EachTaskCard = () => {
  const { taskId } = useParams();

  const {
    data: task,
    isLoading,
    isFetching,
    error,
  } = customUseQuery<any>(
    ["eachtask", taskId],
    `http://localhost:5000/user/task/${taskId}`,
    {
      withCredentials: true,
    }
  );

  console.log(taskId, isLoading, isFetching, error);

  return (
    <>
      {task && (
        <div className=" mx-auto py-4 space-y-4">
          <Card className="flex justify-between items-center ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard size={30} />
                <span className="text-2xl font-bold">
                  {task.name || "Task Name"}
                </span>
              </CardTitle>
              <CardDescription>
                <span className="">
                  {task.description || "No description provided."}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className=" flex gap-6 items-end">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Priority:</span>
                <div className="flex">
                  <Badge
                    // variant="outline"
                    className={`capitalize px-3 ${
                      task.priority?.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task?.priority.priority || "Normal"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <Calendar size={16} />
                <span className="font-semibold mr-4">Due Date:</span>
                <div className="flex items-center gap-2">
                  {task.due_date
                    ? new Date(parseInt(task.due_date)).toLocaleDateString()
                    : "No due date"}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Status:</span>
                <Badge
                  // variant="outline"
                  className={`capitalize ${
                    task.status?.status === "complete"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status?.status || "Unknown"}
                </Badge>
              </div>
            </CardContent>
          </Card>

        
        </div>
      )}
    </>
  );
};

export default EachTaskCard;
