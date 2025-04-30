// APIはdefault exportはできないので個別に設定
// 関数名はGET, POST, PUT, PATCH, DELETE
// NextResponseはResponseのラッパー
// urlとしては http://localhost:3000/api/hello

import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { id: 1, name: '山田' },
    { id: 2, name: '田中' }
  ])}
