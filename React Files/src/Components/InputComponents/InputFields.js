import React from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

import { compareCourseID as compareID } from "../CourseParsing";
import SelectedList from "./SelectedList";
import SelectDropdown from "./SelectDropdown";
import RadioButtons from "./RadioButtons";

class InputFields extends React.Component {
  state = {
    ucsdCourseList: {},
    ucsdDeptList: [],
    courseLimit: 0,
    isDeptSelected: false,
    deptSelected: "default",
    courseSelected: "default",
    selectedSearchOption: "Course",
    selectedCourseList: [],
    noCourseSelectionError: false,
    noDeptSelectionError: false,
    courseLimitError: false
  };

  componentDidMount() {
    fetch("http://localhost:4567/api/inputInfo")
      .then((res) => res.json())
      .then(
        (result) => {
          const ucsdCourseList = result.deptInfo;
          Object.keys(ucsdCourseList).forEach((key) =>
            ucsdCourseList[key].sort(compareID)
          );
          this.setState({
            ucsdCourseList: ucsdCourseList,
            ucsdDeptList: [...Object.keys(ucsdCourseList)].sort(),
            courseLimit: result.courseLimit
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  changeSelectedDept = (event) => {
    this.setState({
      deptSelected: event.target.value,
      noCourseSelectionError: false,
      courseLimitError: false,
      noDeptSelectionError: false
    });
  };

  changeSelectedCourse = (event) => {
    const courseSelected = event.target.value;
    this.setState((prevState) => {
      let selectedCourseList = prevState.selectedCourseList;
      let courseLimitError = false;
      if (selectedCourseList.includes(courseSelected)) {
      } else if (selectedCourseList.length === this.state.courseLimit) {
        courseLimitError = true;
      } else {
        selectedCourseList = [...selectedCourseList, courseSelected].sort(
          compareID
        );
      }

      return {
        courseSelected: courseSelected,
        selectedCourseList: selectedCourseList,
        noCourseSelectionError: false,
        courseLimitError: courseLimitError
      };
    });
  };

  removeCourse = (courseRemoved) => {
    this.setState((prevState) => {
      let selectedCourseList = [...prevState.selectedCourseList];
      selectedCourseList.splice(selectedCourseList.indexOf(courseRemoved), 1);
      let courseSelected = prevState.courseSelected;

      if (
        prevState.courseSelected === courseRemoved ||
        prevState.selectedCourseList.length === prevState.courseLimit
      ) {
        courseSelected = "default";
      }

      return {
        selectedCourseList: selectedCourseList,
        noCourseSelectionError: false,
        courseLimitError: false,
        courseSelected: courseSelected
      };
    });
  };

  changeSelectedSearchOption = (optionName) => {
    this.setState({
      selectedSearchOption: optionName,
      noCourseSelectionError: false,
      courseLimitError: false,
      noDeptSelectionError: false
    });
  };

  submitForm = () => {
    let noCourseSelectionError = false;
    let noDeptSelectionError = false;

    if (this.state.selectedSearchOption === "Course") {
      if (this.state.selectedCourseList.length > 0) {
        fetch(
          "http://localhost:4567/api/courseInfo?" +
            new URLSearchParams({
              course: this.state.selectedCourseList.join(";"),
              school: "all",
              count: 1
            })
        )
          .then((res) => res.json())
          .then((res) => this.props.onFormSubmit(res));
      } else {
        noCourseSelectionError = true;
      }
    } else {
      if (this.state.deptSelected !== "default") {
        fetch(
          "http://localhost:4567/api/courseInfo?" +
            new URLSearchParams({
              dept: this.state.deptSelected,
              school: "all",
              count: 1
            })
        )
          .then((res) => res.json())
          .then((res) => this.props.onFormSubmit(res));
      } else {
        noDeptSelectionError = true;
      }
    }

    this.setState({
      noCourseSelectionError: noCourseSelectionError,
      courseLimitError: false,
      noDeptSelectionError: noDeptSelectionError
    });
  };

  render() {
    return (
      <Form>
        <RadioButtons
          mainLabel="Search by:"
          labels={["Course", "Department"]}
          selectedOption={this.state.selectedSearchOption}
          onSelect={this.changeSelectedSearchOption}
        />

        <SelectDropdown
          labelName="Department"
          value={this.state.deptSelected}
          optionList={this.state.ucsdDeptList}
          onChange={this.changeSelectedDept}
          isInvalid={this.state.noDeptSelectionError}
          invalidMessage="You need to select a department to search for"
        />

        {this.state.selectedSearchOption === "Course" ? (
          <div>
            <SelectDropdown
              labelName="Course"
              value={this.state.courseSelected}
              optionList={
                this.state.deptSelected !== "default"
                  ? this.state.ucsdCourseList[this.state.deptSelected]
                  : []
              }
              disabled={this.state.deptSelected === "default"}
              onChange={this.changeSelectedCourse}
              isInvalid={
                this.state.courseLimitError || this.state.noCourseSelectionError
              }
              invalidMessage={
                this.state.courseLimitError
                  ? "You can select a maximum of " +
                    this.state.courseLimit +
                    " courses at a time"
                  : "You need to select at least one course to search for"
              }
            />
            <SelectedList
              elementList={this.state.selectedCourseList}
              onClose={this.removeCourse}
            />
          </div>
        ) : (
          ""
        )}
        <div className="text-center">
          <Button variant="primary" onClick={this.submitForm}>
            Find CC Courses!
          </Button>
        </div>
      </Form>
    );
  }
}
export default InputFields;
