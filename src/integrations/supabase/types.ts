export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      circle_members: {
        Row: {
          circle_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          circle_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          circle_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_members_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_members_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      circles: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          theme: Database["public"]["Enums"]["emotional_state"] | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          theme?: Database["public"]["Enums"]["emotional_state"] | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          theme?: Database["public"]["Enums"]["emotional_state"] | null
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          anonymous_name: string
          content: string
          created_at: string
          hearts_count: number
          id: string
          mood: Database["public"]["Enums"]["emotional_state"] | null
          user_id: string
        }
        Insert: {
          anonymous_name?: string
          content: string
          created_at?: string
          hearts_count?: number
          id?: string
          mood?: Database["public"]["Enums"]["emotional_state"] | null
          user_id: string
        }
        Update: {
          anonymous_name?: string
          content?: string
          created_at?: string
          hearts_count?: number
          id?: string
          mood?: Database["public"]["Enums"]["emotional_state"] | null
          user_id?: string
        }
        Relationships: []
      }
      educational_content: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          is_published: boolean
          reading_time_minutes: number
          summary: string
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          reading_time_minutes?: number
          summary: string
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          reading_time_minutes?: number
          summary?: string
          title?: string
        }
        Relationships: []
      }
      listening_requests: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          listener_id: string | null
          matched_at: string | null
          message: string | null
          mood: Database["public"]["Enums"]["emotional_state"] | null
          requester_id: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          listener_id?: string | null
          matched_at?: string | null
          message?: string | null
          mood?: Database["public"]["Enums"]["emotional_state"] | null
          requester_id: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          listener_id?: string | null
          matched_at?: string | null
          message?: string | null
          mood?: Database["public"]["Enums"]["emotional_state"] | null
          requester_id?: string
          status?: string
        }
        Relationships: []
      }
      post_hearts: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_hearts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_hearts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          consent_date: string | null
          created_at: string
          display_name: string | null
          has_consented: boolean
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          consent_date?: string | null
          created_at?: string
          display_name?: string | null
          has_consented?: boolean
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          consent_date?: string | null
          created_at?: string
          display_name?: string | null
          has_consented?: boolean
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reflections: {
        Row: {
          ai_response: string | null
          created_at: string
          guiding_question: string
          id: string
          is_saved: boolean
          mood: Database["public"]["Enums"]["emotional_state"]
          text: string
          user_id: string
        }
        Insert: {
          ai_response?: string | null
          created_at?: string
          guiding_question: string
          id?: string
          is_saved?: boolean
          mood: Database["public"]["Enums"]["emotional_state"]
          text: string
          user_id: string
        }
        Update: {
          ai_response?: string | null
          created_at?: string
          guiding_question?: string
          id?: string
          is_saved?: boolean
          mood?: Database["public"]["Enums"]["emotional_state"]
          text?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_reflections: {
        Row: {
          anonymous_name: string
          circle_id: string
          id: string
          reflection_id: string | null
          shared_at: string
          shared_by: string
        }
        Insert: {
          anonymous_name?: string
          circle_id: string
          id?: string
          reflection_id?: string | null
          shared_at?: string
          shared_by: string
        }
        Update: {
          anonymous_name?: string
          circle_id?: string
          id?: string
          reflection_id?: string | null
          shared_at?: string
          shared_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_reflections_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_reflections_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_reflections_reflection_id_fkey"
            columns: ["reflection_id"]
            isOneToOne: false
            referencedRelation: "reflections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      circles_safe: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          is_public: boolean | null
          name: string | null
          theme: Database["public"]["Enums"]["emotional_state"] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_public?: boolean | null
          name?: string | null
          theme?: Database["public"]["Enums"]["emotional_state"] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          is_public?: boolean | null
          name?: string | null
          theme?: Database["public"]["Enums"]["emotional_state"] | null
        }
        Relationships: []
      }
      community_posts_safe: {
        Row: {
          anonymous_name: string | null
          content: string | null
          created_at: string | null
          hearts_count: number | null
          id: string | null
          mood: Database["public"]["Enums"]["emotional_state"] | null
        }
        Insert: {
          anonymous_name?: string | null
          content?: string | null
          created_at?: string | null
          hearts_count?: number | null
          id?: string | null
          mood?: Database["public"]["Enums"]["emotional_state"] | null
        }
        Update: {
          anonymous_name?: string | null
          content?: string | null
          created_at?: string | null
          hearts_count?: number | null
          id?: string | null
          mood?: Database["public"]["Enums"]["emotional_state"] | null
        }
        Relationships: []
      }
      listening_requests_available: {
        Row: {
          id: string | null
          mood: Database["public"]["Enums"]["emotional_state"] | null
          status: string | null
        }
        Insert: {
          id?: string | null
          mood?: Database["public"]["Enums"]["emotional_state"] | null
          status?: string | null
        }
        Update: {
          id?: string | null
          mood?: Database["public"]["Enums"]["emotional_state"] | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_waiting_requests: { Args: never; Returns: boolean }
      is_circle_member: {
        Args: { _circle_id: string; _user_id: string }
        Returns: boolean
      }
      match_listening_request: { Args: { _mood?: string }; Returns: string }
      user_owns_post: {
        Args: { _post_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      emotional_state: "anxiety" | "overwhelm" | "confusion" | "free"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      emotional_state: ["anxiety", "overwhelm", "confusion", "free"],
    },
  },
} as const
