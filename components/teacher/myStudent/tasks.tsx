import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudentTasks } from "@/lib/ServerActions/ServerActions";
import Link from "next/link";

interface TasksProps {
  studentId: string;
}

export async function Tasks({ studentId }: TasksProps) {
  const StudentData = await getStudentTasks(studentId);
  return (
    <>
      <div className="mx-auto my-2">
        <Link href={`/teacher/createtask?id=${studentId}`}>
          <Button
            variant={"outline"}
            className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
          >
            יצירת מטלה חדשה
          </Button>
        </Link>
      </div>
      {StudentData && (
        <div className="flex flex-col justify-center w-2/3 mx-auto bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg shadow-xl backdrop-blur">
          <Table dir="rtl">
            <TableCaption>המטלות האחרונות של {StudentData.name}</TableCaption>
            <TableHeader dir="rtl">
              <TableRow dir="rtl">
                <TableHead className="text-right font-medium text-darkRed">
                  מספר
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  שם המטלה
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  להגשה עד
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  הודעה
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  ציון
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  סטטוס
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody dir="rtl">
              {StudentData.tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    {new Date(task.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.messageText}</TableCell>
                  <TableCell>{task.grade ?? " - "}</TableCell>
                  <TableCell>
                    {task.approvedByAdmin ? "מאושר" : "ממתין לאישור מנהל האתר"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
