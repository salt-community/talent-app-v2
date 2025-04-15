import { assignmentsSeedingService } from "./features/assignments";
import { categories } from "./features/assignments/schema";

async function assignmentsMigrationScript() {
  //get all assignments
  const assignments = await assignmentsSeedingService.getAllAssignments();
  //categories

  //find all unique categories in assignments
  const categoriesWithDuplicates = assignments.flatMap(
    (assignment) => assignment.categories
  );
  // const categories = categoriesWithDuplicates.filter(
  //   (category, index) => categoriesWithDuplicates.indexOf(category) === index
  // );
  // for (const category of categories) {
  //   if (category) {
  //     await assignmentsSeedingService.addCategory(category);
  //   }
  // }
  const newCategory = await assignmentsSeedingService.getAllCategories();
  console.log("categories", newCategory);
  for (const assignment of assignments) {
    if (assignment.categories) {
      for (const category of assignment.categories) {
        const categoryId = newCategory.filter(
          (categoryName) => categoryName.name === category
        );
        await assignmentsSeedingService.addAssignmentCategory({
          assignmentId: assignment.id,
          categoryId: categoryId[0].id,
        });
      }
    }
  }
  //create new categories based on unique categories found

  //populate categories table
  //assignment.categories = categories.name
  //
  //assignment feedback
}
assignmentsMigrationScript();
