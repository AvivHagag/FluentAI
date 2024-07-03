import Link from 'next/link'
import React from 'react'

export default async function StudentPage() {
  return (
    <>
      <header className="grid place-items-center min-h-screen">
        <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige p-8 rounded shadow-md w-full max-w-md text-center content-center">
          <h2 className="text-3xl font-bold mb-6">?מה תרצה לתרגל</h2>
          <div className="space-y-4">
            <Link
              href="/student/practice/open"
              className="block w-full py-2 bg-mediumBeige text-white rounded-lg hover:bg-amber-800">
              שאלות פתוחות
            </Link>
            <Link
              href="/student/practice/grammer"
              className="block w-full py-2 bg-mediumBeige text-white rounded-lg hover:bg-amber-800">
              דקדוק
            </Link>
            <Link
              href="/student/practice/vocabulary"
              className="block w-full py-2 bg-mediumBeige text-white rounded-lg hover:bg-amber-800">
              אוצר מילים
            </Link>
          </div>
        </div>{' '}
      </header>

      <main></main>
    </>
  )
}
