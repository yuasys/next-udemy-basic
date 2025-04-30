type Params = {
  params: Promise<{
    id: string; 
  }>
}

export async function generateMetadata({params}: Params){ //関数名は固定です
  const { id } = await params;
  return {
    title: `ブログ記事${id}`,
    description: `ブログ記事の詳細ページです。IDは${id}です。`
  }
}

export default async function page({ params }: Params ) {
  // console.log(params);
  const { id } = await params;
  return (
    <div>
      ブログID： { id }
    </div>
  )
}
