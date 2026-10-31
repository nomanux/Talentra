import StatCard from "./dashboard/StatCard";
import { AverageKpiCard, EmployeeCard, ProjectsCard, UsedDevicesCard } from "./dashboard/OverviewCards";
import TotalEmployeeCard from "./dashboard/TotalEmployeeCard";
import AttendanceTable from "./dashboard/AttendanceTable";
import gridBg from "../assets/dashboard/card-grid-bg.svg";
import gridBgEmployee from "../assets/dashboard/card-grid-bg-employee.svg";
import icon2User from "../assets/dashboard/icon-2-user.svg";
import iconTimeCircle from "../assets/dashboard/icon-time-circle.svg";
import icon3User from "../assets/dashboard/icon-3-user.svg";
import iconPerformance from "../assets/dashboard/icon-performance.svg";
import sparkEmployee from "../assets/dashboard/spark-employee.svg";
import sparkTimeToHire from "../assets/dashboard/spark-time-to-hire.svg";
import sparkAttendance from "../assets/dashboard/spark-attendance.svg";
import sparkPerformance from "../assets/dashboard/spark-performance.svg";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-2 sm:gap-[11px]">
      <section className="grid grid-cols-2 gap-2 sm:gap-[11px] xl:grid-cols-4">
        <StatCard
          value="453"
          label="Employee"
          delta={10}
          icon={icon2User}
          iconBg="from-[#7c61ff] to-[#9a87f9]"
          gridBg={gridBgEmployee}
          spark={{ src: sparkEmployee, top: 12.9, right: 9.2 }}
          contentTop={73}
        />
        <StatCard
          value="30 day"
          label="Time to hire"
          delta={-10}
          icon={iconTimeCircle}
          iconBg="from-[#48bffd] to-[#40b5f4]"
          gridBg={gridBg}
          spark={{ src: sparkTimeToHire, top: 23.2, right: 18.5 }}
        />
        <StatCard
          value="234"
          label="Attendance"
          delta={10}
          icon={icon3User}
          iconBg="from-[#47dbcd] to-[#0fbcac]"
          gridBg={gridBg}
          spark={{ src: sparkAttendance, top: 20.3, right: 18.4 }}
        />
        <StatCard
          value="2.32%"
          label="Performance"
          delta={-10}
          icon={iconPerformance}
          iconBg="from-[#ff68ae] to-[#ef77af]"
          gridBg={gridBg}
          spark={{ src: sparkPerformance, top: 25.8, right: 16.4 }}
        />
      </section>

      <section className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 xl:grid-cols-[346fr_290fr_470fr]">
        <div className="flex flex-col gap-3">
          <AverageKpiCard />
          <UsedDevicesCard />
        </div>
        <div className="flex flex-col gap-3">
          <EmployeeCard />
          <ProjectsCard />
        </div>
        <div className="md:col-span-2 xl:col-span-1">
          <TotalEmployeeCard />
        </div>
      </section>

      <AttendanceTable />
    </div>
  );
}
