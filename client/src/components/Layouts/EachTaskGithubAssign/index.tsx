/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import customUseQuery from "@/hooks/customUseQuery";
import { List } from "lucide-react";

const EachTaskGithubAssign = ({
  selectedRepo,
  setSelectedRepo,
}: {
  selectedRepo: string | null;
  setSelectedRepo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { data, isLoading, isFetching, error } = customUseQuery<any>(
    ["githubrepos"],
    "http://localhost:5000/user/github-repos"
  );
  console.log(isLoading, isFetching, error);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List size={24} />
            Assign to GitHub Repository
          </CardTitle>
          <CardDescription>
            Select a repository to sync this task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedRepo(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedRepo || "Select Repository"} />
            </SelectTrigger>
            <SelectContent className="max-h-80 overflow-y-scroll">
              {data && data.length > 0 ? (
                data.map((repo: any) => (
                  <SelectItem key={repo.id} value={repo.name}>
                    {repo.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-repo" disabled>
                  No repositories available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default EachTaskGithubAssign;
