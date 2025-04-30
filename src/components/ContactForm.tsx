'use client'
import { submitContactForm } from "@/lib/actions/contact";
import { useState, useActionState } from "react";
import { ContactSchema } from "@/validations/contact";
import { z } from "zod";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    errors: {}
  }); 
  const [clientErrors, setClientErrors] = useState({name: '', email: ''})

// github copilotの提案（検証結果OKでした）
  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const errors: { name: string; email: string } = { name: '', email: '' };

  //   if (name === 'name') {
  //     if (value.length < 3) {
  //       errors.name = '名前は３文字以上で入力してください';
  //     } else if (value.length > 20) {
  //       errors.name = '名前は20文字以内で入力してください';
  //     }
  //   }

  //   if (name === 'email') {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(value)) {
  //       errors.email = '正しいメールアドレスの形式で入力してください';
  //     }
  //   }

  //   setClientErrors(errors);
  // };

  // Udemyの提案

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    // pickでスキーマを個別にピックアップし、parseでバリデーション
    try {
      if (name === 'name') {
        ContactSchema.pick({ name: true }).parse({ name: value })
      } else if (name === 'email') {
        ContactSchema.pick({ email: true }).parse({ email: value })
      }
      setClientErrors((prev) => ({
        ...prev,  // スプレッド構文で既存のエラーの状態をコピー
        [name]: '' // 対象フィールドのエラーメッセージを空にする
      }))
    }catch (error) {
      // バリデーションエラーかチェック
      if (error instanceof z.ZodError) {
        // 最初のエターメッセージを取得
        const errorMessage = error.errors[0]?.message || ''
        setClientErrors((prev) => ({
          ...prev,  // スプレッド構文で既存のエラーの状態をコピー
          [name]: errorMessage // 対象フィールドにエラーメッセージを設定
        }))
      }
    }
  }

  return (
    <div>
      <form action={formAction}>
        <div className="py-24 text-gray-600">
          <div className="md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto shadow-md">
            <h2 className="text-lg mb-2">お問い合わせ</h2>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm">名前</label>
              <input type="name" id="name" name="name"
              onBlur={handleBlur}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 
                focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8" />
              {state.errors.name && (
                <p className="text-red-500 text-sm mt-1">{state.errors.name.join(', ')}</p>
              )}
              {clientErrors.name && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
              )}
            </div>          
            <div className="mb-4">
              <label htmlFor="email" className="text-sm">メールアドレス</label>
                <input id="email" name="email" 
                onBlur={handleBlur}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 
                  focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8" />
                {state.errors.email && (
                <p className="text-red-500 text-sm mt-1">{state.errors.email.join(', ')}</p>
                )}  
                {clientErrors.email && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>
                )}
            </div> 
            <button className="text-white bg-indigo-500 py-2 px-6 hover:bg-indigo-600 rounded text-lg">送信</button> 
          </div>
        </div>
      </form>
    </div>
  );
}
