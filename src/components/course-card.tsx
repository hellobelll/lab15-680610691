import { Trash2 } from "lucide-react";

import type { Course, Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatEnrolledAt } from "@/lib/utils";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onCancel: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onCancel,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        <CardAction>
          <Badge
            variant="outline"
            className={cn(
              isEnrolled
                ?
                  "border-amber-300 bg-amber-100 text-amber-800 dark:border-purple-700 dark:bg-purple-950 dark:text-purple-300"
                :
                  "border-purple-300 bg-purple-100 text-purple-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300",
            )}
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </CardAction>
      </CardHeader>
      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            {enrolledAt && (
              <p>ลงทะเบียนเมื่อ: {formatEnrolledAt(enrolledAt)}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="ยกเลิกการลงทะเบียน"
            onClick={() => onCancel(course.courseId)}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}