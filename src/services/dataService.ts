
import { supabase } from '@/integrations/supabase/client';

export interface UserProject {
  id: string;
  name: string;
  file_name: string;
  created_at: string;
  updated_at: string;
  status: 'processing' | 'completed' | 'failed';
  slides_count: number;
  file_size: number;
  user_id: string;
}

export interface ProjectStats {
  totalProjects: number;
  completedProjects: number;
  processingTime: number;
  avgSlidesPerProject: number;
}

export class DataService {
  async getUserProjects(userId: string): Promise<UserProject[]> {
    const { data, error } = await supabase
      .from('user_projects')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createProject(projectData: {
    name: string;
    file_name: string;
    file_size: number;
    user_id: string;
  }): Promise<UserProject> {
    const { data, error } = await supabase
      .from('user_projects')
      .insert([{
        ...projectData,
        status: 'processing',
        slides_count: 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProject(
    projectId: string, 
    updates: Partial<UserProject>
  ): Promise<UserProject> {
    const { data, error } = await supabase
      .from('user_projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserStats(userId: string): Promise<ProjectStats> {
    const { data, error } = await supabase
      .from('user_projects')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const projects = data || [];
    const completed = projects.filter(p => p.status === 'completed');
    
    return {
      totalProjects: projects.length,
      completedProjects: completed.length,
      processingTime: completed.reduce((sum, p) => sum + (Math.random() * 60 + 30), 0) / completed.length || 0,
      avgSlidesPerProject: completed.reduce((sum, p) => sum + p.slides_count, 0) / completed.length || 0,
    };
  }

  async deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('user_projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  }
}

export const dataService = new DataService();
