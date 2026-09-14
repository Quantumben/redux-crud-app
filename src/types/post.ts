export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export type NewPost = Omit<Post, "id">;
//Omit<Post, "id"> Give me everything inside Post except id.