import React from "react";

import CourseDisplay from "./CourseDisplayComponents/CourseDisplay";
import InputFields from "./InputComponents/InputFields";
import { compareCourseID as compareID } from "./CourseParsing";

class CourseFinderBody extends React.Component {
  state = {
    courseData: {}
  };

  courseSearch = (data) => {
    data.nonTransferable.sort(compareID);
    data.schools.sort((a, b) => a.school.localeCompare(b.school));
    data.schools.forEach((s) =>
      s.courses.sort((a, b) => compareID(a.ucsdCourse, b.ucsdCourse))
    );

    this.setState({
      courseData: data
    });
  };

  render() {
    return (
      <div className="container">
        <br />
        <InputFields onFormSubmit={this.courseSearch} />
        <CourseDisplay courseData={this.state.courseData} />
      </div>
    );
  }
}
export default CourseFinderBody;
