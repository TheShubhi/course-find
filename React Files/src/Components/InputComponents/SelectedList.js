import React from "react";
import { getUCSDFullCourseIDString as getIDString } from "../CourseParsing";
import Form from "react-bootstrap/esm/Form";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

export default function SelectedList(props) {
  const elementList = props.elementList.length ? (
    props.elementList.map((c) => (
      <OverlayTrigger placement="top" key={c} overlay={<Tooltip>{c}</Tooltip>}>
        <div
          className="alert alert-info p-0 m-1 d-inline-block"
          style={{ borderRadius: "20px" }}
        >
          <span className="font-weight-bold my-1 ml-2 d-inline-block">
            {getIDString(c)}
          </span>
          <button
            type="button"
            className="close mt-0 mb-2 mx-2"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => props.onClose(c)}
          >
            <span
              className="font-weight-normal"
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            >
              &times;
            </span>
          </button>
        </div>
      </OverlayTrigger>
    ))
  ) : (
    <Form.Label className="font-weight-light " column xs={12} lg>
      <i>Please select a course</i>
    </Form.Label>
  );

  return (
    <Form.Group>
      <Form.Row>
        <Form.Label column xs={12} lg={2}>
          Selected Courses:
        </Form.Label>
        {elementList}
      </Form.Row>
    </Form.Group>
  );
}
