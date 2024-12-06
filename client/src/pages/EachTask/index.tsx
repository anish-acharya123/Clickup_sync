import EachTaskCard from "@/components/Layouts/EachTaskCard";
import EachTaskGithubAssign from "@/components/Layouts/EachTaskGithubAssign";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import MaxWidthContainer from "@/components/Wrapper/Maxwidth";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

const EachTask = () => {
  const { taskId } = useParams();

  const mapRepoMutation = useMutation(
    (repoName: string) =>
      axios.post(
        "http://localhost:5000/user/task/map-repo",
        { taskId, repoName },
        { withCredentials: true }
      ),
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Repository mapped successfully!",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to map repository to the task.",
          variant: "destructive",
        });
      },
    }
  );

  // Mutation for creating a GitHub issue
  const createIssueMutation = useMutation(
    (repoName: string) =>
      axios.post(
        "http://localhost:5000/user/task/create-github-issue",
        { taskId, repoName },
        { withCredentials: true }
      ),
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "GitHub issue created successfully!",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create GitHub issue.",
          variant: "destructive",
        });
      },
    }
  );

  // Handle Save Changes
  const handleSaveChanges = () => {
    if (!selectedRepo) {
      toast({
        title: "Error",
        description: "Please select a repository first.",
        variant: "destructive",
      });
      return;
    }

    mapRepoMutation.mutate(selectedRepo, {
      onSuccess: () => {
        // Once mapping is successful, create the GitHub issue
        createIssueMutation.mutate(selectedRepo);
      },
    });
  };

  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  return (
    <MaxWidthContainer>
      <div className=" mx-auto p-4 space-y-4">
        <EachTaskCard />
        <EachTaskGithubAssign
          selectedRepo={selectedRepo}
          setSelectedRepo={setSelectedRepo}
        />
        {/* ////footer  */}
        <CardFooter className="h-full flex  justify-center  items-center gap-4">
          <Button variant="destructive">Delete Task</Button>
          <Button variant="secondary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </CardFooter>
      </div>
    </MaxWidthContainer>
  );
};

export default EachTask;
