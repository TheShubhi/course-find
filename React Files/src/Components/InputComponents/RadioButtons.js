import React from "react";
import Form from "react-bootstrap/esm/Form";
import Col from "react-bootstrap/esm/Col";

export default function RadioButtons(props) {
  const radioButtons = props.labels.map((l) => (
    <Col key={l} xs={5} s={3} lg={2}>
      <Form.Check type="radio" className={"mt-2"}>
        <span onClick={() => props.onSelect(l)}>
          <Form.Check.Input type="radio" checked={l === props.selectedOption} />
          <Form.Check.Label>{l}</Form.Check.Label>
        </span>
      </Form.Check>
    </Col>
  ));

  return (
    <Form.Group>
      <Form.Row>
        <Form.Label column xs={12} lg={2} className="pb-0">
          {props.mainLabel}
        </Form.Label>
        {radioButtons}
      </Form.Row>
    </Form.Group>
  );
}
