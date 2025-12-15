export default function getStudentIdsSum(students){

  return students.reduce((sum, students) => sum + students.id, 0)
}
