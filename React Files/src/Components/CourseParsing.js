function getFirstUCSDCourseNumber(str) {
  return parseInt(str.match(/[A-Z]{2,4}\s(\d+)\w*\s/)[1], 10);
}
function getFirstUCSDCourseID(str) {
  return str.match(/[A-Z]{2,4}\s(\d+\w*)\s/)[1];
}
function getFirstUCSDFullPrefix(str) {
  return str.match(/([A-Z]{2,4})\s\d+\w*\s/)[1];
}

export function getUCSDFullCourseIDString(str) {
  return str.match(/[A-Z]{2,4}\s\d+\w*(?=\s-.*?\))/g).join(" & ");
}

export function compareCourseID(strA, strB) {
  if (
    getFirstUCSDFullPrefix(strA).localeCompare(getFirstUCSDFullPrefix(strB)) !==
    0
  ) {
    return getFirstUCSDFullPrefix(strA).localeCompare(
      getFirstUCSDFullPrefix(strB)
    );
  } else if (
    getFirstUCSDCourseNumber(strA) !== getFirstUCSDCourseNumber(strB)
  ) {
    return getFirstUCSDCourseNumber(strA) - getFirstUCSDCourseNumber(strB);
  } else if (
    getFirstUCSDCourseID(strA).localeCompare(getFirstUCSDCourseID(strB)) !== 0
  ) {
    return getFirstUCSDCourseID(strA).localeCompare(getFirstUCSDCourseID(strB));
  } else {
    return strA.localeCompare(strB);
  }
}
