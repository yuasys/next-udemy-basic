import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ記事一覧",
  description: "ブラグ記事の一覧が表示されます"
};


// ダミーデータ
const articles = [
  { id: 1, title: 'タイトル1' },
  { id: 2, title: 'タイトル2' },
  { id: 3, title: 'タイトル3' },
];

// 非同期関数内で待機（awaitで待つにはPromise型を返す必要がある）
async function fetchArticles() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待機
  // throw new Error('エラーが発生しました'); // エラーをスロー
  return articles;
}

// 配列を１件ずつ表示（Reactではmapがよく使われる）
export default async function BlogPages() {
  const articles = await fetchArticles();
  return (<div><ul>
    {articles.map((article) => (
      <li key={article.id}>
        title: {article.title}
      </li>
    ))}
    </ul></div>);
}