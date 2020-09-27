import React from "react";
import Table from "react-bootstrap/Table";

import Course from "./Course";

export default function School(props) {
  const courses = props.schoolInfo.courses.map((c) => (
    <Course key={c.ucsdCourse} courseInfo={c} />
  ));
  return (
    <Table hover borderless striped>
      <thead>
        <tr className="school-name-row">
          <th
            className="text-left align-middle"
            colSpan="3"
            style={{ fontSize: "18px" }}
          >
            {props.schoolInfo.school}
          </th>
          <th className="align-middle" style={{ width: "5%" }}>
            W
          </th>
        </tr>
      </thead>
      <tbody>{courses}</tbody>
    </Table>
  );
}
