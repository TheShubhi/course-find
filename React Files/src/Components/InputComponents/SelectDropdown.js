import React from "react";
import Form from "react-bootstrap/esm/Form";
import Col from "react-bootstrap/esm/Col";

export default function SelectDropdown(props) {
  const optionList = props.optionList.map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  return (
    <Form.Group>
      <Form.Row>
        <Form.Label column xs lg={2}>
          {props.labelName}
        </Form.Label>
        <Col xs={12} lg={10}>
          <Form.Control
            as="select"
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            isInvalid={props.isInvalid}
            className="dropdown-list"
          >
            <option hidden value="default"></option>
            {optionList}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {props.invalidMessage}
          </Form.Control.Feedback>
        </Col>
      </Form.Row>
    </Form.Group>
  );
}
