import React from "react";

export default function CourseName(props) {
  const indexCourseID = props.name.indexOf("-");
  const indexUnit = props.name.lastIndexOf("(");
  return (
    <td className="text-left align-middle" style={{ width: "45%" }}>
      <strong>{props.name.substring(0, indexCourseID)}</strong>
      {props.name.substring(indexCourseID, indexUnit)}
      <em>{props.name.substring(indexUnit)}</em>
    </td>
  );
}
