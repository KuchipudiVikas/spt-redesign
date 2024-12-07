interface UserInfo {
  id: string;
  username: string;
  display_name: string;
  rank: number;
  status: string;
}

interface Tag {
  slug_name: string;
  display_name: string;
  main_tag_slug_name: string;
  recommend: boolean;
  reserved: boolean;
}

interface AnswerObject {
  id: string;
  question_id: string;
  title: string;
  url_title: string;
  excerpt: string;
  created_at: number;
  vote_count: number;
  accepted: boolean;
  answer_count: number;
  user_info: UserInfo;
  tags: Tag[];
  status: string;
}

export interface ApiResponse {
  object_type: string;
  object: AnswerObject;
}
