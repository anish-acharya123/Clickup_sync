import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MaxWidthContainer from "@/components/Wrapper/Maxwidth";
import customUseQuery from "@/hooks/customUseQuery";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import EachTaskGithubAssign from "@/components/Layouts/EachTaskGithubAssign";
import { CardFooter } from "@/components/ui/card";
import { useState } from "react";

const WorkSpace = () => {
  const { workspaceId } = useParams();
  const { toast } = useToast();
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  // Query for workspace details
  const { data, isLoading, isFetching, error } = customUseQuery<any>(
    ["workspace"],
    `http://localhost:5000/user/workspace-details/${workspaceId}`
  );

  // Mutation for mapping a repository
  const mapRepoMutation = useMutation(
    (repoName: string) =>
      axios.post(
        "http://localhost:5000/user/map-workspace-repo",
        { workspaceId, repoName },
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
        "http://localhost:5000/user/create-github-issue",
        { workspaceId, repoName },
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

  if (error) {
    return <div>Error occurred</div>;
  }

  if (isLoading || isFetching) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="py-20">
      <MaxWidthContainer>
        <div className="text-start flex gap-2 items-start justify-center flex-col">
          <h2>Workspace Details</h2>
          <p>
            <strong>Workspace Name:</strong> {data.workspaceName}
          </p>
          <p>
            <strong>Workspace ID:</strong> {data.workspaceId}
          </p>
          <p>
            <strong>Mapped Repository:</strong>{" "}
            {data.mappedRepo.length > 0 ? data.mappedRepo : "Not assigned"}
          </p>
          <p>
            <strong>Task Count:</strong> {data.taskCount}
          </p>

          <EachTaskGithubAssign
            selectedRepo={selectedRepo}
            setSelectedRepo={setSelectedRepo}
          />

          <CardFooter className="h-full flex justify-center items-center gap-4">
            <Button variant="destructive">Delete Task</Button>
            <Button variant="secondary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </CardFooter>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default WorkSpace;
