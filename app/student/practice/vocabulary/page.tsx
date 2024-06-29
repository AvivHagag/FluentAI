import Link from 'next/link'
import { auth } from '@/auth'

export default async function StudentPage() {
  const session = await auth()

  return (
    <>
      <header className="grid place-items-center min-h-screen">
        <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige p-8 rounded shadow-md w-full max-w-md text-center content-center">
          <h2 className="text-3xl font-bold mb-6">
            ברוך הבא {session?.user.name}
          </h2>
          <div className="space-y-4">
            <Link
              href="/student/practice"
              className="block w-full py-2 bg-mediumBeige text-white rounded-lg hover:bg-amber-800">
              תרגול עצמי
            </Link>
            <Link
              href="#"
              className="block w-full py-2 bg-mediumBeige text-white rounded-lg hover:bg-amber-800">
              משימות
            </Link>
            <Link
              href="#"
              className="block w-full py-2 bg-mediumBeige text-white rounded-lg hover:bg-amber-800">
              סטטסטיקה
            </Link>
          </div>
        </div>{' '}
      </header>

      <main></main>
    </>
  )
}
