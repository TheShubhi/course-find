import React from "react";
import School from "./School";
import NonTransferableCourse from "./NonTransferableCourse";

export default function CourseDisplay(props) {
  if (Object.keys(props.courseData).length !== 0) {
    const schools = props.courseData.schools.map((s) => (
      <School key={s.school} schoolInfo={s} />
    ));
    const nonTransferable = props.courseData.nonTransferable.map((c) => (
      <NonTransferableCourse key={c} courseInfo={c} />
    ));
    return (
      <div>
        <br />
        {nonTransferable}
        {schools}
      </div>
    );
  } else {
    return <div />;
  }
}
