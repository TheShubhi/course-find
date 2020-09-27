import React from "react";

import CourseName from "./CourseName";

export default function Course(props) {
  return (
    <tr style={{ fontSize: "14px" }}>
      <CourseName name={props.courseInfo.ucsdCourse} />

      <td className="align-middle" style={{ width: "5%" }}>
        ←
      </td>
      <CourseName name={props.courseInfo.ccCourse} />
      <td className="align-middle" style={{ width: "5%" }}>
        <a
          href={
            "http://assist.org/transfer/report/" + props.courseInfo.linkToKey
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          ←
        </a>
      </td>
    </tr>
  );
}
