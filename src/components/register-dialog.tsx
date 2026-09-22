import { useState } from "react";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Course, Student } from "@/lib/types";
import { buildEnrolledAt, getCurrentTimeInput } from "@/lib/utils";

type RegisterDialogProps = {
  /** วิชาที่ นศ. คนนี้ยังไม่ได้ลงทะเบียน */
  availableCourses: Course[];
  student: Student;
  onEnroll: (courseId: string, enrolledAt: string) => void;
};

export function RegisterDialog({
  availableCourses,
  student,
  onEnroll,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState<string | null>(null);
  const [time, setTime] = useState(getCurrentTimeInput());

  // ทุกครั้งที่เปิด/ปิดฟอร์ม ให้เคลียร์ค่าเป็นค่าเริ่มต้นใหม่
  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setCourseId(null);
      setTime(getCurrentTimeInput());
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (!courseId) return;

    onEnroll(courseId, buildEnrolledAt(time));
    setOpen(false); // ปิด Dialog
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* ปุ่มที่กดแล้วเปิด Dialog — วางอยู่ด้านนอกการ์ดทุกใบ */}
      <DialogTrigger>
        <Button>
          <UserPlus />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <Select
              value={courseId}
              onValueChange={(value) => setCourseId(value as string | null)}
            >
              <SelectTrigger id="courseId" className="w-full">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {course.courseId} – {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              readOnly
              value={`${student.firstName} ${student.lastName}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" readOnly value={student.program} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}