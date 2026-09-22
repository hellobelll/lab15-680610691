import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <Card className="max-w-md center mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-normal">
          ระบบลงทะเบียนเรียน <span className="font-bold">CPE & ISNE</span>
        </CardTitle>
      </CardHeader>
      <CardContent >
        <Button render={<Link to="/enrollment" />}>ไปหน้าลงทะเบียนเรียน</Button>
      </CardContent>
    </Card>
  );
}