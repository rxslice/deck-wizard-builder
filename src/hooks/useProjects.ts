
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService, UserProject, ProjectStats } from '@/services/dataService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useUserProjects = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userProjects', user?.id],
    queryFn: () => dataService.getUserProjects(user!.id),
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUserStats = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: () => dataService.getUserStats(user!.id),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (projectData: {
      name: string;
      file_name: string;
      file_size: number;
    }) => dataService.createProject({
      ...projectData,
      user_id: user!.id,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      toast({
        title: 'Project Created',
        description: 'Your project has been created successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Creation Failed',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ 
      projectId, 
      updates 
    }: { 
      projectId: string; 
      updates: Partial<UserProject> 
    }) => dataService.updateProject(projectId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    },
    onError: () => {
      toast({
        title: 'Update Failed',
        description: 'Failed to update project.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (projectId: string) => dataService.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      toast({
        title: 'Project Deleted',
        description: 'Project has been deleted successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Deletion Failed',
        description: 'Failed to delete project.',
        variant: 'destructive',
      });
    },
  });
};
